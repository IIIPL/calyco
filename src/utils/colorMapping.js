// Comprehensive color mapping for all inspiration pages
import { getAllColors } from '../data/calycoColors.js';

// Convert array to object for lookup
const calycoColorsDataArray = getAllColors();
const calycoColorsData = {};
calycoColorsDataArray.forEach(color => {
  if (color.name) {
    calycoColorsData[color.name] = {
      code: color.code || 'CP101',
      hex: color.hex || '#CCCCCC',
      family: color.colorFamily || 'GENERAL',
      group: color.group || '',
      base: color.primary_color || '',
      temperature: color.temperature || '',
      tonality: color.tonality || '',
      rooms: color.rooms || '',
      usage: color.interiorExterior || ''
    };
  }
});

// DEPRECATED: Old placeholder colors have been replaced with database colors
// This map is kept only for legacy fallback - all colors should now be in the database
export const COMPREHENSIVE_COLOR_MAP = {};

// Function to find color with comprehensive mapping
export const findColorComprehensive = (name, roomFamily = "GENERAL") => {
  if (!name) return null;
  
  // Check new comprehensive color data first
  const colorData = calycoColorsData[name];
  if (colorData) {
    return {
      name: name,
      code: colorData.code,
      hex: colorData.hex,
      color_family: colorData.family,
      group: colorData.group,
      base: colorData.base,
      temperature: colorData.temperature,
      tonality: colorData.tonality,
      rooms: colorData.rooms,
      usage: colorData.usage
    };
  }
  
  // All colors should now be in the database
  // If not found, log warning and return null to avoid showing incorrect colors
  console.warn(`⚠️ Color "${name}" not found in database. Please add it to calycoColors.js`);

  return null;
};
