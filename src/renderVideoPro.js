// Professional video renderer using WebCodecs API for precise control
import { processEffects } from './effects';
import { Muxer, ArrayBufferTarget } from 'mp4-muxer';

export async function renderVideoPro({
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
  
  console.log(`[ProRender] Starting: ${sourceWidth}x${sourceHeight}, ${duration}s`);
  
  // Check WebCodecs support
  if (!('VideoEncoder' in window)) {
    throw new Error('WebCodecs not supported. Please use Chrome/Edge 94+ or enable the flag.');
  }
  
  onStatus('Initializing encoder...');
  
  // Pause video
  const wasPlaying = !video.paused;
  video.pause();
  video.currentTime = 0;
  await new Promise(resolve => {
    video.onseeked = resolve;
  });
  
  // Settings
  const fps = 30;
  const frameTime = 1000000 / fps; // microseconds
  const totalFrames = Math.floor(duration * fps);
  const effectState = {};
  
  console.log(`[ProRender] Encoding ${totalFrames} frames at ${fps} FPS`);
  
  // Create MP4 muxer
  const muxer = new Muxer({
    target: new ArrayBufferTarget(),
    video: {
      codec: 'avc',
      width: sourceWidth,
      height: sourceHeight,
    },
    fastStart: 'in-memory',
  });
  
  // Configure video encoder
  const encoderConfig = {
    codec: 'avc1.640028', // H.264 High Profile
    width: sourceWidth,
    height: sourceHeight,
    bitrate: 20_000_000, // 20 Mbps
    framerate: fps,
    latencyMode: 'quality',
  };
  
  // Check if config is supported
  const support = await VideoEncoder.isConfigSupported(encoderConfig);
  if (!support.supported) {
    throw new Error('Video encoding configuration not supported');
  }
  
  console.log('[ProRender] Encoder config supported:', encoderConfig.codec);
  onStatus(`Encoding ${sourceWidth}x${sourceHeight} at ${fps} FPS...`);
  
  let frameCounter = 0;
  
  // Create encoder
  const encoder = new VideoEncoder({
    output: (chunk, metadata) => {
      muxer.addVideoChunk(chunk, metadata);
    },
    error: (error) => {
      console.error('[ProRender] Encoder error:', error);
    },
  });
  
  encoder.configure(encoderConfig);
  
  // Render all frames
  for (let frameIndex = 0; frameIndex < totalFrames; frameIndex++) {
    if (cancelRef.current) {
      encoder.close();
      if (wasPlaying) video.play();
      throw new Error('Cancelled');
    }
    
    // Calculate frame time
    const currentTime = frameIndex / fps;
    
    // Seek to frame
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
    
    // Create VideoFrame from canvas (more reliable than ImageData)
    const frame = new VideoFrame(canvas, {
      timestamp: frameIndex * frameTime,
      duration: frameTime,
    });
    
    // Encode frame
    const keyFrame = frameIndex % 30 === 0; // Keyframe every second
    encoder.encode(frame, { keyFrame });
    
    // Clean up frame
    frame.close();
    
    frameCounter++;
    
    // Update progress
    const progress = Math.floor((frameIndex / totalFrames) * 90);
    onProgress(progress);
    
    if (frameIndex % 10 === 0) {
      onStatus(`Encoding frame ${frameIndex + 1}/${totalFrames}`);
      // Allow UI to update
      await new Promise(resolve => setTimeout(resolve, 0));
    }
  }
  
  console.log(`[ProRender] Encoded ${frameCounter} frames, finalizing...`);
  onStatus('Finalizing video...');
  onProgress(95);
  
  // Flush encoder
  await encoder.flush();
  encoder.close();
  
  // Finalize muxer
  muxer.finalize();
  
  // Get the video data
  const buffer = muxer.target.buffer;
  const blob = new Blob([buffer], { type: 'video/mp4' });
  
  console.log(`[ProRender] Complete: ${(blob.size / 1024 / 1024).toFixed(1)} MB, ${duration}s at ${fps} FPS`);
  
  // Restore video
  if (wasPlaying) {
    video.play();
  }
  
  return {
    blob,
    ext: 'mp4',
    width: sourceWidth,
    height: sourceHeight,
  };
}

