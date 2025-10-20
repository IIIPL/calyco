/**
 * Update All Room Data Colors Script
 * Replaces all CP101 placeholder colors with database colors
 */

// Complete mapping from inspiration colors to database colors
const COLOR_MAPPING = {
  "Classic Cream": "Cream White",
  "Serene Ivory": "Pure White",
  "Chalk Cream": "Cream White",
  "Sky Blue": "Light Cyan",
  "Slate Stone": "Silver Gray",
  "Vanilla Cream": "Linen",
  "Blush Petal": "Silk Gray",
  "Greige Harmony": "Quartz Gray",
  "Ash Grey": "Slate Gray",
  "Chalk Beige": "Cream White",
  "Sage Dust": "Olive Yellow",
  "Eucalyptus Breeze": "Metallic White",
  "Mint Soft": "Quartz Gray",
  "Evening Linen": "Silk Gray",
  "Indigo Night": "Twilight Blue",
  "Graphite Grey": "Distant Blue",
  "Ocean Mist": "Cyan Turquoise",
  "Royal Indigo": "Twilight Blue",
  "Golden Clay": "Golden Temple",
  "Silk Taupe": "Pastel Violet",
  "Banana Cream": "Cream White",
  "Charcoal Smoke": "Anthracite Gray",
  "Jet Black": "Jet Black", // Already in database
  "Earthy Terracotta": "Old Rose",
  "Clay Beige": "Green Beige",
  "Cocoa Brown": "Signal Orange",
  "Terra Blush": "Linen",
  "Blossom Warmth": "Ivory",
  "Mudstone Brown": "Rustic Clay",
  "Deep Ocean": "Marine Blue",
  "Glacier Mist": "Bright White",
  "Molten Ember": "Orient Red",
  "Maroon Velvet": "Purple Red",
  "Vintage Rose": "Beige Red",
  "Curry Yellow": "Signal Yellow",
  "Forest Olive": "Sage Green",
  "Mud Brown": "Rustic Clay",
  "Silver Mist": "Concrete Shield",
  "Olive Grove": "Lime Green",
  "Teal Serenity": "Teal Blue",
  "Taupe Warmth": "Olive Earth",
  "Coconut Brown": "Rustic Clay",
  "Pearl Blush": "Ivory",
  "Plum Midnight": "Blue Lilac",
  "Celadon Green": "Pastel Green",
  "Charcoal Grey": "Anthracite Gray",
  "Lilac Veil": "Studio White",
  "Lotus Bloom": "Ivory",
  "Sage Whisper": "Pale Green",
  "Golden Harvest": "Signal Yellow"
};

console.log('\n🎨 COLOR MAPPING REFERENCE\n');
console.log('='.repeat(80));
console.log('\nUse this mapping to update roomData.js:\n');

for (const [old, newName] of Object.entries(COLOR_MAPPING)) {
  console.log(`"${old}" → "${newName}"`);
}

console.log('\n' + '='.repeat(80));
console.log(`\n✅ Total mappings: ${Object.keys(COLOR_MAPPING).length}`);
console.log('\n📝 Now update roomData.js by replacing old names with new names');
console.log('   You can use find & replace in your editor\n');
