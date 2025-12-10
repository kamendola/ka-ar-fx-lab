import { useState, useCallback, useRef, useEffect } from 'react';
import { useAudioAnalyzer } from './hooks/useAudioAnalyzer';
import { useHandGesture } from './hooks/useHandGesture';
import { useMediaProcessor } from './hooks/useMediaProcessor';
import { MediaCanvas } from './components/MediaCanvas';
import { EffectsPanel } from './components/EffectsPanel';
import { AudioVisualizer } from './components/AudioVisualizer';
import { GestureControl } from './components/GestureControl';
import { Controls } from './components/Controls';
import { EFFECTS } from './effects';
import { renderVideoPro } from './renderVideoPro';
import './App.css';

// Load user presets from localStorage
const loadUserPresets = () => {
  try {
    const saved = localStorage.getItem('glitchlab-presets');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

// Save user presets to localStorage
const saveUserPresets = (presets) => {
  try {
    localStorage.setItem('glitchlab-presets', JSON.stringify(presets));
  } catch (e) {
    console.error('Failed to save presets:', e);
  }
};

function App() {
  const [activeEffects, setActiveEffects] = useState([]);
  const [effectParams, setEffectParams] = useState({});
  const [userPresets, setUserPresets] = useState(loadUserPresets);
  const [presetName, setPresetName] = useState('');
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [isRendering, setIsRendering] = useState(false);
  const [renderProgress, setRenderProgress] = useState(0);
  const [renderStatus, setRenderStatus] = useState('');
  const [currentFps, setCurrentFps] = useState(0);
  const canvasRef = useRef(null);
  const renderCancelRef = useRef(false);

  const { isListening, audioData, startListening, stopListening, error, status } = useAudioAnalyzer();
  const { 
    isActive: isGestureActive, 
    gestureData, 
    status: gestureStatus, 
    error: gestureError,
    startGestureDetection, 
    stopGestureDetection 
  } = useHandGesture();
  const [gestureMappings, setGestureMappings] = useState({
    x: 'intensity',
    y: 'param1', 
    pinch: 'param2'
  });
  const {
    media,
    mediaType,
    isPlaying,
    loadMedia,
    togglePlayback,
    videoRef,
    imageRef,
  } = useMediaProcessor();

  // Initialize effect params with defaults
  const initializeEffectParams = useCallback((effectId) => {
    if (!effectParams[effectId]) {
      const effect = EFFECTS[effectId];
      const defaults = {};
      Object.entries(effect.params).forEach(([paramId, paramDef]) => {
        defaults[paramId] = paramDef.default;
      });
      setEffectParams((prev) => ({ ...prev, [effectId]: defaults }));
    }
  }, [effectParams]);

  const handleToggleEffect = useCallback((effectId) => {
    setActiveEffects((prev) => {
      if (prev.includes(effectId)) {
        return prev.filter((id) => id !== effectId);
      } else {
        initializeEffectParams(effectId);
        return [...prev, effectId];
      }
    });
  }, [initializeEffectParams]);

  const handleParamChange = useCallback((effectId, paramId, value) => {
    setEffectParams((prev) => ({
      ...prev,
      [effectId]: {
        ...prev[effectId],
        [paramId]: value,
      },
    }));
  }, []);

  const handleReorderEffects = useCallback((newOrder) => {
    setActiveEffects(newOrder);
  }, []);

  const handleFileSelect = useCallback((file) => {
    loadMedia(file);
  }, [loadMedia]);

  const handleAudioToggle = useCallback(() => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  }, [isListening, startListening, stopListening]);

  const handleCanvasReady = useCallback((canvas, sourceWidth, sourceHeight) => {
    canvasRef.current = canvas;
    console.log(`[Canvas] Ready at ${sourceWidth}x${sourceHeight} (displayed scaled)`);
  }, []);

  const handleFpsUpdate = useCallback((fps) => {
    setCurrentFps(fps);
  }, []);

  const handleExport = useCallback(() => {
    if (!canvasRef.current) return;

    // Export current canvas view as PNG
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = `glitch-lab-export-${canvas.width}x${canvas.height}-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png', 1.0); // Maximum quality PNG
    link.click();
  }, []);

  // Render video with effects (professional WebCodecs encoder)
  const renderVideo = useCallback(async () => {
    if (mediaType !== 'video' || !videoRef.current) {
      alert('Please load a video first');
      return;
    }

    const video = videoRef.current;
    const duration = video.duration;
    
    if (!duration || duration === Infinity) {
      alert('Unable to determine video duration');
      return;
    }

    if (!canvasRef.current) {
      alert('Canvas not ready');
      return;
    }

    setIsRendering(true);
    setRenderProgress(0);
    setRenderStatus('Preparing...');
    renderCancelRef.current = false;

    try {
      // Use professional WebCodecs renderer for perfect quality and timing
      const result = await renderVideoPro({
        video,
        canvas: canvasRef.current,
        duration,
        activeEffects,
        effectParams,
        audioData,
        onProgress: setRenderProgress,
        onStatus: setRenderStatus,
        cancelRef: renderCancelRef,
      });
      
      // Download the result
      const url = URL.createObjectURL(result.blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `glitch-lab-${result.width}x${result.height}-${Date.now()}.${result.ext}`;
      link.click();
      URL.revokeObjectURL(url);
      
      setIsRendering(false);
      setRenderProgress(0);
      setRenderStatus('');
      
    } catch (err) {
      console.error('[Render] Error:', err);
      if (err.message !== 'Cancelled') {
        alert('Failed to render video: ' + err.message);
      }
      
      setIsRendering(false);
      setRenderProgress(0);
      setRenderStatus('');
    }
  }, [mediaType, videoRef, canvasRef, activeEffects, effectParams, audioData]);

  // Cancel rendering
  const cancelRender = useCallback(() => {
    renderCancelRef.current = true;
    setIsRendering(false);
    setRenderProgress(0);
    setRenderStatus('');
  }, []);

  const handleReset = useCallback(() => {
    setActiveEffects([]);
    setEffectParams({});
  }, []);

  // Save current configuration as a preset
  const handleSavePreset = useCallback(() => {
    if (!presetName.trim()) return;
    if (activeEffects.length === 0) {
      alert('No effects to save!');
      return;
    }
    
    const newPreset = {
      id: Date.now(),
      name: presetName.trim(),
      effects: activeEffects,
      params: effectParams,
    };
    
    const updated = [...userPresets, newPreset];
    setUserPresets(updated);
    saveUserPresets(updated);
    setPresetName('');
    setShowSaveDialog(false);
  }, [presetName, activeEffects, effectParams, userPresets]);

  // Load a user preset
  const handleLoadPreset = useCallback((preset) => {
    setActiveEffects(preset.effects);
    setEffectParams(preset.params);
  }, []);

  // Delete a user preset
  const handleDeletePreset = useCallback((presetId) => {
    const updated = userPresets.filter(p => p.id !== presetId);
    setUserPresets(updated);
    saveUserPresets(updated);
  }, [userPresets]);

  // Toggle gesture detection
  const handleGestureToggle = useCallback(() => {
    if (isGestureActive) {
      stopGestureDetection();
    } else {
      startGestureDetection();
    }
  }, [isGestureActive, startGestureDetection, stopGestureDetection]);

  // Handle gesture mapping change
  const handleMappingChange = useCallback((gesture, target) => {
    setGestureMappings(prev => ({ ...prev, [gesture]: target }));
  }, []);

  // Apply gesture data to effect parameters
  useEffect(() => {
    if (!isGestureActive || !gestureData || activeEffects.length === 0) return;
    
    const primaryEffect = activeEffects[0];
    const effect = EFFECTS[primaryEffect];
    if (!effect) return;

    const paramKeys = Object.keys(effect.params);
    if (paramKeys.length === 0) return;

    // Get the first few numeric params
    const numericParams = paramKeys.filter(k => !effect.params[k].type);
    if (numericParams.length === 0) return;

    const newParams = { ...effectParams };
    if (!newParams[primaryEffect]) {
      newParams[primaryEffect] = {};
    }

    // Map gesture values to parameters
    const applyMapping = (gestureKey, mappingTarget) => {
      if (mappingTarget === 'none') return;
      
      const value = gestureData[gestureKey];
      if (value === undefined) return;

      let paramIndex = 0;
      if (mappingTarget === 'param1') paramIndex = 0;
      else if (mappingTarget === 'param2') paramIndex = 1;
      else if (mappingTarget === 'intensity') paramIndex = 0;

      const paramKey = numericParams[paramIndex];
      if (!paramKey) return;

      const paramDef = effect.params[paramKey];
      const range = paramDef.max - paramDef.min;
      const newValue = paramDef.min + (value * range);
      
      newParams[primaryEffect][paramKey] = Math.round(newValue);
    };

    applyMapping('x', gestureMappings.x);
    applyMapping('y', gestureMappings.y);
    applyMapping('pinch', gestureMappings.pinch);

    setEffectParams(newParams);
  }, [isGestureActive, gestureData, activeEffects, gestureMappings]);

  return (
    <div className="app">
      {/* Background effects */}
      <div className="background-grid" />
      <div className="background-glow" />

      {/* Header */}
      <header className="header">
        <div className="logo">
          <span className="logo-text">KA.AR.FX.LAB</span>
        </div>
        <div className="header-info">
          <span className="status-dot" data-active={isListening} />
          <span className="status-text">
            {isListening ? 'AUDIO ACTIVE' : 'AUDIO OFF'}
          </span>
        </div>
      </header>

      {/* Main content */}
      <main className="main">
        {/* Left sidebar - Effects */}
        <aside className="sidebar sidebar-left">
          <EffectsPanel
            activeEffects={activeEffects}
            effectParams={effectParams}
            onToggleEffect={handleToggleEffect}
            onParamChange={handleParamChange}
            onReorderEffects={handleReorderEffects}
          />
        </aside>

        {/* Center - Canvas */}
        <section className="canvas-section">
          <Controls
            media={media}
            mediaType={mediaType}
            isPlaying={isPlaying}
            isRendering={isRendering}
            renderProgress={renderProgress}
            onFileSelect={handleFileSelect}
            onTogglePlayback={togglePlayback}
            onExport={handleExport}
            onRenderVideo={renderVideo}
            onCancelRender={cancelRender}
            onReset={handleReset}
          />
          <MediaCanvas
            media={media}
            mediaType={mediaType}
            videoRef={videoRef}
            imageRef={imageRef}
            activeEffects={activeEffects}
            effectParams={effectParams}
            audioData={audioData}
            isPlaying={isPlaying}
            onCanvasReady={handleCanvasReady}
            onFpsUpdate={handleFpsUpdate}
          />
        </section>

        {/* Right sidebar - Audio & Gesture */}
        <aside className="sidebar sidebar-right">
          <AudioVisualizer
            audioData={audioData}
            isListening={isListening}
            onToggle={handleAudioToggle}
            error={error}
            status={status}
          />

          <GestureControl
            gestureData={gestureData}
            isActive={isGestureActive}
            status={gestureStatus}
            error={gestureError}
            onToggle={handleGestureToggle}
            mappings={gestureMappings}
            onMappingChange={handleMappingChange}
          />

          {/* User Presets */}
          <div className="presets-panel user-presets">
            <div className="panel-header">
              MY PRESETS
              <button 
                className="save-preset-btn"
                onClick={() => setShowSaveDialog(true)}
                disabled={activeEffects.length === 0}
              >
                + SAVE
              </button>
            </div>
            
            {showSaveDialog && (
              <div className="save-dialog">
                <input
                  type="text"
                  placeholder="Preset name..."
                  value={presetName}
                  onChange={(e) => setPresetName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSavePreset()}
                  className="preset-name-input"
                  autoFocus
                />
                <div className="save-dialog-buttons">
                  <button onClick={handleSavePreset} className="save-confirm-btn">
                    SAVE
                  </button>
                  <button onClick={() => { setShowSaveDialog(false); setPresetName(''); }} className="save-cancel-btn">
                    CANCEL
                  </button>
                </div>
              </div>
            )}
            
            {userPresets.length > 0 ? (
              <div className="user-presets-list">
                {userPresets.map((preset) => (
                  <div key={preset.id} className="user-preset-item">
                    <button
                      className="user-preset-btn"
                      onClick={() => handleLoadPreset(preset)}
                    >
                      {preset.name}
                    </button>
                    <button
                      className="delete-preset-btn"
                      onClick={() => handleDeletePreset(preset.id)}
                      title="Delete preset"
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-presets">
                No saved presets yet
              </div>
            )}
          </div>

          {/* Info */}
          <div className="info-panel">
            <div className="info-row">
              <span className="info-label">EFFECTS</span>
              <span className="info-value">{activeEffects.length}</span>
            </div>
            <div className="info-row">
              <span className="info-label">MEDIA</span>
              <span className="info-value">
                {media ? (mediaType === 'video' ? 'VIDEO' : 'IMAGE') : 'NONE'}
              </span>
            </div>
            {media && currentFps > 0 && (
              <div className="info-row" style={{ 
                color: currentFps >= 30 ? '#00ff88' : currentFps >= 20 ? '#ffaa00' : '#ff3366' 
              }}>
                <span className="info-label">FPS</span>
                <span className="info-value">{currentFps}</span>
              </div>
            )}
            {activeEffects.length >= 3 && (
              <div className="info-row" style={{ color: activeEffects.length >= 5 ? '#ffaa00' : '#00ffaa' }}>
                <span className="info-label">PERF</span>
                <span className="info-value">
                  {activeEffects.length >= 5 ? 'LOW' : 'OK'}
                </span>
              </div>
            )}
            {isRendering && (
              <div className="info-row" style={{ color: 'var(--text)', fontSize: '9px', gridColumn: '1 / -1', textAlign: 'center', padding: '4px 0' }}>
                {renderStatus || `ENCODING ${renderProgress}%`}
              </div>
            )}
          </div>
        </aside>
      </main>

      {/* Footer */}
    </div>
  );
}

export default App;
