import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { flatColors } from '../data/flatColors';
import { reverseColorNameMapping } from '../data/colorNameMapping';
import ColorCombination from '../components/ColorComponents/ColorCombination';
import SimilarColors from '../components/ColorComponents/SimilarColors';
import ShadeSelectorDrawer from '../components/ColorComponents/ShadeSelectorDrawer';
import NotFound from './NotFound';

const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-&]+/g, '')
    .replace(/\-\-+/g, '-');

const getTextColor = (hexColor) => {
  if (!hexColor) return 'text-black';
  const r = parseInt(hexColor.substring(1, 3), 16);
  const g = parseInt(hexColor.substring(3, 5), 16);
  const b = parseInt(hexColor.substring(5, 7), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 150 ? 'text-black' : 'text-white';
};

const ColorDetailPage = () => {
  const { familyName, colorName } = useParams();
  const navigate = useNavigate();
  const [currentColor, setCurrentColor] = useState(null);

  useEffect(() => {
    const decodedColorName = decodeURIComponent(colorName);
    const color = flatColors.find(
      (c) => slugify(c.name) === decodedColorName
    );

    if (color) {
      setCurrentColor(color);
    } else { 
      setCurrentColor(null); 
    }

  }, [familyName, colorName]);

  if (!currentColor) {
    return <NotFound />;
  }

  // Get actual hex color from the mapping
  const getActualHexColor = (colorCode) => {
    return reverseColorNameMapping[colorCode] || "#CCCCCC"; // fallback to grey
  };

  const actualHexColor = getActualHexColor(currentColor.hex);

  let similarColors = flatColors.filter(
    (c) =>
      c.color_family === currentColor.color_family &&
      c.name !== currentColor.name
  );

  if (similarColors.length === 0) {
    similarColors = flatColors.filter(
      (c) =>
        (c.group === currentColor.group ||
          c.base === currentColor.base) &&
        c.name !== currentColor.name
    );
  }

  if (similarColors.length === 0) {
    similarColors = flatColors
      .filter((c) => c.name !== currentColor.name)
      .slice(0, 8);
  }

  const textColorClass = getTextColor(actualHexColor);

  const handleColorSelect = (color) => {
    if (!color?.name || !color?.color_family) return;
    setCurrentColor(color);
    navigate(
      `/colors/family/${slugify(color.color_family)}/${slugify(color.name)}`,
      { replace: true }
    );
  };

  return (
    <div className={`min-h-screen bg-white mt-20 ${textColorClass}`}>
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col md:flex-row md:items-stretch md:gap-6 relative" style={{ backgroundColor: actualHexColor }}
      >
        {/* Breadcrumb */}
        <nav
          className={`absolute top-12 left-12 text-sm ${textColorClass}`}
        >
          <span
            onClick={() => navigate('/colors')}
            className="cursor-pointer underline"
          >
            Paint Colors
          </span>
          <span className="mx-2">›</span>
          <span
            onClick={() =>
              navigate(
                `/colors/family/${slugify(currentColor.color_family)}`
              )
            }
            className="cursor-pointer underline"
          >
            {currentColor.color_family}
          </span>
          <span className="mx-2">›</span>
          <span>{currentColor.name}</span>
        </nav>

        {/* Left - Image */}
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

        {/* Right - Details */}
        <div className="w-full md:basis-[62%] min-w-0 pl-6 pr-10 pt-20 flex flex-col justify-start md:h-full md:overflow-auto mb-10">

          <div className="mb-8 md:pt-16">
            <h1 className="text-3xl md:text-5xl lg:text-7xl mb-2 font-semibold">
              {currentColor.name}
            </h1>
            <p className="text-xl md:mt-10">
              <span>Color Code: </span>{currentColor.hex}
            </p>
          </div>

          <p className="mb-8 text-lg md:text-xl lg:text-2xl leading-relaxed">
            {currentColor.description ||
              'A beautiful color from our curated collection.'}
          </p>

          <div className="mb-8 text-lg md:text-xl lg:text-2xl leading-relaxed">
            <h2>Color Family</h2>
            <span
              onClick={() =>
                navigate(
                  `/colors/family/${slugify(currentColor.color_family)}`
                )
              }
              className="cursor-pointer underline transition-colors"
            >
              {currentColor.color_family}
            </span>
          </div>

          <div className="mt-4 mb-4 space-y-4 text-base md:text-lg">
            <hr className="border-gray-300" />
            <a
              href="#"
              download
              className="underline font-medium flex items-center gap-1"
            >
              Download digital dollop of {currentColor.name}
            </a>
          </div>

            <button
              style={{ color: actualHexColor }}
              className="bg-black text-white font-semibold px-8 py-4 rounded-md mt-8 self-start"
            >
              Buy Now
            </button>
        </div>
      </section>

      <ShadeSelectorDrawer
        shades={familyName}
        selectedColor={currentColor}
        onColorSelect={handleColorSelect}
      />

      {similarColors.length > 0 && (
        <div className="bg-white py-16 px-4 md:px-8">
          <h2 className="text-2xl md:text-4xl lg:text-5xl mb-8 text-black">
            Color Combination
          </h2>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <ColorCombination
                currentColor={currentColor}
                similarColors={similarColors}
              />
            </div>
            <div className="flex-1">
              <ColorCombination
                currentColor={currentColor}
                similarColors={similarColors.slice(2, 4)}
              />
            </div>
          </div>
        </div>
      )}

      {similarColors.length > 0 && (
        <div className="py-16 px-4 md:px-8">
          <h2 className="text-2xl md:text-4xl lg:text-5xl mb-8 text-black">
            Similar Colors
          </h2>
          <SimilarColors
            currentColor={currentColor}
            similarColors={similarColors}
          />
        </div>
      )}
    </div>
  );
};

export default ColorDetailPage;
