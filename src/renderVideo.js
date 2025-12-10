// Frame-by-frame video renderer for high-quality exports
import { processEffects } from './effects';

export async function renderVideoFrameByFrame({
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
  
  console.log(`[FrameRender] Starting: ${sourceWidth}x${sourceHeight}, ${duration}s`);
  onStatus('Preparing render...');
  
  // Pause video
  const wasPlaying = !video.paused;
  video.pause();
  
  // Reset to start
  video.currentTime = 0;
  await new Promise(resolve => {
    video.onseeked = resolve;
  });
  
  // Use 30 FPS as standard (browsers don't expose source FPS reliably)
  const fps = 30;
  const frameTime = 1 / fps;
  const totalFrames = Math.floor(duration * fps); // Use floor to avoid extra frames
  const effectState = {};
  
  console.log(`[FrameRender] Rendering ${totalFrames} frames at ${fps} FPS for ${duration}s video`);
  onStatus(`Rendering ${totalFrames} frames...`);
  
  // Setup stream - we'll render frames as fast as possible
  // MediaRecorder will encode at specified FPS regardless of capture speed
  const stream = canvas.captureStream(0); // 0 = we control frame timing
  const track = stream.getVideoTracks()[0];
  
  // Setup MediaRecorder with highest quality - prioritize MP4, fallback to WebM
  const mimeTypes = [
    { mime: 'video/mp4;codecs=avc1.640028', ext: 'mp4', bitrate: 50000000 },  // 50 Mbps H.264 High Profile
    { mime: 'video/mp4;codecs=avc1', ext: 'mp4', bitrate: 45000000 },         // 45 Mbps H.264
    { mime: 'video/webm;codecs=h264', ext: 'mp4', bitrate: 45000000 },        // 45 Mbps H.264 in WebM container
    { mime: 'video/mp4', ext: 'mp4', bitrate: 40000000 },                      // 40 Mbps MP4
    { mime: 'video/webm;codecs=vp9', ext: 'webm', bitrate: 50000000 },        // 50 Mbps VP9 (fallback)
    { mime: 'video/webm;codecs=vp8', ext: 'webm', bitrate: 40000000 },        // 40 Mbps VP8
    { mime: 'video/webm', ext: 'webm', bitrate: 35000000 },                    // 35 Mbps WebM
  ];
  
  let selected = null;
  for (const type of mimeTypes) {
    if (MediaRecorder.isTypeSupported(type.mime)) {
      selected = type;
      break;
    }
  }
  
  if (!selected) {
    throw new Error('No video codec supported in this browser');
  }
  
  const format = selected.ext.toUpperCase();
  console.log(`[FrameRender] Using ${selected.mime} (${format}) at ${selected.bitrate / 1000000} Mbps`);
  onStatus(`Encoding ${format} at ${selected.bitrate / 1000000} Mbps...`);
  
  const chunks = [];
  
  // Create a MediaStream with fixed framerate using MozCaptureStream if available
  // This ensures proper timing in the encoded video
  let recordStream = stream;
  if (canvas.mozCaptureStream) {
    recordStream = canvas.mozCaptureStream(fps);
  }
  
  const mediaRecorder = new MediaRecorder(recordStream, {
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
  
  // Start recording - we'll feed it exactly totalFrames frames
  mediaRecorder.start();
  
  // Render each frame
  let frameIndex = 0;
  
  while (frameIndex < totalFrames && !cancelRef.current) {
    // Calculate exact time for this frame
    const currentTime = (frameIndex / fps);
    
    // Don't go beyond video duration
    if (currentTime >= duration) break;
    
    // Seek to exact frame time
    video.currentTime = Math.min(currentTime, duration - 0.001);
    await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error('Seek timeout')), 5000);
      video.onseeked = () => {
        clearTimeout(timeout);
        resolve();
      };
    });
    
    // Draw and apply effects
    ctx.clearRect(0, 0, sourceWidth, sourceHeight);
    ctx.drawImage(video, 0, 0, sourceWidth, sourceHeight);
    
    processEffects(
      ctx,
      canvas,
      activeEffects,
      effectParams,
      currentTime,
      audioData,
      effectState
    );
    
    // Request frame capture - this adds it to the video stream
    if (track.requestFrame) {
      track.requestFrame();
    }
    
    // Small delay to prevent browser from freezing
    if (frameIndex % 5 === 0) {
      await new Promise(resolve => setTimeout(resolve, 0));
    }
    
    frameIndex++;
    const progress = Math.floor((frameIndex / totalFrames) * 100);
    onProgress(progress);
    
    // Update status every 10 frames
    if (frameIndex % 10 === 0) {
      onStatus(`Rendering frame ${frameIndex}/${totalFrames}`);
    }
  }
  
  console.log(`[FrameRender] Rendered ${frameIndex} frames, encoding at ${fps} FPS for ${duration}s duration`);
  
  if (cancelRef.current) {
    mediaRecorder.stop();
    if (wasPlaying) video.play();
    throw new Error('Cancelled');
  }
  
  console.log(`[FrameRender] Rendered ${frameIndex} frames`);
  onStatus('Encoding video...');
  onProgress(90);
  
  // Add a small delay to ensure all frames are captured
  await new Promise(resolve => setTimeout(resolve, 500));
  
  onProgress(95);
  
  // Stop recording and wait
  mediaRecorder.stop();
  await recordingFinished;
  
  console.log(`[FrameRender] Encoding complete. Expected duration: ${duration}s at ${fps} FPS`);
  
  // Restore video
  if (wasPlaying) {
    video.play();
  }
  
  // Create blob and download
  const blob = new Blob(chunks, { type: selected.mime });
  console.log(`[FrameRender] Complete: ${(blob.size / 1024 / 1024).toFixed(1)} MB`);
  
  return {
    blob,
    ext: selected.ext,
    width: sourceWidth,
    height: sourceHeight,
  };
}

