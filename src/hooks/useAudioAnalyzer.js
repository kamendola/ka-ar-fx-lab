import { useState, useRef, useCallback, useEffect } from 'react';

export function useAudioAnalyzer() {
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle'); // idle, requesting, active, error
  const [audioData, setAudioData] = useState({
    bass: 0,
    mid: 0,
    high: 0,
    overall: 0,
    waveform: new Uint8Array(128),
    frequency: new Uint8Array(128),
  });

  const audioContextRef = useRef(null);
  const analyzerRef = useRef(null);
  const sourceRef = useRef(null);
  const streamRef = useRef(null);
  const animationRef = useRef(null);

  const analyze = useCallback(() => {
    if (!analyzerRef.current) return;

    const bufferLength = analyzerRef.current.frequencyBinCount;
    const frequencyData = new Uint8Array(bufferLength);
    const waveformData = new Uint8Array(bufferLength);

    analyzerRef.current.getByteFrequencyData(frequencyData);
    analyzerRef.current.getByteTimeDomainData(waveformData);

    // Calculate frequency bands
    const bassEnd = Math.floor(bufferLength * 0.1);
    const midEnd = Math.floor(bufferLength * 0.5);

    let bassSum = 0;
    let midSum = 0;
    let highSum = 0;

    for (let i = 0; i < bassEnd; i++) {
      bassSum += frequencyData[i];
    }
    for (let i = bassEnd; i < midEnd; i++) {
      midSum += frequencyData[i];
    }
    for (let i = midEnd; i < bufferLength; i++) {
      highSum += frequencyData[i];
    }

    const bass = bassSum / bassEnd / 255;
    const mid = midSum / (midEnd - bassEnd) / 255;
    const high = highSum / (bufferLength - midEnd) / 255;
    const overall = (bass + mid + high) / 3;

    setAudioData({
      bass,
      mid,
      high,
      overall,
      waveform: waveformData,
      frequency: frequencyData,
    });

    animationRef.current = requestAnimationFrame(analyze);
  }, []);

  const startListening = useCallback(async () => {
    setError(null);
    setStatus('requesting');
    
    // Check if getUserMedia is supported
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setError('Your browser does not support audio input');
      setStatus('error');
      return;
    }

    try {
      console.log('Requesting microphone access...');
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false,
        } 
      });
      
      console.log('Microphone access granted!');
      streamRef.current = stream;

      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      
      // Resume audio context if suspended (required by some browsers)
      if (audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume();
      }
      
      analyzerRef.current = audioContextRef.current.createAnalyser();
      analyzerRef.current.fftSize = 256;
      analyzerRef.current.smoothingTimeConstant = 0.8;

      sourceRef.current = audioContextRef.current.createMediaStreamSource(stream);
      sourceRef.current.connect(analyzerRef.current);

      setIsListening(true);
      setStatus('active');
      console.log('Audio analyzer started!');
      analyze();
    } catch (err) {
      console.error('Error accessing microphone:', err);
      
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setError('Microphone access denied. Please allow access in your browser.');
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        setError('No microphone found. Please connect a microphone.');
      } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
        setError('Microphone is in use by another application.');
      } else {
        setError(`Error: ${err.message || 'Could not access microphone'}`);
      }
      
      setStatus('error');
      setIsListening(false);
    }
  }, [analyze]);

  const stopListening = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
    setIsListening(false);
    setAudioData({
      bass: 0,
      mid: 0,
      high: 0,
      overall: 0,
      waveform: new Uint8Array(128),
      frequency: new Uint8Array(128),
    });
  }, []);

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return {
    isListening,
    audioData,
    startListening,
    stopListening,
    error,
    status,
  };
}

