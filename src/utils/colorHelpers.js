// src/utils/colorHelpers.js
import { reverseColorNameMapping } from '../data/colorNameMapping';

/**
 * Convert a color value (either hex or color name) to actual hex color
 * @param {string} colorValue - Either a hex color like "#FF0000" or color name like "TB9305"
 * @returns {string} - Actual hex color value
 */
export const getActualHexColor = (colorValue) => {
  // If it's already a hex color, return as is
  if (colorValue && colorValue.startsWith('#')) {
    return colorValue;
  }
  // Otherwise, look up the color name in our mapping
  const key = typeof colorValue === 'string' ? colorValue.trim().toUpperCase() : '';
  return reverseColorNameMapping[key] || '#CCCCCC';
};

/**
 * Determine text color based on background brightness
 * @param {string} hexColor - Hex color value
 * @returns {string} - CSS class for text color
 */
export const getTextColor = (hexColor) => {
  const actualHex = getActualHexColor(hexColor);
  const r = parseInt(actualHex.substring(1, 3), 16);
  const g = parseInt(actualHex.substring(3, 5), 16);
  const b = parseInt(actualHex.substring(5, 7), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 150 ? 'text-gray-900' : 'text-white';
};

/**
 * Calculate brightness of a color for sorting purposes
 * @param {string} hexColor - Hex color value
 * @returns {number} - Brightness value (0-255)
 */
export const getColorBrightness = (hexColor) => {
  const actualHex = getActualHexColor(hexColor);
  const r = parseInt(actualHex.substring(1, 3), 16);
  const g = parseInt(actualHex.substring(3, 5), 16);
  const b = parseInt(actualHex.substring(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000;
};

/**
 * Resolve a hex color value from a color object or identifier
 * @param {object|string} color - Color object or identifier
 * @returns {string} - Hex color value with leading '#'
 */
export const resolveColorHex = (color) => {
  if (!color) {
    return '#000000';
  }

  if (typeof color === 'string') {
    return getActualHexColor(color);
  }

  const candidates = [
    color.actualHex,
    color.hex,
    color.hexCode,
    color.tintCode,
    color.code,
  ];

  for (const candidate of candidates) {
    if (!candidate) continue;
    const resolved = getActualHexColor(candidate);
    if (resolved) return resolved;
  }

  return '#000000';
};

/**
 * Get brightness for a full color object
 * @param {object|string} color - Color record or identifier
 * @returns {number} - Brightness value (0-255)
 */
export const getColorBrightnessForColor = (color) => {
  const hex = resolveColorHex(color);
  return getColorBrightness(hex);
};

/**
 * Compare function for sorting colors from lightest to darkest
 * @param {object} a - First color
 * @param {object} b - Second color
 * @returns {number} - Sort order
 */
export const compareColorsByBrightness = (a, b) => {
  return getColorBrightnessForColor(b) - getColorBrightnessForColor(a);
};
