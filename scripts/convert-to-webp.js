/**
 * Image to WebP Converter Script
 *
 * This script converts PNG and JPG images to WebP format
 * - Original files are NOT deleted (kept as backup)
 * - WebP files are created alongside originals
 * - Preserves folder structure
 * - Quality: 85% (adjustable)
 *
 * Usage: node scripts/convert-to-webp.js
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
  baseDir: path.join(__dirname, '..', 'public', 'Assets'), // Starting directory
  extensions: ['.png', '.jpg', '.jpeg'], // File types to convert
  skipFolders: [], // Folders to skip (add folder names here if needed)
  forceRecompress: false, // Set to true to recompress existing WebP files
};

// Statistics
let stats = {
  total: 0,
  converted: 0,
  skipped: 0,
  errors: 0,
};

/**
 * Check if file should be converted
 */
function shouldConvert(filePath) {
  const ext = path.extname(filePath).toLowerCase();

  // Skip if not a target extension
  if (!CONFIG.extensions.includes(ext)) {
    return false;
  }

  // Skip if WebP version already exists (unless force recompression is enabled)
  const webpPath = filePath.replace(/\.(png|jpg|jpeg)$/i, '.webp');
  if (fs.existsSync(webpPath) && !CONFIG.forceRecompress) {
    console.log(`⏭️  Skipped (WebP exists): ${path.basename(filePath)}`);
    stats.skipped++;
    return false;
  }

  return true;
}

/**
 * Convert single image to WebP
 */
async function convertToWebP(inputPath) {
  try {
    const outputPath = inputPath.replace(/\.(png|jpg|jpeg)$/i, '.webp');

    await sharp(inputPath)
      .webp({ quality: CONFIG.quality })
      .toFile(outputPath);

    const inputSize = fs.statSync(inputPath).size;
    const outputSize = fs.statSync(outputPath).size;
    const savings = ((1 - outputSize / inputSize) * 100).toFixed(1);

    console.log(`✅ Converted: ${path.basename(inputPath)} → ${path.basename(outputPath)} (${savings}% smaller)`);
    stats.converted++;

  } catch (error) {
    console.error(`❌ Error converting ${path.basename(inputPath)}:`, error.message);
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
      // Skip folders in skipFolders list
      if (CONFIG.skipFolders.includes(entry.name)) {
        console.log(`⏭️  Skipped folder: ${entry.name}`);
        continue;
      }

      // Recursively process subdirectory
      await processDirectory(fullPath);

    } else if (entry.isFile()) {
      stats.total++;

      if (shouldConvert(fullPath)) {
        await convertToWebP(fullPath);
      }
    }
  }
}

/**
 * Main function
 */
async function main() {
  console.log('🚀 Starting Image to WebP Conversion...\n');
  console.log(`📁 Base Directory: ${CONFIG.baseDir}`);
  console.log(`🎨 Quality: ${CONFIG.quality}%`);
  console.log(`📝 Extensions: ${CONFIG.extensions.join(', ')}\n`);

  // Check if sharp is installed
  try {
    await import('sharp');
  } catch (e) {
    console.error('❌ Error: sharp is not installed!');
    console.error('Run: npm install --save-dev sharp');
    process.exit(1);
  }

  // Check if base directory exists
  if (!fs.existsSync(CONFIG.baseDir)) {
    console.error(`❌ Error: Directory not found: ${CONFIG.baseDir}`);
    process.exit(1);
  }

  const startTime = Date.now();

  // Start processing
  await processDirectory(CONFIG.baseDir);

  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(2);

  // Print summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 Conversion Summary:');
  console.log('='.repeat(60));
  console.log(`Total files scanned: ${stats.total}`);
  console.log(`✅ Converted: ${stats.converted}`);
  console.log(`⏭️  Skipped: ${stats.skipped}`);
  console.log(`❌ Errors: ${stats.errors}`);
  console.log(`⏱️  Time taken: ${duration}s`);
  console.log('='.repeat(60));

  if (stats.converted > 0) {
    console.log('\n✨ Success! WebP files created alongside originals.');
    console.log('📝 Next step: Update code references from .png/.jpg to .webp');
  } else if (stats.skipped > 0) {
    console.log('\n✨ All images already have WebP versions!');
  } else {
    console.log('\n⚠️  No images were converted.');
  }
}

// Run the script
main().catch(error => {
  console.error('\n❌ Fatal Error:', error);
  process.exit(1);
});
