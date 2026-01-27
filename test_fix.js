import { getAllColors, getColorFamilies, calycoColors } from './src/data/calycoColors.js';

console.log('Testing exports...');
if (typeof getAllColors === 'function') {
    console.log('getAllColors is a function');
    try {
        const colors = getAllColors();
        console.log('getAllColors returned array of length:', colors.length);
    } catch (e) {
        console.error('getAllColors failed:', e);
    }
} else {
    console.error('getAllColors is NOT a function');
}

if (typeof getColorFamilies === 'function') {
    console.log('getColorFamilies is a function');
    try {
        const families = getColorFamilies();
        console.log('getColorFamilies returned array of length:', families.length);
    } catch (e) {
        console.error('getColorFamilies failed:', e);
    }
} else {
    console.error('getColorFamilies is NOT a function');
}

console.log('Test complete.');
