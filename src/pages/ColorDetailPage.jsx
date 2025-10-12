import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ColorCombination from '../components/ColorComponents/ColorCombination';
import SimilarColors from '../components/ColorComponents/SimilarColors';
import ShadeSelectorDrawer from '../components/ColorComponents/ShadeSelectorDrawer';
import ColorBuyBox from '../components/ColorComponents/ColorBuyBox';
import NotFound from './NotFound';
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
          return (
            <Link key={`${colorSlug}`} to={`/colors/family/${familySlug}/${colorSlug}`} className="block group">
              <div
                className="h-24 rounded-xl shadow-inner border border-black/5 transition group-hover:shadow-md"
                style={{ backgroundColor: color.actualHex || color.hex || '#CCCCCC' }}
              />
              <div className="mt-2 text-sm font-medium text-gray-900 group-hover:underline">
                {color.name}
              </div>
              {color.code && (
                <div className="text-xs uppercase tracking-wide text-gray-500">
                  {color.code}
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

const ColorDetailPage = () => {
  const navigate = useNavigate();
  const { familyName: familyParam, colorName: colorParam } = useParams();
  const familySlug = decodeURIComponent(familyParam || '');
  const colorSlug = decodeURIComponent(colorParam || '');
  const [currentColor, setCurrentColor] = useState(() => getColorBySlugs(familySlug, colorSlug));

  useEffect(() => {
    setCurrentColor(getColorBySlugs(familySlug, colorSlug) || null);
  }, [familySlug, colorSlug]);

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

  const products = useMemo(() => getProductOptionsForColor(currentColor.code || currentColor.tintCode), [currentColor]);
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

  const handleColorSelect = (color) => {
    if (!color?.name) return;
    const nextFamilySlug = color.familySlug || slugify(color.color_family || color.colorFamily || '');
    const nextColorSlug = color.slug || slugify(color.name);
    navigate(`/colors/family/${nextFamilySlug}/${nextColorSlug}`);
  };

  const displayCode = currentColor.code || currentColor.altCode || currentColor.tintCode || currentColor.id || 'N/A';
  const familyDisplayName = familyInfo?.name || currentColor.colorFamily;

  return (
    <div className={`min-h-screen bg-white mt-20 ${textColorClass}`}>
      <section
        className="min-h-screen flex flex-col md:flex-row md:items-stretch md:gap-6 relative"
        style={{ backgroundColor: actualHexColor }}
      >
        <nav className={`absolute top-12 left-12 text-sm ${textColorClass}`}>
          <span onClick={() => navigate('/colors')} className="cursor-pointer underline">
            Paint Colors
          </span>
          <span className="mx-2">&gt;</span>
          <span
            onClick={() => navigate(`/colors/family/${currentColor.familySlug || slugify(familyDisplayName)}`)}
            className="cursor-pointer underline"
          >
            {familyDisplayName}
          </span>
          <span className="mx-2">&gt;</span>
          <span>{currentColor.name}</span>
        </nav>

        <div className="px-10 pt-20 md:basis-[38%] md:shrink-0 md:grow-0 md:h-full flex items-center justify-center">
          {currentColor.image ? (
            <img
              src={currentColor.image}
              alt={currentColor.name}
              className="h-full w-auto object-contain md:mb-10"
            />
          ) : (
            <div
              className="h-full w-full max-w-md flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300"
              style={{ backgroundColor: actualHexColor }}
            >
              <img
                src="/Assets/chair.png"
                alt="Chair with color background"
                className="w-full h-full object-contain opacity-80"
              />
            </div>
          )}
        </div>

        <div className="w-full md:basis-[62%] min-w-0 pl-6 pr-10 pt-20 flex flex-col justify-start md:h-full md:overflow-auto mb-10">
          <div className="mb-8 md:pt-16">
            <h1 className="text-3xl md:text-5xl lg:text-7xl mb-2 font-semibold text-white drop-shadow">
              {currentColor.name}
            </h1>
            <p className="text-lg md:text-xl text-white/90">
              <span>Color Code: </span>
              {displayCode || 'N/A'}
            </p>
          </div>

          {currentColor.description && (
            <p className="mb-6 text-lg md:text-xl lg:text-2xl leading-relaxed text-white/90">
              {currentColor.description}
            </p>
          )}

          <div className="mb-6 text-lg md:text-xl lg:text-2xl leading-relaxed text-white">
            <h2 className="font-medium text-white/90">Color Family</h2>
            <span
              onClick={() => navigate(`/colors/family/${currentColor.familySlug || slugify(familyDisplayName)}`)}
              className="cursor-pointer underline transition-colors"
            >
              {familyDisplayName}
            </span>
          </div>

          <div className="mt-4 mb-6 space-y-4 text-base md:text-lg">
            <hr className="border-white/30" />
            <a href={`/download/dollop/${displayCode || currentColor.slug}`} className="underline font-medium flex items-center gap-1">
              Download digital dollop of {currentColor.name}
            </a>
          </div>

          <div className="mb-12">
            <ColorBuyBox color={currentColor} products={products} />
          </div>
        </div>
      </section>

      <ShadeSelectorDrawer
        shades={familyInfo?.slug || currentColor.familySlug}
        selectedColor={currentColor}
        onColorSelect={handleColorSelect}
        colorList={familyColors}
      />

      <div className="bg-white py-16 px-4 md:px-12 text-gray-900">
        <RelationshipSection title="Related Shades" colors={relationColors.related} />
        <RelationshipSection title="Complementary" colors={relationColors.complementary} />
        {relations.trendingRank && relations.trendingRank <= 20 && (
          <div className="mt-6 text-sm font-medium text-purple-700">
            Trending #{relations.trendingRank}
          </div>
        )}
      </div>

      {similarColors.length > 0 && (
        <div className="bg-white py-16 px-4 md:px-8">
          <h2 className="text-2xl md:text-4xl lg:text-5xl mb-8 text-black">Color Combination</h2>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <ColorCombination currentColor={currentColor} similarColors={similarColors} />
            </div>
            <div className="flex-1">
              <ColorCombination currentColor={currentColor} similarColors={similarColors.slice(2, 4)} />
            </div>
          </div>
        </div>
      )}

      {similarColors.length > 0 && (
        <div className="py-16 px-4 md:px-8">
          <h2 className="text-2xl md:text-4xl lg:text-5xl mb-8 text-black">Similar Colors</h2>
          <SimilarColors currentColor={currentColor} similarColors={similarColors} />
        </div>
      )}
    </div>
  );
};

export default ColorDetailPage;
