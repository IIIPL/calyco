/**
 * Script to convert Excel color data to JavaScript
 *
 * USAGE:
 * 1. Export your Excel file to CSV
 * 2. Save as: C:\calyco-github\scripts\Calyco_Combined_Color_Palette_Updated.csv
 * 3. Run: node scripts/import-442-colors.js
 *
 * This will generate: src/data/calycoColors442.js
 */

const fs = require('fs');
const path = require('path');

// If you have the CSV file, uncomment and use this:
/*
const csvFilePath = path.join(__dirname, 'Calyco_Combined_Color_Palette_Updated.csv');

if (!fs.existsSync(csvFilePath)) {
  console.error('❌ CSV file not found at:', csvFilePath);
  console.error('Please export your Excel file to CSV and place it in the scripts folder');
  process.exit(1);
}

const csv = require('csv-parser');
const colors = [];

fs.createReadStream(csvFilePath)
  .pipe(csv())
  .on('data', (row) => {
    colors.push({
      code: row['Code'],
      name: row['Name'],
      hex: row['Hex'],
      colorFamily: row['Color Family'], // CRITICAL: Use Color Family, not Group
      group: row['Group'], // Store as metadata only
      interiorExterior: row['Interior/Exterior'] || '',
      colorCollection: row['Color Collection'] || '',
      description: row['Description'] || '',
      rooms: row['Rooms'] || '',
      recommendedUse: row['Recommended Use'] || '',
      colorTemperature: row['Color Temperature'] || '',
      tonality: row['Tonality'] || ''
    });
  })
  .on('end', () => {
    generateColorDatabase(colors);
  });
*/

// TEMPORARY: Manual data structure until you provide CSV
// Replace this with actual CSV import above
function generateColorDatabase(colors) {
  // Group colors by Color Family
  const colorsByFamily = {};

  colors.forEach(color => {
    const family = color.colorFamily;
    if (!colorsByFamily[family]) {
      colorsByFamily[family] = [];
    }
    colorsByFamily[family].push(color);
  });

  // Sort families by color count (descending)
  const sortedFamilies = Object.entries(colorsByFamily)
    .sort((a, b) => b[1].length - a[1].length)
    .map(([family, colors]) => ({
      family,
      familyCode: family.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      colorCount: colors.length,
      colors: colors.map(c => ({
        code: c.code,
        name: c.name,
        hex: c.hex,
        colorFamily: c.colorFamily,
        group: c.group,
        interiorExterior: c.interiorExterior,
        colorCollection: c.colorCollection
      }))
    }));

  // Generate JavaScript file
  const jsContent = `/**
 * Calyco Complete Color Palette - 442 Colors
 * Organized by Color Family (NOT Group)
 *
 * Generated from: Calyco_Combined_Color_Palette_Updated.xlsx
 * Date: ${new Date().toISOString().split('T')[0]}
 *
 * Color Family Distribution:
${sortedFamilies.map(f => ` * - ${f.family}: ${f.colorCount} colors`).join('\n')}
 *
 * Total: ${colors.length} colors
 */

export const calycoColors442 = ${JSON.stringify(sortedFamilies, null, 2)};

// Export convenience functions
export const getColorFamilies = () => {
  return calycoColors442.map(family => ({
    name: family.family,
    code: family.familyCode,
    count: family.colorCount
  }));
};

export const getColorsByFamily = (familyCode) => {
  const family = calycoColors442.find(f => f.familyCode === familyCode);
  return family ? family.colors : [];
};

export const getAllColors = () => {
  return calycoColors442.flatMap(family => family.colors);
};

export const getColorByCode = (code) => {
  return getAllColors().find(color => color.code === code);
};

export const searchColors = (searchTerm) => {
  const term = searchTerm.toLowerCase();
  return getAllColors().filter(color =>
    color.name.toLowerCase().includes(term) ||
    color.code.toLowerCase().includes(term) ||
    color.colorFamily.toLowerCase().includes(term)
  );
};
`;

  const outputPath = path.join(__dirname, '..', 'src', 'data', 'calycoColors442.js');
  fs.writeFileSync(outputPath, jsContent);

  console.log('✅ Successfully generated color database!');
  console.log(`📁 Output: ${outputPath}`);
  console.log(`\n📊 Summary:`);
  console.log(`   Total Colors: ${colors.length}`);
  console.log(`   Total Families: ${sortedFamilies.length}`);
  console.log(`\n🎨 Color Families:`);
  sortedFamilies.forEach(f => {
    console.log(`   ${f.family.padEnd(15)} - ${f.colorCount} colors`);
  });
}

console.log('╔════════════════════════════════════════════════════════════╗');
console.log('║  Calyco 442 Color Database Generator                       ║');
console.log('╚════════════════════════════════════════════════════════════╝\n');

console.log('⚠️  CSV import is commented out');
console.log('📋 Please provide the CSV file or use the manual method below\n');

// MANUAL METHOD: If you can't export to CSV, paste your data here:
console.log('═══════════════════════════════════════════════════════════');
console.log('MANUAL DATA ENTRY METHOD:');
console.log('═══════════════════════════════════════════════════════════');
console.log('Please provide the Excel data in one of these formats:');
console.log('1. Export Excel to CSV and uncomment the CSV reader code above');
console.log('2. Copy-paste the data as JSON array below');
console.log('3. Upload the Excel file to the project directory');
console.log('═══════════════════════════════════════════════════════════\n');

// EXAMPLE: Uncomment and replace with your actual data
/*
const sampleColors = [
  {
    code: 'C001',
    name: 'Emerald Green',
    hex: '#50C878',
    colorFamily: 'Greens',
    group: 'Jewel',
    interiorExterior: 'Interior',
    colorCollection: 'Premium'
  },
  // ... add all 442 colors here
];

generateColorDatabase(sampleColors);
*/

module.exports = { generateColorDatabase };
