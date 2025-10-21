import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';

const REQUIRED_FILES = ['colors.csv', 'pricing.json', 'products.json'];
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LOCAL_DATA_DIR = path.resolve(__dirname, '..', 'src', 'data', 'admin');
const GENERATORS = ['generateColors.js', 'generateProducts.js'];

async function main() {
  const sourceDir = resolveSourceDir();
  verifyDirectory(sourceDir);
  await fs.promises.mkdir(LOCAL_DATA_DIR, { recursive: true });

  const transferred = [];

  for (const fileName of REQUIRED_FILES) {
    const sourcePath = path.join(sourceDir, fileName);
    const destPath = path.join(LOCAL_DATA_DIR, fileName);

    await verifySourceFile(sourcePath, fileName);
    await validateFile(sourcePath, fileName);

    let copied = true;

    if (path.resolve(sourcePath) === path.resolve(destPath)) {
      console.warn(`[INFO] Source and destination are the same for ${fileName}; skipping copy.`);
      copied = false;
    } else {
      await fs.promises.copyFile(sourcePath, destPath);
    }

    if (copied) {
      transferred.push(fileName);
    }
  }

  for (const scriptName of GENERATORS) {
    await runGeneratorIfPresent(scriptName);
  }

  if (transferred.length) {
      console.log(`[OK] Sync complete. Updated files: ${transferred.join(', ')}`);
  } else {
    console.log('[OK] Sync complete. No files were copied (source matched destination).');
  }
}

function resolveSourceDir() {
  const args = process.argv.slice(2);
  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];
    if (arg === '--source' || arg === '-s') {
      return path.resolve(args[i + 1] || '');
    }
    if (arg.startsWith('--source=')) {
      return path.resolve(arg.split('=')[1] || '');
    }
  }

  const envPath = process.env.ADMIN_SHARED_DIR;
  return envPath ? path.resolve(envPath) : '';
}

function verifyDirectory(dirPath) {
  if (!dirPath) {
    console.error('[ERROR] No source directory specified. Set ADMIN_SHARED_DIR or pass --source <path>.');
    process.exit(1);
  }
  if (!fs.existsSync(dirPath) || !fs.statSync(dirPath).isDirectory()) {
    console.error(`[ERROR] Source directory does not exist or is not a directory: ${dirPath}`);
    process.exit(1);
  }
}

async function verifySourceFile(filePath, fileName) {
  try {
    const stats = await fs.promises.stat(filePath);
    if (!stats.isFile()) {
      throw new Error(`${fileName} is not a regular file`);
    }
  } catch (error) {
    console.error(`[ERROR] Missing required admin data file: ${fileName} (${filePath})`);
    process.exit(1);
  }
}

async function validateFile(filePath, fileName) {
  if (fileName === 'colors.csv') {
    await validateColorsCsv(filePath);
  } else if (fileName === 'pricing.json') {
    await validatePricingJson(filePath);
  } else if (fileName === 'products.json') {
    await validateProductsJson(filePath);
  }
}

async function validateColorsCsv(filePath) {
  const content = await fs.promises.readFile(filePath, 'utf8');
  const [header] = content.split(/\r?\n/, 1);
  const expectedHeaders = ['RAL Code', 'Calyco Name', 'Hex Code', 'Color Family'];
  if (!header) {
    throw new Error('colors.csv is empty');
  }
  const headerSet = new Set(header.split(',').map((value) => value.trim()));
  for (const field of expectedHeaders) {
    if (!headerSet.has(field)) {
      throw new Error(`colors.csv is missing required column "${field}"`);
    }
  }
}

async function validatePricingJson(filePath) {
  const raw = await fs.promises.readFile(filePath, 'utf8');
  let data;
  try {
    data = JSON.parse(raw);
  } catch (error) {
    throw new Error(`pricing.json is not valid JSON: ${error.message}`);
  }

  if (typeof data !== 'object' || data === null || Array.isArray(data)) {
    throw new Error('pricing.json must be an object keyed by product handle');
  }

  for (const [productKey, productValue] of Object.entries(data)) {
    if (!productValue || typeof productValue !== 'object') {
      throw new Error(`pricing.json entry "${productKey}" must be an object`);
    }
    if (!productValue.finishes || typeof productValue.finishes !== 'object') {
      throw new Error(`pricing.json entry "${productKey}" is missing "finishes"`);
    }
  }
}

async function validateProductsJson(filePath) {
  const raw = await fs.promises.readFile(filePath, 'utf8');
  let data;
  try {
    data = JSON.parse(raw);
  } catch (error) {
    throw new Error(`products.json is not valid JSON: ${error.message}`);
  }

  if (!data || typeof data !== 'object' || !Array.isArray(data.products)) {
    throw new Error('products.json must include a "products" array');
  }

  data.products.forEach((product, index) => {
    if (!product.key || !product.name || !product.slug) {
      throw new Error(`products.json item at index ${index} is missing key/name/slug`);
    }
  });
}

async function runGeneratorIfPresent(scriptName) {
  const scriptPath = path.resolve(__dirname, scriptName);
  if (!fs.existsSync(scriptPath)) {
    console.warn(`[INFO] Skipping ${scriptName} because it was not found in the scripts directory.`);
    return;
  }

  await new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [scriptPath], { stdio: 'inherit' });
    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`${scriptName} exited with code ${code}`));
      }
    });
    child.on('error', reject);
  });
}

main().catch((error) => {
  console.error(`[ERROR] Sync failed: ${error.message}`);
  process.exit(1);
});
