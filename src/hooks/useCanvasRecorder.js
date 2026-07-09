import { useState, useRef, useCallback, useEffect } from 'react';
import { Muxer, ArrayBufferTarget } from 'mp4-muxer';

// Live canvas recorder: captures the canvas in real time (as you tweak effects,
// gestures, audio reactivity) and encodes it to an H.264 MP4 on the fly using
// WebCodecs + mp4-muxer. This is the "performance capture" counterpart to the
// deterministic offline MP4 render.
//
// Requires WebCodecs (VideoEncoder) + MediaStreamTrackProcessor (Chrome/Edge).
// Falls back to a WebM MediaRecorder if those APIs are unavailable.

function download(blob, ext) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `glitch-lab-rec-${Date.now()}.${ext}`;
  link.click();
  URL.revokeObjectURL(url);
}

const canUseWebCodecs =
  typeof window !== 'undefined' &&
  'VideoEncoder' in window &&
  'MediaStreamTrackProcessor' in window;

export function useCanvasRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0); // seconds

  // Shared
  const timerRef = useRef(null);
  const stopFnRef = useRef(null); // set to the active stop routine while recording

  const startTimer = useCallback(() => {
    setRecordingTime(0);
    const startedAt = Date.now();
    timerRef.current = setInterval(() => {
      setRecordingTime(Math.floor((Date.now() - startedAt) / 1000));
    }, 250);
  }, []);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // ---- MP4 path (WebCodecs) ----
  const startMp4 = useCallback((canvas) => {
    const width = canvas.width;
    const height = canvas.height;
    const fps = 30;

    const muxer = new Muxer({
      target: new ArrayBufferTarget(),
      video: { codec: 'avc', width, height },
      fastStart: 'in-memory',
      // Live frame timestamps don't start at 0; normalize them.
      firstTimestampBehavior: 'offset',
    });

    const encoder = new VideoEncoder({
      output: (chunk, metadata) => muxer.addVideoChunk(chunk, metadata),
      error: (e) => console.error('[Recorder] Encoder error:', e),
    });

    encoder.configure({
      codec: 'avc1.640028', // H.264 High Profile
      width,
      height,
      bitrate: 12_000_000, // ~12 Mbps
      framerate: fps,
      latencyMode: 'realtime',
    });

    const stream = canvas.captureStream(fps);
    const track = stream.getVideoTracks()[0];
    const processor = new MediaStreamTrackProcessor({ track });
    const reader = processor.readable.getReader();

    let stopped = false;
    let frameCount = 0;

    // Pump frames off the canvas stream and encode them until stopped.
    const pump = (async () => {
      try {
        while (!stopped) {
          const { value: frame, done } = await reader.read();
          if (done) break;
          if (!frame) continue;

          // Keyframe every ~1s; drop frames only if the encoder falls behind.
          if (encoder.encodeQueueSize < 4) {
            encoder.encode(frame, { keyFrame: frameCount % fps === 0 });
            frameCount++;
          }
          frame.close();
        }
      } catch (e) {
        console.error('[Recorder] Pump error:', e);
      }
    })();

    // The routine that finishes and downloads the file.
    stopFnRef.current = async () => {
      stopped = true;
      try {
        await reader.cancel();
      } catch { /* already closed */ }
      track.stop();
      await pump;

      try {
        await encoder.flush();
        encoder.close();
        muxer.finalize();
        const blob = new Blob([muxer.target.buffer], { type: 'video/mp4' });
        console.log(`[Recorder] MP4 complete: ${(blob.size / 1024 / 1024).toFixed(1)} MB, ${frameCount} frames`);
        download(blob, 'mp4');
      } catch (e) {
        console.error('[Recorder] Finalize error:', e);
        alert('Failed to finalize recording: ' + e.message);
      }

      clearTimer();
      stopFnRef.current = null;
      setIsRecording(false);
      setRecordingTime(0);
    };

    startTimer();
    setIsRecording(true);
  }, [startTimer, clearTimer]);

  // ---- WebM fallback (MediaRecorder) ----
  const startWebm = useCallback((canvas) => {
    const candidates = ['video/webm;codecs=vp9', 'video/webm;codecs=vp8', 'video/webm'];
    const mimeType = candidates.find((t) => MediaRecorder.isTypeSupported(t));
    if (!mimeType) {
      alert('Recording is not supported in this browser (try Chrome/Edge).');
      return;
    }

    const stream = canvas.captureStream(30);
    const chunks = [];
    const recorder = new MediaRecorder(stream, { mimeType, videoBitsPerSecond: 12_000_000 });

    recorder.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) chunks.push(e.data);
    };
    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'video/webm' });
      download(blob, 'webm');
      stream.getTracks().forEach((t) => t.stop());
      clearTimer();
      stopFnRef.current = null;
      setIsRecording(false);
      setRecordingTime(0);
    };

    stopFnRef.current = () => {
      if (recorder.state !== 'inactive') recorder.stop();
    };

    recorder.start(100);
    startTimer();
    setIsRecording(true);
  }, [startTimer, clearTimer]);

  const startRecording = useCallback((canvas) => {
    if (!canvas) {
      alert('Canvas not ready');
      return;
    }
    if (typeof canvas.captureStream !== 'function') {
      alert('Live recording is not supported in this browser.');
      return;
    }
    if (canUseWebCodecs) {
      startMp4(canvas);
    } else {
      startWebm(canvas);
    }
  }, [startMp4, startWebm]);

  const stopRecording = useCallback(() => {
    if (stopFnRef.current) stopFnRef.current();
  }, []);

  // Clean up if the component unmounts mid-recording
  useEffect(() => {
    return () => {
      if (stopFnRef.current) stopFnRef.current();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return { isRecording, recordingTime, startRecording, stopRecording };
}
