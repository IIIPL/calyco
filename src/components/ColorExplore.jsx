import React from 'react';
import { flatColors } from '../data/flatColors'
import { useNavigate } from 'react-router-dom';

const ColorExplorer = () => {
  const navigate = useNavigate();

  const groupedColors = flatColors.reduce((acc, color) => {
    if (!acc[color.group]) acc[color.group] = [];
    acc[color.group].push(color);
    return acc;
  }, {});

  const handleGroupClick = (group) => {
    const slug = group.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "-and-");
    navigate(`/paint-colors/group/${slug}`);
  };

  return (
    <div className="w-full py-12 bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-[#493657] mb-10 text-center">
          Explore Our <span className="text-[#F0C85A]">Sacred Palette</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {Object.entries(groupedColors).map(([groupTitle, colors], index) => (
            <div
              key={index}
              className="w-full max-w-sm bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105"
              onClick={() => handleGroupClick(groupTitle)}
            >
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-3 truncate">
                  {groupTitle}
                </h3>
                <div className="flex flex-col mb-4 overflow-hidden border border-gray-200">
                  {colors.slice(0, 12).map((color, colorIndex) => (
                    <div
                      key={colorIndex}
                      className="w-full h-8 shadow-sm"
                      style={{ backgroundColor: color.hex || '#ccc' }}
                      title={color.name}
                    ></div>
                  ))}
                </div>
                <p className="text-sm text-gray-600">
                  {colors.length} shades available
                </p>
              </div>
              <div className="bg-[#493657] text-white text-center py-2 rounded-b-xl text-sm font-medium">
                View Details
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ColorExplorer;
