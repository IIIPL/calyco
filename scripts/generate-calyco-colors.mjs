import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SOURCE_FILE = path.join(__dirname, '..', 'data', 'calyco_colors_150.csv');
const OUTPUT_FILE = path.join(__dirname, '..', 'src', 'data', 'calycoColors.js');

const FAMILY_ORDER = [
  'Whites',
  'Grays',
  'Earth Tones',
  'Blues',
  'Greens',
  'Yellows & Golds',
  'Reds & Pinks',
  'Purples & Violets',
  'Beiges & Tans',
  'Oranges',
  'Blacks & Deep Tones',
  'Specialty Metallics',
];

const readCsv = (filePath) => {
  const raw = fs.readFileSync(filePath, 'utf8');
  const lines = raw
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

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
        cells.push(current.trim());
        current = '';
        continue;
      }

      current += char;
    }

    cells.push(current.trim());
    return cells;
  };

  const header = parseCsvLine(lines[0]);
  const records = lines.slice(1).map((line) => {
    const cells = parseCsvLine(line);
    const row = {};
    header.forEach((key, index) => {
      row[key] = cells[index] ?? '';
    });
    return row;
  });

  return records;
};

const slugify = (value) =>
  String(value || '')
    .toLowerCase()
    .trim()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const ensureHex = (value) => {
  if (!value) return '#000000';
  const trimmed = value.trim();
  if (trimmed.startsWith('#')) {
    return `#${trimmed.slice(1).toUpperCase()}`;
  }
  if (/^[0-9A-Fa-f]{6}$/.test(trimmed)) {
    return `#${trimmed.toUpperCase()}`;
  }
  return `#${trimmed.replace(/[^0-9A-Fa-f]/g, '').padStart(6, '0').slice(0, 6).toUpperCase()}`;
};

const normalizeField = (value) => {
  if (value === null || value === undefined) return '';
  const trimmed = String(value).trim();
  if (!trimmed) return '';
  if (/^(na|n\/a|nan|-|\.)$/i.test(trimmed)) return '';
  return trimmed;
};

const records = readCsv(SOURCE_FILE);

const familyBuckets = new Map();

const addColor = (row) => {
  const familyName = normalizeField(row['Color Family']) || 'Uncategorized';
  const familyCode = slugify(familyName);

  if (!familyBuckets.has(familyName)) {
    familyBuckets.set(familyName, {
      family: familyName,
      familyCode,
      colors: [],
    });
  }

  const bucket = familyBuckets.get(familyName);

  const ralCode = normalizeField(row['RAL Code']).toUpperCase();
  const calycoName = normalizeField(row['Calyco Name']);
  const hexCode = ensureHex(row['Hex Code']);
  const tone = normalizeField(row['Tone']);
  const layer = normalizeField(row['Layer']);
  const sheen = normalizeField(row['Sheen']);
  const collection = normalizeField(row['Collection']);
  const interiorUse = normalizeField(row['Interior Use']);
  const exteriorUse = normalizeField(row['Exterior Use']);
  const mood = normalizeField(row['Mood']);
  const lightReflectance = normalizeField(row['Light Reflectance']);
  const undertone = normalizeField(row['Undertone']);
  const popularity = normalizeField(row['Popularity']);
  const contractor = normalizeField(row['Contractor']).toLowerCase() === 'yes';
  const designer = normalizeField(row['Designer']).toLowerCase() === 'yes';

  const interiorExteriorSegments = [];
  if (interiorUse) interiorExteriorSegments.push(`Interior: ${interiorUse}`);
  if (exteriorUse) interiorExteriorSegments.push(`Exterior: ${exteriorUse}`);
  const interiorExteriorDetails = interiorExteriorSegments.join(' | ');
  const interiorExteriorSummary = interiorUse && exteriorUse
    ? 'Interior & Exterior'
    : interiorUse
      ? 'Interior'
      : exteriorUse
        ? 'Exterior'
        : '';

  const sheenOptions = sheen
    ? sheen.split(/[\/|,]/).map((entry) => entry.trim()).filter(Boolean)
    : [];

  const moodTags = mood
    ? mood
        .split(',')
        .map((entry) => entry.trim())
        .filter(Boolean)
    : [];

  const tags = Array.from(
    new Set(
      [
        familyName,
        ralCode,
        calycoName,
        tone,
        layer,
        undertone,
        collection,
        ...moodTags,
      ]
        .map((entry) => entry && entry.toLowerCase())
        .filter(Boolean)
    )
  );

  const colorEntry = {
    code: ralCode,
    ralCode,
    name: calycoName,
    calycoName,
    hex: hexCode,
    hexCode,
    colorFamily: familyName,
    tone,
    layer,
    sheen,
    sheenOptions,
    collection,
    interiorUse,
    exteriorUse,
    interiorExterior: interiorExteriorSummary || interiorExteriorDetails,
    interiorExteriorDetails,
    mood,
    lightReflectance,
    undertone,
    popularity,
    contractor,
    designer,
    tags,
    suitability: interiorExteriorSummary || "",

    description: mood,
    rooms: interiorUse,
    colorCollection: collection,
    colorTemperature: tone,
    temperature: tone,
    tonality: undertone,
    usage: interiorExteriorSummary || interiorExteriorDetails,
    metadata: {
      layer,
      sheenOptions,
      popularity,
      lightReflectance,
    },
  };

  bucket.colors.push(colorEntry);
};

records.forEach(addColor);

const orderedFamilies = [
  ...FAMILY_ORDER,
  ...Array.from(familyBuckets.keys()).filter((family) => !FAMILY_ORDER.includes(family)).sort(),
].map((familyName) => {
  const bucket = familyBuckets.get(familyName);
  if (!bucket) return null;
  const sortedColors = bucket.colors.slice().sort((a, b) => a.name.localeCompare(b.name));
  return {
    family: bucket.family,
    familyCode: bucket.familyCode,
    colorCount: sortedColors.length,
    colors: sortedColors,
  };
}).filter(Boolean);

const headerComment = `/**
 * Calyco Standardized Color Palette
 * Total Colors: ${orderedFamilies.reduce((total, family) => total + family.colorCount, 0)}
 * Color Families: ${orderedFamilies.length}
 *
 * Generated on: ${new Date().toISOString().split('T')[0]}
 * Source: ${path.relative(process.cwd(), SOURCE_FILE).replace(/\\\\/g, '/')}
 *
 * NOTE: File is auto-generated. Run \`node scripts/generate-calyco-colors.mjs\` after updating CSV.
 */`;

const fileContent = `${headerComment}

export const calycoColors = ${JSON.stringify(orderedFamilies, null, 2)};

export const getColorFamilies = () => {
  return calycoColors.map((family) => ({
    name: family.family,
    code: family.familyCode,
    count: family.colorCount,
  }));
};

export const getColorsByFamily = (familyCode) => {
  const normalized = String(familyCode || '').toLowerCase();
  const match = calycoColors.find(
    (family) => family.familyCode === normalized || family.family.toLowerCase() === normalized
  );
  return match ? match.colors.slice() : [];
};

export const getAllColors = () => calycoColors.flatMap((family) => family.colors);

export const getColorByCode = (code) => {
  if (!code) return undefined;
  const normalized = String(code).toLowerCase();
  return getAllColors().find(
    (color) =>
      color.code.toLowerCase() === normalized ||
      color.ralCode.toLowerCase() === normalized
  );
};

export const getColorByName = (name) => {
  if (!name) return undefined;
  const normalized = String(name).toLowerCase();
  return getAllColors().find((color) => color.name.toLowerCase() === normalized);
};

export const searchColors = (searchTerm) => {
  if (!searchTerm) return getAllColors();
  const term = String(searchTerm).toLowerCase();
  return getAllColors().filter((color) =>
    color.name.toLowerCase().includes(term) ||
    color.code.toLowerCase().includes(term) ||
    color.ralCode.toLowerCase().includes(term) ||
    color.hex.toLowerCase().includes(term) ||
    color.colorFamily.toLowerCase().includes(term) ||
    (color.collection && color.collection.toLowerCase().includes(term)) ||
    (color.mood && color.mood.toLowerCase().includes(term)) ||
    (color.tags && color.tags.some((tag) => tag.includes(term)))
  );
};

export const getColorsForRoom = (room) => {
  if (!room) return [];
  const term = String(room).toLowerCase();
  return getAllColors().filter(
    (color) =>
      (color.rooms && color.rooms.toLowerCase().includes(term)) ||
      (color.interiorUse && color.interiorUse.toLowerCase().includes(term)) ||
      (color.mood && color.mood.toLowerCase().includes(term))
  );
};

export const getColorsByTemperature = (temperature) => {
  if (!temperature) return [];
  const term = String(temperature).toLowerCase();
  return getAllColors().filter(
    (color) =>
      (color.temperature && color.temperature.toLowerCase() === term) ||
      (color.colorTemperature && color.colorTemperature.toLowerCase() === term)
  );
};

export const getColorsByLayer = (layer) => {
  if (!layer) return [];
  const term = String(layer).toLowerCase();
  return getAllColors().filter(
    (color) => color.layer && color.layer.toLowerCase() === term
  );
};

export const getColorsByCollection = (collection) => {
  if (!collection) return [];
  const term = String(collection).toLowerCase();
  return getAllColors().filter(
    (color) => color.collection && color.collection.toLowerCase().includes(term)
  );
};

export default calycoColors;
`;

fs.writeFileSync(OUTPUT_FILE, `${fileContent}\n`, 'utf8');

console.log(`Generated ${path.relative(process.cwd(), OUTPUT_FILE)} from ${path.relative(process.cwd(), SOURCE_FILE)}`);

