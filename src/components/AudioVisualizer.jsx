import { useEffect, useRef } from 'react';
import styles from './AudioVisualizer.module.css';

export function AudioVisualizer({ audioData, isListening, onToggle, error, status }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // Background
    ctx.fillStyle = 'rgba(10, 10, 15, 0.9)';
    ctx.fillRect(0, 0, width, height);

    if (isListening && audioData) {
      // Draw frequency bars
      const barWidth = width / 64;
      const frequencyData = audioData.frequency;

      for (let i = 0; i < 64; i++) {
        const value = frequencyData[i] || 0;
        const barHeight = (value / 255) * height * 0.8;
        const x = i * barWidth;
        const y = height - barHeight;

        // Gradient based on frequency
        const hue = 180 + (i / 64) * 60; // cyan to magenta
        ctx.fillStyle = `hsla(${hue}, 100%, 60%, 0.8)`;
        ctx.fillRect(x, y, barWidth - 1, barHeight);

        // Glow effect
        ctx.shadowColor = `hsla(${hue}, 100%, 60%, 0.5)`;
        ctx.shadowBlur = 10;
      }

      // Draw level meters
      const levels = [
        { label: 'BASS', value: audioData.bass, color: '#ff3366' },
        { label: 'MID', value: audioData.mid, color: '#00ff88' },
        { label: 'HIGH', value: audioData.high, color: '#00ffff' },
      ];

      ctx.shadowBlur = 0;
      ctx.font = '10px "JetBrains Mono"';
      ctx.textAlign = 'left';

      levels.forEach((level, index) => {
        const y = 15 + index * 18;
        const barWidth = 80;
        const barX = 50;

        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.fillText(level.label, 8, y + 4);

        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.fillRect(barX, y - 6, barWidth, 10);

        ctx.fillStyle = level.color;
        ctx.fillRect(barX, y - 6, barWidth * level.value, 10);
      });
    } else if (status === 'requesting') {
      ctx.fillStyle = 'rgba(255, 255, 0, 0.5)';
      ctx.font = '11px "Orbitron"';
      ctx.textAlign = 'center';
      ctx.fillText('REQUESTING ACCESS...', width / 2, height / 2 - 8);
      ctx.font = '9px "JetBrains Mono"';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.fillText('Allow microphone in browser', width / 2, height / 2 + 10);
    } else {
      // Idle state visualization
      ctx.fillStyle = 'rgba(0, 255, 255, 0.3)';
      ctx.font = '11px "Orbitron"';
      ctx.textAlign = 'center';
      ctx.fillText('CLICK START', width / 2, height / 2 - 8);
      ctx.font = '9px "JetBrains Mono"';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.fillText('to enable audio reactive', width / 2, height / 2 + 10);
    }
  }, [audioData, isListening, status]);

  const getButtonText = () => {
    if (status === 'requesting') return '...';
    if (isListening) return 'STOP';
    return 'START';
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        AUDIO REACTIVE
        <button
          className={`${styles.toggleBtn} ${isListening ? styles.active : ''} ${status === 'requesting' ? styles.requesting : ''}`}
          onClick={onToggle}
          disabled={status === 'requesting'}
        >
          {getButtonText()}
        </button>
      </div>
      
      {error && (
        <div className={styles.error}>
          <span className={styles.errorIcon}>⚠</span>
          {error}
        </div>
      )}
      
      <canvas
        ref={canvasRef}
        width={280}
        height={100}
        className={styles.canvas}
      />
      {isListening && (
        <div className={styles.meters}>
          <div className={styles.meter}>
            <span className={styles.meterLabel}>BASS</span>
            <div className={styles.meterBar}>
              <div
                className={styles.meterFill}
                style={{
                  width: `${(audioData?.bass || 0) * 100}%`,
                  background: 'var(--accent-red)',
                }}
              />
            </div>
          </div>
          <div className={styles.meter}>
            <span className={styles.meterLabel}>MID</span>
            <div className={styles.meterBar}>
              <div
                className={styles.meterFill}
                style={{
                  width: `${(audioData?.mid || 0) * 100}%`,
                  background: 'var(--accent-green)',
                }}
              />
            </div>
          </div>
          <div className={styles.meter}>
            <span className={styles.meterLabel}>HIGH</span>
            <div className={styles.meterBar}>
              <div
                className={styles.meterFill}
                style={{
                  width: `${(audioData?.high || 0) * 100}%`,
                  background: 'var(--accent-cyan)',
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

