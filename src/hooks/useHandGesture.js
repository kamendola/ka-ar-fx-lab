import { useState, useRef, useCallback, useEffect } from 'react';
import { FilesetResolver, HandLandmarker } from '@mediapipe/tasks-vision';

export function useHandGesture() {
  const [isActive, setIsActive] = useState(false);
  const [gestureData, setGestureData] = useState(null);
  const [status, setStatus] = useState('idle'); // idle, loading, ready, error
  const [error, setError] = useState(null);
  
  const handLandmarkerRef = useRef(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const animationRef = useRef(null);
  const lastTimeRef = useRef(-1);

  // Initialize MediaPipe Hand Landmarker
  const initializeHandLandmarker = useCallback(async () => {
    try {
      setStatus('loading');
      setError(null);
      
      const vision = await FilesetResolver.forVisionTasks(
        'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
      );
      
      const handLandmarker = await HandLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task',
          delegate: 'GPU'
        },
        runningMode: 'VIDEO',
        numHands: 2,
        minHandDetectionConfidence: 0.5,
        minHandPresenceConfidence: 0.5,
        minTrackingConfidence: 0.5
      });
      
      handLandmarkerRef.current = handLandmarker;
      setStatus('ready');
      return true;
    } catch (err) {
      console.error('Failed to initialize hand landmarker:', err);
      setError('Failed to load hand tracking model');
      setStatus('error');
      return false;
    }
  }, []);

  // Calculate gesture data from landmarks
  const processLandmarks = useCallback((results) => {
    if (!results.landmarks || results.landmarks.length === 0) {
      return null;
    }

    const hands = results.landmarks.map((landmarks, handIndex) => {
      // Key landmarks
      const wrist = landmarks[0];
      const thumbTip = landmarks[4];
      const indexTip = landmarks[8];
      const middleTip = landmarks[12];
      const ringTip = landmarks[16];
      const pinkyTip = landmarks[20];
      const indexMcp = landmarks[5];
      const middleMcp = landmarks[9];
      
      // Palm center (average of MCP joints)
      const palmX = (landmarks[0].x + landmarks[5].x + landmarks[9].x + landmarks[13].x + landmarks[17].x) / 5;
      const palmY = (landmarks[0].y + landmarks[5].y + landmarks[9].y + landmarks[13].y + landmarks[17].y) / 5;
      
      // Pinch distance (thumb to index)
      const pinchDistance = Math.sqrt(
        Math.pow(thumbTip.x - indexTip.x, 2) + 
        Math.pow(thumbTip.y - indexTip.y, 2)
      );
      const isPinching = pinchDistance < 0.05;
      
      // Count extended fingers
      const fingerTips = [thumbTip, indexTip, middleTip, ringTip, pinkyTip];
      const fingerMcps = [landmarks[2], indexMcp, middleMcp, landmarks[13], landmarks[17]];
      
      let extendedFingers = 0;
      
      // Thumb (check x distance from palm for right hand detection)
      if (Math.abs(thumbTip.x - wrist.x) > 0.1) extendedFingers++;
      
      // Other fingers (check if tip is above MCP)
      for (let i = 1; i < 5; i++) {
        if (fingerTips[i].y < fingerMcps[i].y - 0.02) {
          extendedFingers++;
        }
      }
      
      // Fist detection
      const isFist = extendedFingers <= 1;
      const isOpenHand = extendedFingers >= 4;
      
      // Hand orientation (rotation)
      const handAngle = Math.atan2(
        middleMcp.y - wrist.y,
        middleMcp.x - wrist.x
      );
      
      return {
        landmarks,
        palmX,
        palmY,
        pinchDistance,
        isPinching,
        isFist,
        isOpenHand,
        extendedFingers,
        handAngle,
        handedness: results.handednesses?.[handIndex]?.[0]?.categoryName || 'Unknown'
      };
    });

    // Calculate two-hand interactions
    let twoHandDistance = null;
    if (hands.length === 2) {
      twoHandDistance = Math.sqrt(
        Math.pow(hands[0].palmX - hands[1].palmX, 2) +
        Math.pow(hands[0].palmY - hands[1].palmY, 2)
      );
    }

    // Primary hand (first detected or right hand)
    const primaryHand = hands.find(h => h.handedness === 'Right') || hands[0];

    return {
      hands,
      primaryHand,
      twoHandDistance,
      handCount: hands.length,
      // Normalized controls (0-1 range)
      x: primaryHand ? 1 - primaryHand.palmX : 0.5, // Flip X for natural control
      y: primaryHand ? primaryHand.palmY : 0.5,
      pinch: primaryHand ? Math.max(0, Math.min(1, 1 - primaryHand.pinchDistance * 10)) : 0,
      fingers: primaryHand ? primaryHand.extendedFingers : 0,
      isGrabbing: primaryHand?.isFist || false,
      isOpen: primaryHand?.isOpenHand || false,
    };
  }, []);

  // Detection loop
  const detectHands = useCallback(() => {
    if (!handLandmarkerRef.current || !videoRef.current || !isActive) {
      return;
    }

    const video = videoRef.current;
    
    if (video.readyState >= 2) {
      const now = performance.now();
      
      // Only process if enough time has passed (throttle to ~30fps)
      if (now - lastTimeRef.current > 33) {
        lastTimeRef.current = now;
        
        try {
          const results = handLandmarkerRef.current.detectForVideo(video, now);
          const processed = processLandmarks(results);
          setGestureData(processed);
        } catch (err) {
          console.error('Hand detection error:', err);
        }
      }
    }
    
    animationRef.current = requestAnimationFrame(detectHands);
  }, [isActive, processLandmarks]);

  // Start gesture detection
  const startGestureDetection = useCallback(async () => {
    try {
      // Initialize model if not ready
      if (!handLandmarkerRef.current) {
        const success = await initializeHandLandmarker();
        if (!success) return;
      }

      // Get webcam stream
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user'
        }
      });
      
      streamRef.current = stream;
      
      // Create video element for processing
      const video = document.createElement('video');
      video.srcObject = stream;
      video.autoplay = true;
      video.playsInline = true;
      videoRef.current = video;
      
      await video.play();
      
      setIsActive(true);
      
      // Start detection loop
      animationRef.current = requestAnimationFrame(detectHands);
      
    } catch (err) {
      console.error('Failed to start gesture detection:', err);
      if (err.name === 'NotAllowedError') {
        setError('Camera access denied');
      } else {
        setError('Failed to access camera');
      }
      setStatus('error');
    }
  }, [initializeHandLandmarker, detectHands]);

  // Stop gesture detection
  const stopGestureDetection = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    if (videoRef.current) {
      videoRef.current.srcObject = null;
      videoRef.current = null;
    }
    
    setIsActive(false);
    setGestureData(null);
  }, []);

  // Restart detection loop when isActive changes
  useEffect(() => {
    if (isActive && handLandmarkerRef.current && videoRef.current) {
      animationRef.current = requestAnimationFrame(detectHands);
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive, detectHands]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopGestureDetection();
      if (handLandmarkerRef.current) {
        handLandmarkerRef.current.close();
      }
    };
  }, [stopGestureDetection]);

  return {
    isActive,
    gestureData,
    status,
    error,
    startGestureDetection,
    stopGestureDetection,
    videoElement: videoRef.current,
  };
}

