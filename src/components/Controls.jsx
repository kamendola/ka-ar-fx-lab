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
}) {
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
              disabled={isRendering}
            >
              {isPlaying ? 'PAUSE' : 'PLAY'}
            </button>
          )}

          <button 
            className={styles.controlBtn} 
            onClick={onExport}
            disabled={isRendering}
          >
            IMAGE
          </button>

          {mediaType === 'video' && (
            <button 
              className={`${styles.controlBtn} ${isRendering ? styles.rendering : ''}`} 
              onClick={isRendering ? onCancelRender : onRenderVideo}
              title={isRendering ? 'Cancel render' : 'Render video with effects'}
            >
              {isRendering ? `STOP ${renderProgress}%` : 'RENDER'}
            </button>
          )}

          <button
            className={`${styles.controlBtn} ${styles.danger}`}
            onClick={onReset}
            disabled={isRendering}
          >
            RESET
          </button>
        </>
      )}
    </div>
  );
}
