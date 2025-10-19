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

const displayCode = (color) => {
  const hex = resolveHex(color);
  return hex || '#CCCCCC';
};

const ColorCombination = ({ currentColor, similarColors }) => {
  const navigate = useNavigate();
  const combinationColors = similarColors.slice(0, 2);

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
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex h-64 overflow-hidden shadow-lg">
        <div
          className="w-[58%] relative cursor-pointer transition-opacity"
          style={{ backgroundColor: mainHex }}
          onClick={() => handleColorClick(currentColor)}
        >
          <div className={`absolute bottom-0 left-0 p-4 ${getTextColor(mainHex)}`}>
            <div className="text-lg font-semibold">{currentColor.name}</div>
            <div className="text-sm opacity-90">{displayCode(currentColor)}</div>
          </div>
        </div>

        <div className="w-[42%] flex flex-col">
          {combinationColors.map((color, index) => {
            const hex = resolveHex(color);
            return (
              <div
                key={color.name}
                className={`flex-1 relative cursor-pointer transition-opacity ${index === 0 ? 'border-b border-white/20' : ''}`}
                style={{ backgroundColor: hex }}
                onClick={() => handleColorClick(color)}
              >
                <div className={`absolute bottom-0 left-0 p-4 ${getTextColor(hex)}`}>
                  <div className="text-lg font-semibold">{color.name}</div>
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

export default ColorCombination;
