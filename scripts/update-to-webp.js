/**
 * Update Image References to WebP
 *
 * This script updates all PNG/JPG/JPEG references in JSX and JS files to use WebP format
 * Only updates paths that point to /Assets/ directory
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CONFIG = {
  srcDir: path.join(__dirname, '..', 'src'),
  extensions: ['.jsx', '.js'],
  imageExtensions: ['.png', '.jpg', '.jpeg'],
  dryRun: false, // Set to true to preview changes without applying them
};

// Statistics
let stats = {
  filesScanned: 0,
  filesUpdated: 0,
  replacements: 0,
};

/**
 * Check if file should be processed
 */
function shouldProcess(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return CONFIG.extensions.includes(ext);
}

/**
 * Update image references in file content
 */
function updateImageReferences(content) {
  let updatedContent = content;
  let changesMade = 0;

  // Replace .png, .jpg, .jpeg with .webp for /Assets/ paths
  // Matches: '/Assets/...filename.png' or "/Assets/...filename.jpg"
  const patterns = [
    /(['"`])([^'"`)]*\/Assets\/[^'"`)]*\.png)(['"`])/gi,
    /(['"`])([^'"`)]*\/Assets\/[^'"`)]*\.jpg)(['"`])/gi,
    /(['"`])([^'"`)]*\/Assets\/[^'"`)]*\.jpeg)(['"`])/gi,
  ];

  patterns.forEach(pattern => {
    updatedContent = updatedContent.replace(pattern, (match, quote1, imagePath, quote2) => {
      const webpPath = imagePath.replace(/\.(png|jpg|jpeg)$/i, '.webp');
      changesMade++;
      return `${quote1}${webpPath}${quote2}`;
    });
  });

  stats.replacements += changesMade;
  return { updatedContent, changesMade };
}

/**
 * Process single file
 */
function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const { updatedContent, changesMade } = updateImageReferences(content);

    if (changesMade > 0) {
      console.log(`✅ ${path.relative(CONFIG.srcDir, filePath)}: ${changesMade} replacement(s)`);

      if (!CONFIG.dryRun) {
        fs.writeFileSync(filePath, updatedContent, 'utf8');
        stats.filesUpdated++;
      }
    }
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
  }
}

/**
 * Recursively process directory
 */
function processDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    // Skip node_modules and build directories
    if (entry.name === 'node_modules' || entry.name === 'dist' || entry.name === 'build') {
      continue;
    }

    if (entry.isDirectory()) {
      processDirectory(fullPath);
    } else if (entry.isFile()) {
      stats.filesScanned++;
      if (shouldProcess(fullPath)) {
        processFile(fullPath);
      }
    }
  }
}

/**
 * Main function
 */
function main() {
  console.log('🚀 Starting Image Reference Update to WebP...\\n');
  console.log(`📁 Source Directory: ${CONFIG.srcDir}`);
  console.log(`📝 File Extensions: ${CONFIG.extensions.join(', ')}`);
  console.log(`🎨 Image Extensions: ${CONFIG.imageExtensions.join(', ')} → .webp`);
  console.log(`🔍 Mode: ${CONFIG.dryRun ? 'DRY RUN (preview only)' : 'LIVE (will update files)'}\\n`);

  const startTime = Date.now();

  // Start processing
  processDirectory(CONFIG.srcDir);

  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(2);

  // Print summary
  console.log('\\n' + '='.repeat(60));
  console.log('📊 Update Summary:');
  console.log('='.repeat(60));
  console.log(`Files scanned: ${stats.filesScanned}`);
  console.log(`Files updated: ${stats.filesUpdated}`);
  console.log(`Total replacements: ${stats.replacements}`);
  console.log(`⏱️  Time taken: ${duration}s`);
  console.log('='.repeat(60));

  if (CONFIG.dryRun) {
    console.log('\\n⚠️  DRY RUN MODE: No files were actually modified.');
    console.log('Set CONFIG.dryRun = false to apply changes.');
  } else if (stats.replacements > 0) {
    console.log('\\n✨ Success! All image references updated to WebP format.');
  } else {
    console.log('\\n✨ All image references already use WebP format!');
  }
}

// Run the script
main();
