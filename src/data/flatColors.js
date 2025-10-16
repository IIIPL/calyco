import { getAllColors } from './calycoColors.js';

const PRIMARY_COLOR_MAP = {
  Whites: 'White',
  'Whites & Off Whites': 'White',
  'Off-Whites': 'White',
  Grays: 'Gray',
  Greys: 'Gray',
  'Earth Tones': 'Brown',
  Browns: 'Brown',
  Blues: 'Blue',
  Greens: 'Green',
  'Yellows & Golds': 'Yellow',
  'Reds & Pinks': 'Red',
  'Purples & Violets': 'Purple',
  'Beiges & Tans': 'Beige',
  Oranges: 'Orange',
  'Blacks & Deep Tones': 'Black',
  'Specialty Metallics': 'Metallic',
  Metallics: 'Metallic',
};

const toPrimaryColor = (family) => {
  if (!family) return 'Neutral';
  return PRIMARY_COLOR_MAP[family] || PRIMARY_COLOR_MAP[family.replace(/s$/, '')] || 'Neutral';
};

const normalizeArray = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value.filter(Boolean);
  return String(value)
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean);
};

const formatFlatColor = (color) => {
  const primaryColor = toPrimaryColor(color.colorFamily);
  const tags = Array.from(new Set([...(color.tags || []), primaryColor.toLowerCase()])).filter(Boolean);

  return {
    name: color.name,
    calycoName: color.calycoName,
    code: color.code,
    ralCode: color.ralCode,
    color_family: color.colorFamily || '',
    primary_color: primaryColor,
    group: color.colorFamily,
    base: color.layer || '',
    layer: color.layer || '',
    tone: color.tone || '',
    undertone: color.undertone || '',
    sheen: color.sheen || '',
    sheenOptions: color.sheenOptions || [],
    hex: color.hex,
    hexCode: color.hexCode,
    actualHex: color.hex,
    description: color.description || color.mood || '',
    mood: color.mood || '',
    recommended_use: color.interiorUse || '',
    rooms: color.rooms || color.interiorUse || '',
    interiorUse: color.interiorUse || '',
    exteriorUse: color.exteriorUse || '',
    interior_or_exterior: color.interiorExterior || '',
    usage: color.usage || color.interiorExterior || '',
    collection: color.collection || color.colorCollection || '',
    color_temperature: color.temperature || color.colorTemperature || '',
    temperature: color.temperature || color.colorTemperature || '',
    tonality: color.tonality || '',
    lightReflectance: color.lightReflectance || '',
    popularity: color.popularity || '',
    contractor: !!color.contractor,
    designer: !!color.designer,
    suitability: color.suitability || color.interiorExterior || '',
    tags,
    combinationcolor: [],
    Project: '',
    opacity: '',
    styling: '',
    pigment1: '',
    pigment2: '',
    pigment3: '',
    image: '',
  };
};

const brightness = (hex) => {
  if (!hex) return 0;
  const value = hex.startsWith('#') ? hex : `#${String(hex).replace(/[^0-9A-Fa-f]/g, '').padStart(6, '0')}`;
  const r = parseInt(value.slice(1, 3), 16);
  const g = parseInt(value.slice(3, 5), 16);
  const b = parseInt(value.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000;
};

const flatColorEntries = getAllColors().map(formatFlatColor);
flatColorEntries.sort((a, b) => brightness(b.actualHex || b.hex) - brightness(a.actualHex || a.hex));

export const flatColors = flatColorEntries;

export default flatColors;
