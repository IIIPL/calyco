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
  return reverseColorNameMapping[colorValue] || '#CCCCCC';
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
