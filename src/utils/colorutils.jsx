// src/utils/colorUtils.js

// Convert HEX to RGB
export const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };
  
  // Convert RGB to HEX
  export const rgbToHex = (r, g, b) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  };
  
  // Calculate color luminance to determine text contrast
  export const getLuminance = (hexColor) => {
    const rgb = hexToRgb(hexColor);
    if (!rgb) return 0;
    
    const [r, g, b] = [rgb.r / 255, rgb.g / 255, rgb.b / 255];
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    
    return luminance;
  };
  
  // Get contrasting text color (black or white) based on background
  export const getContrastTextColor = (hexColor) => {
    return getLuminance(hexColor) > 0.5 ? '#000000' : '#FFFFFF';
  };
  
  // Generate complementary color
  export const getComplementaryColor = (hexColor) => {
    const rgb = hexToRgb(hexColor);
    if (!rgb) return '#000000';
    
    return rgbToHex(255 - rgb.r, 255 - rgb.g, 255 - rgb.b);
  };
  
  // Generate analogous colors (colors adjacent on the color wheel)
  export const getAnalogousColors = (hexColor) => {
    const rgb = hexToRgb(hexColor);
    if (!rgb) return [];
    
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    
    // Convert HSL to RGB for adjacent hues
    const analogous1 = hslToRgb((hsl.h + 30) % 360, hsl.s, hsl.l);
    const analogous2 = hslToRgb((hsl.h + 330) % 360, hsl.s, hsl.l);
    
    return [
      rgbToHex(analogous1.r, analogous1.g, analogous1.b),
      rgbToHex(analogous2.r, analogous2.g, analogous2.b)
    ];
  };
  
  // Generate triadic colors (three colors evenly spaced on the color wheel)
  export const getTriadicColors = (hexColor) => {
    const rgb = hexToRgb(hexColor);
    if (!rgb) return [];
    
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    
    const triadic1 = hslToRgb((hsl.h + 120) % 360, hsl.s, hsl.l);
    const triadic2 = hslToRgb((hsl.h + 240) % 360, hsl.s, hsl.l);
    
    return [
      rgbToHex(triadic1.r, triadic1.g, triadic1.b),
      rgbToHex(triadic2.r, triadic2.g, triadic2.b)
    ];
  };
  
  // Helper function: RGB to HSL conversion
  const rgbToHsl = (r, g, b) => {
    r /= 255;
    g /= 255;
    b /= 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    
    if (max === min) {
      h = s = 0; // achromatic
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
  
  // Helper function: HSL to RGB conversion
  const hslToRgb = (h, s, l) => {
    h /= 360;
    s /= 100;
    l /= 100;
    
    let r, g, b;
    
    if (s === 0) {
      r = g = b = l; // achromatic
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