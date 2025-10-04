/**
 * Calyco Complete Color Palette - Organized by Color Family
 *
 * IMPORTANT: Colors are filtered by "Color Family" (NOT "Group")
 * - Color Family: Used for filtering (Reds, Blues, Greens, etc.)
 * - Group: Stored as metadata only (Jewel, Earthy, Pastels, etc.)
 *
 * Data Source: calycoColorsData.js reorganized by Color Family
 * Product: Calyco Interior Latex Paint (CAL-00135), Price: ₹499/L
 */

import { calycoColorsData } from './calycoColorsData.js';

// Transform calycoColorsData to be organized by Color Family
const generateColorFamilies = () => {
  const familiesMap = {};

  // Group colors by Color Family
  Object.entries(calycoColorsData).forEach(([colorName, colorData]) => {
    const family = colorData.family || 'OTHER';

    if (!familiesMap[family]) {
      familiesMap[family] = {
        family: family,
        familyCode: family.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        colors: []
      };
    }

    familiesMap[family].colors.push({
      name: colorName,
      code: colorData.code,
      hex: colorData.hex,
      colorFamily: family,
      group: colorData.group, // Metadata only
      base: colorData.base,
      temperature: colorData.temperature,
      tonality: colorData.tonality,
      rooms: colorData.rooms,
      usage: colorData.usage,
      palette: colorData.palette
    });
  });

  // Convert to array and add color counts
  const familiesArray = Object.values(familiesMap).map(family => ({
    ...family,
    colorCount: family.colors.length
  }));

  // Sort by color count (descending)
  return familiesArray.sort((a, b) => b.colorCount - a.colorCount);
};

export const calycoColors442 = generateColorFamilies();

/**
 * Get list of all color families with counts
 * Returns: [{ name: "GREENS", code: "greens", count: 15 }, ...]
 */
export const getColorFamilies = () => {
  return calycoColors442.map(family => ({
    name: family.family,
    code: family.familyCode,
    count: family.colorCount
  }));
};

/**
 * Get all colors for a specific color family
 * @param {string} familyCode - Family code (e.g., "greens", "blues")
 */
export const getColorsByFamily = (familyCode) => {
  const family = calycoColors442.find(f => f.familyCode === familyCode);
  return family ? family.colors : [];
};

/**
 * Get all colors as a flat array
 */
export const getAllColors = () => {
  return calycoColors442.flatMap(family => family.colors);
};

/**
 * Get color by code
 * @param {string} code - Color code (e.g., "SW 9400")
 */
export const getColorByCode = (code) => {
  return getAllColors().find(color => color.code === code);
};

/**
 * Get color by name
 * @param {string} name - Color name (e.g., "Sage Whisper")
 */
export const getColorByName = (name) => {
  return getAllColors().find(color =>
    color.name.toLowerCase() === name.toLowerCase()
  );
};

/**
 * Search colors by name, code, or family
 * @param {string} searchTerm - Search term
 */
export const searchColors = (searchTerm) => {
  const term = searchTerm.toLowerCase();
  return getAllColors().filter(color =>
    color.name.toLowerCase().includes(term) ||
    color.code.toLowerCase().includes(term) ||
    color.colorFamily.toLowerCase().includes(term)
  );
};

/**
 * Get colors suitable for specific rooms
 * @param {string} room - Room name (e.g., "Bedroom", "Kitchen")
 */
export const getColorsForRoom = (room) => {
  const roomLower = room.toLowerCase();
  return getAllColors().filter(color =>
    color.rooms && color.rooms.toLowerCase().includes(roomLower)
  );
};

/**
 * Filter by temperature (Warm/Cool)
 * @param {string} temperature - "warm" or "cool"
 */
export const getColorsByTemperature = (temperature) => {
  const tempLower = temperature.toLowerCase();
  return getAllColors().filter(color =>
    color.temperature && color.temperature.toLowerCase() === tempLower
  );
};

/**
 * Filter by tonality (Light/Medium/Dark)
 * @param {string} tonality - "light", "medium", or "dark"
 */
export const getColorsByTonality = (tonality) => {
  const tonalityLower = tonality.toLowerCase();
  return getAllColors().filter(color =>
    color.tonality && color.tonality.toLowerCase() === tonalityLower
  );
};

/**
 * Get colors by group (Jewel, Earthy, Pastels, etc.)
 * Note: This is for metadata/filtering only - main filters use Color Family
 * @param {string} group - Group name
 */
export const getColorsByGroup = (group) => {
  const groupLower = group.toLowerCase();
  return getAllColors().filter(color =>
    color.group && color.group.toLowerCase() === groupLower
  );
};
