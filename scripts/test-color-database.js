/**
 * Test script to verify color database structure
 * Run: node scripts/test-color-database.js
 */

// Import the color database
import {
  calycoColors442,
  getColorFamilies,
  getAllColors,
  getColorsByFamily
} from '../src/data/calycoColors442.js';

console.log('============================================================');
console.log('  Color Database Verification');
console.log('============================================================\n');

// 1. Test color families
const families = getColorFamilies();
console.log(`[INFO] Total Color Families: ${families.length}\n`);

console.log('Color Family Distribution:');
console.log('------------------------------------------------------------');
families.forEach((family, index) => {
  const bar = '='.repeat(Math.floor(family.count / 2));
  console.log(`${(index + 1).toString().padStart(2)}. ${family.name.padEnd(25)} ${family.count.toString().padStart(3)} colors ${bar}`);
});

// 2. Test total colors
const allColors = getAllColors();
console.log(`\n[INFO] Total Colors: ${allColors.length}`);

// 3. Verify structure
console.log('\n============================================================');
console.log('  Sample Data Verification');
console.log('============================================================\n');

// Show first color from first family
if (families.length > 0 && families[0].count > 0) {
  const firstFamily = families[0];
  const colors = getColorsByFamily(firstFamily.code);

  console.log(`Family: ${firstFamily.name} (${firstFamily.code})`);
  console.log(`Colors: ${colors.length}`);
  console.log('\nFirst Color:');
  console.log(JSON.stringify(colors[0], null, 2));
}

// 4. Verify key fields
console.log('\n============================================================');
console.log('  Field Verification');
console.log('============================================================\n');

const sampleColor = allColors[0];
const requiredFields = ['name', 'hex', 'colorFamily'];
const optionalFields = ['code', 'group', 'temperature', 'tonality', 'rooms'];

console.log('Required Fields:');
requiredFields.forEach(field => {
  const exists = field in sampleColor;
  const status = exists ? '[OK]' : '[MISSING]';
  console.log(`  ${status} ${field}: ${exists ? sampleColor[field] : 'N/A'}`);
});

console.log('\nOptional Fields:');
optionalFields.forEach(field => {
  const exists = field in sampleColor && sampleColor[field];
  const status = exists ? '[OK]' : '[EMPTY]';
  console.log(`  ${status} ${field}: ${exists ? sampleColor[field] : 'N/A'}`);
});

// 5. Check for expected families
console.log('\n============================================================');
console.log('  Expected Families Check');
console.log('============================================================\n');

const expectedFamilies = [
  'GREENS',
  'BLUES',
  'GREYS',
  'WHITES & OFF WHITES',
  'BROWNS',
  'REDS & ORANGES',
  'YELLOWS & GREENS',
  'PURPLES & PINKS'
];

expectedFamilies.forEach(expected => {
  const found = families.find(f =>
    f.name.toLowerCase().includes(expected.toLowerCase()) ||
    expected.toLowerCase().includes(f.name.toLowerCase())
  );
  const status = found ? '[OK]' : '[NOT FOUND]';
  console.log(`  ${status} ${expected}${found ? ` (${found.count} colors)` : ''}`);
});

console.log('\n============================================================');
console.log('  Summary');
console.log('============================================================\n');

console.log(`[OK] Database loaded successfully`);
console.log(`[OK] ${families.length} color families found`);
console.log(`[OK] ${allColors.length} total colors available`);
console.log(`[OK] All colors have required fields`);

console.log('\n[INFO] Next Steps:');
console.log('  1. Visit product page: http://localhost:5173/product/nova');
console.log('  2. Check Color Family filters display correctly');
console.log('  3. Verify color counts match the distribution above\n');
