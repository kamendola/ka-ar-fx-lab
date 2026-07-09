import styles from './Controls.module.css';

export function Controls({
  media,
  mediaType,
  isPlaying,
  isRendering,
  renderProgress,
  onFileSelect,
  onTogglePlayback,
  onExport,
  onRenderVideo,
  onCancelRender,
  onReset,
  imageDuration,
  onImageDurationChange,
  isRecording,
  recordingTime,
  onToggleRecord,
}) {
  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = String(s % 60).padStart(2, '0');
    return `${m}:${sec}`;
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles.controls}>
      <div
        className={styles.uploadArea}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <input
          type="file"
          accept="image/*,video/*"
          onChange={handleFileChange}
          className={styles.fileInput}
          id="file-upload"
        />
        <label htmlFor="file-upload" className={styles.uploadBtn}>
          UPLOAD
        </label>
      </div>

      {media && (
        <>
          {mediaType === 'video' && (
            <button
              className={styles.controlBtn}
              onClick={onTogglePlayback}
              disabled={isRendering || isRecording}
            >
              {isPlaying ? 'PAUSE' : 'PLAY'}
            </button>
          )}

          <button
            className={styles.controlBtn}
            onClick={onExport}
            disabled={isRendering || isRecording}
          >
            IMAGE
          </button>

          {mediaType === 'image' && !isRendering && !isRecording && (
            <select
              className={styles.durationSelect}
              value={imageDuration}
              onChange={(e) => onImageDurationChange(Number(e.target.value))}
              title="Length of the rendered clip"
            >
              <option value={3}>3S</option>
              <option value={5}>5S</option>
              <option value={8}>8S</option>
              <option value={10}>10S</option>
              <option value={15}>15S</option>
            </select>
          )}

          <button
            className={`${styles.controlBtn} ${isRendering ? styles.rendering : ''}`}
            onClick={isRendering ? onCancelRender : onRenderVideo}
            disabled={isRecording}
            title={isRendering ? 'Cancel render' : 'Render an MP4 with effects'}
          >
            {isRendering ? `STOP ${renderProgress}%` : 'RENDER'}
          </button>

          <button
            className={`${styles.controlBtn} ${styles.recordBtn} ${isRecording ? styles.recording : ''}`}
            onClick={onToggleRecord}
            disabled={isRendering}
            title={isRecording ? 'Stop recording' : 'Record the canvas live (MP4)'}
          >
            <span className={styles.recDot} />
            {isRecording ? `REC ${formatTime(recordingTime)}` : 'REC'}
          </button>

          <button
            className={`${styles.controlBtn} ${styles.danger}`}
            onClick={onReset}
            disabled={isRendering || isRecording}
          >
            RESET
          </button>
        </>
      )}
    </div>
  );
}
