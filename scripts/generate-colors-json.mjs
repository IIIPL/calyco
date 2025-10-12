import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.join(__dirname, '..');
const CSV_PATH = path.join(ROOT_DIR, 'data', 'calyco_colors_150.csv');
const OUTPUT_PATH = path.join(ROOT_DIR, 'src', 'data', 'colors.json');

const parseCsvLine = (line) => {
  const cells = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    const next = line[i + 1];

    if (char === '"' && inQuotes && next === '"') {
      current += '"';
      i += 1;
      continue;
    }

    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }

    if (char === ',' && !inQuotes) {
      cells.push(current);
      current = '';
      continue;
    }

    current += char;
  }

  cells.push(current);
  return cells.map((cell) => cell.replace(/\uFEFF/g, '').trim());
};

const slugify = (value = '') =>
  value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

const normalizeHex = (value = '') => {
  const cleaned = value.trim();
  if (!cleaned) return '';
  if (cleaned.startsWith('#')) return `#${cleaned.slice(1).toUpperCase()}`;
  if (/^[0-9a-fA-F]{6}$/.test(cleaned)) return `#${cleaned.toUpperCase()}`;
  return cleaned;
};

const toBoolean = (value = '') => {
  const normalized = value.replace(/[^\x20-\x7E]/g, '').trim().toLowerCase();
  if (!normalized) return false;
  return ['yes', 'true', '1'].includes(normalized);
};

const clean = (value = '') => value.replace(/[^\x20-\x7E]/g, '').trim();

const rawCsv = fs.readFileSync(CSV_PATH, 'utf8');
const lines = rawCsv
  .split(/\r?\n/)
  .map((line) => line.trim())
  .filter((line) => line.length > 0);

if (lines.length <= 1) {
  throw new Error('CSV file does not contain data rows.');
}

const headers = parseCsvLine(lines[0]);
const rows = lines.slice(1).map(parseCsvLine);

const records = rows
  .map((cells) => {
    const record = {};
    headers.forEach((header, index) => {
      record[header] = cells[index] ?? '';
    });
    return record;
  })
  .filter((record) => clean(record['Calyco Name']).length > 0);

const colors = records.map((record) => {
  const name = clean(record['Calyco Name']);
  return {
    ralCode: clean(record['RAL Code']),
    name,
    slug: slugify(name),
    hexCode: normalizeHex(record['Hex Code']),
    colorFamily: clean(record['Color Family']),
    tone: clean(record['Tone']),
    layer: clean(record['Layer']),
    sheen: clean(record['Sheen']),
    collection: clean(record['Collection']),
    interiorUse: clean(record['Interior Use']).replace(/^"|"$/g, ''),
    exteriorUse: clean(record['Exterior Use']).replace(/^"|"$/g, ''),
    mood: clean(record['Mood']).replace(/^"|"$/g, ''),
    lightReflectance: clean(record['Light Reflectance']),
    undertone: clean(record['Undertone']),
    popularity: clean(record['Popularity']),
    contractor: toBoolean(record['Contractor']),
    designer: toBoolean(record['Designer']),
  };
});

fs.writeFileSync(OUTPUT_PATH, `${JSON.stringify(colors, null, 2)}\n`, 'utf8');
console.log(`Generated ${colors.length} color entries at ${OUTPUT_PATH}`);
