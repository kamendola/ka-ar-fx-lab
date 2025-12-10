// Effect definitions and processors

export const EFFECTS = {
  glitch: {
    name: 'GLITCH',
    icon: 'G',
    description: 'Digital corruption & scan lines',
    params: {
      intensity: { min: 0, max: 100, default: 50 },
      sliceCount: { min: 1, max: 50, default: 10 },
      colorShift: { min: 0, max: 100, default: 30 },
    },
  },
  rgb: {
    name: 'RGB SHIFT',
    icon: 'R',
    description: 'Chromatic aberration',
    params: {
      offsetX: { min: -50, max: 50, default: 10 },
      offsetY: { min: -50, max: 50, default: 5 },
      intensity: { min: 0, max: 100, default: 50 },
    },
  },
  noise: {
    name: 'NOISE',
    icon: 'N',
    description: 'Static & grain overlay',
    params: {
      amount: { min: 0, max: 100, default: 30 },
      type: { min: 0, max: 2, default: 0 }, // 0: static, 1: film grain, 2: scan lines
      animated: { min: 0, max: 1, default: 1 },
    },
  },
  vhs: {
    name: 'VHS',
    icon: 'V',
    description: 'Retro VHS distortion',
    params: {
      tracking: { min: 0, max: 100, default: 50 },
      bleeding: { min: 0, max: 100, default: 40 },
      noise: { min: 0, max: 100, default: 30 },
    },
  },
  pixelate: {
    name: 'PIXEL',
    icon: 'X',
    description: 'Retro pixel sorting',
    params: {
      size: { min: 2, max: 64, default: 8 },
      sorting: { min: 0, max: 100, default: 0 },
      threshold: { min: 0, max: 255, default: 128 },
    },
  },
  wave: {
    name: 'WAVE',
    icon: 'W',
    description: 'Sinusoidal distortion',
    params: {
      amplitude: { min: 0, max: 100, default: 20 },
      frequency: { min: 1, max: 50, default: 10 },
      speed: { min: 0, max: 100, default: 50 },
    },
  },
  invert: {
    name: 'INVERT',
    icon: 'I',
    description: 'Color inversion & solarize',
    params: {
      amount: { min: 0, max: 100, default: 100 },
      threshold: { min: 0, max: 255, default: 128 },
      mode: { min: 0, max: 2, default: 0 }, // 0: full, 1: partial, 2: solarize
    },
  },
  digits: {
    name: 'DIGITS',
    icon: 'D',
    description: 'Convert to number matrix',
    params: {
      size: { min: 4, max: 24, default: 10 },
      contrast: { min: 0, max: 100, default: 50 },
      colorMode: { min: 0, max: 3, default: 1 }, // 0: green, 1: cyan, 2: original colors, 3: rainbow
    },
  },
  binary: {
    name: 'BINARY',
    icon: 'B',
    description: 'Binary code visualization',
    params: {
      size: { min: 6, max: 20, default: 12 },
      density: { min: 10, max: 100, default: 70 },
      animated: { min: 0, max: 1, default: 1 },
    },
  },
  ascii: {
    name: 'ASCII',
    icon: 'A',
    description: 'ASCII art conversion',
    params: {
      size: { min: 4, max: 16, default: 8 },
      charset: { min: 0, max: 2, default: 0 }, // 0: full, 1: blocks, 2: symbols
      invert: { min: 0, max: 1, default: 0 },
    },
  },
  polarity: {
    name: 'POLARITY',
    icon: '±',
    description: 'Plus & minus visualization',
    params: {
      size: { min: 6, max: 28, default: 14 },
      threshold: { min: 0, max: 100, default: 50 },
      colorMode: { min: 0, max: 3, default: 0 }, // 0: red/blue, 1: green/magenta, 2: yellow/purple, 3: original
    },
  },
  flow: {
    name: 'RELIEF',
    icon: 'L',
    description: '2D topographic contour lines',
    params: {
      density: { min: 5, max: 100, default: 50 },       // number of contour lines
      length: { min: 0, max: 100, default: 60 },        // smoothness
      thickness: { min: 1, max: 8, default: 2 },        // line thickness
      speed: { min: 0, max: 100, default: 0 },          // animation speed
      alpha: { min: 0, max: 100, default: 100 },        // opacity
    },
  },
  contour: {
    name: 'CONTOUR',
    icon: 'C',
    description: 'Topographic contour lines',
    params: {
      levels: { min: 3, max: 20, default: 8 },
      smoothness: { min: 1, max: 10, default: 5 },
      colorful: { min: 0, max: 1, default: 1 },
    },
  },
  tracking: {
    name: 'TRACKING',
    icon: 'T',
    description: 'Automated detection overlay',
    params: {
      targets: { min: 0, max: 20, default: 5 },
      sensitivity: { min: 10, max: 150, default: 60 },    // detection sensitivity
      overlay: { min: 0, max: 100, default: 0 },          // black overlay opacity
      mainColor: { type: 'color', default: '#00ff00' },   // main color
      accentColor: { type: 'color', default: '#00ffff' }, // accent color
      brackets: { min: 0, max: 1, default: 1 },
      crosshairs: { min: 0, max: 1, default: 1 },
      dots: { min: 0, max: 1, default: 1 },               // tracking dots
      scanline: { min: 0, max: 1, default: 1 },
      grid: { min: 0, max: 1, default: 1 },
      databoxes: { min: 0, max: 1, default: 1 },
      labels: { min: 0, max: 1, default: 1 },
      lines: { min: 0, max: 1, default: 1 },
      frame: { min: 0, max: 1, default: 1 },
      timestamp: { min: 0, max: 1, default: 1 },
      glitch: { min: 0, max: 1, default: 0 },
    },
  },
  threshold: {
    name: 'THRESHOLD',
    icon: 'H',
    description: 'High contrast black & white',
    params: {
      level: { min: 0, max: 255, default: 128 },          // threshold level
      noise: { min: 0, max: 100, default: 0 },            // noise amount
      softness: { min: 0, max: 50, default: 0 },          // edge softness
      blackColor: { type: 'color', default: '#000000' },  // color for dark areas
      whiteColor: { type: 'color', default: '#ffffff' },  // color for bright areas
      invert: { min: 0, max: 1, default: 0 },             // invert result
    },
  },
  doubleExposure: {
    name: 'DOUBLE EXPOSURE',
    icon: 'E',
    description: 'Blend multiple frames',
    params: {
      delay: { min: 1, max: 30, default: 10 },            // frame delay
      blend: { min: 0, max: 100, default: 50 },           // blend amount
      mode: { min: 0, max: 5, default: 0 },               // blend mode: 0=screen, 1=multiply, 2=overlay, 3=difference, 4=add, 5=subtract
      offsetX: { min: -50, max: 50, default: 0 },         // horizontal offset
      offsetY: { min: -50, max: 50, default: 0 },         // vertical offset
      tint: { type: 'color', default: '#ffffff' },        // tint color for ghost layer
    },
  },
  glow: {
    name: 'GLOW',
    icon: 'F',
    description: 'Dreamy glow & bloom',
    params: {
      intensity: { min: 0, max: 100, default: 50 },       // glow intensity
      radius: { min: 1, max: 20, default: 8 },            // blur radius
      threshold: { min: 0, max: 255, default: 128 },      // brightness threshold for glow
      color: { type: 'color', default: '#ffffff' },       // glow tint color
      grain: { min: 0, max: 100, default: 0 },            // film grain amount
      saturation: { min: 0, max: 200, default: 100 },     // color saturation
    },
  },
  motionMask: {
    name: 'MOTION MASK',
    icon: 'M',
    description: 'Show only moving areas',
    params: {
      blockSize: { min: 5, max: 60, default: 20 },        // block size
      sensitivity: { min: 1, max: 100, default: 50 },     // motion sensitivity
      fade: { min: 0, max: 100, default: 30 },            // fade amount for static
      trail: { min: 0, max: 100, default: 50 },           // motion trail/persistence
      borderColor: { type: 'color', default: '#00ffff' }, // square border color
      showBorders: { min: 0, max: 1, default: 1 },        // show block borders
      invert: { min: 0, max: 1, default: 0 },             // invert (show static, hide motion)
    },
  },
  pointTracking: {
    name: 'POINT TRACKING',
    icon: 'O',
    description: 'Track moving points',
    params: {
      points: { min: 5, max: 100, default: 30 },          // number of tracking points
      dotSize: { min: 2, max: 30, default: 10 },          // size of tracking dots
      sensitivity: { min: 1, max: 100, default: 50 },     // motion detection sensitivity
      dotColor: { type: 'color', default: '#ff0000' },    // dot color
      connections: { min: 0, max: 1, default: 0 },        // draw smooth lines between dots
      lineWidth: { min: 1, max: 10, default: 2 },         // line thickness
      maxDistance: { min: 50, max: 300, default: 150 },   // max distance to connect dots
    },
  },
  thermal: {
    name: 'THERMAL',
    icon: 'K',
    description: 'Thermal imaging camera effect',
    params: {
      intensity: { min: 0, max: 100, default: 100 },      // effect intensity
      palette: { min: 0, max: 3, default: 0 },            // color palette (0=classic, 1=ironbow, 2=white hot, 3=rainbow)
      contrast: { min: 0, max: 100, default: 50 },        // contrast adjustment
      blur: { min: 0, max: 20, default: 3 },              // edge blur amount
    },
  },
  objectMask: {
    name: 'OBJECT MASK',
    icon: 'S',
    description: 'Detect and color main subject',
    params: {
      intensity: { min: 0, max: 100, default: 80 },       // mask strength
      blur: { min: 0, max: 20, default: 5 },              // edge blur
      invert: { min: 0, max: 1, default: 0 },             // 0=mask subject, 1=mask background
      maskColor: { type: 'color', default: '#00ffff' },   // mask color
    },
  },
  dither: {
    name: 'DITHER',
    icon: 'Z',
    description: 'Retro dithering patterns',
    params: {
      mode: { min: 0, max: 4, default: 0 },               // 0=ordered, 1=floyd-steinberg, 2=atkinson, 3=halftone, 4=noise
      colors: { min: 2, max: 16, default: 2 },            // number of colors
      scale: { min: 1, max: 8, default: 2 },              // pattern scale
      contrast: { min: 0, max: 100, default: 50 },        // contrast
      colorMode: { min: 0, max: 3, default: 0 },          // 0=mono, 1=sepia, 2=original, 3=custom
      customColor: { type: 'color', default: '#00ff00' }, // custom color for mono
    },
  },
  wireframe: {
    name: 'WIREFRAME',
    icon: 'Y',
    description: '3D wireframe mesh visualization',
    params: {
      gridSize: { min: 5, max: 60, default: 20 },         // mesh resolution
      depth: { min: 0, max: 100, default: 50 },           // 3D depth/height
      rotateX: { min: -90, max: 90, default: 30 },        // X rotation angle
      rotateY: { min: -90, max: 90, default: 0 },         // Y rotation angle
      perspective: { min: 100, max: 1000, default: 400 }, // perspective distance
      lineColor: { type: 'color', default: '#00ff00' },   // wireframe color
      bgColor: { type: 'color', default: '#000000' },     // background color
      dotted: { min: 0, max: 1, default: 0 },             // dotted lines
      fill: { min: 0, max: 1, default: 0 },               // fill polygons
    },
  },
  motionBlur: {
    name: 'MOTION BLUR',
    icon: 'U',
    description: 'Trendy motion blur trails',
    params: {
      mode: { min: 0, max: 4, default: 0 },               // 0=directional, 1=radial/zoom, 2=circular, 3=echo, 4=smear
      intensity: { min: 0, max: 100, default: 50 },       // blur strength
      angle: { min: 0, max: 360, default: 0 },            // direction angle (for directional)
      samples: { min: 3, max: 20, default: 8 },           // quality (more = smoother but slower)
      centerX: { min: 0, max: 100, default: 50 },         // center X for radial/circular
      centerY: { min: 0, max: 100, default: 50 },         // center Y for radial/circular
      tint: { type: 'color', default: '#ffffff' },        // trail color tint
      fadeOut: { min: 0, max: 1, default: 1 },            // fade trails
    },
  },
};

// Apply glitch effect
export function applyGlitch(ctx, canvas, params, time, audioData) {
  const { intensity, sliceCount, colorShift } = params;
  const audioBoost = audioData?.bass || 0;
  const effectIntensity = (intensity / 100) * (1 + audioBoost);
  
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  
  // Random horizontal slices
  const slices = Math.floor(sliceCount * effectIntensity);
  for (let i = 0; i < slices; i++) {
    const y = Math.floor(Math.random() * canvas.height);
    const height = Math.floor(Math.random() * 20 + 5);
    const offset = Math.floor((Math.random() - 0.5) * 50 * effectIntensity);
    
    const sliceData = ctx.getImageData(0, y, canvas.width, height);
    ctx.putImageData(sliceData, offset, y);
  }
  
  // Color channel shift
  if (colorShift > 0) {
    const shift = Math.floor((colorShift / 100) * 10 * (1 + audioBoost));
    const newImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const newData = newImageData.data;
    
    for (let i = 0; i < data.length; i += 4) {
      const redIndex = i + shift * 4;
      const blueIndex = i - shift * 4;
      
      if (redIndex < data.length) {
        newData[i] = data[redIndex];
      }
      if (blueIndex >= 0) {
        newData[i + 2] = data[blueIndex];
      }
    }
    ctx.putImageData(newImageData, 0, 0);
  }
  
  // Scan lines
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
  for (let y = 0; y < canvas.height; y += 4) {
    ctx.fillRect(0, y, canvas.width, 2);
  }
}


// Apply RGB shift effect (optimized)
export function applyRGBShift(ctx, canvas, params, time, audioData) {
  const { offsetX, offsetY, intensity } = params;
  const audioBoost = audioData?.overall || 0;
  const effectIntensity = (intensity / 100) * (1 + audioBoost * 2);
  
  const width = canvas.width;
  const height = canvas.height;
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;
  
  const newImageData = ctx.createImageData(width, height);
  const newData = newImageData.data;
  
  const shiftX = (offsetX * effectIntensity) | 0;
  const shiftY = (offsetY * effectIntensity) | 0;
  const maxX = width - 1;
  const maxY = height - 1;
  
  for (let y = 0; y < height; y++) {
    const ry = Math.min(Math.max(y + shiftY, 0), maxY);
    const by = Math.min(Math.max(y - shiftY, 0), maxY);
    const rowOffset = y * width;
    const ryOffset = ry * width;
    const byOffset = by * width;
    
    for (let x = 0; x < width; x++) {
      const i = (rowOffset + x) << 2;
      const rx = Math.min(Math.max(x + shiftX, 0), maxX);
      const bx = Math.min(Math.max(x - shiftX, 0), maxX);
      
      newData[i] = data[(ryOffset + rx) << 2];
      newData[i + 1] = data[i + 1];
      newData[i + 2] = data[((byOffset + bx) << 2) + 2];
      newData[i + 3] = 255;
    }
  }
  
  ctx.putImageData(newImageData, 0, 0);
}

// Apply noise effect
export function applyNoise(ctx, canvas, params, time, audioData) {
  const { amount, type, animated } = params;
  const audioBoost = audioData?.overall || 0;
  const noiseAmount = (amount / 100) * (1 + audioBoost);
  
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  
  if (type === 0) {
    // Static noise
    for (let i = 0; i < data.length; i += 4) {
      const noise = (Math.random() - 0.5) * 255 * noiseAmount;
      data[i] += noise;
      data[i + 1] += noise;
      data[i + 2] += noise;
    }
  } else if (type === 1) {
    // Film grain
    for (let i = 0; i < data.length; i += 4) {
      const grain = (Math.random() - 0.5) * 50 * noiseAmount;
      data[i] += grain;
      data[i + 1] += grain;
      data[i + 2] += grain;
    }
  } else {
    // Scan lines
    for (let y = 0; y < canvas.height; y++) {
      const scanIntensity = Math.sin(y * 0.5 + (animated ? time * 10 : 0)) * 0.5 + 0.5;
      for (let x = 0; x < canvas.width; x++) {
        const i = (y * canvas.width + x) * 4;
        const factor = 1 - scanIntensity * noiseAmount * 0.5;
        data[i] *= factor;
        data[i + 1] *= factor;
        data[i + 2] *= factor;
      }
    }
  }
  
  ctx.putImageData(imageData, 0, 0);
}

// Apply VHS effect
export function applyVHS(ctx, canvas, params, time, audioData) {
  const { tracking, bleeding, noise } = params;
  const audioBoost = audioData?.bass || 0;
  
  // Tracking distortion
  if (tracking > 0) {
    const trackOffset = Math.sin(time * 5) * (tracking / 100) * 10 * (1 + audioBoost);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    ctx.putImageData(imageData, trackOffset, 0);
  }
  
  // Color bleeding
  if (bleeding > 0) {
    applyRGBShift(ctx, canvas, {
      offsetX: (bleeding / 100) * 5,
      offsetY: 0,
      intensity: bleeding,
    }, time, audioData);
  }
  
  // VHS noise bands
  if (noise > 0) {
    const bandHeight = 20;
    const bandY = (Math.sin(time * 2) * 0.5 + 0.5) * canvas.height;
    ctx.fillStyle = `rgba(255, 255, 255, ${(noise / 100) * 0.3})`;
    ctx.fillRect(0, bandY, canvas.width, bandHeight * (1 + audioBoost));
  }
  
  // Scan lines
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
  for (let y = 0; y < canvas.height; y += 2) {
    ctx.fillRect(0, y, canvas.width, 1);
  }
}

// Apply pixelate effect
export function applyPixelate(ctx, canvas, params, time, audioData) {
  const { size, sorting, threshold } = params;
  const audioBoost = audioData?.bass || 0;
  const pixelSize = Math.max(2, Math.floor(size * (1 + audioBoost)));
  
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  
  for (let y = 0; y < canvas.height; y += pixelSize) {
    for (let x = 0; x < canvas.width; x += pixelSize) {
      let r = 0, g = 0, b = 0, count = 0;
      
      for (let py = 0; py < pixelSize && y + py < canvas.height; py++) {
        for (let px = 0; px < pixelSize && x + px < canvas.width; px++) {
          const i = ((y + py) * canvas.width + (x + px)) * 4;
          r += data[i];
          g += data[i + 1];
          b += data[i + 2];
          count++;
        }
      }
      
      r = Math.floor(r / count);
      g = Math.floor(g / count);
      b = Math.floor(b / count);
      
      for (let py = 0; py < pixelSize && y + py < canvas.height; py++) {
        for (let px = 0; px < pixelSize && x + px < canvas.width; px++) {
          const i = ((y + py) * canvas.width + (x + px)) * 4;
          data[i] = r;
          data[i + 1] = g;
          data[i + 2] = b;
        }
      }
    }
  }
  
  ctx.putImageData(imageData, 0, 0);
}

// Apply wave effect (optimized - batch rows)
let waveCanvas = null;
export function applyWave(ctx, canvas, params, time, audioData) {
  const { amplitude, frequency, speed } = params;
  const audioBoost = audioData?.mid || 0;
  
  const width = canvas.width;
  const height = canvas.height;
  
  // Reuse temp canvas
  if (!waveCanvas || waveCanvas.width !== width || waveCanvas.height !== height) {
    waveCanvas = document.createElement('canvas');
    waveCanvas.width = width;
    waveCanvas.height = height;
  }
  const tempCtx = waveCanvas.getContext('2d');
  tempCtx.drawImage(canvas, 0, 0);
  
  ctx.clearRect(0, 0, width, height);
  
  const amp = (amplitude / 100) * 30 * (1 + audioBoost);
  const freq = frequency / 500;
  const phase = time * (speed / 50);
  
  // Batch every 2 rows for performance
  for (let y = 0; y < height; y += 2) {
    const offset = Math.sin(y * freq + phase) * amp;
    ctx.drawImage(waveCanvas, 0, y, width, 2, offset, y, width, 2);
  }
}

// Apply invert effect
export function applyInvert(ctx, canvas, params, time, audioData) {
  const { amount, threshold, mode } = params;
  const audioBoost = audioData?.high || 0;
  const effectAmount = (amount / 100) * (1 + audioBoost * 0.5);
  
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  
  for (let i = 0; i < data.length; i += 4) {
    const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3;
    
    if (mode === 0) {
      // Full invert
      data[i] = data[i] + (255 - 2 * data[i]) * effectAmount;
      data[i + 1] = data[i + 1] + (255 - 2 * data[i + 1]) * effectAmount;
      data[i + 2] = data[i + 2] + (255 - 2 * data[i + 2]) * effectAmount;
    } else if (mode === 1) {
      // Partial invert based on threshold
      if (brightness > threshold) {
        data[i] = 255 - data[i];
        data[i + 1] = 255 - data[i + 1];
        data[i + 2] = 255 - data[i + 2];
      }
    } else {
      // Solarize
      if (brightness > threshold) {
        data[i] = 255 - data[i];
        data[i + 1] = 255 - data[i + 1];
        data[i + 2] = 255 - data[i + 2];
      }
      // Add color tint based on time
      const tint = Math.sin(time) * 30;
      data[i] = Math.min(255, Math.max(0, data[i] + tint));
    }
  }
  
  ctx.putImageData(imageData, 0, 0);
}


// Apply digits effect - converts image to numbers (optimized)
export function applyDigits(ctx, canvas, params, time, audioData) {
  const { size, contrast, colorMode } = params;
  const audioBoost = audioData?.mid || 0;
  const fontSize = Math.max(6, Math.floor(size * (1 + audioBoost * 0.3)));
  
  const width = canvas.width;
  const height = canvas.height;
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;
  
  ctx.fillStyle = '#0a0a0f';
  ctx.fillRect(0, 0, width, height);
  
  ctx.font = `bold ${fontSize}px monospace`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  const chars = '0123456789';
  const stepX = fontSize * 0.8;
  const stepY = fontSize;
  const contrastMult = 1 + (contrast / 50);
  const halfStepX = stepX / 2;
  const halfStepY = stepY / 2;
  
  // Batch by color mode for fewer state changes
  for (let y = 0; y < height; y += stepY) {
    const py = Math.min(y | 0, height - 1);
    const rowOffset = py * width;
    
    for (let x = 0; x < width; x += stepX) {
      const px = Math.min(x | 0, width - 1);
      const i = (rowOffset + px) << 2;
      
      const r = data[i], g = data[i + 1], b = data[i + 2];
      let brightness = (r * 0.299 + g * 0.587 + b * 0.114);
      brightness = Math.min(255, Math.max(0, (brightness - 128) * contrastMult + 128));
      const char = chars[(brightness * 0.0392) | 0]; // /255 * 10
      
      if (colorMode === 0) {
        ctx.fillStyle = `rgba(0,255,136,${0.3 + brightness * 0.00275})`;
      } else if (colorMode === 1) {
        ctx.fillStyle = `rgba(0,255,255,${0.3 + brightness * 0.00275})`;
      } else if (colorMode === 2) {
        ctx.fillStyle = `rgb(${r},${g},${b})`;
      } else {
        ctx.fillStyle = `hsl(${(x / width * 360 + time * 50) % 360},100%,60%)`;
      }
      
      ctx.fillText(char, x + halfStepX, y + halfStepY);
    }
  }
}

// Apply binary effect - converts image to binary code (optimized)
export function applyBinary(ctx, canvas, params, time, audioData) {
  const { size, density, animated } = params;
  const audioBoost = audioData?.high || 0;
  const fontSize = Math.max(8, Math.floor(size * (1 + audioBoost * 0.2)));
  
  const width = canvas.width;
  const height = canvas.height;
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;
  
  ctx.fillStyle = 'rgba(10, 10, 15, 0.95)';
  ctx.fillRect(0, 0, width, height);
  
  ctx.font = `${fontSize}px monospace`;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  
  const stepX = fontSize * 0.7;
  const stepY = fontSize * 1.2;
  const threshold = (100 - density) * 2.55;
  const timeVal = time * 5;
  
  for (let y = 0; y < height; y += stepY) {
    const py = Math.min(y | 0, height - 1);
    const rowOffset = py * width;
    
    for (let x = 0; x < width; x += stepX) {
      const px = Math.min(x | 0, width - 1);
      const i = (rowOffset + px) << 2;
      const brightness = (data[i] + data[i + 1] + data[i + 2]) * 0.333;
      
      if (brightness > threshold) {
        const bit = animated ? (Math.sin(timeVal + x * 0.1 + y * 0.1) > 0 ? '1' : '0') : (brightness > 128 ? '1' : '0');
        const green = 100 + (brightness * 0.6) | 0;
        ctx.fillStyle = `rgba(0,${green},${green >> 1},${0.3 + brightness * 0.00275})`;
        ctx.fillText(bit, x, y);
      }
    }
  }
}

// Apply ASCII art effect (optimized)
export function applyAscii(ctx, canvas, params, time, audioData) {
  const { size, charset, invert } = params;
  const audioBoost = audioData?.overall || 0;
  const fontSize = Math.max(6, Math.floor(size * (1 + audioBoost * 0.2)));
  
  const width = canvas.width;
  const height = canvas.height;
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;
  
  ctx.fillStyle = invert ? '#e0e0e0' : '#0a0a0f';
  ctx.fillRect(0, 0, width, height);
  
  ctx.font = `${fontSize}px monospace`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  const charsets = [' .:-=+*#%@', ' ░▒▓█', ' ·•●○◐◑◒◓'];
  const chars = charsets[Math.min(charset, 2)];
  const charsLen = chars.length - 0.01;
  const stepX = fontSize * 0.7;
  const stepY = fontSize;
  const halfStepX = stepX / 2;
  const halfStepY = stepY / 2;
  
  for (let y = 0; y < height; y += stepY) {
    const py = Math.min(y | 0, height - 1);
    const rowOffset = py * width;
    
    for (let x = 0; x < width; x += stepX) {
      const px = Math.min(x | 0, width - 1);
      const i = (rowOffset + px) << 2;
      const r = data[i], g = data[i + 1], b = data[i + 2];
      
      let brightness = r * 0.299 + g * 0.587 + b * 0.114;
      if (invert) brightness = 255 - brightness;
      
      const char = chars[(brightness / 255 * charsLen) | 0];
      const intensity = 0.5 + brightness * 0.00196;
      
      ctx.fillStyle = invert 
        ? `rgba(${r * 0.3 | 0},${g * 0.3 | 0},${b * 0.3 | 0},${intensity})`
        : `rgba(${r},${g},${b},${intensity})`;
      
      ctx.fillText(char, x + halfStepX, y + halfStepY);
    }
  }
}

// Apply polarity effect - + and - symbols based on brightness (optimized)
export function applyPolarity(ctx, canvas, params, time, audioData) {
  const { size, threshold, colorMode } = params;
  const audioBoost = audioData?.bass || 0;
  const fontSize = Math.max(8, Math.floor(size * (1 + audioBoost * 0.3)));
  
  const width = canvas.width;
  const height = canvas.height;
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;
  
  ctx.fillStyle = '#0a0a0f';
  ctx.fillRect(0, 0, width, height);
  
  ctx.font = `bold ${fontSize}px monospace`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  const stepX = fontSize * 0.9;
  const stepY = fontSize;
  const midPoint = threshold * 2.55;
  const halfStepX = stepX / 2;
  const halfStepY = stepY / 2;
  
  const schemes = [
    { plus: '#00ffff', minus: '#ff3366' },
    { plus: '#00ff88', minus: '#ff00ff' },
    { plus: '#ffff00', minus: '#8800ff' },
  ];
  const scheme = colorMode < 3 ? schemes[colorMode] : null;
  
  for (let y = 0; y < height; y += stepY) {
    const py = Math.min(y | 0, height - 1);
    const rowOffset = py * width;
    
    for (let x = 0; x < width; x += stepX) {
      const px = Math.min(x | 0, width - 1);
      const i = (rowOffset + px) << 2;
      const r = data[i], g = data[i + 1], b = data[i + 2];
      const brightness = r * 0.299 + g * 0.587 + b * 0.114;
      const isPositive = brightness > midPoint;
      const intensity = 0.3 + Math.abs(brightness - midPoint) * 0.00275;
      
      if (colorMode === 3) {
        ctx.fillStyle = `rgba(${r},${g},${b},${intensity + 0.2})`;
      } else {
        ctx.globalAlpha = intensity;
        ctx.fillStyle = isPositive ? scheme.plus : scheme.minus;
      }
      
      ctx.fillText(isPositive ? '+' : '-', x + halfStepX, y + halfStepY);
    }
  }
  ctx.globalAlpha = 1;
}

// Apply flow/relief effect - 2D contour lines (optimized)
export function applyFlow(ctx, canvas, params, time, audioData) {
  const { density, length, thickness, speed, alpha } = params;
  const audioBoost = audioData?.mid || 0;
  
  const width = canvas.width;
  const height = canvas.height;
  
  // Downscale for faster processing
  const scale = 0.5;
  const smallWidth = Math.floor(width * scale);
  const smallHeight = Math.floor(height * scale);
  
  // Create small canvas for sampling
  const smallCanvas = document.createElement('canvas');
  smallCanvas.width = smallWidth;
  smallCanvas.height = smallHeight;
  const smallCtx = smallCanvas.getContext('2d');
  
  // Apply blur for smoothing using CSS filter (much faster)
  const smoothAmount = Math.max(1, Math.floor((100 - length) / 20));
  smallCtx.filter = `blur(${smoothAmount}px)`;
  smallCtx.drawImage(canvas, 0, 0, smallWidth, smallHeight);
  smallCtx.filter = 'none';
  
  const smallData = smallCtx.getImageData(0, 0, smallWidth, smallHeight);
  const sd = smallData.data;
  
  // Create brightness map from downscaled image
  const brightnessMap = [];
  for (let y = 0; y < smallHeight; y++) {
    brightnessMap[y] = [];
    for (let x = 0; x < smallWidth; x++) {
      const i = (y * smallWidth + x) * 4;
      brightnessMap[y][x] = sd[i] * 0.299 + sd[i + 1] * 0.587 + sd[i + 2] * 0.114;
    }
  }
  
  // Clear canvas with white background
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);
  
  // Number of contour levels (reduced for performance)
  const numLevels = Math.floor(5 + (density / 100) * 20 + audioBoost * 5);
  const lineWidth = Math.max(0.5, thickness / 3);
  const opacity = (alpha || 100) / 100; // Convert alpha 0-100 to 0-1
  
  ctx.strokeStyle = `rgba(26, 26, 46, ${opacity})`;
  ctx.lineWidth = lineWidth;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  
  // Scale factor for drawing
  const scaleX = width / smallWidth;
  const scaleY = height / smallHeight;
  
  // Animation offset
  const animOffset = time * (speed / 50) * 5;
  
  // Step size for faster processing
  const step = 2;
  
  // Marching squares with larger steps
  for (let level = 0; level < numLevels; level++) {
    const threshold = (level / numLevels) * 255 + animOffset % (255 / numLevels);
    
    ctx.beginPath();
    
    for (let y = 0; y < smallHeight - step; y += step) {
      for (let x = 0; x < smallWidth - step; x += step) {
        const tl = brightnessMap[y]?.[x] || 0;
        const tr = brightnessMap[y]?.[x + step] || 0;
        const bl = brightnessMap[y + step]?.[x] || 0;
        const br = brightnessMap[y + step]?.[x + step] || 0;
        
        let caseIndex = 0;
        if (tl >= threshold) caseIndex |= 1;
        if (tr >= threshold) caseIndex |= 2;
        if (br >= threshold) caseIndex |= 4;
        if (bl >= threshold) caseIndex |= 8;
        
        if (caseIndex === 0 || caseIndex === 15) continue;
        
        const getT = (v1, v2) => Math.max(0, Math.min(1, (threshold - v1) / (v2 - v1 + 0.001)));
        
        const top = { x: (x + getT(tl, tr) * step) * scaleX, y: y * scaleY };
        const bottom = { x: (x + getT(bl, br) * step) * scaleX, y: (y + step) * scaleY };
        const left = { x: x * scaleX, y: (y + getT(tl, bl) * step) * scaleY };
        const right = { x: (x + step) * scaleX, y: (y + getT(tr, br) * step) * scaleY };
        
        const addSegment = (p1, p2) => {
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
        };
        
        switch (caseIndex) {
          case 1: case 14: addSegment(top, left); break;
          case 2: case 13: addSegment(top, right); break;
          case 3: case 12: addSegment(left, right); break;
          case 4: case 11: addSegment(right, bottom); break;
          case 5: addSegment(top, right); addSegment(left, bottom); break;
          case 6: case 9: addSegment(top, bottom); break;
          case 7: case 8: addSegment(left, bottom); break;
          case 10: addSegment(top, left); addSegment(right, bottom); break;
        }
      }
    }
    
    ctx.stroke();
  }
}

// Apply contour lines effect (optimized - reduced resolution)
export function applyContour(ctx, canvas, params, time, audioData) {
  const { levels, smoothness, colorful } = params;
  const audioBoost = audioData?.overall || 0;
  
  const width = canvas.width;
  const height = canvas.height;
  
  // Downsample for performance
  const scale = 0.5;
  const sw = (width * scale) | 0;
  const sh = (height * scale) | 0;
  
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = sw;
  tempCanvas.height = sh;
  const tempCtx = tempCanvas.getContext('2d');
  tempCtx.drawImage(canvas, 0, 0, sw, sh);
  
  const imageData = tempCtx.getImageData(0, 0, sw, sh);
  const data = imageData.data;
  
  // Create brightness map (flat array for speed)
  const brightnessMap = new Uint8Array(sw * sh);
  for (let i = 0, j = 0; i < data.length; i += 4, j++) {
    brightnessMap[j] = (data[i] + data[i + 1] + data[i + 2]) * 0.333;
  }
  
  ctx.fillStyle = '#0a0a0f';
  ctx.fillRect(0, 0, width, height);
  
  const numLevels = Math.min(12, Math.floor(levels * (1 + audioBoost * 0.3)));
  const step = Math.max(2, Math.floor(sw / (smoothness * 4)));
  const scaleUp = 1 / scale;
  const lineWidth = 1 + audioBoost * 2;
  
  ctx.lineWidth = lineWidth;
  ctx.lineCap = 'round';
  
  for (let level = 0; level < numLevels; level++) {
    const threshold = (level / numLevels) * 255;
    
    if (colorful) {
      ctx.strokeStyle = `hsla(${(level / numLevels) * 300 + time * 20}, 100%, 60%, 0.8)`;
    } else {
      ctx.strokeStyle = `rgba(0, 255, 255, ${0.3 + (level / numLevels) * 0.5})`;
    }
    
    ctx.beginPath();
    
    // Simplified contour detection
    for (let y = 0; y < sh - step; y += step) {
      for (let x = 0; x < sw - step; x += step) {
        const idx = y * sw + x;
        const b1 = brightnessMap[idx];
        const b2 = brightnessMap[idx + step];
        const b3 = brightnessMap[idx + step * sw];
        
        if ((b1 < threshold) !== (b2 < threshold)) {
          const t = (threshold - b1) / (b2 - b1 + 0.001);
          ctx.moveTo((x + t * step) * scaleUp, y * scaleUp);
          ctx.lineTo((x + t * step) * scaleUp + 1, y * scaleUp + 1);
        }
        if ((b1 < threshold) !== (b3 < threshold)) {
          const t = (threshold - b1) / (b3 - b1 + 0.001);
          ctx.moveTo(x * scaleUp, (y + t * step) * scaleUp);
          ctx.lineTo(x * scaleUp + 1, (y + t * step) * scaleUp + 1);
        }
      }
    }
    
    ctx.stroke();
  }
}

// Apply tracking/detection overlay effect
export function applyTracking(ctx, canvas, params, time, audioData) {
  const { 
    targets, sensitivity, overlay, mainColor, accentColor,
    brackets, crosshairs, dots, scanline, 
    grid, databoxes, labels, lines, frame, timestamp, glitch 
  } = params;
  const audioBoost = audioData?.overall || 0;
  
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const imgData = imageData.data;
  
  // ===== BLACK OVERLAY =====
  if (overlay > 0) {
    ctx.fillStyle = `rgba(0, 0, 0, ${overlay / 100})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  
  // Helper to convert hex to rgba
  const hexToRgba = (hex, alpha) => {
    const h = hex.replace('#', '');
    const r = parseInt(h.substring(0, 2), 16);
    const g = parseInt(h.substring(2, 4), 16);
    const b = parseInt(h.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };
  
  // Find high-contrast areas (potential "targets")
  const detectionThreshold = sensitivity || 60;
  
  const findTargets = () => {
    if (targets === 0) return [];
    
    const found = [];
    const gridSize = Math.floor(Math.min(canvas.width, canvas.height) / 8);
    
    for (let gy = 0; gy < canvas.height; gy += gridSize) {
      for (let gx = 0; gx < canvas.width; gx += gridSize) {
        let minB = 255, maxB = 0;
        let totalB = 0, count = 0;
        
        for (let y = gy; y < Math.min(gy + gridSize, canvas.height); y += 4) {
          for (let x = gx; x < Math.min(gx + gridSize, canvas.width); x += 4) {
            const i = (y * canvas.width + x) * 4;
            const b = (imgData[i] + imgData[i + 1] + imgData[i + 2]) / 3;
            minB = Math.min(minB, b);
            maxB = Math.max(maxB, b);
            totalB += b;
            count++;
          }
        }
        
        const contrast = maxB - minB;
        const avgB = totalB / count;
        
        if (contrast > detectionThreshold) {
          found.push({
            x: gx + gridSize / 2,
            y: gy + gridSize / 2,
            w: gridSize * (0.8 + Math.random() * 0.4),
            h: gridSize * (0.8 + Math.random() * 0.4),
            contrast,
            brightness: avgB,
            id: Math.floor(Math.random() * 9000 + 1000),
          });
        }
      }
    }
    
    return found.sort((a, b) => b.contrast - a.contrast).slice(0, targets);
  };
  
  const detectedTargets = findTargets();
  
  // Use colors from parameters
  const main = mainColor || '#00ff00';
  const accent = accentColor || '#00ffff';
  
  const currentStyle = {
    color: main,
    accentColor: accent,
    bgColor: hexToRgba(main, 0.1),
    accentBgColor: hexToRgba(accent, 0.1),
    font: 'JetBrains Mono',
    cornerSize: 0.2,
  };
  
  const glitchOffset = glitch ? Math.sin(time * 10) * 3 * (1 + audioBoost) : 0;
  
  // ===== SCANLINE =====
  if (scanline) {
    const scanY = (time * 100 * (1 + audioBoost)) % canvas.height;
    
    ctx.fillStyle = currentStyle.accentColor;
    ctx.globalAlpha = 0.4;
    ctx.fillRect(0, scanY, canvas.width, 2);
    
    const gradient = ctx.createLinearGradient(0, scanY - 20, 0, scanY + 20);
    gradient.addColorStop(0, 'transparent');
    gradient.addColorStop(0.5, currentStyle.accentBgColor);
    gradient.addColorStop(1, 'transparent');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, scanY - 20, canvas.width, 40);
    ctx.globalAlpha = 1;
  }
  
  // ===== GRID OVERLAY =====
  if (grid) {
    ctx.strokeStyle = currentStyle.color;
    ctx.globalAlpha = 0.1;
    ctx.lineWidth = 0.5;
    
    const gridSpacing = 50;
    for (let x = 0; x < canvas.width; x += gridSpacing) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += gridSpacing) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }
  
  // ===== TARGETING ELEMENTS =====
  detectedTargets.forEach((target, idx) => {
    const { x, y, w, h, id, contrast } = target;
    const halfW = w / 2;
    const halfH = h / 2;
    const cornerLen = Math.min(w, h) * currentStyle.cornerSize;
    const pulse = Math.sin(time * 3 + idx) * 0.3 + 0.7;
    const audioScale = 1 + audioBoost * 0.2;
    
    ctx.strokeStyle = currentStyle.color;
    ctx.lineWidth = 2;
    ctx.globalAlpha = pulse;
    
    // ===== CORNER BRACKETS =====
    if (brackets) {
      ctx.beginPath();
      // Top-left
      ctx.moveTo(x - halfW + glitchOffset, y - halfH + cornerLen);
      ctx.lineTo(x - halfW + glitchOffset, y - halfH);
      ctx.lineTo(x - halfW + cornerLen + glitchOffset, y - halfH);
      // Top-right
      ctx.moveTo(x + halfW - cornerLen + glitchOffset, y - halfH);
      ctx.lineTo(x + halfW + glitchOffset, y - halfH);
      ctx.lineTo(x + halfW + glitchOffset, y - halfH + cornerLen);
      // Bottom-right
      ctx.moveTo(x + halfW + glitchOffset, y + halfH - cornerLen);
      ctx.lineTo(x + halfW + glitchOffset, y + halfH);
      ctx.lineTo(x + halfW - cornerLen + glitchOffset, y + halfH);
      // Bottom-left
      ctx.moveTo(x - halfW + cornerLen + glitchOffset, y + halfH);
      ctx.lineTo(x - halfW + glitchOffset, y + halfH);
      ctx.lineTo(x - halfW + glitchOffset, y + halfH - cornerLen);
      ctx.stroke();
    }
    
    // ===== CROSSHAIRS =====
    if (crosshairs) {
      const crossSize = 8 * audioScale;
      ctx.strokeStyle = currentStyle.accentColor;
      ctx.beginPath();
      ctx.moveTo(x - crossSize, y);
      ctx.lineTo(x + crossSize, y);
      ctx.moveTo(x, y - crossSize);
      ctx.lineTo(x, y + crossSize);
      ctx.stroke();
      
      // Center dot
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fillStyle = currentStyle.accentColor;
      ctx.fill();
      ctx.strokeStyle = currentStyle.color;
    }
    
    // ===== TRACKING DOTS =====
    if (dots) {
      const dotRadius = 3 * audioScale;
      const numDots = 8;
      const orbitRadius = Math.min(halfW, halfH) * 0.8;
      const rotationSpeed = time * 2;
      
      // Orbiting dots around target
      for (let d = 0; d < numDots; d++) {
        const angle = (d / numDots) * Math.PI * 2 + rotationSpeed + idx;
        const dotX = x + Math.cos(angle) * orbitRadius;
        const dotY = y + Math.sin(angle) * orbitRadius;
        const dotPulse = Math.sin(time * 5 + d) * 0.3 + 0.7;
        
        ctx.globalAlpha = pulse * dotPulse;
        ctx.beginPath();
        ctx.arc(dotX + glitchOffset, dotY, dotRadius, 0, Math.PI * 2);
        ctx.fillStyle = d % 2 === 0 ? currentStyle.color : currentStyle.accentColor;
        ctx.fill();
      }
      
      // Corner dots (static)
      ctx.globalAlpha = pulse * 0.9;
      const cornerDots = [
        { dx: -halfW, dy: -halfH },
        { dx: halfW, dy: -halfH },
        { dx: halfW, dy: halfH },
        { dx: -halfW, dy: halfH },
      ];
      
      for (const corner of cornerDots) {
        ctx.beginPath();
        ctx.arc(x + corner.dx + glitchOffset, y + corner.dy, dotRadius * 1.2, 0, Math.PI * 2);
        ctx.fillStyle = currentStyle.accentColor;
        ctx.fill();
        ctx.strokeStyle = currentStyle.color;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      
      // Midpoint dots on edges
      const midDots = [
        { dx: 0, dy: -halfH },
        { dx: halfW, dy: 0 },
        { dx: 0, dy: halfH },
        { dx: -halfW, dy: 0 },
      ];
      
      for (const mid of midDots) {
        ctx.beginPath();
        ctx.arc(x + mid.dx + glitchOffset, y + mid.dy, dotRadius * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = currentStyle.color;
        ctx.fill();
      }
      
      ctx.globalAlpha = pulse;
      ctx.lineWidth = 2;
    }
    
    // ===== LABELS (ID, coords, status) =====
    if (labels) {
      ctx.globalAlpha = 0.9;
      ctx.font = `10px ${currentStyle.font}`;
      ctx.fillStyle = currentStyle.color;
      
      ctx.fillText(`ID:${id}`, x - halfW + glitchOffset, y - halfH - 8);
      ctx.fillText(`X:${Math.floor(x)} Y:${Math.floor(y)}`, x - halfW + glitchOffset, y + halfH + 15);
      
      const status = contrast > 100 ? 'LOCKED' : 'TRACKING';
      ctx.fillText(status, x + halfW - 50 + glitchOffset, y - halfH - 8);
    }
    
    // ===== CONNECTION LINES =====
    if (lines && idx < 3) {
      ctx.globalAlpha = 0.4;
      ctx.beginPath();
      ctx.setLineDash([4, 4]);
      ctx.moveTo(x + halfW, y);
      ctx.lineTo(canvas.width - 10, 30 + idx * 60);
      ctx.stroke();
      ctx.setLineDash([]);
    }
    
    // ===== DATA BOXES =====
    if (databoxes && idx < 3) {
      ctx.globalAlpha = 0.8;
      ctx.fillStyle = currentStyle.accentBgColor;
      ctx.fillRect(canvas.width - 120, 15 + idx * 60, 110, 50);
      ctx.strokeStyle = currentStyle.accentColor;
      ctx.strokeRect(canvas.width - 120, 15 + idx * 60, 110, 50);
      
      ctx.fillStyle = currentStyle.color;
      ctx.font = `9px ${currentStyle.font}`;
      ctx.fillText(`TARGET ${idx + 1}`, canvas.width - 115, 30 + idx * 60);
      ctx.font = `9px ${currentStyle.font}`;
      ctx.fillStyle = currentStyle.accentColor;
      ctx.fillText(`CONF: ${Math.floor(contrast / 2)}%`, canvas.width - 115, 42 + idx * 60);
      ctx.fillStyle = currentStyle.color;
      ctx.fillText(`SIZE: ${Math.floor(w)}x${Math.floor(h)}`, canvas.width - 115, 54 + idx * 60);
    }
    
    ctx.globalAlpha = 1;
  });
  
  // ===== CORNER FRAME =====
  if (frame) {
    ctx.strokeStyle = currentStyle.accentColor;
    ctx.globalAlpha = 0.6;
    ctx.lineWidth = 2;
    const frameCorner = 40;
    
    ctx.beginPath();
    ctx.moveTo(0, frameCorner);
    ctx.lineTo(0, 0);
    ctx.lineTo(frameCorner, 0);
    ctx.moveTo(canvas.width - frameCorner, 0);
    ctx.lineTo(canvas.width, 0);
    ctx.lineTo(canvas.width, frameCorner);
    ctx.moveTo(canvas.width, canvas.height - frameCorner);
    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(canvas.width - frameCorner, canvas.height);
    ctx.moveTo(frameCorner, canvas.height);
    ctx.lineTo(0, canvas.height);
    ctx.lineTo(0, canvas.height - frameCorner);
    ctx.stroke();
    ctx.globalAlpha = 1;
  }
  
  // ===== TIMESTAMP & COUNTER =====
  if (timestamp) {
    ctx.globalAlpha = 0.8;
    ctx.font = `11px ${currentStyle.font}`;
    ctx.fillStyle = currentStyle.accentColor;
    const ts = new Date().toISOString().replace('T', ' ').substring(0, 19);
    ctx.fillText(`REC ● ${ts}`, 10, canvas.height - 10);
    ctx.fillStyle = currentStyle.color;
    ctx.fillText(`${detectedTargets.length} TARGETS DETECTED`, 10, 20);
    ctx.globalAlpha = 1;
  }
}

// Apply motion mask - show moving areas, black out static
export function applyMotionMask(ctx, canvas, params, time, audioData, state) {
  const { blockSize, sensitivity, fade, trail, borderColor, showBorders, invert } = params;
  const audioBoost = audioData?.overall || 0;
  
  const width = canvas.width;
  const height = canvas.height;
  
  // Get current frame
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;
  
  // Initialize state
  if (!state.prevFrame) {
    state.prevFrame = new Uint8ClampedArray(data);
    state.motionHistory = null;
  }
  
  const block = Math.max(5, blockSize);
  const cols = Math.ceil(width / block);
  const rows = Math.ceil(height / block);
  
  // Initialize motion history for trails
  if (!state.motionHistory || state.motionHistory.length !== cols * rows) {
    state.motionHistory = new Float32Array(cols * rows);
  }
  
  const motionThreshold = (101 - sensitivity) * 3;
  const trailDecay = 1 - (trail / 100) * 0.3;
  
  // Parse border color
  const parseHex = (hex) => {
    const h = (hex || '#00ffff').replace('#', '');
    return {
      r: parseInt(h.substring(0, 2), 16),
      g: parseInt(h.substring(2, 4), 16),
      b: parseInt(h.substring(4, 6), 16),
    };
  };
  const border = parseHex(borderColor);
  
  // Detect motion per block
  const blockMotion = [];
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const bx = col * block;
      const by = row * block;
      const blockIdx = row * cols + col;
      
      // Calculate motion
      let motionSum = 0;
      let sampleCount = 0;
      
      for (let y = by; y < Math.min(by + block, height); y += 2) {
        for (let x = bx; x < Math.min(bx + block, width); x += 2) {
          const i = (y * width + x) * 4;
          const diff = Math.abs(data[i] - state.prevFrame[i]) +
                       Math.abs(data[i + 1] - state.prevFrame[i + 1]) +
                       Math.abs(data[i + 2] - state.prevFrame[i + 2]);
          motionSum += diff;
          sampleCount++;
        }
      }
      
      const avgMotion = sampleCount > 0 ? motionSum / sampleCount / 3 : 0;
      const hasMotion = avgMotion > motionThreshold;
      
      // Update motion history with trail
      if (hasMotion) {
        state.motionHistory[blockIdx] = 1;
      } else {
        state.motionHistory[blockIdx] *= trailDecay;
      }
      
      const motionAmount = state.motionHistory[blockIdx];
      
      blockMotion.push({
        x: bx,
        y: by,
        w: Math.min(block, width - bx),
        h: Math.min(block, height - by),
        motion: motionAmount,
        hasMotion: motionAmount > 0.1,
      });
    }
  }
  
  // Store current frame
  state.prevFrame.set(data);
  
  // Apply mask
  const fadeAmount = fade / 100;
  
  for (let i = 0; i < data.length; i += 4) {
    const x = (i / 4) % width;
    const y = Math.floor((i / 4) / width);
    const col = Math.floor(x / block);
    const row = Math.floor(y / block);
    const blockIdx = row * cols + col;
    
    if (blockIdx < blockMotion.length) {
      let motionAmount = blockMotion[blockIdx].motion;
      
      // Invert if needed
      if (invert) {
        motionAmount = 1 - motionAmount;
      }
      
      // Calculate visibility
      const visibility = Math.min(1, motionAmount + fadeAmount * (1 - motionAmount));
      
      // Apply fade to black for static areas
      data[i] = data[i] * visibility;
      data[i + 1] = data[i + 1] * visibility;
      data[i + 2] = data[i + 2] * visibility;
    }
  }
  
  ctx.putImageData(imageData, 0, 0);
  
  // Draw block borders on moving areas
  if (showBorders) {
    ctx.strokeStyle = `rgba(${border.r}, ${border.g}, ${border.b}, 0.6)`;
    ctx.lineWidth = 1;
    
    for (const b of blockMotion) {
      if (b.hasMotion) {
        const alpha = Math.min(1, b.motion * 0.8);
        ctx.strokeStyle = `rgba(${border.r}, ${border.g}, ${border.b}, ${alpha})`;
        ctx.strokeRect(b.x + 0.5, b.y + 0.5, b.w - 1, b.h - 1);
      }
    }
  }
}

// Apply point tracking - track individual moving feature points (optimized)
export function applyPointTracking(ctx, canvas, params, time, audioData, state) {
  const { points, dotSize, sensitivity, dotColor, connections, lineWidth, maxDistance } = params;
  const audioBoost = audioData?.overall || 0;
  
  const width = canvas.width;
  const height = canvas.height;
  
  // Downsample for motion detection (2x faster)
  const scale = 0.5;
  const smallWidth = Math.floor(width * scale);
  const smallHeight = Math.floor(height * scale);
  
  // Get current frame at reduced resolution
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = smallWidth;
  tempCanvas.height = smallHeight;
  const tempCtx = tempCanvas.getContext('2d');
  tempCtx.drawImage(canvas, 0, 0, smallWidth, smallHeight);
  
  const imageData = tempCtx.getImageData(0, 0, smallWidth, smallHeight);
  const data = imageData.data;
  
  // Initialize state
  if (!state.prevFrame || state.prevFrame.length !== data.length) {
    state.prevFrame = new Uint8ClampedArray(data);
    state.trackedPoints = [];
    
    // Initialize tracking points spread across canvas
    for (let i = 0; i < points; i++) {
      state.trackedPoints.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: 0,
        vy: 0,
        intensity: 1,
      });
    }
  }
  
  // Parse dot color
  const parseHex = (hex) => {
    const h = (hex || '#ff0000').replace('#', '');
    return {
      r: parseInt(h.substring(0, 2), 16),
      g: parseInt(h.substring(2, 4), 16),
      b: parseInt(h.substring(4, 6), 16),
    };
  };
  const color = parseHex(dotColor);
  
  const motionThreshold = (101 - sensitivity) * 2;
  
  // Update each tracked point - detect motion and track movement
  for (let i = 0; i < state.trackedPoints.length; i++) {
    const point = state.trackedPoints[i];
    
    const sx = Math.floor(point.x * scale);
    const sy = Math.floor(point.y * scale);
    
    // Sample area around point to detect motion direction
    const searchRadius = 5;
    let bestMotion = 0;
    let bestDx = 0;
    let bestDy = 0;
    
    for (let dy = -searchRadius; dy <= searchRadius; dy += 2) {
      for (let dx = -searchRadius; dx <= searchRadius; dx += 2) {
        const checkX = sx + dx;
        const checkY = sy + dy;
        
        if (checkX >= 0 && checkX < smallWidth && checkY >= 0 && checkY < smallHeight) {
          const idx = (checkY * smallWidth + checkX) * 4;
          
          // Compare current and previous frame to detect motion
          const diff = Math.abs(data[idx] - state.prevFrame[idx]) +
                       Math.abs(data[idx + 1] - state.prevFrame[idx + 1]) +
                       Math.abs(data[idx + 2] - state.prevFrame[idx + 2]);
          
          const motion = diff / 3;
          
          if (motion > bestMotion && motion > motionThreshold) {
            bestMotion = motion;
            bestDx = dx;
            bestDy = dy;
          }
        }
      }
    }
    
    // Update point based on detected motion
    if (bestMotion > motionThreshold) {
      // Found motion - move towards it
      point.vx = bestDx * 0.8;
      point.vy = bestDy * 0.8;
      point.intensity = Math.min(1, bestMotion / 80);
      
      // Move point
      point.x += point.vx / scale;
      point.y += point.vy / scale;
    } else {
      // No motion - quickly fade out (dots disappear on static areas)
      point.vx *= 0.5;
      point.vy *= 0.5;
      point.intensity *= 0.7; // Faster fade when no motion
      
      // Continue drifting slowly
      point.x += point.vx / scale;
      point.y += point.vy / scale;
    }
    
    // Respawn if too dim or out of bounds (only on moving areas)
    if (point.intensity < 0.3 || point.x < 0 || point.x >= width || point.y < 0 || point.y >= height) {
      // Find a location with motion - only respawn on moving areas
      let found = false;
      for (let attempt = 0; attempt < 20 && !found; attempt++) {
        const rx = Math.floor(Math.random() * smallWidth);
        const ry = Math.floor(Math.random() * smallHeight);
        const ridx = (ry * smallWidth + rx) * 4;
        
        const rdiff = Math.abs(data[ridx] - state.prevFrame[ridx]) +
                      Math.abs(data[ridx + 1] - state.prevFrame[ridx + 1]) +
                      Math.abs(data[ridx + 2] - state.prevFrame[ridx + 2]);
        
        if (rdiff / 3 > motionThreshold * 1.2) { // Higher threshold for respawn
          point.x = rx / scale;
          point.y = ry / scale;
          point.vx = 0;
          point.vy = 0;
          point.intensity = 1;
          found = true;
        }
      }
      
      if (!found) {
        // No motion found - hide point by setting intensity to 0
        point.intensity = 0;
        // Keep point position for next check
      }
    }
  }
  
  // Store current frame
  state.prevFrame.set(data);
  
  // Filter active points
  const activePoints = state.trackedPoints.filter(p => p.intensity >= 0.4);
  
  // Draw smooth curved lines between nearby dots
  if (connections && activePoints.length > 1) {
    const maxDist = maxDistance;
    const lineThickness = lineWidth || 2;
    
    ctx.strokeStyle = `rgb(${color.r}, ${color.g}, ${color.b})`;
    ctx.lineWidth = lineThickness;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    // Draw connections between nearby points
    for (let i = 0; i < activePoints.length; i++) {
      const p1 = activePoints[i];
      
      for (let j = i + 1; j < activePoints.length; j++) {
        const p2 = activePoints[j];
        
        // Calculate distance
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        // Only connect if within max distance
        if (dist < maxDist && dist > 0) {
          // Find a third point to create a smooth curve, or use control point
          const midX = (p1.x + p2.x) / 2;
          const midY = (p1.y + p2.y) / 2;
          
          // Create curve control point perpendicular to the line
          const perpX = -dy / dist;
          const perpY = dx / dist;
          
          // Curve amount based on distance (more curve for longer lines)
          const curvature = Math.min(dist * 0.15, 25);
          
          // Deterministic offset based on point positions for stable curves
          const offset = Math.sin(p1.x * 0.1 + p2.y * 0.1) * curvature;
          const controlX = midX + perpX * offset;
          const controlY = midY + perpY * offset;
          
          // Draw smooth quadratic bezier curve
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.quadraticCurveTo(controlX, controlY, p2.x, p2.y);
          ctx.stroke();
        }
      }
    }
  }
  
  // Draw tracked points (only visible on motion)
  const size = dotSize * (1 + audioBoost * 0.3);
  
  for (const point of activePoints) {
    const dotRadius = size;
    
    // Plain solid color dot - no effects, no opacity
    ctx.fillStyle = `rgb(${color.r}, ${color.g}, ${color.b})`;
    ctx.beginPath();
    ctx.arc(point.x, point.y, dotRadius, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Reusable canvas for glow effect
let glowTempCanvas = null;

// Apply glow/bloom effect (optimized - GPU compositing only)
export function applyGlow(ctx, canvas, params, time, audioData) {
  const { intensity, radius, threshold, color, grain, saturation } = params;
  const audioBoost = audioData?.overall || 0;
  
  const width = canvas.width;
  const height = canvas.height;
  
  // Reuse temp canvas
  if (!glowTempCanvas || glowTempCanvas.width !== width || glowTempCanvas.height !== height) {
    glowTempCanvas = document.createElement('canvas');
    glowTempCanvas.width = width;
    glowTempCanvas.height = height;
  }
  const tempCtx = glowTempCanvas.getContext('2d');
  
  // Copy original
  tempCtx.drawImage(canvas, 0, 0);
  
  // Apply saturation if needed
  if (saturation !== 100) {
    ctx.filter = `saturate(${saturation}%)`;
    ctx.drawImage(canvas, 0, 0);
    ctx.filter = 'none';
  }
  
  // Calculate glow parameters
  const glowIntensity = (intensity / 100) * (1 + audioBoost * 0.5);
  const blurAmount = Math.max(1, radius * (1 + audioBoost * 0.3));
  
  // Apply blur and brightness threshold using CSS filters (GPU accelerated)
  // brightness(2) + contrast(2) approximates threshold extraction
  const brightnessBoost = 1 + (255 - threshold) / 128;
  ctx.filter = `blur(${blurAmount}px) brightness(${brightnessBoost}) contrast(1.5)`;
  ctx.globalAlpha = glowIntensity;
  ctx.globalCompositeOperation = 'screen';
  ctx.drawImage(tempCtx.canvas, 0, 0);
  
  // Apply color tint if not white
  if (color && color !== '#ffffff') {
    ctx.globalCompositeOperation = 'multiply';
    ctx.fillStyle = color;
    ctx.globalAlpha = glowIntensity * 0.3;
    ctx.fillRect(0, 0, width, height);
  }
  
  // Reset
  ctx.filter = 'none';
  ctx.globalAlpha = 1;
  ctx.globalCompositeOperation = 'source-over';
  
  // Add grain if needed (simplified)
  if (grain > 0) {
    const grainAmount = (grain / 100) * 0.15 * (1 + audioBoost);
    ctx.globalAlpha = grainAmount;
    
    // Simple noise pattern using random rectangles
    const noiseSize = 4;
    for (let y = 0; y < height; y += noiseSize * 2) {
      for (let x = 0; x < width; x += noiseSize * 2) {
        const gray = Math.random() * 255 | 0;
        ctx.fillStyle = `rgb(${gray},${gray},${gray})`;
        ctx.fillRect(x, y, noiseSize, noiseSize);
      }
    }
    ctx.globalAlpha = 1;
  }
}

// Apply double exposure effect - blend multiple frames (optimized)
export function applyDoubleExposure(ctx, canvas, params, time, audioData, state) {
  const { delay, blend, mode, offsetX, offsetY, tint } = params;
  const audioBoost = audioData?.overall || 0;
  
  const width = canvas.width;
  const height = canvas.height;
  
  if (!state.frames) {
    state.frames = [];
    state.frameIndex = 0;
  }
  
  const currentImageData = ctx.getImageData(0, 0, width, height);
  const currentData = currentImageData.data;
  
  const frameDelay = Math.max(1, Math.floor(delay * (1 + audioBoost * 0.5)));
  const maxFrames = frameDelay + 1;
  
  state.frames[state.frameIndex % maxFrames] = new Uint8ClampedArray(currentData);
  state.frameIndex++;
  
  const delayedIndex = (state.frameIndex - frameDelay + maxFrames * 100) % maxFrames;
  const delayedFrame = state.frames[delayedIndex];
  
  if (!delayedFrame) return;
  
  const h = (tint || '#ffffff').replace('#', '');
  const tintR = parseInt(h.substring(0, 2), 16) / 255;
  const tintG = parseInt(h.substring(2, 4), 16) / 255;
  const tintB = parseInt(h.substring(4, 6), 16) / 255;
  
  const blendAmt = (blend / 100) * (1 + audioBoost * 0.3);
  const invBlend = 1 - blendAmt;
  const ox = (offsetX * (1 + audioBoost)) | 0;
  const oy = (offsetY * (1 + audioBoost)) | 0;
  const maxX = width - 1;
  const maxY = height - 1;
  
  for (let y = 0; y < height; y++) {
    const dy = Math.min(Math.max(y + oy, 0), maxY);
    const rowOffset = y * width;
    const delayRowOffset = dy * width;
    
    for (let x = 0; x < width; x++) {
      const i = (rowOffset + x) << 2;
      const dx = Math.min(Math.max(x + ox, 0), maxX);
      const di = (delayRowOffset + dx) << 2;
      
      const r1 = currentData[i], g1 = currentData[i + 1], b1 = currentData[i + 2];
      const r2 = delayedFrame[di] * tintR;
      const g2 = delayedFrame[di + 1] * tintG;
      const b2 = delayedFrame[di + 2] * tintB;
      
      // Inline blend modes (screen is most common)
      let br, bg, bb;
      if (mode === 0) { // Screen
        br = 255 - ((255 - r1) * (255 - r2)) / 255;
        bg = 255 - ((255 - g1) * (255 - g2)) / 255;
        bb = 255 - ((255 - b1) * (255 - b2)) / 255;
      } else if (mode === 1) { // Multiply
        br = (r1 * r2) / 255;
        bg = (g1 * g2) / 255;
        bb = (b1 * b2) / 255;
      } else if (mode === 3) { // Difference
        br = Math.abs(r1 - r2);
        bg = Math.abs(g1 - g2);
        bb = Math.abs(b1 - b2);
      } else { // Default screen
        br = 255 - ((255 - r1) * (255 - r2)) / 255;
        bg = 255 - ((255 - g1) * (255 - g2)) / 255;
        bb = 255 - ((255 - b1) * (255 - b2)) / 255;
      }
      
      currentData[i] = r1 * invBlend + br * blendAmt;
      currentData[i + 1] = g1 * invBlend + bg * blendAmt;
      currentData[i + 2] = b1 * invBlend + bb * blendAmt;
    }
  }
  
  ctx.putImageData(currentImageData, 0, 0);
}

// Apply threshold effect - high contrast black & white
export function applyThreshold(ctx, canvas, params, time, audioData) {
  const { level, noise, softness, blackColor, whiteColor, invert } = params;
  const audioBoost = audioData?.mid || 0;
  
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  
  // Parse colors
  const parseHex = (hex) => {
    const h = (hex || '#000000').replace('#', '');
    return {
      r: parseInt(h.substring(0, 2), 16),
      g: parseInt(h.substring(2, 4), 16),
      b: parseInt(h.substring(4, 6), 16),
    };
  };
  
  const dark = parseHex(blackColor);
  const light = parseHex(whiteColor);
  
  // Threshold with optional audio modulation
  const thresh = level + audioBoost * 30;
  const soft = softness || 0;
  const noiseAmount = (noise || 0) * (1 + audioBoost); // noise reacts to audio
  
  for (let i = 0; i < data.length; i += 4) {
    // Calculate brightness
    let brightness = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
    
    // Add noise to brightness before thresholding
    if (noiseAmount > 0) {
      const noiseValue = (Math.random() - 0.5) * noiseAmount * 2.55; // scale to 0-255 range
      brightness += noiseValue;
    }
    
    let factor;
    if (soft > 0) {
      // Soft threshold with gradient
      const range = soft * 2;
      const min = thresh - soft;
      const max = thresh + soft;
      if (brightness <= min) {
        factor = 0;
      } else if (brightness >= max) {
        factor = 1;
      } else {
        factor = (brightness - min) / range;
      }
    } else {
      // Hard threshold
      factor = brightness >= thresh ? 1 : 0;
    }
    
    // Apply invert if enabled
    if (invert) {
      factor = 1 - factor;
    }
    
    // Interpolate between dark and light colors
    data[i] = dark.r + (light.r - dark.r) * factor;
    data[i + 1] = dark.g + (light.g - dark.g) * factor;
    data[i + 2] = dark.b + (light.b - dark.b) * factor;
  }
  
  ctx.putImageData(imageData, 0, 0);
}

// Thermal lookup tables (pre-computed for performance)
const thermalLUTs = {};
function buildThermalLUT(paletteType) {
  if (thermalLUTs[paletteType]) return thermalLUTs[paletteType];
  
  const lut = new Uint8Array(256 * 3);
  for (let i = 0; i < 256; i++) {
    const t = i / 255;
    let r, g, b;
    
    if (paletteType === 0) {
      if (t < 0.2) { r = 0; g = 0; b = t * 5 * 255; }
      else if (t < 0.4) { r = (t - 0.2) * 5 * 255; g = 0; b = 255; }
      else if (t < 0.6) { r = 255; g = 0; b = (0.6 - t) * 5 * 255; }
      else if (t < 0.8) { r = 255; g = (t - 0.6) * 5 * 255; b = 0; }
      else { r = 255; g = 255; b = (t - 0.8) * 5 * 255; }
    } else if (paletteType === 1) {
      if (t < 0.25) { r = t * 512; g = 0; b = t * 512; }
      else if (t < 0.5) { r = 128 + (t - 0.25) * 508; g = 0; b = (0.5 - t) * 512; }
      else if (t < 0.75) { r = 255; g = (t - 0.5) * 512; b = 0; }
      else { r = 255; g = 128 + (t - 0.75) * 508; b = 0; }
    } else if (paletteType === 2) {
      r = g = b = i;
    } else {
      const hue = t * 300;
      const x = 1 - Math.abs((hue / 60) % 2 - 1);
      if (hue < 60) { r = 255; g = x * 255; b = 0; }
      else if (hue < 120) { r = x * 255; g = 255; b = 0; }
      else if (hue < 180) { r = 0; g = 255; b = x * 255; }
      else if (hue < 240) { r = 0; g = x * 255; b = 255; }
      else if (hue < 300) { r = x * 255; g = 0; b = 255; }
      else { r = 255; g = 0; b = x * 255; }
    }
    lut[i * 3] = r | 0;
    lut[i * 3 + 1] = g | 0;
    lut[i * 3 + 2] = b | 0;
  }
  thermalLUTs[paletteType] = lut;
  return lut;
}

// Apply thermal imaging effect (optimized with LUT)
export function applyThermal(ctx, canvas, params, time, audioData) {
  const { intensity, palette, contrast, blur } = params;
  const audioBoost = audioData?.overall || 0;
  
  const width = canvas.width;
  const height = canvas.height;
  
  if (blur > 0) {
    ctx.filter = `blur(${blur}px)`;
    ctx.drawImage(canvas, 0, 0);
    ctx.filter = 'none';
  }
  
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;
  const lut = buildThermalLUT(palette | 0);
  
  const contrastFactor = contrast / 50;
  const mix = intensity / 100;
  const invMix = 1 - mix;
  const audioMult = 1 + audioBoost * 0.3;
  
  for (let i = 0; i < data.length; i += 4) {
    let brightness = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
    brightness = ((brightness / 255 - 0.5) * contrastFactor + 0.5) * 255 * audioMult;
    const idx = (Math.max(0, Math.min(255, brightness)) | 0) * 3;
    
    data[i] = data[i] * invMix + lut[idx] * mix;
    data[i + 1] = data[i + 1] * invMix + lut[idx + 1] * mix;
    data[i + 2] = data[i + 2] * invMix + lut[idx + 2] * mix;
  }
  
  ctx.putImageData(imageData, 0, 0);
}

// Apply object mask effect using MediaPipe Selfie Segmentation
export async function applyObjectMask(ctx, canvas, params, time, audioData, state) {
  const { intensity, blur, invert, maskColor } = params;
  
  const width = canvas.width;
  const height = canvas.height;
  
  // Lazy load MediaPipe Selfie Segmentation
  if (!state.segmenter) {
    try {
      const { SelfieSegmentation } = await import('@mediapipe/selfie_segmentation');
      state.segmenter = new SelfieSegmentation({
        locateFile: (file) => {
          return `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${file}`;
        }
      });
      
      state.segmenter.setOptions({
        modelSelection: 1, // 0 = general, 1 = landscape (better quality)
      });
      
      state.segmenter.onResults((results) => {
        state.segmentationMask = results.segmentationMask;
      });
      
      console.log('[ObjectMask] MediaPipe initialized');
    } catch (error) {
      console.error('[ObjectMask] Failed to load MediaPipe:', error);
      return;
    }
  }
  
  // Send frame to segmenter
  if (state.segmenter && (!state.lastProcessTime || Date.now() - state.lastProcessTime > 100)) {
    state.lastProcessTime = Date.now();
    try {
      await state.segmenter.send({ image: canvas });
    } catch (error) {
      console.error('[ObjectMask] Segmentation error:', error);
    }
  }
  
  // Apply mask if available
  if (!state.segmentationMask) {
    return; // Wait for first segmentation result
  }
  
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;
  
  // Parse mask color
  const hex = maskColor.replace('#', '');
  const maskR = parseInt(hex.substr(0, 2), 16);
  const maskG = parseInt(hex.substr(2, 2), 16);
  const maskB = parseInt(hex.substr(4, 2), 16);
  
  const mixAmount = intensity / 100;
  const invertMask = invert > 0.5;
  
  // Create temporary canvas for mask with blur
  const maskCanvas = document.createElement('canvas');
  maskCanvas.width = width;
  maskCanvas.height = height;
  const maskCtx = maskCanvas.getContext('2d');
  
  // Draw segmentation mask
  maskCtx.drawImage(state.segmentationMask, 0, 0, width, height);
  
  // Apply blur to mask edges
  if (blur > 0) {
    maskCtx.filter = `blur(${blur}px)`;
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = width;
    tempCanvas.height = height;
    const tempCtx = tempCanvas.getContext('2d');
    tempCtx.drawImage(maskCanvas, 0, 0);
    maskCtx.filter = 'none';
    maskCtx.drawImage(tempCanvas, 0, 0);
  }
  
  const maskData = maskCtx.getImageData(0, 0, width, height).data;
  
  // Apply color mask based on segmentation
  for (let i = 0; i < data.length; i += 4) {
    // Mask value (0-255, where 255 = person/subject)
    let maskValue = maskData[i] / 255;
    
    // Invert if needed
    if (invertMask) {
      maskValue = 1 - maskValue;
    }
    
    // Apply color mix
    const mixStrength = maskValue * mixAmount;
    data[i] = Math.floor(data[i] * (1 - mixStrength) + maskR * mixStrength);
    data[i + 1] = Math.floor(data[i + 1] * (1 - mixStrength) + maskG * mixStrength);
    data[i + 2] = Math.floor(data[i + 2] * (1 - mixStrength) + maskB * mixStrength);
  }
  
  ctx.putImageData(imageData, 0, 0);
}

// Apply dither effect
function applyDither(ctx, canvas, params, time, audioData) {
  const { mode = 0, colors = 2, scale = 2, contrast = 50, colorMode = 0, customColor = '#00ff00' } = params;
  
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  const width = canvas.width;
  const height = canvas.height;
  
  // Bayer matrix 4x4 for ordered dithering
  const bayer4x4 = [
    [ 0,  8,  2, 10],
    [12,  4, 14,  6],
    [ 3, 11,  1,  9],
    [15,  7, 13,  5]
  ];
  
  // Bayer matrix 8x8 for larger patterns
  const bayer8x8 = [
    [ 0, 32,  8, 40,  2, 34, 10, 42],
    [48, 16, 56, 24, 50, 18, 58, 26],
    [12, 44,  4, 36, 14, 46,  6, 38],
    [60, 28, 52, 20, 62, 30, 54, 22],
    [ 3, 35, 11, 43,  1, 33,  9, 41],
    [51, 19, 59, 27, 49, 17, 57, 25],
    [15, 47,  7, 39, 13, 45,  5, 37],
    [63, 31, 55, 23, 61, 29, 53, 21]
  ];
  
  // Parse custom color
  const customR = parseInt(customColor.slice(1, 3), 16);
  const customG = parseInt(customColor.slice(3, 5), 16);
  const customB = parseInt(customColor.slice(5, 7), 16);
  
  // Contrast adjustment
  const contrastFactor = (contrast - 50) / 50;
  
  // Color quantization levels
  const levels = Math.max(2, colors);
  const step = 255 / (levels - 1);
  
  // Create output buffer for error diffusion
  const output = new Float32Array(width * height);
  
  // First pass: convert to luminance and apply contrast
  for (let i = 0; i < data.length; i += 4) {
    let lum = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
    
    // Apply contrast
    lum = ((lum / 255 - 0.5) * (1 + contrastFactor) + 0.5) * 255;
    lum = Math.max(0, Math.min(255, lum));
    
    output[i / 4] = lum;
  }
  
  // Apply dithering based on mode
  if (mode === 0) {
    // Ordered dithering (Bayer)
    const matrix = scale > 4 ? bayer8x8 : bayer4x4;
    const matrixSize = matrix.length;
    const matrixScale = scale > 4 ? 64 : 16;
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = y * width + x;
        const mx = Math.floor(x / scale) % matrixSize;
        const my = Math.floor(y / scale) % matrixSize;
        const threshold = (matrix[my][mx] / matrixScale) * 255;
        
        let lum = output[idx];
        lum = lum + (threshold - 128) * (1 / levels);
        output[idx] = Math.round(lum / step) * step;
      }
    }
  } else if (mode === 1) {
    // Floyd-Steinberg dithering
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = y * width + x;
        const oldVal = output[idx];
        const newVal = Math.round(oldVal / step) * step;
        output[idx] = newVal;
        const error = oldVal - newVal;
        
        if (x + 1 < width) output[idx + 1] += error * 7 / 16;
        if (y + 1 < height) {
          if (x > 0) output[idx + width - 1] += error * 3 / 16;
          output[idx + width] += error * 5 / 16;
          if (x + 1 < width) output[idx + width + 1] += error * 1 / 16;
        }
      }
    }
  } else if (mode === 2) {
    // Atkinson dithering
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = y * width + x;
        const oldVal = output[idx];
        const newVal = Math.round(oldVal / step) * step;
        output[idx] = newVal;
        const error = (oldVal - newVal) / 8;
        
        if (x + 1 < width) output[idx + 1] += error;
        if (x + 2 < width) output[idx + 2] += error;
        if (y + 1 < height) {
          if (x > 0) output[idx + width - 1] += error;
          output[idx + width] += error;
          if (x + 1 < width) output[idx + width + 1] += error;
        }
        if (y + 2 < height) output[idx + width * 2] += error;
      }
    }
  } else if (mode === 3) {
    // Halftone
    const dotSize = scale * 3;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = y * width + x;
        const cx = (x % dotSize) - dotSize / 2;
        const cy = (y % dotSize) - dotSize / 2;
        const dist = Math.sqrt(cx * cx + cy * cy);
        const lum = output[idx];
        const radius = (1 - lum / 255) * dotSize * 0.7;
        output[idx] = dist < radius ? 0 : 255;
      }
    }
  } else {
    // Noise/random dithering
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = y * width + x;
        const noise = (Math.random() - 0.5) * (255 / levels);
        let lum = output[idx] + noise;
        output[idx] = Math.round(lum / step) * step;
      }
    }
  }
  
  // Apply color and write back
  for (let i = 0; i < data.length; i += 4) {
    const idx = i / 4;
    let lum = Math.max(0, Math.min(255, output[idx]));
    const normalizedLum = lum / 255;
    
    if (colorMode === 0) {
      // Mono (black and custom color)
      data[i] = normalizedLum * customR;
      data[i + 1] = normalizedLum * customG;
      data[i + 2] = normalizedLum * customB;
    } else if (colorMode === 1) {
      // Sepia
      data[i] = lum * 1.2;
      data[i + 1] = lum * 0.9;
      data[i + 2] = lum * 0.6;
    } else if (colorMode === 2) {
      // Original colors, quantized
      const origLum = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
      if (origLum > 0) {
        const scale = lum / origLum;
        data[i] = Math.min(255, data[i] * scale);
        data[i + 1] = Math.min(255, data[i + 1] * scale);
        data[i + 2] = Math.min(255, data[i + 2] * scale);
      }
    } else {
      // Black and white
      data[i] = lum;
      data[i + 1] = lum;
      data[i + 2] = lum;
    }
  }
  
  ctx.putImageData(imageData, 0, 0);
}

// Apply 3D wireframe effect (optimized - no sorting, batch drawing)
function applyWireframe(ctx, canvas, params, time, audioData) {
  const { 
    gridSize = 20, 
    depth = 50, 
    rotateX = 30, 
    rotateY = 0, 
    perspective = 400,
    lineColor = '#00ff00',
    bgColor = '#000000',
    dotted = 0,
    fill = 0
  } = params;
  
  const width = canvas.width;
  const height = canvas.height;
  
  // Larger grid for performance
  const grid = Math.max(15, gridSize);
  const cols = (width / grid) | 0;
  const rows = (height / grid) | 0;
  
  // Sample at lower resolution
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;
  
  // Flat array for heights
  const heights = new Float32Array((cols + 1) * (rows + 1));
  for (let y = 0; y <= rows; y++) {
    for (let x = 0; x <= cols; x++) {
      const px = Math.min(x * grid, width - 1) | 0;
      const py = Math.min(y * grid, height - 1) | 0;
      const idx = (py * width + px) << 2;
      heights[y * (cols + 1) + x] = ((data[idx] + data[idx + 1] + data[idx + 2]) * 0.00131) * depth;
    }
  }
  
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, width, height);
  
  const angleX = rotateX * 0.01745;
  const angleY = rotateY * 0.01745;
  const cosX = Math.cos(angleX), sinX = Math.sin(angleX);
  const cosY = Math.cos(angleY), sinY = Math.sin(angleY);
  const centerX = width / 2, centerY = height / 2;
  const meshW2 = (cols * grid) / 2, meshH2 = (rows * grid) / 2;
  const depth2 = depth / 2;
  
  const r = parseInt(lineColor.slice(1, 3), 16);
  const g = parseInt(lineColor.slice(3, 5), 16);
  const b = parseInt(lineColor.slice(5, 7), 16);
  
  ctx.lineWidth = 1;
  ctx.setLineDash(dotted ? [2, 4] : []);
  ctx.strokeStyle = `rgb(${r},${g},${b})`;
  
  // Draw all lines in one batch
  ctx.beginPath();
  
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const idx = y * (cols + 1) + x;
      const h = heights[idx];
      
      // Project point
      const px = x * grid - meshW2;
      const py = y * grid - meshH2;
      const pz = h - depth2;
      const x1 = px * cosY - pz * sinY;
      const z1 = px * sinY + pz * cosY;
      const y1 = py * cosX - z1 * sinX;
      const z2 = py * sinX + z1 * cosX;
      const scale = perspective / (perspective + z2);
      const sx = centerX + x1 * scale;
      const sy = centerY + y1 * scale;
      
      // Draw lines to right and down neighbors
      if (x < cols - 1) {
        const h2 = heights[idx + 1];
        const px2 = (x + 1) * grid - meshW2;
        const pz2 = h2 - depth2;
        const x1b = px2 * cosY - pz2 * sinY;
        const z1b = px2 * sinY + pz2 * cosY;
        const y1b = py * cosX - z1b * sinX;
        const z2b = py * sinX + z1b * cosX;
        const scale2 = perspective / (perspective + z2b);
        ctx.moveTo(sx, sy);
        ctx.lineTo(centerX + x1b * scale2, centerY + y1b * scale2);
      }
      
      if (y < rows - 1) {
        const h3 = heights[idx + cols + 1];
        const py3 = (y + 1) * grid - meshH2;
        const pz3 = h3 - depth2;
        const x1c = px * cosY - pz3 * sinY;
        const z1c = px * sinY + pz3 * cosY;
        const y1c = py3 * cosX - z1c * sinX;
        const z2c = py3 * sinX + z1c * cosX;
        const scale3 = perspective / (perspective + z2c);
        ctx.moveTo(sx, sy);
        ctx.lineTo(centerX + x1c * scale3, centerY + y1c * scale3);
      }
    }
  }
  
  ctx.stroke();
  ctx.setLineDash([]);
}

// Reusable canvas for motion blur
let motionBlurCanvas = null;

// Apply motion blur effect
function applyMotionBlur(ctx, canvas, params, time, audioData, state) {
  const { mode, intensity, angle, samples, centerX, centerY, tint, fadeOut } = params;
  const audioBoost = audioData?.overall || 0;
  
  const width = canvas.width;
  const height = canvas.height;
  
  // Reuse temp canvas
  if (!motionBlurCanvas || motionBlurCanvas.width !== width || motionBlurCanvas.height !== height) {
    motionBlurCanvas = document.createElement('canvas');
    motionBlurCanvas.width = width;
    motionBlurCanvas.height = height;
  }
  const tempCtx = motionBlurCanvas.getContext('2d');
  
  // Store current frame for echo mode
  if (!state.prevFrames) {
    state.prevFrames = [];
  }
  
  // Copy current frame
  tempCtx.drawImage(canvas, 0, 0);
  
  const blurStrength = (intensity / 100) * (1 + audioBoost * 0.5);
  const numSamples = Math.max(3, Math.min(samples, 15));
  const cx = (centerX / 100) * width;
  const cy = (centerY / 100) * height;
  
  // Parse tint color
  const h = (tint || '#ffffff').replace('#', '');
  const tintR = parseInt(h.substring(0, 2), 16);
  const tintG = parseInt(h.substring(2, 4), 16);
  const tintB = parseInt(h.substring(4, 6), 16);
  const hasTint = tint && tint !== '#ffffff';
  
  if (mode === 0) {
    // DIRECTIONAL MOTION BLUR
    const rad = (angle * Math.PI) / 180;
    const maxOffset = blurStrength * 30;
    
    ctx.clearRect(0, 0, width, height);
    
    for (let i = 0; i < numSamples; i++) {
      const t = i / (numSamples - 1) - 0.5; // -0.5 to 0.5
      const offsetX = Math.cos(rad) * maxOffset * t;
      const offsetY = Math.sin(rad) * maxOffset * t;
      const alpha = fadeOut ? (1 - Math.abs(t) * 1.5) / numSamples * 2 : 1 / numSamples;
      
      ctx.globalAlpha = Math.max(0.05, alpha);
      ctx.drawImage(motionBlurCanvas, offsetX, offsetY);
    }
    
  } else if (mode === 1) {
    // RADIAL/ZOOM BLUR
    ctx.clearRect(0, 0, width, height);
    
    for (let i = 0; i < numSamples; i++) {
      const t = i / (numSamples - 1);
      const scale = 1 + (t - 0.5) * blurStrength * 0.3;
      const alpha = fadeOut ? (1 - Math.abs(t - 0.5) * 1.8) / numSamples * 2 : 1 / numSamples;
      
      ctx.globalAlpha = Math.max(0.05, alpha);
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(scale, scale);
      ctx.translate(-cx, -cy);
      ctx.drawImage(motionBlurCanvas, 0, 0);
      ctx.restore();
    }
    
  } else if (mode === 2) {
    // CIRCULAR/ROTATIONAL BLUR
    const maxRotation = blurStrength * 0.1;
    
    ctx.clearRect(0, 0, width, height);
    
    for (let i = 0; i < numSamples; i++) {
      const t = i / (numSamples - 1) - 0.5;
      const rotation = maxRotation * t;
      const alpha = fadeOut ? (1 - Math.abs(t) * 1.5) / numSamples * 2 : 1 / numSamples;
      
      ctx.globalAlpha = Math.max(0.05, alpha);
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rotation);
      ctx.translate(-cx, -cy);
      ctx.drawImage(motionBlurCanvas, 0, 0);
      ctx.restore();
    }
    
  } else if (mode === 3) {
    // ECHO/TRAIL - shows previous frames
    const maxFrames = Math.min(numSamples, 10);
    
    // Store current frame
    const frameData = tempCtx.getImageData(0, 0, width, height);
    state.prevFrames.unshift(new Uint8ClampedArray(frameData.data));
    
    // Limit stored frames
    while (state.prevFrames.length > maxFrames) {
      state.prevFrames.pop();
    }
    
    // Draw trails from oldest to newest
    ctx.clearRect(0, 0, width, height);
    
    for (let i = state.prevFrames.length - 1; i >= 0; i--) {
      const alpha = fadeOut 
        ? ((state.prevFrames.length - i) / state.prevFrames.length) * blurStrength
        : blurStrength / state.prevFrames.length;
      
      // Put frame data to temp canvas
      const imgData = new ImageData(new Uint8ClampedArray(state.prevFrames[i]), width, height);
      tempCtx.putImageData(imgData, 0, 0);
      
      ctx.globalAlpha = Math.max(0.1, alpha);
      ctx.drawImage(motionBlurCanvas, 0, 0);
    }
    
  } else if (mode === 4) {
    // SMEAR - directional with color separation
    const rad = (angle * Math.PI) / 180;
    const maxOffset = blurStrength * 40;
    
    ctx.clearRect(0, 0, width, height);
    
    // Draw with color channel separation for chromatic effect
    for (let i = 0; i < numSamples; i++) {
      const t = i / (numSamples - 1);
      const offsetX = Math.cos(rad) * maxOffset * t;
      const offsetY = Math.sin(rad) * maxOffset * t;
      const alpha = fadeOut ? (1 - t) * 0.8 : 0.5;
      
      // Slight color shift for each sample
      if (hasTint) {
        ctx.globalCompositeOperation = 'lighter';
      }
      
      ctx.globalAlpha = Math.max(0.05, alpha / numSamples * 3);
      ctx.drawImage(motionBlurCanvas, offsetX, offsetY);
    }
    
    ctx.globalCompositeOperation = 'source-over';
  }
  
  // Apply tint if not white
  if (hasTint && mode !== 3) {
    ctx.globalCompositeOperation = 'multiply';
    ctx.globalAlpha = 0.3;
    ctx.fillStyle = tint;
    ctx.fillRect(0, 0, width, height);
    ctx.globalCompositeOperation = 'source-over';
  }
  
  ctx.globalAlpha = 1;
}

// Main effect processor
export function processEffects(ctx, canvas, activeEffects, effectParams, time, audioData, effectState) {
  const effectProcessors = {
    glitch: applyGlitch,
    rgb: applyRGBShift,
    noise: applyNoise,
    vhs: applyVHS,
    pixelate: applyPixelate,
    wave: applyWave,
    invert: applyInvert,
    digits: applyDigits,
    binary: applyBinary,
    ascii: applyAscii,
    polarity: applyPolarity,
    flow: applyFlow,
    contour: applyContour,
    tracking: applyTracking,
    threshold: applyThreshold,
    doubleExposure: applyDoubleExposure,
    glow: applyGlow,
    motionMask: applyMotionMask,
    pointTracking: applyPointTracking,
    thermal: applyThermal,
    objectMask: applyObjectMask,
    dither: applyDither,
    wireframe: applyWireframe,
    motionBlur: applyMotionBlur,
  };
  
  activeEffects.forEach(async (effectId) => {
    const processor = effectProcessors[effectId];
    const params = effectParams[effectId] || {};
    
    if (processor) {
      // Effects that need state
      if (effectId === 'doubleExposure') {
        if (!effectState.doubleExposure) effectState.doubleExposure = {};
        processor(ctx, canvas, params, time, audioData, effectState.doubleExposure);
      } else if (effectId === 'motionMask') {
        if (!effectState.motionMask) effectState.motionMask = {};
        processor(ctx, canvas, params, time, audioData, effectState.motionMask);
      } else if (effectId === 'pointTracking') {
        if (!effectState.pointTracking) effectState.pointTracking = {};
        processor(ctx, canvas, params, time, audioData, effectState.pointTracking);
      } else if (effectId === 'objectMask') {
        if (!effectState.objectMask) effectState.objectMask = {};
        await processor(ctx, canvas, params, time, audioData, effectState.objectMask);
      } else if (effectId === 'motionBlur') {
        if (!effectState.motionBlur) effectState.motionBlur = {};
        processor(ctx, canvas, params, time, audioData, effectState.motionBlur);
      } else {
        processor(ctx, canvas, params, time, audioData);
      }
    }
  });
}

