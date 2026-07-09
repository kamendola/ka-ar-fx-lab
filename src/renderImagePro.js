// Still-image renderer: bakes time-animated effects on a static image into an MP4.
// Mirrors renderVideoPro, but instead of seeking a video each frame it redraws the
// same image while advancing `time`, so motion effects (VHS, wave, scanlines,
// tracking overlays, glitch, etc.) animate over the chosen duration.
import { processEffects } from './effects';
import { Muxer, ArrayBufferTarget } from 'mp4-muxer';

export async function renderImagePro({
  image,
  canvas,
  duration,
  fps = 30,
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

  console.log(`[ImageRender] Starting: ${sourceWidth}x${sourceHeight}, ${duration}s @ ${fps}fps`);

  // Check WebCodecs support
  if (!('VideoEncoder' in window)) {
    throw new Error('WebCodecs not supported. Please use Chrome/Edge 94+ or enable the flag.');
  }

  if (!image) {
    throw new Error('No image loaded');
  }

  onStatus('Initializing encoder...');

  const frameTime = 1000000 / fps; // microseconds
  const totalFrames = Math.max(1, Math.floor(duration * fps));
  const effectState = {};

  console.log(`[ImageRender] Encoding ${totalFrames} frames at ${fps} FPS`);

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

  const support = await VideoEncoder.isConfigSupported(encoderConfig);
  if (!support.supported) {
    throw new Error('Video encoding configuration not supported');
  }

  onStatus(`Encoding ${sourceWidth}x${sourceHeight} at ${fps} FPS...`);

  let frameCounter = 0;

  const encoder = new VideoEncoder({
    output: (chunk, metadata) => {
      muxer.addVideoChunk(chunk, metadata);
    },
    error: (error) => {
      console.error('[ImageRender] Encoder error:', error);
    },
  });

  encoder.configure(encoderConfig);

  // Render all frames
  for (let frameIndex = 0; frameIndex < totalFrames; frameIndex++) {
    if (cancelRef.current) {
      encoder.close();
      throw new Error('Cancelled');
    }

    // Time in seconds — this is what drives the animation of every effect
    const currentTime = frameIndex / fps;

    // Redraw the still image, then apply time-animated effects on top
    ctx.clearRect(0, 0, sourceWidth, sourceHeight);
    ctx.drawImage(image, 0, 0, sourceWidth, sourceHeight);

    processEffects(
      ctx,
      canvas,
      activeEffects,
      effectParams,
      currentTime,
      audioData,
      effectState
    );

    const frame = new VideoFrame(canvas, {
      timestamp: frameIndex * frameTime,
      duration: frameTime,
    });

    const keyFrame = frameIndex % fps === 0; // Keyframe every second
    encoder.encode(frame, { keyFrame });
    frame.close();

    frameCounter++;

    const progress = Math.floor((frameIndex / totalFrames) * 90);
    onProgress(progress);

    if (frameIndex % 10 === 0) {
      onStatus(`Encoding frame ${frameIndex + 1}/${totalFrames}`);
      // Yield so the UI can update
      await new Promise((resolve) => setTimeout(resolve, 0));
    }
  }

  console.log(`[ImageRender] Encoded ${frameCounter} frames, finalizing...`);
  onStatus('Finalizing video...');
  onProgress(95);

  await encoder.flush();
  encoder.close();
  muxer.finalize();

  const buffer = muxer.target.buffer;
  const blob = new Blob([buffer], { type: 'video/mp4' });

  console.log(`[ImageRender] Complete: ${(blob.size / 1024 / 1024).toFixed(1)} MB, ${duration}s at ${fps} FPS`);

  return {
    blob,
    ext: 'mp4',
    width: sourceWidth,
    height: sourceHeight,
  };
}
