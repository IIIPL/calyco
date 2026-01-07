/**
 * Create Mobile-Optimized Hero Images
 *
 * Generates smaller, mobile-optimized versions of hero images
 * to dramatically improve LCP on mobile devices
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CONFIG = {
  mobileQuality: 60, // Lower quality for mobile (smaller files)
  mobileWidth: 800, // Max width for mobile devices
  mobileHeight: 600, // Max height for mobile devices
  inputDir: path.join(__dirname, '..', 'public', 'Assets'),
};

// Hero images to optimize (from HeroSlider.jsx)
const HERO_IMAGES = [
  'home-hero/full-page.webp',
  'HERO/hero2.webp',
  'HERO/hero3_Modern_interior_wall_in_a_house_or_apartment_living_fc50ad6e-a99a-46d5-8608-8b3466c0eb0a.webp',
  'HERO/hero5-Metallic_parapet_interrupted_by_small_columns_in_a__4ebb7ad1-fde5-4e3d-a238-3c3de0f940e7.webp',
];

// Statistics
let stats = {
  total: 0,
  created: 0,
  errors: 0,
  totalSavings: 0,
};

/**
 * Create mobile version of a hero image
 */
async function createMobileVersion(relativePath) {
  try {
    const inputPath = path.join(CONFIG.inputDir, relativePath);
    const parsedPath = path.parse(inputPath);
    const outputPath = path.join(parsedPath.dir, `${parsedPath.name}-mobile${parsedPath.ext}`);

    // Check if input exists
    if (!fs.existsSync(inputPath)) {
      console.error(`❌ Input not found: ${relativePath}`);
      stats.errors++;
      return;
    }

    // Get original size
    const originalSize = fs.statSync(inputPath).size;

    // Create mobile version
    await sharp(inputPath)
      .resize(CONFIG.mobileWidth, CONFIG.mobileHeight, {
        fit: 'cover',
        position: 'center',
      })
      .webp({ quality: CONFIG.mobileQuality })
      .toFile(outputPath);

    const newSize = fs.statSync(outputPath).size;
    const savings = originalSize - newSize;
    const savingsPercent = ((savings / originalSize) * 100).toFixed(1);

    stats.totalSavings += savings;

    console.log(
      `✅ ${path.basename(relativePath)}\n   → Created: ${path.basename(outputPath)}\n   → ${(originalSize / 1024).toFixed(1)}KB → ${(newSize / 1024).toFixed(1)}KB (${savingsPercent}% smaller)\n`
    );
    stats.created++;

  } catch (error) {
    console.error(`❌ Error creating mobile version for ${relativePath}:`, error.message);
    stats.errors++;
  }
}

/**
 * Main function
 */
async function main() {
  console.log('🚀 Creating Mobile-Optimized Hero Images...\n');
  console.log(`📁 Base Directory: ${CONFIG.inputDir}`);
  console.log(`📱 Mobile Dimensions: ${CONFIG.mobileWidth}x${CONFIG.mobileHeight}`);
  console.log(`🎨 Mobile Quality: ${CONFIG.mobileQuality}%\n`);

  const startTime = Date.now();

  stats.total = HERO_IMAGES.length;

  // Process each hero image
  for (const imagePath of HERO_IMAGES) {
    await createMobileVersion(imagePath);
  }

  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(2);

  // Print summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 Mobile Hero Creation Summary:');
  console.log('='.repeat(60));
  console.log(`Total hero images: ${stats.total}`);
  console.log(`✅ Created: ${stats.created}`);
  console.log(`❌ Errors: ${stats.errors}`);
  console.log(`💾 Total savings: ${(stats.totalSavings / 1024).toFixed(2)} KB`);
  console.log(`⏱️  Time taken: ${duration}s`);
  console.log('='.repeat(60));

  if (stats.created > 0) {
    console.log('\n✨ Success! Mobile-optimized hero images created.');
    console.log('📝 Expected LCP improvement: 5.2s → 2-3s on mobile');
  }
}

// Run the script
main().catch(error => {
  console.error('\n❌ Fatal Error:', error);
  process.exit(1);
});
