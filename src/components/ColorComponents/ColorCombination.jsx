import React from 'react';
import { useNavigate } from 'react-router-dom';
import { reverseColorNameMapping } from '../../data/colorNameMapping';

const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')        // Replace spaces with hyphens
    .replace(/[^\w\-&]+/g, '')   // Remove all non-word chars EXCEPT hyphens and '&'
    .replace(/\-\-+/g, '-');     // Collapse multiple hyphens

const ColorCombination = ({ currentColor, similarColors }) => {
  const navigate = useNavigate();

  // Get two similar colors for the combination
  const combinationColors = similarColors.slice(0, 2);

  const getActualHexColor = (colorValue) => {
    // If it's already a hex color, return as is
    if (colorValue && colorValue.startsWith('#')) {
      return colorValue;
    }
    // Otherwise, look up the color name in our mapping
    return reverseColorNameMapping[colorValue] || '#CCCCCC';
  };

  // Function to determine text color based on background brightness
  const getTextColor = (hexColor) => {
    const actualHex = getActualHexColor(hexColor);
    const r = parseInt(actualHex.substring(1, 3), 16);
    const g = parseInt(actualHex.substring(3, 5), 16);
    const b = parseInt(actualHex.substring(5, 7), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 150 ? 'text-black' : 'text-white';
  };

  const handleColorClick = (color) => {
    
    const familySlug = slugify(color.color_family);
    const colorSlug = slugify(color.name);
    navigate(`/colors/family/${familySlug}/${colorSlug}`);
  

    // navigate(`/colors/family/${color.color_family.replace(/\s+/g, "-").toLowerCase()}/${encodeURIComponent(color.name)}`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex h-64 overflow-hidden shadow-lg">
        {/* Left Section - Main Color (58% width) */}
        <div 
          className="w-[58%] relative cursor-pointer transition-opacity"
          style={{ backgroundColor: getActualHexColor(currentColor.hex) }}
          onClick={() => handleColorClick(currentColor)}
        >
          <div className={`absolute bottom-0 left-0 p-4 ${getTextColor(currentColor.hex)}`}>
            <div className="text-lg font-semibold">{currentColor.name}</div>
            <div className="text-sm opacity-90">{currentColor.hex}</div>
          </div>
        </div>

        {/* Right Section - Two Stacked Colors (42% width) */}
        <div className="w-[42%] flex flex-col">
          {combinationColors.map((color, index) => (
            <div
              key={color.name}
              className={`flex-1 relative cursor-pointer transition-opacity ${
                index === 0 ? 'border-b border-white/20' : ''
              }`}
              style={{ backgroundColor: getActualHexColor(color.hex) }}
              onClick={() => handleColorClick(color)}
            >
              <div className={`absolute bottom-0 left-0 p-4 ${getTextColor(color.hex)}`}>
                <div className="text-lg font-semibold">{color.name}</div>
                <div className="text-sm opacity-90">{color.hex}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ColorCombination;
