import { getAllColors } from './calycoColors.js';

const normalizeKey = (value) => String(value || '').trim().toUpperCase();

const allColors = getAllColors();

export const colorNameMapping = Object.fromEntries(
  allColors.map((color) => [normalizeKey(color.hex), color.code])
);

export const reverseColorNameMapping = Object.fromEntries(
  allColors.flatMap((color) => {
    const normalizedHex = normalizeKey(color.hex);
    const normalizedCode = normalizeKey(color.code);
    const normalizedRal = normalizeKey(color.ralCode);
    const normalizedName = normalizeKey(color.name);

    const entries = [
      [normalizedHex, color.hex],
      [normalizedCode, color.hex],
      [normalizedRal, color.hex],
      [normalizedName, color.hex],
    ];

    if (color.hexCode && color.hexCode !== color.hex) {
      entries.push([normalizeKey(color.hexCode), color.hex]);
    }

    return entries;
  })
);

export default {
  colorNameMapping,
  reverseColorNameMapping,
};
