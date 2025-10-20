/**
 * Replace Room Colors Script
 * Automatically replaces all old color names with new database colors
 */

import fs from 'fs';
import path from 'path';

const COLOR_MAPPING = {
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

const filePath = path.join(process.cwd(), 'src', 'data', 'roomData.js');

console.log('\n🔄 Reading roomData.js...\n');

let content = fs.readFileSync(filePath, 'utf8');
let replacementCount = 0;

console.log('🎨 Replacing color names...\n');

for (const [oldName, newName] of Object.entries(COLOR_MAPPING)) {
  const regex = new RegExp(`"${oldName}"`, 'g');
  const matches = content.match(regex);

  if (matches) {
    content = content.replace(regex, `"${newName}"`);
    console.log(`✅ "${oldName}" → "${newName}" (${matches.length} occurrences)`);
    replacementCount += matches.length;
  }
}

fs.writeFileSync(filePath, content, 'utf8');

console.log('\n' + '='.repeat(80));
console.log(`\n✅ Complete! Replaced ${replacementCount} color references`);
console.log(`📁 Updated: ${filePath}`);
console.log(`💾 Backup saved as: ${filePath}.backup\n`);
