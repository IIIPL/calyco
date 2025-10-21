import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ADMIN_DIR = path.resolve(__dirname, '..', 'src', 'data', 'admin');
const DATA_DIR = path.resolve(__dirname, '..', 'src', 'data');
const COLORS_JS_PATH = path.join(DATA_DIR, 'calycoColors.js');
const COLORS_JSON_PATH = path.join(DATA_DIR, 'colors.json');

const REQUIRED_COLUMNS = [
  'RAL Code',
  'Calyco Name',
  'Hex Code',
  'Color Family',
  'Tone',
  'Layer',
  'Sheen',
  'Collection',
  'Interior Use',
  'Exterior Use',
  'Mood',
  'Light Reflectance',
  'Undertone',
  'Popularity',
  'Contractor',
  'Designer',
];

async function generateColors() {
  const csvPath = path.join(ADMIN_DIR, 'colors.csv');
  if (!fs.existsSync(csvPath)) {
    throw new Error(`Missing colors.csv at ${csvPath}. Run sync-admin-data to copy it first.`);
  }

  const csvContent = await fs.promises.readFile(csvPath, 'utf8');
  const records = parseCsv(csvContent);
  if (!records.length) {
    throw new Error('colors.csv does not contain any records.');
  }

  validateColumns(records[0]);

  const families = new Map();
  const flatColors = [];

  records.forEach((row, index) => {
    const color = transformRowToColor(row, index);
    if (!color) {
      return;
    }
    const familyName = color.colorFamily || 'Miscellaneous';
    const familyCode = slugify(familyName);

    if (!families.has(familyCode)) {
      families.set(familyCode, {
        family: familyName,
        familyCode,
        colors: [],
      });
    }
    families.get(familyCode).colors.push(color);

    flatColors.push(toFlatColor(color));
  });

  const familyArray = Array.from(families.values()).map((family) => ({
    ...family,
    colorCount: family.colors.length,
  }));

  const jsBanner = buildBanner({
    totalColors: flatColors.length,
    familyCount: familyArray.length,
    source: path.relative(path.dirname(COLORS_JS_PATH), csvPath).replace(/\\/g, '/'),
  });

  const helperExports = buildHelperExports();

  const jsBody = `export const calycoColors = ${stringify(familyArray)};

${helperExports}
export default calycoColors;
`;
  await fs.promises.writeFile(COLORS_JS_PATH, jsBanner + jsBody, 'utf8');

  await fs.promises.writeFile(COLORS_JSON_PATH, `${JSON.stringify(flatColors, null, 2)}\n`, 'utf8');

  console.log(`[OK] Generated calycoColors.js (${flatColors.length} colors across ${familyArray.length} families).`);
  console.log(`[OK] Updated colors.json with ${flatColors.length} entries.`);
}

function validateColumns(row) {
  const missing = REQUIRED_COLUMNS.filter((column) => !(column in row));
  if (missing.length) {
    throw new Error(`colors.csv is missing required columns: ${missing.join(', ')}`);
  }
}

function transformRowToColor(row, index) {
  const name = safeTrim(row['Calyco Name']);
  const hex = normalizeHex(row['Hex Code']);
  const family = safeTrim(row['Color Family']) || 'Miscellaneous';
  const ralCode = safeTrim(row['RAL Code']) || `UNSPEC-${index + 1}`;

  if (!name || !hex) {
    console.warn(`[WARN] Skipping row ${index + 1}: missing name or hex code.`);
    return null;
  }

  const tone = safeTrim(row['Tone']);
  const layer = safeTrim(row['Layer']);
  const sheen = safeTrim(row['Sheen']);
  const collection = safeTrim(row['Collection']);
  const interiorUse = safeTrim(row['Interior Use']);
  const exteriorUse = safeTrim(row['Exterior Use']);
  const mood = safeTrim(row['Mood']);
  const lightReflectance = safeTrim(row['Light Reflectance']);
  const undertone = safeTrim(row['Undertone']);
  const popularity = safeTrim(row['Popularity']);
  const contractor = toBoolean(row['Contractor']);
  const designer = toBoolean(row['Designer']);

  const sheenOptions = splitOptions(sheen);
  const suitability = computeSuitability(interiorUse, exteriorUse);
  const interiorExteriorDetails = buildInteriorExteriorDetails(interiorUse, exteriorUse);
  const tags = buildTags({
    family,
    ralCode,
    name,
    tone,
    layer,
    collection,
    mood,
    undertone,
  });

  return {
    code: ralCode,
    ralCode,
    name,
    calycoName: name,
    hex,
    hexCode: hex,
    colorFamily: family,
    tone,
    layer,
    sheen,
    sheenOptions,
    collection,
    interiorUse,
    exteriorUse,
    interiorExterior: suitability,
    interiorExteriorDetails,
    mood,
    lightReflectance,
    undertone,
    popularity,
    contractor,
    designer,
    tags,
    suitability,
    description: mood,
    rooms: interiorUse,
    colorCollection: collection,
    colorTemperature: tone,
    temperature: tone,
    tonality: undertone,
    usage: suitability,
    metadata: {
      layer,
      sheenOptions,
      popularity,
      lightReflectance,
    },
  };
}

function toFlatColor(color) {
  return {
    ralCode: color.ralCode,
    name: color.name,
    slug: slugify(color.name),
    hexCode: color.hexCode,
    colorFamily: color.colorFamily,
    tone: color.tone,
    layer: color.layer,
    sheen: color.sheen,
    collection: color.collection,
    interiorUse: color.interiorUse,
    exteriorUse: color.exteriorUse,
    mood: color.mood,
    lightReflectance: color.lightReflectance,
    undertone: color.undertone,
    popularity: color.popularity,
    contractor: color.contractor,
    designer: color.designer,
  };
}

function parseCsv(input) {
  const rows = [];
  let currentRow = [];
  let currentValue = '';
  let inQuotes = false;
  let i = 0;

  const pushValue = () => {
    currentRow.push(currentValue);
    currentValue = '';
  };

  const pushRow = () => {
    if (!currentRow.length) {
      return;
    }
    rows.push(currentRow);
    currentRow = [];
  };

  while (i < input.length) {
    const char = input[i];

    if (inQuotes) {
      if (char === '"') {
        if (input[i + 1] === '"') {
          currentValue += '"';
          i += 1;
        } else {
          inQuotes = false;
        }
      } else {
        currentValue += char;
      }
    } else if (char === '"') {
      inQuotes = true;
    } else if (char === ',') {
      pushValue();
    } else if (char === '\r') {
      // Ignore carriage returns; handle newline on next iteration
    } else if (char === '\n') {
      pushValue();
      pushRow();
    } else {
      currentValue += char;
    }
    i += 1;
  }

  // Push final value/row
  if (currentValue.length > 0 || input.endsWith(',')) {
    pushValue();
  }
  if (currentRow.length) {
    pushRow();
  }

  if (!rows.length) {
    return [];
  }

  const [header, ...dataRows] = rows;
  const trimmedHeader = header.map((column) => column.trim());

  return dataRows
    .filter((row) => row.some((value) => safeTrim(value)))
    .map((row) => {
      const entry = {};
      trimmedHeader.forEach((column, columnIndex) => {
        entry[column] = row[columnIndex] !== undefined ? row[columnIndex] : '';
      });
      return entry;
    });
}

function buildBanner({ totalColors, familyCount, source }) {
  const now = new Date();
  const generatedOn = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
    now.getDate(),
  ).padStart(2, '0')}`;

  return `/**
 * Calyco Standardized Color Palette
 * Total Colors: ${totalColors}
 * Color Families: ${familyCount}
 *
 * Generated on: ${generatedOn}
 * Source: ${source}
 *
 * NOTE: File is auto-generated. Run \`npm run generate:colors\` after updating admin/colors.csv.
 */

`;
}

function stringify(value) {
  return JSON.stringify(value, null, 2);
}

function buildHelperExports() {
  return `
const normalizeValue = (value) => {
  if (value === null || value === undefined) return '';
  return String(value).trim();
};

const normalizeLower = (value) => normalizeValue(value).toLowerCase();

const includesNormalized = (value, query) => {
  if (!query) return false;
  return normalizeLower(value).includes(query);
};

export const getColorFamilies = () =>
  calycoColors.map((family) => ({
    ...family,
    count: Array.isArray(family.colors) ? family.colors.length : 0,
  }));

export const getColorsByFamily = (familyCode) => {
  const query = normalizeLower(familyCode);
  if (!query) return [];
  const match = calycoColors.find((family) => {
    const code = normalizeLower(family.familyCode);
    const name = normalizeLower(family.family);
    return code === query || name === query;
  });
  return match && Array.isArray(match.colors) ? match.colors : [];
};

export const getAllColors = () =>
  calycoColors.flatMap((family) =>
    Array.isArray(family.colors) ? family.colors : []
  );

export const getColorByCode = (code) => {
  const query = normalizeLower(code);
  if (!query) return undefined;
  return getAllColors().find((color) => {
    const codes = [
      color.code,
      color.ralCode,
      color['RAL Code'],
    ];
    return codes.some((candidate) => normalizeLower(candidate) === query);
  });
};

export const getColorByName = (name) => {
  const query = normalizeLower(name);
  if (!query) return undefined;
  return getAllColors().find((color) => {
    const names = [
      color.name,
      color.calycoName,
      color.slug,
      normalizeValue(color.slug).replace(/-/g, ' '),
    ];
    return names.some((candidate) => normalizeLower(candidate) === query);
  });
};

export const searchColors = (searchTerm) => {
  const query = normalizeLower(searchTerm);
  if (!query) return getAllColors();
  return getAllColors().filter((color) => {
    const fields = [
      color.name,
      color.calycoName,
      color.ralCode,
      color.code,
      color.hex,
      color.collection,
      color.interiorUse,
      color.exteriorUse,
      ...(Array.isArray(color.tags) ? color.tags : []),
    ];
    return fields.some((field) => includesNormalized(field, query));
  });
};

export const getColorsForRoom = (room) => {
  const query = normalizeLower(room);
  if (!query) return [];
  return getAllColors().filter(
    (color) =>
      includesNormalized(color.rooms, query) ||
      includesNormalized(color.interiorUse, query) ||
      includesNormalized(color.exteriorUse, query)
  );
};

export const getColorsByTemperature = (temperature) => {
  const query = normalizeLower(temperature);
  if (!query) return [];
  return getAllColors().filter((color) =>
    includesNormalized(
      color.colorTemperature || color.temperature || color.tonality,
      query
    )
  );
};

export const getColorsByLayer = (layer) => {
  const query = normalizeLower(layer);
  if (!query) return [];
  return getAllColors().filter((color) =>
    includesNormalized(color.layer, query)
  );
};

export const getColorsByCollection = (collection) => {
  const query = normalizeLower(collection);
  if (!query) return [];
  return getAllColors().filter((color) =>
    includesNormalized(color.collection, query)
  );
};
`;
}

function splitOptions(value) {
  if (!value) return [];
  return value
    .split(/[\/,|]/)
    .map((option) => safeTrim(option))
    .filter(Boolean);
}

function computeSuitability(interiorUse, exteriorUse) {
  const hasInterior = Boolean(safeTrim(interiorUse) && !/^no$/i.test(interiorUse));
  const hasExterior = Boolean(safeTrim(exteriorUse) && !/^no$/i.test(exteriorUse));

  if (hasInterior && hasExterior) return 'Interior & Exterior';
  if (hasInterior) return 'Interior Only';
  if (hasExterior) return 'Exterior Only';
  return 'Unspecified';
}

function buildInteriorExteriorDetails(interiorUse, exteriorUse) {
  const parts = [];
  if (safeTrim(interiorUse)) {
    parts.push(`Interior: ${safeTrim(interiorUse)}`);
  }
  if (safeTrim(exteriorUse)) {
    parts.push(`Exterior: ${safeTrim(exteriorUse)}`);
  }
  return parts.join(' | ');
}

function buildTags({ family, ralCode, name, tone, layer, collection, mood, undertone }) {
  const tokens = new Set();
  [family, ralCode, name, tone, layer, collection, mood, undertone]
    .filter(Boolean)
    .forEach((value) => {
      tokenize(value).forEach((token) => tokens.add(token));
    });
  tokens.add(slugify(name));
  tokens.add(slugify(family));
  tokens.add(slugify(ralCode));
  return Array.from(tokens).filter(Boolean);
}

function tokenize(value) {
  return value
    .toString()
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean);
}

function slugify(value) {
  return value
    ? value
        .toString()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
    : '';
}

function safeTrim(value) {
  if (value === undefined || value === null) return '';
  return String(value).trim();
}

function normalizeHex(value) {
  const trimmed = safeTrim(value);
  if (!trimmed) return '';
  return trimmed.startsWith('#') ? trimmed.toUpperCase() : `#${trimmed.toUpperCase()}`;
}

function toBoolean(value) {
  const trimmed = safeTrim(value).toLowerCase();
  return trimmed === 'yes' || trimmed === 'true' || trimmed === '1';
}

generateColors().catch((error) => {
  console.error(`[ERROR] Failed to generate colors: ${error.message}`);
  process.exit(1);
});
