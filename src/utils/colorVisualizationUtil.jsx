// Utility functions for color visualization
import { flatColors } from '../data/flatColors';

// Generate color harmonies
export const generateColorHarmonies = (baseColor) => {
  if (!baseColor) return {};
  
  // Convert hex to RGB
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };
  
  // Convert RGB to HSL
  const rgbToHsl = (r, g, b) => {
    r /= 255;
    g /= 255;
    b /= 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    
    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      
      h /= 6;
    }
    
    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };
  
  // Convert HSL to RGB
  const hslToRgb = (h, s, l) => {
    h /= 360;
    s /= 100;
    l /= 100;
    
    let r, g, b;
    
    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };
      
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }
    
    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255)
    };
  };
  
  // Convert RGB to Hex
  const rgbToHex = (r, g, b) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  };
  
  const rgb = hexToRgb(baseColor.hex);
  if (!rgb) return {};
  
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  
  // Complementary color (opposite on color wheel)
  const complementaryHue = (hsl.h + 180) % 360;
  const complementaryRgb = hslToRgb(complementaryHue, hsl.s, hsl.l);
  const complementary = rgbToHex(complementaryRgb.r, complementaryRgb.g, complementaryRgb.b);
  
  // Analogous colors (adjacent on color wheel)
  const analogous1Hue = (hsl.h + 30) % 360;
  const analogous1Rgb = hslToRgb(analogous1Hue, hsl.s, hsl.l);
  const analogous1 = rgbToHex(analogous1Rgb.r, analogous1Rgb.g, analogous1Rgb.b);
  
  const analogous2Hue = (hsl.h + 330) % 360;
  const analogous2Rgb = hslToRgb(analogous2Hue, hsl.s, hsl.l);
  const analogous2 = rgbToHex(analogous2Rgb.r, analogous2Rgb.g, analogous2Rgb.b);
  
  // Triadic colors (evenly spaced)
  const triadic1Hue = (hsl.h + 120) % 360;
  const triadic1Rgb = hslToRgb(triadic1Hue, hsl.s, hsl.l);
  const triadic1 = rgbToHex(triadic1Rgb.r, triadic1Rgb.g, triadic1Rgb.b);
  
  const triadic2Hue = (hsl.h + 240) % 360;
  const triadic2Rgb = hslToRgb(triadic2Hue, hsl.s, hsl.l);
  const triadic2 = rgbToHex(triadic2Rgb.r, triadic2Rgb.g, triadic2Rgb.b);
  
  // Split complementary
  const splitComp1Hue = (hsl.h + 150) % 360;
  const splitComp1Rgb = hslToRgb(splitComp1Hue, hsl.s, hsl.l);
  const splitComp1 = rgbToHex(splitComp1Rgb.r, splitComp1Rgb.g, splitComp1Rgb.b);
  
  const splitComp2Hue = (hsl.h + 210) % 360;
  const splitComp2Rgb = hslToRgb(splitComp2Hue, hsl.s, hsl.l);
  const splitComp2 = rgbToHex(splitComp2Rgb.r, splitComp2Rgb.g, splitComp2Rgb.b);
  
  // Tetradic (rectangular)
  const tetradic1Hue = (hsl.h + 60) % 360;
  const tetradic1Rgb = hslToRgb(tetradic1Hue, hsl.s, hsl.l);
  const tetradic1 = rgbToHex(tetradic1Rgb.r, tetradic1Rgb.g, tetradic1Rgb.b);
  
  const tetradic2Hue = (hsl.h + 180) % 360;
  const tetradic2Rgb = hslToRgb(tetradic2Hue, hsl.s, hsl.l);
  const tetradic2 = rgbToHex(tetradic2Rgb.r, tetradic2Rgb.g, tetradic2Rgb.b);
  
  const tetradic3Hue = (hsl.h + 240) % 360;
  const tetradic3Rgb = hslToRgb(tetradic3Hue, hsl.s, hsl.l);
  const tetradic3 = rgbToHex(tetradic3Rgb.r, tetradic3Rgb.g, tetradic3Rgb.b);
  
  return {
    complementary: { hex: complementary, name: `${baseColor.name} Complement` },
    analogous: [
      { hex: analogous1, name: `${baseColor.name} Analogous 1` },
      { hex: analogous2, name: `${baseColor.name} Analogous 2` }
    ],
    triadic: [
      { hex: triadic1, name: `${baseColor.name} Triadic 1` },
      { hex: triadic2, name: `${baseColor.name} Triadic 2` }
    ],
    splitComplementary: [
      { hex: splitComp1, name: `${baseColor.name} Split Comp 1` },
      { hex: splitComp2, name: `${baseColor.name} Split Comp 2` }
    ],
    tetradic: [
      { hex: tetradic1, name: `${baseColor.name} Tetradic 1` },
      { hex: tetradic2, name: `${baseColor.name} Tetradic 2` },
      { hex: tetradic3, name: `${baseColor.name} Tetradic 3` }
    ]
  };
};

// Find similar colors based on color family and group
export const findSimilarColors = (baseColor, allColors = flatColors, limit = 5) => {
  if (!baseColor) return [];
  
  // First try to find colors from the same family
  let similar = allColors.filter(color => 
    color.color_family === baseColor.color_family && color.name !== baseColor.name
  );
  
  // If not enough, add colors from the same group
  if (similar.length < limit) {
    const groupColors = allColors.filter(color => 
      color.group === baseColor.group && 
      color.name !== baseColor.name && 
      !similar.some(c => c.name === color.name)
    );
    similar = [...similar, ...groupColors];
  }
  
  // If still not enough, add colors with similar primary color
  if (similar.length < limit) {
    const primaryColors = allColors.filter(color => 
      color.primary_color === baseColor.primary_color && 
      color.name !== baseColor.name && 
      !similar.some(c => c.name === color.name)
    );
    similar = [...similar, ...primaryColors];
  }
  
  // If still not enough, just add any colors
  if (similar.length < limit) {
    const otherColors = allColors.filter(color => 
      color.name !== baseColor.name && 
      !similar.some(c => c.name === color.name)
    );
    similar = [...similar, ...otherColors];
  }
  
  return similar.slice(0, limit);
};

// Find matching colors based on temperature and tonality
export const findMatchingColors = (baseColor, allColors = flatColors, limit = 5) => {
  if (!baseColor) return [];
  
  // First try to find colors with same temperature and tonality
  let matching = allColors.filter(color => 
    color.color_temperature === baseColor.color_temperature && 
    color.tonality === baseColor.tonality && 
    color.name !== baseColor.name
  );
  
  // If not enough, add colors with same temperature
  if (matching.length < limit) {
    const tempColors = allColors.filter(color => 
      color.color_temperature === baseColor.color_temperature && 
      color.name !== baseColor.name && 
      !matching.some(c => c.name === color.name)
    );
    matching = [...matching, ...tempColors];
  }
  
  // If still not enough, add colors with same tonality
  if (matching.length < limit) {
    const tonalityColors = allColors.filter(color => 
      color.tonality === baseColor.tonality && 
      color.name !== baseColor.name && 
      !matching.some(c => c.name === color.name)
    );
    matching = [...matching, ...tonalityColors];
  }
  
  // If still not enough, add colors from same group
  if (matching.length < limit) {
    const groupColors = allColors.filter(color => 
      color.group === baseColor.group && 
      color.name !== baseColor.name && 
      !matching.some(c => c.name === color.name)
    );
    matching = [...matching, ...groupColors];
  }
  
  return matching.slice(0, limit);
};