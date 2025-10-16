import { calycoColors } from '../data/calycoColors.js';
import { flatColors } from '../data/flatColors.js';
import { products } from '../data/products.js';
import samplesData from '../data/samples.json';
import colorRelations from '../data/color-relations.json';
import { getColorBrightnessForColor } from '../utils/colorHelpers.js';

export const VISUALIZER_PATH = '/room-visualization';

const ensureLeadingHash = (value) => {
  if (!value) return '#CCCCCC';
  const trimmed = String(value).trim();
  if (trimmed.startsWith('#')) {
    return `#${trimmed.slice(1).toUpperCase()}`;
  }
  if (/^[0-9A-Fa-f]{6}$/.test(trimmed)) {
    return `#${trimmed.toUpperCase()}`;
  }
  return '#CCCCCC';
};

const cleanString = (value) => {
  if (value === null || value === undefined) return '';
  const str = String(value).trim();
  if (!str) return '';
  const lowered = str.toLowerCase();
  if (['nan', 'na', 'n/a', '-', 'null'].includes(lowered)) {
    return '';
  }
  return str;
};

const slugifyBasic = (value = '') =>
  value.toLowerCase().trim().replace(/[\s_/]+/g, '-');

const slugifyStrict = (value = '') =>
  slugifyBasic(value).replace(/[^a-z0-9-]/g, '');

const slugifyAmp = (value = '') =>
  slugifyBasic(value).replace(/&/g, 'and');

export const slugify = (value = '') =>
  slugifyStrict(value);

const buildSlugVariants = (value = '') => {
  const variants = new Set([
    slugifyBasic(value),
    slugifyStrict(value),
    slugifyAmp(value),
    value.toLowerCase().trim(),
  ]);
  variants.delete('');
  return Array.from(variants);
};

const samples = Array.isArray(samplesData) ? samplesData : [];
const relations = typeof colorRelations === 'object' && colorRelations !== null ? colorRelations : {};

const mapFlatByName = new Map();
flatColors.forEach((entry) => {
  const key = (entry.name || '').toLowerCase();
  if (key) {
    mapFlatByName.set(key, entry);
  }
});

const familyMeta = new Map();
const familyKeyToColors = new Map();
const colorBySlug = new Map();
const colorByName = new Map();
const colorByCode = new Map();

const normalizedColors = [];

const registerColor = (color, familyName) => {
  const name = cleanString(color.name || color.calycoName);
  if (!name) return;

  const flatMatch = mapFlatByName.get(name.toLowerCase());
  const family = cleanString(familyName || color.colorFamily || flatMatch?.color_family);
  const familySlug = slugify(family);
  const slugVariants = buildSlugVariants(name);
  const familySlugVariants = buildSlugVariants(family);

  const actualHex =
    ensureLeadingHash(
      color.actualHex ||
        color.hex ||
        flatMatch?.actualHex ||
        flatMatch?.hex ||
        ''
    );

  const suitability =
    cleanString(color.suitability) ||
    cleanString(flatMatch?.suitability) ||
    cleanString(color.interiorExterior);

  const normalized = {
    id: cleanString(color.code) || slugVariants[0],
    name,
    calycoName: cleanString(color.calycoName) || name,
    code: cleanString(color.code),
    altCode: cleanString(color.hexCode) && cleanString(color.hexCode) !== cleanString(color.code)
      ? cleanString(color.hexCode)
      : '',
    tintCode: cleanString(color.hex) && !color.hex.startsWith('#') ? cleanString(color.hex) : '',
    hex: actualHex,
    actualHex,
    slug: slugVariants[0],
    slugVariants,
    colorFamily: family,
    color_family: family,
    familySlug,
    familySlugVariants,
    tone: cleanString(color.tone),
    layer: cleanString(color.layer),
    sheen: cleanString(color.sheen),
    sheenOptions: Array.isArray(color.sheenOptions) ? color.sheenOptions : [],
    collection: cleanString(color.collection),
    interiorUse: cleanString(color.interiorUse),
    exteriorUse: cleanString(color.exteriorUse),
    interior_or_exterior: cleanString(color.interiorExterior),
    suitability,
    mood: cleanString(color.mood),
    lightReflectance: cleanString(color.lightReflectance),
    undertone: cleanString(color.undertone),
    popularity: cleanString(color.popularity),
    contractor: !!color.contractor,
    designer: !!color.designer,
    description: cleanString(color.description) || cleanString(color.mood),
    tags: Array.isArray(color.tags) ? color.tags.slice() : [],
    metadata: {
      layer: cleanString(color.layer),
      lightReflectance: cleanString(color.lightReflectance),
      popularity: cleanString(color.popularity),
      sheenOptions: Array.isArray(color.sheenOptions) ? color.sheenOptions.slice() : [],
    },
    rooms: cleanString(color.rooms || color.interiorUse),
    colorTemperature: cleanString(color.colorTemperature || color.temperature),
    temperature: cleanString(color.temperature || color.colorTemperature),
    tonality: cleanString(color.tonality || color.undertone),
  };

  if (flatMatch) {
    normalized.primary_color = cleanString(flatMatch.primary_color);
    normalized.group = cleanString(flatMatch.group);
    normalized.collection = normalized.collection || cleanString(flatMatch.collection);
    normalized.style = cleanString(flatMatch.styling || flatMatch.style);
    normalized.opacity = cleanString(flatMatch.opacity);
    normalized.Project = cleanString(flatMatch.Project);
    normalized.combinationcolor = Array.isArray(flatMatch.combinationcolor)
      ? flatMatch.combinationcolor.slice()
      : [];
  }

  normalizedColors.push(normalized);

  slugVariants.forEach((slug) => {
    if (slug && !colorBySlug.has(slug)) {
      colorBySlug.set(slug, normalized);
    }
  });

  if (normalized.code) {
    colorByCode.set(normalized.code.toLowerCase(), normalized);
  }

  colorByName.set(name.toLowerCase(), normalized);

  if (!familyMeta.has(familySlug)) {
    familyMeta.set(familySlug, {
      name: family,
      slug: familySlug,
      slugVariants: familySlugVariants,
      description: '',
    });
  }

  if (!familyKeyToColors.has(familySlug)) {
    familyKeyToColors.set(familySlug, []);
  }
  familyKeyToColors.get(familySlug).push(normalized);
};

calycoColors.forEach((family) => {
  const familyName = family.family;
  (family.colors || []).forEach((color) => registerColor(color, familyName));
});

familyKeyToColors.forEach((list) => {
  list.sort((a, b) => getColorBrightnessForColor(b) - getColorBrightnessForColor(a));
});

const familyList = Array.from(familyMeta.values()).map((meta) => ({
  ...meta,
  colorCount: (familyKeyToColors.get(meta.slug) || []).length,
}));

const resolveFamilyKey = (identifier) => {
  if (!identifier) return null;
  const normalized = slugify(identifier);
  if (familyMeta.has(normalized)) {
    return normalized;
  }
  const match = familyList.find((meta) =>
    meta.slugVariants.includes(normalized) ||
    meta.slugVariants.includes(slugifyBasic(identifier)) ||
    meta.slugVariants.includes(slugifyAmp(identifier))
  );
  return match ? match.slug : null;
};

export const getColorFamilies = () =>
  familyList
    .map((meta) => ({
      name: meta.name,
      slug: meta.slug,
      slugVariants: meta.slugVariants,
      code: meta.slug,
      count: (familyKeyToColors.get(meta.slug) || []).length,
      description: meta.description,
    }));

export const getFamilyInfo = (familyIdentifier) => {
  const key = resolveFamilyKey(familyIdentifier);
  if (!key) return null;
  const meta = familyMeta.get(key);
  if (!meta) return null;
  return {
    name: meta.name,
    slug: meta.slug,
    slugVariants: meta.slugVariants,
    colorCount: (familyKeyToColors.get(key) || []).length,
    description: meta.description,
  };
};

export const getAllColors = () => normalizedColors.slice();

export const getColorsForFamily = (familyIdentifier) => {
  const key = resolveFamilyKey(familyIdentifier);
  if (!key) return [];
  return (familyKeyToColors.get(key) || []).slice();
};

const normalizeLookup = (value) => slugifyStrict(value || '');

export const getColor = (identifier) => {
  if (!identifier) return undefined;
  const normalized = normalizeLookup(identifier);
  if (colorBySlug.has(normalized)) {
    return colorBySlug.get(normalized);
  }
  if (colorByCode.has(normalized)) {
    return colorByCode.get(normalized);
  }
  if (colorByName.has(normalized)) {
    return colorByName.get(normalized);
  }
  return undefined;
};

export const getColorBySlugs = (familySlug, colorSlug) => {
  const color = getColor(colorSlug);
  if (!color) return undefined;
  if (!familySlug) return color;
  const familyKey = resolveFamilyKey(familySlug);
  if (!familyKey) return color;
  if (color.familySlug === familyKey || color.familySlugVariants?.includes(familyKey)) {
    return color;
  }
  const familyColors = familyKeyToColors.get(familyKey) || [];
  const normalizedSlug = normalizeLookup(colorSlug);
  return familyColors.find((entry) =>
    entry.slugVariants.includes(normalizedSlug) ||
    entry.slugVariants.includes(slugifyBasic(colorSlug)) ||
    entry.slugVariants.includes(slugifyStrict(colorSlug))
  );
};

export const getProductOptionsForColor = () =>
  products.filter((product) => product.availableForColors === 'all');

export const getSamples = () => samples.slice();

export const getRelations = (code) => {
  if (!code) {
    return { related: [], complementary: [], trendingRank: null };
  }
  const normalized = cleanString(code);
  const relation =
    relations[normalized] ||
    relations[normalized.toUpperCase()] ||
    relations[normalized.toLowerCase()];

  if (!relation) {
    return { related: [], complementary: [], trendingRank: null };
  }

  return {
    related: relation.related || [],
    complementary: relation.complementary || [],
    trendingRank:
      typeof relation.trendingRank === 'number' ? relation.trendingRank : null,
  };
};

export const coverageFor = (product) => {
  if (!product?.coverageSqftPerL || product.coverageSqftPerL.length < 2) {
    return '';
  }
  const [min, max] = product.coverageSqftPerL;
  return `~${min}-${max} sq ft per L per coat`;
};

export const priceFor = (product, sizeOrMl, finish) => {
  if (!product || !sizeOrMl) return 0;
  const sizeEntry =
    typeof sizeOrMl === 'object'
      ? sizeOrMl
      : product.sizes?.find(
          (entry) =>
            entry.ml === sizeOrMl ||
            entry.label === sizeOrMl ||
            entry.size === sizeOrMl
        );

  const activeFinish =
    finish ||
    (typeof sizeEntry === 'object' &&
      sizeEntry !== null &&
      sizeEntry.defaultFinish) ||
    product?.defaultFinish ||
    (Array.isArray(product?.finishes) ? product.finishes[0] : undefined);

  if (sizeEntry) {
    if (
      sizeEntry.priceByFinish &&
      activeFinish &&
      sizeEntry.priceByFinish[activeFinish] !== undefined
    ) {
      return sizeEntry.priceByFinish[activeFinish];
    }
    if (typeof sizeEntry.price === 'number') {
      return sizeEntry.price;
    }
  }

  if (product?.priceByFinish) {
    const finishPricing = product.priceByFinish[activeFinish];
    if (finishPricing) {
      const normalizedKey =
        typeof sizeOrMl === 'string'
          ? sizeOrMl.replace(/\s+/g, '').toUpperCase()
          : String(sizeOrMl?.ml ?? sizeOrMl?.label ?? '');
      const matched = Object.entries(finishPricing).find(
        ([label]) => label.replace(/\s+/g, '').toUpperCase() === normalizedKey
      );
      if (matched) {
        const value = matched[1];
        if (typeof value === 'number') return value;
        if (value && typeof value === 'object' && value.price !== undefined) {
          return Number(value.price) || 0;
        }
      }
    }
  }

  if (typeof product?.price === 'number') {
    const amount =
      typeof sizeOrMl === 'object' && sizeOrMl !== null
        ? sizeOrMl.ml || sizeOrMl.size || 0
        : sizeOrMl;
    const multiplier = Number(String(amount).match(/\d+/)?.[0] || 1);
    return Math.round(product.price * multiplier);
  }

  return 0;
};

export const getColorFamiliesSorted = () =>
  getColorFamilies().sort((a, b) => a.name.localeCompare(b.name));

export const resolveColor = getColor;
