/**
 * Color Matching Script
 * Finds the closest database color for each inspiration page color
 * Based on hex color similarity (Euclidean distance in RGB space)
 */

import { getAllColors } from '../src/data/calycoColors.js';

// ALL Inspiration colors that need to be matched (from COMPREHENSIVE_COLOR_MAP)
const ALL_INSPIRATION_COLORS = {
  // Already mapped (Living Room - done)
  "Classic Cream": "#F5F5DC",
  "Serene Ivory": "#F8F4E3",
  "Chalk Cream": "#F2E8DF",
  "Sky Blue": "#87CEEB",
  "Slate Stone": "#D1D3D4",
  "Vanilla Cream": "#F3E5AB",
  "Blush Petal": "#D7A9A1",
  "Greige Harmony": "#B8B8A3",
  "Ash Grey": "#696969",
  "Chalk Beige": "#F5F5DC",

  // Remaining colors to map
  "Sage Dust": "#8A9A5B",
  "Eucalyptus Breeze": "#A3B18A",
  "Mint Soft": "#A7C4A0",
  "Evening Linen": "#C9C0B9",
  "Indigo Night": "#2E3A87",
  "Graphite Grey": "#556080",
  "Ocean Mist": "#49707A",
  "Royal Indigo": "#3B2E7A",
  "Golden Clay": "#D4AF37",
  "Silk Taupe": "#A8988A",
  "Banana Cream": "#FFFACD",
  "Charcoal Smoke": "#36454F",
  "Jet Black": "#0C0C0C",
  "Earthy Terracotta": "#E2725B",
  "Clay Beige": "#D2B48C",
  "Cocoa Brown": "#D2691E",
  "Terra Blush": "#E8B4B8",
  "Blossom Warmth": "#FFB6C1",
  "Mudstone Brown": "#8B4513",
  "Deep Ocean": "#1E3A8A",
  "Glacier Mist": "#E0F2FE",
  "Molten Ember": "#B22222",
  "Maroon Velvet": "#800020",
  "Vintage Rose": "#C08081",
  "Curry Yellow": "#DAA520",
  "Forest Olive": "#556B2F",
  "Mud Brown": "#8B4513",
  "Silver Mist": "#C0C0C0",
  "Olive Grove": "#6B8E23",
  "Teal Serenity": "#008080",
  "Taupe Warmth": "#8B7355",
  "Coconut Brown": "#8B4513",
  "Pearl Blush": "#F4C2C2",
  "Plum Midnight": "#4B0082",
  "Celadon Green": "#ACE1AF",
  "Charcoal Grey": "#36454F",
  "Lilac Veil": "#E6E6FA",
  "Lotus Bloom": "#FFB6C1",
  "Sage Whisper": "#9CAF88",
  "Golden Harvest": "#DAA520"
};

// Convert hex to RGB
function hexToRgb(hex) {
  const clean = hex.replace('#', '');
  return {
    r: parseInt(clean.substr(0, 2), 16),
    g: parseInt(clean.substr(2, 2), 16),
    b: parseInt(clean.substr(4, 2), 16)
  };
}

// Calculate color distance (Euclidean distance in RGB space)
function colorDistance(hex1, hex2) {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);

  return Math.sqrt(
    Math.pow(rgb1.r - rgb2.r, 2) +
    Math.pow(rgb1.g - rgb2.g, 2) +
    Math.pow(rgb1.b - rgb2.b, 2)
  );
}

// Find closest color from database
function findClosestColor(targetHex, databaseColors) {
  let closestColor = null;
  let minDistance = Infinity;

  for (const dbColor of databaseColors) {
    const dbHex = dbColor.hex.startsWith('#') ? dbColor.hex : `#${dbColor.hex}`;
    const distance = colorDistance(targetHex, dbHex);

    if (distance < minDistance) {
      minDistance = distance;
      closestColor = {
        ...dbColor,
        distance: distance,
        distancePercent: (distance / 441.67).toFixed(2) // Max distance in RGB space is ~441.67
      };
    }
  }

  return closestColor;
}

// Main function
function matchColors() {
  const databaseColors = getAllColors();
  console.log(`\n📊 Database contains ${databaseColors.length} colors\n`);
  console.log(`🎨 Matching ${Object.keys(ALL_INSPIRATION_COLORS).length} inspiration page colors...\n`);
  console.log('='.repeat(100));

  const mappings = [];

  for (const [inspirationName, inspirationHex] of Object.entries(ALL_INSPIRATION_COLORS)) {
    const match = findClosestColor(inspirationHex, databaseColors);

    mappings.push({
      inspiration: {
        name: inspirationName,
        hex: inspirationHex,
        code: 'CP101'
      },
      database: {
        name: match.name,
        hex: match.hex.startsWith('#') ? match.hex : `#${match.hex}`,
        code: match.code || match.ralCode,
        family: match.colorFamily
      },
      similarity: {
        distance: Math.round(match.distance),
        percent: (100 - parseFloat(match.distancePercent)).toFixed(1)
      }
    });

    console.log(`\n${inspirationName} (${inspirationHex})`);
    console.log(`  → ${match.name} (${match.hex}) [${match.code || match.ralCode}]`);
    console.log(`  📐 Distance: ${Math.round(match.distance)} | Similarity: ${(100 - parseFloat(match.distancePercent)).toFixed(1)}%`);
    console.log(`  🏷️  Family: ${match.colorFamily}`);
  }

  console.log('\n' + '='.repeat(100));
  console.log('\n📋 MAPPING SUMMARY:\n');

  mappings.forEach(m => {
    console.log(`"${m.inspiration.name}" → "${m.database.name}" (${m.database.code}) - ${m.similarity.percent}% similar`);
  });

  console.log('\n' + '='.repeat(100));

  return mappings;
}

// Run the matching
const result = matchColors();

// Export for documentation
console.log('\n\n📄 COPY THIS FOR DOCUMENTATION:\n');
console.log('| Inspiration Color | Hex | Database Match | Code | Similarity |');
console.log('|------------------|-----|----------------|------|------------|');
result.forEach(m => {
  console.log(`| ${m.inspiration.name} | ${m.inspiration.hex} | ${m.database.name} | ${m.database.code} | ${m.similarity.percent}% |`);
});
