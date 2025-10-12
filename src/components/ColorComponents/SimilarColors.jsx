import React from 'react';
import { useNavigate } from 'react-router-dom';
import { reverseColorNameMapping } from '../../data/colorNameMapping';

const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-&]+/g, '')
    .replace(/\-\-+/g, '-');

const resolveHex = (color) => {
  if (!color) return '#CCCCCC';
  if (color.actualHex) return color.actualHex;
  const value = color.hex;
  if (typeof value === 'string' && value.startsWith('#')) {
    return value;
  }
  return reverseColorNameMapping[value] || '#CCCCCC';
};

const displayCode = (color) => color?.code || color?.tintCode || color?.hex || '';

const SimilarColors = ({ currentColor, similarColors }) => {
  const navigate = useNavigate();
  const displayColors = similarColors.slice(0, 4);

  const getTextColor = (hexColor) => {
    const actualHex = resolveHex({ hex: hexColor, actualHex: hexColor.startsWith('#') ? hexColor : undefined });
    const r = parseInt(actualHex.substring(1, 3), 16);
    const g = parseInt(actualHex.substring(3, 5), 16);
    const b = parseInt(actualHex.substring(5, 7), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 150 ? 'text-black' : 'text-white';
  };

  const handleColorClick = (color) => {
    const familySlug = slugify(color.color_family || color.colorFamily || '');
    const colorSlug = color.slug || slugify(color.name);
    navigate(`/colors/family/${familySlug}/${colorSlug}`);
  };

  const mainHex = resolveHex(currentColor);

  return (
    <div className="w-full mx-auto rounded-lg">
      <div className="flex rounded-lg">
        <div
          className="w-1/2 h-64 relative cursor-pointer hover:opacity-90 transition-opacity"
          style={{ backgroundColor: mainHex }}
          onClick={() => handleColorClick(currentColor)}
        >
          <div className={`absolute bottom-4 left-4 ${getTextColor(mainHex)}`}>
            <div className="text-xl font-semibold">{currentColor.name}</div>
            <div className="text-sm opacity-90">{displayCode(currentColor)}</div>
          </div>
        </div>

        <div className="w-1/2 flex flex-col">
          {displayColors.map((color) => {
            const hex = resolveHex(color);
            return (
              <div
                key={color.name}
                className="flex-1 relative cursor-pointer hover:opacity-90 transition-opacity"
                style={{ backgroundColor: hex }}
                onClick={() => handleColorClick(color)}
              >
                <div className={`absolute inset-0 flex items-center justify-between px-4 ${getTextColor(hex)}`}>
                  <div className="font-semibold">{color.name}</div>
                  <div className="text-sm opacity-90">{displayCode(color)}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SimilarColors;
