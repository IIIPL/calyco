/**
 * Recompress Existing WebP Images
 *
 * This script recompresses existing WebP files at a lower quality (70%)
 * to improve performance while maintaining acceptable visual quality
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CONFIG = {
  quality: 70, // WebP quality (0-100) - Optimized for performance
  baseDir: path.join(__dirname, '..', 'public', 'Assets'),
};

// Statistics
let stats = {
  total: 0,
  recompressed: 0,
  errors: 0,
  totalSavings: 0,
};

/**
 * Recompress single WebP image
 */
async function recompressWebP(inputPath) {
  try {
    const tempPath = inputPath + '.tmp';

    // Get original size
    const originalSize = fs.statSync(inputPath).size;

    // Recompress
    await sharp(inputPath)
      .webp({ quality: CONFIG.quality })
      .toFile(tempPath);

    const newSize = fs.statSync(tempPath).size;
    const savings = originalSize - newSize;
    const savingsPercent = ((savings / originalSize) * 100).toFixed(1);

    // Replace original with recompressed version
    fs.unlinkSync(inputPath);
    fs.renameSync(tempPath, inputPath);

    stats.totalSavings += savings;

    console.log(
      `✅ ${path.basename(inputPath)}: ${(originalSize / 1024).toFixed(1)}KB → ${(newSize / 1024).toFixed(1)}KB (${savingsPercent}% smaller)`
    );
    stats.recompressed++;

  } catch (error) {
    console.error(`❌ Error recompressing ${path.basename(inputPath)}:`, error.message);
    stats.errors++;
  }
}

/**
 * Recursively process directory
 */
async function processDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      await processDirectory(fullPath);
    } else if (entry.isFile() && path.extname(entry.name).toLowerCase() === '.webp') {
      stats.total++;
      await recompressWebP(fullPath);
    }
  }
}

/**
 * Main function
 */
async function main() {
  console.log('🚀 Starting WebP Recompression...\n');
  console.log(`📁 Base Directory: ${CONFIG.baseDir}`);
  console.log(`🎨 New Quality: ${CONFIG.quality}%\n`);

  const startTime = Date.now();

  await processDirectory(CONFIG.baseDir);

  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(2);

  // Print summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 Recompression Summary:');
  console.log('='.repeat(60));
  console.log(`Total WebP files: ${stats.total}`);
  console.log(`✅ Recompressed: ${stats.recompressed}`);
  console.log(`❌ Errors: ${stats.errors}`);
  console.log(`💾 Total savings: ${(stats.totalSavings / 1024 / 1024).toFixed(2)} MB`);
  console.log(`⏱️  Time taken: ${duration}s`);
  console.log('='.repeat(60));

  if (stats.recompressed > 0) {
    console.log('\n✨ Success! All WebP files recompressed at 70% quality.');
    console.log('📝 This should significantly improve LCP and overall performance.');
  }
}

// Run the script
main().catch(error => {
  console.error('\n❌ Fatal Error:', error);
  process.exit(1);
});
