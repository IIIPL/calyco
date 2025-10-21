import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ColorCombination from '../components/ColorComponents/ColorCombination';
import SimilarColors from '../components/ColorComponents/SimilarColors';
import ShadeSelectorDrawer from '../components/ColorComponents/ShadeSelectorDrawer';
import ColorBuyBox from '../components/ColorComponents/ColorBuyBox';
import ColorInfoHeader from '../components/ColorComponents/ColorInfoHeader';
import ColorAttributes from '../components/ColorComponents/ColorAttributes';
import ProductTypeSelector from '../components/ColorComponents/ProductTypeSelector';
import NotFound from './NotFound';
import colorsData from '../data/colors.json';
import {
  getColorBySlugs,
  getColorsForFamily,
  getFamilyInfo,
  getProductOptionsForColor,
  getRelations,
  slugify,
  getColor,
} from '../lib/catalog';

const getTextColor = (hexColor) => {
  if (!hexColor || !hexColor.startsWith('#')) return 'text-black';
  const r = parseInt(hexColor.substring(1, 3), 16);
  const g = parseInt(hexColor.substring(3, 5), 16);
  const b = parseInt(hexColor.substring(5, 7), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 150 ? 'text-black' : 'text-white';
};

const RelationshipSection = ({ title, colors }) => {
  if (!colors?.length) {
    return null;
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl md:text-4xl font-semibold mb-6 text-gray-900">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {colors.map((color) => {
          const familySlug = color.familySlug || slugify(color.color_family || color.colorFamily || '');
          const colorSlug = color.slug || slugify(color.name);
          const hexCode = color.actualHex || color.hex || '#CCCCCC';
          return (
            <Link key={`${colorSlug}`} to={`/colors/family/${familySlug}/${colorSlug}`} className="block group">
              <div
                className="h-24 rounded-xl shadow-inner border border-black/5 transition group-hover:shadow-md"
                style={{ backgroundColor: hexCode }}
              />
              <div className="mt-2 text-sm font-medium text-gray-900 group-hover:underline">
                {color.name}
              </div>
              <div className="text-xs uppercase tracking-wide text-gray-500">
                {hexCode}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

const COLORS_DATABASE = Array.isArray(colorsData) ? colorsData : [];

const buildColorLookup = () => {
  const map = new Map();
  const register = (key, entry) => {
    if (!key) return;
    map.set(String(key).toLowerCase(), entry);
  };

  COLORS_DATABASE.forEach((entry) => {
    if (!entry) return;
    register(entry.slug);
    register(slugify(entry.slug || ''));
    register(entry.name);
    register(slugify(entry.name || ''));
    register(entry.ralCode);
    if (entry.ralCode) {
      register(entry.ralCode.replace(/\s+/g, '-'));
      register(entry.ralCode.replace(/\s+/g, ''));
    }
    if (entry.hexCode) {
      register(entry.hexCode);
      register(entry.hexCode.replace(/^#/, ''));
    }
  });

  return map;
};

const COLOR_LOOKUP = buildColorLookup();

const resolveColorAttributes = (color, fallbackSlug) => {
  const candidates = new Set();

  if (fallbackSlug) {
    candidates.add(fallbackSlug);
    candidates.add(slugify(fallbackSlug));
  }

  if (color) {
    candidates.add(color.slug);
    candidates.add(color.name);
    candidates.add(slugify(color.name || ''));
    candidates.add(color.code);
    candidates.add(color.altCode);
    candidates.add(color.tintCode);
    candidates.add(color.actualHex);
    candidates.add(color.hex);
  }

  for (const candidate of candidates) {
    if (!candidate) continue;
    const key = String(candidate).toLowerCase();
    if (COLOR_LOOKUP.has(key)) {
      return COLOR_LOOKUP.get(key);
    }
    const slugCandidate = slugify(String(candidate));
    if (slugCandidate && COLOR_LOOKUP.has(slugCandidate.toLowerCase())) {
      return COLOR_LOOKUP.get(slugCandidate.toLowerCase());
    }
  }

  return null;
};

const ColorDetailPage = () => {
  const navigate = useNavigate();
  const { familyName: familyParam, colorName: colorParam } = useParams();
  const familySlug = decodeURIComponent(familyParam || '');
  const colorSlug = decodeURIComponent(colorParam || '');
  const [currentColor, setCurrentColor] = useState(() => getColorBySlugs(familySlug, colorSlug));
  const [selectedProductType, setSelectedProductType] = useState('Premium Interior Emulsion');

  useEffect(() => {
    setCurrentColor(getColorBySlugs(familySlug, colorSlug) || null);
  }, [familySlug, colorSlug]);

  useEffect(() => {
    setSelectedProductType('Premium Interior Emulsion');
  }, [colorSlug]);

  const familyInfo = useMemo(() => {
    if (currentColor?.colorFamily) {
      return getFamilyInfo(currentColor.colorFamily) || {
        name: currentColor.colorFamily,
        slug: currentColor.familySlug || slugify(currentColor.colorFamily),
      };
    }
    return getFamilyInfo(familySlug);
  }, [familySlug, currentColor]);

  const familyColors = useMemo(() => {
    const colors = getColorsForFamily(familySlug);
    if (colors.length) return colors;
    if (currentColor?.colorFamily) {
      return getColorsForFamily(currentColor.colorFamily);
    }
    return [];
  }, [familySlug, currentColor?.colorFamily]);

  if (!currentColor) {
    return <NotFound />;
  }

  const actualHexColor = currentColor.actualHex || currentColor.hex || '#CCCCCC';
  const textColorClass = getTextColor(actualHexColor);

  const products = useMemo(
    () => getProductOptionsForColor(currentColor.code || currentColor.tintCode),
    [currentColor],
  );
  const relations = useMemo(() => getRelations(currentColor.tintCode || currentColor.code), [currentColor]);

  const relationColors = useMemo(() => {
    const toColorObjects = (codes) =>
      (codes || [])
        .map((code) => getColor(code))
        .filter(Boolean);
    return {
      related: toColorObjects(relations.related),
      complementary: toColorObjects(relations.complementary),
    };
  }, [relations]);

  const similarColors = useMemo(() => {
    if (!familyColors.length) return [];
    return familyColors.filter((color) => color.slug !== currentColor.slug);
  }, [familyColors, currentColor.slug]);

  const colorAttributesEntry = useMemo(
    () => resolveColorAttributes(currentColor, colorSlug),
    [currentColor, colorSlug],
  );

  const mergedAttributes = useMemo(() => {
    if (!currentColor && !colorAttributesEntry) return null;
    const base = colorAttributesEntry || {};
    const fallback = currentColor || {};

    return {
      hexCode: base.hexCode || fallback.actualHex || fallback.hex || '',
      tone: base.tone || fallback.tone || '',
      sheen: base.sheen || fallback.sheen || '',
      collection: base.collection || fallback.collection || '',
      layer: base.layer || fallback.layer || '',
      undertone: base.undertone || fallback.undertone || '',
      lightReflectance: base.lightReflectance || fallback.lightReflectance || '',
      interiorUse: base.interiorUse || fallback.interiorUse || '',
      exteriorUse: base.exteriorUse || fallback.exteriorUse || '',
      mood: base.mood || fallback.mood || fallback.description || '',
      popularity: base.popularity || fallback.popularity || '',
      contractor:
        typeof base.contractor === 'boolean' ? base.contractor : !!fallback.contractor,
      designer:
        typeof base.designer === 'boolean' ? base.designer : !!fallback.designer,
      colorFamily: base.colorFamily || fallback.colorFamily || familyInfo?.name || '',
      ralCode: base.ralCode || fallback.code || fallback.tintCode || '',
    };
  }, [colorAttributesEntry, currentColor, familyInfo]);

  const colorDetailsForCart = useMemo(() => {
    if (!currentColor) return null;
    const safeAttributes = mergedAttributes || {};
    const rawHex =
      (typeof colorAttributesEntry?.hexCode === 'string' && colorAttributesEntry.hexCode.trim()) ||
      (typeof currentColor.actualHex === 'string' && currentColor.actualHex.trim()) ||
      (typeof currentColor.hex === 'string' && currentColor.hex.trim()) ||
      '';
    const normalizedHex = rawHex
      ? rawHex.trim().startsWith('#')
        ? rawHex.trim().toUpperCase()
        : `#${rawHex.trim().replace(/^#/, '').toUpperCase()}`
      : '';

    return {
      name: currentColor.name || '',
      ralCode: safeAttributes.ralCode || '',
      hexCode: normalizedHex,
      colorFamily: safeAttributes.colorFamily || '',
      tone: safeAttributes.tone || '',
      layer: safeAttributes.layer || '',
      sheen: safeAttributes.sheen || '',
      collection: safeAttributes.collection || '',
      interiorUse: safeAttributes.interiorUse || '',
      exteriorUse: safeAttributes.exteriorUse || '',
      mood: safeAttributes.mood || '',
      lightReflectance: safeAttributes.lightReflectance || '',
      undertone: safeAttributes.undertone || '',
      popularity: safeAttributes.popularity || '',
      contractor: safeAttributes.contractor ?? false,
      designer: safeAttributes.designer ?? false,
    };
  }, [colorAttributesEntry, currentColor, mergedAttributes]);

  const displayCode = mergedAttributes?.ralCode || currentColor.id || 'N/A';
  const downloadKey = displayCode && displayCode !== 'N/A' ? displayCode : currentColor.slug;
  const familyDisplayName = mergedAttributes?.colorFamily || familyInfo?.name || currentColor.colorFamily;
  const familySlugForLink = currentColor.familySlug || slugify(familyDisplayName || '');
  return (
    <div className="min-h-screen bg-gray-50 pt-24 text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <nav className="text-sm text-gray-600 flex flex-wrap items-center gap-2">
          <Link to="/colors" className="hover:text-gray-900 transition">
            Paint Colors
          </Link>
          <span className="text-gray-400">›</span>
          <Link
            to={`/colors/family/${familySlugForLink}`}
            className="hover:text-gray-900 transition"
          >
            {familyDisplayName}
          </Link>
          <span className="text-gray-400">›</span>
          <span className="text-gray-900">{currentColor.name}</span>
        </nav>

        <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:items-stretch">
          <div className="h-60 sm:h-72 lg:h-auto relative rounded-3xl overflow-hidden border border-gray-200 shadow-inner">
            <div className="absolute inset-0" style={{ backgroundColor: actualHexColor }} aria-hidden="true" />
            <div className={`absolute top-4 left-4 text-sm font-medium ${textColorClass}`}>
              <div>{actualHexColor}</div>
              {mergedAttributes?.lightReflectance && (
                <div className="text-xs uppercase tracking-wide opacity-80">
                  LRV {mergedAttributes.lightReflectance}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <ColorInfoHeader
              name={currentColor.name}
              ralCode={displayCode}
              colorFamily={familyDisplayName}
              mood={mergedAttributes?.mood}
              downloadHref={`/download/dollop/${encodeURIComponent(downloadKey || currentColor.slug)}`}
            />

            <ColorAttributes attributes={mergedAttributes} />

            <ProductTypeSelector
              selectedType={selectedProductType}
              onChange={setSelectedProductType}
              colorName={currentColor.name}
            />

            <ColorBuyBox
              color={currentColor}
              products={products}
              selectedProductType={selectedProductType}
              colorAttributes={colorDetailsForCart}
            />
          </div>
        </div>

        <div className="mt-12">
          <ShadeSelectorDrawer
            shades={familyInfo?.slug || currentColor.familySlug}
            selectedColor={currentColor}
            onColorSelect={(color) => {
              if (!color?.name) return;
              const nextFamilySlug = color.familySlug || slugify(color.color_family || color.colorFamily || '');
              const nextColorSlug = color.slug || slugify(color.name);
              navigate(`/colors/family/${nextFamilySlug}/${nextColorSlug}`);
            }}
            colorList={familyColors}
          />
        </div>
      </div>

      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RelationshipSection title="Related Shades" colors={relationColors.related} />
          <RelationshipSection title="Complementary" colors={relationColors.complementary} />
          {relations.trendingRank && relations.trendingRank <= 20 && (
            <div className="mt-6 text-sm font-medium text-purple-700">
              Trending #{relations.trendingRank}
            </div>
          )}
        </div>
      </div>

      {similarColors.length > 0 && (
        <div className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-4xl lg:text-5xl mb-8 text-gray-900">Color Combination</h2>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <ColorCombination currentColor={currentColor} similarColors={similarColors} />
              </div>
              <div className="flex-1">
                <ColorCombination currentColor={currentColor} similarColors={similarColors.slice(2, 4)} />
              </div>
            </div>
          </div>
        </div>
      )}

      {similarColors.length > 0 && (
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-4xl lg:text-5xl mb-8 text-gray-900">Similar Colors</h2>
            <SimilarColors currentColor={currentColor} similarColors={similarColors} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorDetailPage;
