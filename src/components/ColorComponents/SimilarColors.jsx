import React from 'react';
import { useNavigate } from 'react-router-dom';

const SimilarColors = ({ currentColor, similarColors }) => {
  const navigate = useNavigate();

  // Get 4 similar colors for display
  const displayColors = similarColors.slice(0, 4);

  // Function to determine text color based on background brightness
  const getTextColor = (hexColor) => {
    const r = parseInt(hexColor.substring(1, 3), 16);
    const g = parseInt(hexColor.substring(3, 5), 16);
    const b = parseInt(hexColor.substring(5, 7), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 150 ? 'text-black' : 'text-white';
  };

  const handleColorClick = (color) => {
    navigate(`/colors/family/${color.color_family.replace(/\s+/g, "-").toLowerCase()}/${encodeURIComponent(color.name)}`);
  };

  return (
    <div className="w-full mx-auto rounded rounded-lg">
      
      
      <div className="flex rounded-lg">
        {/* Left Section - Main Color (Large) */}
        <div 
          className="w-1/2 h-64 relative cursor-pointer hover:opacity-90 transition-opacity "
          style={{ backgroundColor: currentColor.hex }}
          onClick={() => handleColorClick(currentColor)}
        >
          <div className={`absolute bottom-4 left-4 ${getTextColor(currentColor.hex)}`}>
            <div className="text-xl font-semibold">{currentColor.name}</div>
            <div className="text-sm opacity-90">{currentColor.hex}</div>
          </div>
        </div>

        {/* Right Section - 4 Similar Colors (Stacked) */}
        <div className="w-1/2 flex flex-col ">
          {displayColors.map((color, index) => (
            <div
              key={color.name}
              className="flex-1 relative cursor-pointer hover:opacity-90 transition-opacity "
              style={{ backgroundColor: color.hex }}
              onClick={() => handleColorClick(color)}
            >
              <div className={`absolute inset-0 flex items-center justify-between px-4 ${getTextColor(color.hex)}`}>
                <div className="font-semibold">{color.name}</div>
                <div className="text-sm opacity-90">{color.hex}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default SimilarColors;
