import { useState, useEffect } from 'react';
import { EFFECTS } from '../effects';
import styles from './EffectsPanel.module.css';

export function EffectsPanel({
  activeEffects,
  effectParams,
  onToggleEffect,
  onParamChange,
  onReorderEffects,
}) {
  // Store the order of all effects (persists reordering)
  const [effectOrder, setEffectOrder] = useState(() => Object.keys(EFFECTS));
  const [draggedEffect, setDraggedEffect] = useState(null);
  const [dragOverEffect, setDragOverEffect] = useState(null);

  // Update active effects order when list is reordered
  useEffect(() => {
    if (onReorderEffects && activeEffects.length > 0) {
      // Reorder activeEffects based on new effectOrder
      const newActiveOrder = effectOrder.filter(id => activeEffects.includes(id));
      if (JSON.stringify(newActiveOrder) !== JSON.stringify(activeEffects)) {
        onReorderEffects(newActiveOrder);
      }
    }
  }, [effectOrder, activeEffects, onReorderEffects]);

  const handleDragStart = (e, effectId) => {
    setDraggedEffect(effectId);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', effectId);
  };

  const handleDragEnd = () => {
    setDraggedEffect(null);
    setDragOverEffect(null);
  };

  const handleDragOver = (e, effectId) => {
    e.preventDefault();
    if (effectId !== draggedEffect && draggedEffect) {
      setDragOverEffect(effectId);
    }
  };

  const handleDragLeave = () => {
    setDragOverEffect(null);
  };

  const handleDrop = (e, targetEffectId) => {
    e.preventDefault();
    
    if (!draggedEffect || draggedEffect === targetEffectId) {
      setDraggedEffect(null);
      setDragOverEffect(null);
      return;
    }

    const newOrder = [...effectOrder];
    const draggedIndex = newOrder.indexOf(draggedEffect);
    const targetIndex = newOrder.indexOf(targetEffectId);

    if (draggedIndex === -1 || targetIndex === -1) {
      setDraggedEffect(null);
      setDragOverEffect(null);
      return;
    }

    // Remove and insert at new position
    newOrder.splice(draggedIndex, 1);
    newOrder.splice(targetIndex, 0, draggedEffect);

    setEffectOrder(newOrder);
    setDraggedEffect(null);
    setDragOverEffect(null);
  };

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        EFFECTS
      </div>

      <div className={styles.effectsGrid}>
        {effectOrder.map((id) => {
          const effect = EFFECTS[id];
          if (!effect) return null;
          
          const isActive = activeEffects.includes(id);
          const params = effectParams[id] || {};
          const isDragging = draggedEffect === id;
          const isDragOver = dragOverEffect === id;

          return (
            <div
              key={id}
              className={`${styles.effectCard} ${isActive ? styles.active : ''} ${isDragging ? styles.dragging : ''} ${isDragOver ? styles.dragOver : ''}`}
              onDragOver={(e) => handleDragOver(e, id)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, id)}
            >
              <div
                className={styles.effectHeader}
                draggable
                onDragStart={(e) => handleDragStart(e, id)}
                onDragEnd={handleDragEnd}
              >
                <span className={styles.dragHandle}>::</span>
                <button
                  className={styles.effectToggle}
                  onClick={() => onToggleEffect(id)}
                >
                  <span className={styles.effectName}>{effect.name}</span>
                  <span className={styles.effectStatus}>
                    {isActive ? 'ON' : 'OFF'}
                  </span>
                </button>
              </div>

              {isActive && (
                <div className={styles.effectParams}>
                  {Object.entries(effect.params).map(([paramId, paramDef]) => {
                    const value = params[paramId] ?? paramDef.default;
                    const isColor = paramDef.type === 'color';
                    const isToggle = paramDef.min === 0 && paramDef.max === 1;

                    return (
                      <div key={paramId} className={styles.paramRow}>
                        <label className={styles.paramLabel}>
                          {paramId.replace(/([A-Z])/g, ' $1').toUpperCase()}
                        </label>
                        {isColor ? (
                          <>
                            <input
                              type="color"
                              value={value}
                              onChange={(e) =>
                                onParamChange(id, paramId, e.target.value)
                              }
                              className={styles.paramColorInput}
                            />
                            <span className={styles.paramValue}>{value}</span>
                          </>
                        ) : isToggle ? (
                          <div 
                            className={`${styles.paramToggle} ${value === 1 ? styles.toggleActive : ''}`}
                            onClick={() => onParamChange(id, paramId, value === 1 ? 0 : 1)}
                          >
                            {value === 1 ? 'ON' : 'OFF'}
                          </div>
                        ) : (
                          <>
                            <input
                              type="range"
                              min={paramDef.min}
                              max={paramDef.max}
                              value={value}
                              onChange={(e) =>
                                onParamChange(id, paramId, Number(e.target.value))
                              }
                              className={styles.paramSlider}
                            />
                            <span className={styles.paramValue}>{value}</span>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
