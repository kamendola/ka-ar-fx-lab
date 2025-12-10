// Simpler video renderer - plays video in real-time while recording
import { processEffects } from './effects';

export async function renderVideoSimple({
  video,
  canvas,
  duration,
  activeEffects,
  effectParams,
  audioData,
  onProgress,
  onStatus,
  cancelRef,
}) {
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  const sourceWidth = canvas.width;
  const sourceHeight = canvas.height;
  
  console.log(`[SimpleRender] Starting: ${sourceWidth}x${sourceHeight}, ${duration}s`);
  onStatus('Setting up recorder...');
  
  // Pause video
  const wasPlaying = !video.paused;
  video.pause();
  video.currentTime = 0;
  await new Promise(resolve => {
    video.onseeked = resolve;
  });
  
  // Use 30 FPS
  const fps = 30;
  
  // Setup stream at 30 FPS
  const stream = canvas.captureStream(fps);
  
  // Setup MediaRecorder with high quality
  const mimeTypes = [
    { mime: 'video/webm;codecs=vp9', ext: 'webm', bitrate: 50000000 },
    { mime: 'video/webm;codecs=vp8', ext: 'webm', bitrate: 40000000 },
    { mime: 'video/webm', ext: 'webm', bitrate: 35000000 },
  ];
  
  let selected = null;
  for (const type of mimeTypes) {
    if (MediaRecorder.isTypeSupported(type.mime)) {
      selected = type;
      break;
    }
  }
  
  if (!selected) {
    throw new Error('WebM not supported');
  }
  
  console.log(`[SimpleRender] Using ${selected.mime} at ${fps} FPS`);
  
  const chunks = [];
  const mediaRecorder = new MediaRecorder(stream, {
    mimeType: selected.mime,
    videoBitsPerSecond: selected.bitrate,
  });
  
  mediaRecorder.ondataavailable = (event) => {
    if (event.data && event.data.size > 0) {
      chunks.push(event.data);
    }
  };
  
  const recordingFinished = new Promise((resolve) => {
    mediaRecorder.onstop = resolve;
  });
  
  // Setup render loop
  const effectState = {};
  const startTime = Date.now();
  let animationFrame = null;
  
  const renderLoop = () => {
    if (cancelRef.current || video.ended || video.currentTime >= duration) {
      return;
    }
    
    // Draw and apply effects
    ctx.clearRect(0, 0, sourceWidth, sourceHeight);
    ctx.drawImage(video, 0, 0, sourceWidth, sourceHeight);
    
    processEffects(
      ctx,
      canvas,
      activeEffects,
      effectParams,
      video.currentTime,
      audioData,
      effectState
    );
    
    // Update progress
    const progress = Math.floor((video.currentTime / duration) * 100);
    onProgress(progress);
    onStatus(`Recording: ${video.currentTime.toFixed(1)}s / ${duration.toFixed(1)}s`);
    
    animationFrame = requestAnimationFrame(renderLoop);
  };
  
  // Start recording
  mediaRecorder.start();
  console.log('[SimpleRender] Recording started');
  
  // Start render loop
  renderLoop();
  
  // Play video
  await video.play();
  console.log('[SimpleRender] Video playing');
  
  // Wait for video to finish
  await new Promise((resolve) => {
    video.onended = resolve;
    video.onerror = () => resolve();
    
    // Also check periodically
    const checkEnd = () => {
      if (cancelRef.current || video.ended || video.currentTime >= duration - 0.1) {
        resolve();
      } else {
        setTimeout(checkEnd, 100);
      }
    };
    checkEnd();
  });
  
  // Stop render loop
  if (animationFrame) {
    cancelAnimationFrame(animationFrame);
  }
  
  video.pause();
  
  if (cancelRef.current) {
    mediaRecorder.stop();
    if (wasPlaying) video.play();
    throw new Error('Cancelled');
  }
  
  console.log('[SimpleRender] Recording complete');
  onStatus('Finalizing...');
  onProgress(95);
  
  // Wait a bit for final frames
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Stop recording
  mediaRecorder.stop();
  await recordingFinished;
  
  // Restore video
  if (wasPlaying) {
    video.play();
  }
  
  // Create blob
  const blob = new Blob(chunks, { type: selected.mime });
  console.log(`[SimpleRender] Complete: ${(blob.size / 1024 / 1024).toFixed(1)} MB`);
  
  return {
    blob,
    ext: selected.ext,
    width: sourceWidth,
    height: sourceHeight,
  };
}

