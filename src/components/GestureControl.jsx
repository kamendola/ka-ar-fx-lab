import { useEffect, useRef } from 'react';
import styles from './GestureControl.module.css';

export function GestureControl({ 
  gestureData, 
  isActive, 
  status, 
  error, 
  onToggle,
  mappings,
  onMappingChange 
}) {
  const canvasRef = useRef(null);

  // Draw hand visualization
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !gestureData?.hands) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Clear
    ctx.clearRect(0, 0, width, height);

    // Draw each hand
    gestureData.hands.forEach((hand, handIndex) => {
      const color = handIndex === 0 ? '#00ff88' : '#00ccff';
      
      // Draw connections
      const connections = [
        [0, 1], [1, 2], [2, 3], [3, 4], // Thumb
        [0, 5], [5, 6], [6, 7], [7, 8], // Index
        [0, 9], [9, 10], [10, 11], [11, 12], // Middle
        [0, 13], [13, 14], [14, 15], [15, 16], // Ring
        [0, 17], [17, 18], [18, 19], [19, 20], // Pinky
        [5, 9], [9, 13], [13, 17] // Palm
      ];

      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.globalAlpha = 0.6;

      connections.forEach(([i, j]) => {
        const p1 = hand.landmarks[i];
        const p2 = hand.landmarks[j];
        ctx.beginPath();
        ctx.moveTo((1 - p1.x) * width, p1.y * height);
        ctx.lineTo((1 - p2.x) * width, p2.y * height);
        ctx.stroke();
      });

      // Draw landmarks
      ctx.globalAlpha = 1;
      hand.landmarks.forEach((point, i) => {
        const x = (1 - point.x) * width;
        const y = point.y * height;
        const radius = [0, 4, 8, 12, 16, 20].includes(i) ? 6 : 4;
        
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = i === 8 || i === 4 ? '#ffffff' : color;
        ctx.fill();
      });

      // Draw pinch indicator
      if (hand.isPinching) {
        const thumbTip = hand.landmarks[4];
        const indexTip = hand.landmarks[8];
        const midX = (1 - (thumbTip.x + indexTip.x) / 2) * width;
        const midY = ((thumbTip.y + indexTip.y) / 2) * height;
        
        ctx.beginPath();
        ctx.arc(midX, midY, 15, 0, Math.PI * 2);
        ctx.strokeStyle = '#ffff00';
        ctx.lineWidth = 3;
        ctx.stroke();
      }
    });
  }, [gestureData]);

  const getStatusText = () => {
    if (error) return error;
    switch (status) {
      case 'loading': return 'LOADING MODEL...';
      case 'ready': return isActive ? 'TRACKING' : 'READY';
      case 'error': return 'ERROR';
      default: return 'GESTURE CONTROL';
    }
  };

  const getStatusClass = () => {
    if (error) return styles.statusError;
    if (isActive && gestureData?.handCount > 0) return styles.statusActive;
    if (status === 'loading') return styles.statusLoading;
    return '';
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={`${styles.status} ${getStatusClass()}`}>
          {getStatusText()}
        </span>
        <button 
          className={`${styles.toggleBtn} ${isActive ? styles.active : ''}`}
          onClick={onToggle}
          disabled={status === 'loading'}
        >
          {isActive ? 'STOP' : 'START'}
        </button>
      </div>

      {isActive && (
        <>
          <div className={styles.preview}>
            <canvas 
              ref={canvasRef} 
              width={200} 
              height={150}
              className={styles.canvas}
            />
            {(!gestureData || gestureData.handCount === 0) && (
              <div className={styles.noHands}>
                <span>HAND</span>
                <span>Show your hand</span>
              </div>
            )}
          </div>

          {gestureData && gestureData.handCount > 0 && (
            <div className={styles.dataGrid}>
              <div className={styles.dataItem}>
                <span className={styles.dataLabel}>X</span>
                <div className={styles.dataBar}>
                  <div 
                    className={styles.dataFill} 
                    style={{ width: `${gestureData.x * 100}%` }}
                  />
                </div>
                <span className={styles.dataValue}>{Math.round(gestureData.x * 100)}</span>
              </div>
              <div className={styles.dataItem}>
                <span className={styles.dataLabel}>Y</span>
                <div className={styles.dataBar}>
                  <div 
                    className={styles.dataFill} 
                    style={{ width: `${gestureData.y * 100}%` }}
                  />
                </div>
                <span className={styles.dataValue}>{Math.round(gestureData.y * 100)}</span>
              </div>
              <div className={styles.dataItem}>
                <span className={styles.dataLabel}>PINCH</span>
                <div className={styles.dataBar}>
                  <div 
                    className={`${styles.dataFill} ${styles.pinch}`}
                    style={{ width: `${gestureData.pinch * 100}%` }}
                  />
                </div>
                <span className={styles.dataValue}>{Math.round(gestureData.pinch * 100)}</span>
              </div>
              <div className={styles.dataItem}>
                <span className={styles.dataLabel}>FINGERS</span>
                <div className={styles.fingerDots}>
                  {[1, 2, 3, 4, 5].map(n => (
                    <span 
                      key={n} 
                      className={`${styles.fingerDot} ${n <= gestureData.fingers ? styles.active : ''}`}
                    />
                  ))}
                </div>
                <span className={styles.dataValue}>{gestureData.fingers}</span>
              </div>
            </div>
          )}

          <div className={styles.mappings}>
            <div className={styles.mappingHeader}>CONTROL MAPPINGS</div>
            <div className={styles.mappingItem}>
              <span className={styles.mappingLabel}>Hand X →</span>
              <select 
                value={mappings?.x || 'intensity'} 
                onChange={(e) => onMappingChange?.('x', e.target.value)}
                className={styles.mappingSelect}
              >
                <option value="intensity">Intensity</option>
                <option value="param1">Param 1</option>
                <option value="param2">Param 2</option>
                <option value="none">None</option>
              </select>
            </div>
            <div className={styles.mappingItem}>
              <span className={styles.mappingLabel}>Hand Y →</span>
              <select 
                value={mappings?.y || 'param1'} 
                onChange={(e) => onMappingChange?.('y', e.target.value)}
                className={styles.mappingSelect}
              >
                <option value="intensity">Intensity</option>
                <option value="param1">Param 1</option>
                <option value="param2">Param 2</option>
                <option value="none">None</option>
              </select>
            </div>
            <div className={styles.mappingItem}>
              <span className={styles.mappingLabel}>Pinch →</span>
              <select 
                value={mappings?.pinch || 'param2'} 
                onChange={(e) => onMappingChange?.('pinch', e.target.value)}
                className={styles.mappingSelect}
              >
                <option value="intensity">Intensity</option>
                <option value="param1">Param 1</option>
                <option value="param2">Param 2</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

