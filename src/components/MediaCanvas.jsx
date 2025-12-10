import { useRef, useEffect, useCallback } from 'react';
import { processEffects } from '../effects';
import styles from './MediaCanvas.module.css';

export function MediaCanvas({
  media,
  mediaType,
  videoRef,
  imageRef,
  activeEffects,
  effectParams,
  audioData,
  isPlaying,
  onCanvasReady,
  onFpsUpdate,
}) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const effectStateRef = useRef({});
  const startTimeRef = useRef(Date.now());
  const frameCountRef = useRef(0);
  const lastRenderTimeRef = useRef(0);
  const fpsCounterRef = useRef({ frames: 0, lastTime: Date.now(), fps: 0 });

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const source = mediaType === 'video' ? videoRef.current : imageRef.current;

    if (!source) {
      animationRef.current = requestAnimationFrame(render);
      return;
    }

    // Performance optimization: throttle rendering based on canvas size and effects
    const effectCount = activeEffects.length;
    const now = performance.now();
    const canvasPixels = canvas.width * canvas.height;
    const isLargeCanvas = canvasPixels > 1280 * 720; // HD or larger
    
    // Throttle by time for smooth performance
    let minFrameTime = 16; // ~60fps default
    
    if (isLargeCanvas) {
      // For full resolution (HD+), reduce framerate
      if (effectCount >= 3) {
        minFrameTime = 50; // ~20fps with many effects
      } else if (effectCount >= 1) {
        minFrameTime = 33; // ~30fps with some effects
      } else {
        minFrameTime = 25; // ~40fps no effects
      }
    } else {
      // For smaller canvas, more responsive
      if (effectCount >= 5) {
        minFrameTime = 33; // ~30fps
      } else if (effectCount >= 3) {
        minFrameTime = 25; // ~40fps
      }
    }
    
    if (now - lastRenderTimeRef.current < minFrameTime) {
      animationRef.current = requestAnimationFrame(render);
      return;
    }
    lastRenderTimeRef.current = now;

    // Draw source media
    ctx.drawImage(source, 0, 0, canvas.width, canvas.height);

    // Apply effects
    const time = (Date.now() - startTimeRef.current) / 1000;
    processEffects(
      ctx,
      canvas,
      activeEffects,
      effectParams,
      time,
      audioData,
      effectStateRef.current
    );

    // Calculate FPS
    const fpsCounter = fpsCounterRef.current;
    fpsCounter.frames++;
    const fpsNow = Date.now();
    if (fpsNow - fpsCounter.lastTime >= 1000) {
      fpsCounter.fps = Math.round((fpsCounter.frames * 1000) / (fpsNow - fpsCounter.lastTime));
      fpsCounter.frames = 0;
      fpsCounter.lastTime = fpsNow;
      
      // Report FPS to parent
      if (onFpsUpdate) {
        onFpsUpdate(fpsCounter.fps);
      }
    }

    animationRef.current = requestAnimationFrame(render);
  }, [mediaType, videoRef, imageRef, activeEffects, effectParams, audioData]);

  useEffect(() => {
    if (media && canvasRef.current) {
      const canvas = canvasRef.current;
      const source = mediaType === 'video' ? videoRef.current : imageRef.current;

      if (source) {
        const setCanvasSize = () => {
          const sourceWidth = source.videoWidth || source.naturalWidth || 640;
          const sourceHeight = source.videoHeight || source.naturalHeight || 480;

          // Set canvas to ORIGINAL resolution for high-quality export
          canvas.width = sourceWidth;
          canvas.height = sourceHeight;

          // Calculate display size for CSS
          const maxWidth = window.innerWidth * 0.55;
          const maxHeight = window.innerHeight * 0.7;

          let displayWidth = sourceWidth;
          let displayHeight = sourceHeight;

          if (displayWidth > maxWidth) {
            const ratio = maxWidth / displayWidth;
            displayWidth = maxWidth;
            displayHeight = displayHeight * ratio;
          }
          if (displayHeight > maxHeight) {
            const ratio = maxHeight / displayHeight;
            displayHeight = maxHeight;
            displayWidth = displayWidth * ratio;
          }

          // Apply CSS size for visual scaling (doesn't affect canvas resolution)
          canvas.style.width = displayWidth + 'px';
          canvas.style.height = displayHeight + 'px';

          if (onCanvasReady) {
            onCanvasReady(canvas, sourceWidth, sourceHeight);
          }
        };

        if (mediaType === 'video') {
          source.addEventListener('loadedmetadata', setCanvasSize);
        } else {
          source.addEventListener('load', setCanvasSize);
        }

        return () => {
          if (mediaType === 'video') {
            source.removeEventListener('loadedmetadata', setCanvasSize);
          } else {
            source.removeEventListener('load', setCanvasSize);
          }
        };
      }
    }
  }, [media, mediaType, videoRef, imageRef, onCanvasReady]);

  useEffect(() => {
    startTimeRef.current = Date.now();
    animationRef.current = requestAnimationFrame(render);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [render]);

  return (
    <div className={styles.canvasContainer}>
      <canvas ref={canvasRef} className={styles.canvas} />

      {/* Hidden video/image elements */}
      {media && mediaType === 'video' && (
        <video
          ref={videoRef}
          src={media}
          className={styles.hiddenMedia}
          autoPlay
          loop
          muted
          playsInline
        />
      )}
      {media && mediaType === 'image' && (
        <img
          ref={imageRef}
          src={media}
          alt="Source"
          className={styles.hiddenMedia}
        />
      )}

      {!media && (
        <div className={styles.placeholder}>
          <div className={styles.placeholderText}>DROP MEDIA HERE</div>
          <div className={styles.placeholderSubtext}>or click upload</div>
        </div>
      )}
    </div>
  );
}

