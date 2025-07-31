import React from 'react';
import { colorGroups } from '../data/colorGroups';
import { useNavigate } from 'react-router-dom';

const ColorExplorer = () => {
    const navigate = useNavigate();
    const handleGroupClick = (groupTitle) => {
        const slug = groupTitle.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "-and-");
        navigate(`/paint-colors/group/${slug}`);
    };

  return (
    <div className="w-full py-12 bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-[#493657] mb-10 text-center">
          Explore Our <span className="text-[#F0C85A]">Sacred Palette</span>
        </h2>

        {/* Grid Container for Color Groups */}
        {/* `grid` for a grid layout, `grid-cols-1` for single column on small screens, 
            `md:grid-cols-2` for two columns on medium screens, `lg:grid-cols-3` for three columns on large screens.
            `gap-8` for spacing between cards. */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {colorGroups.map((group, index) => (
            <div
              key={index}
              className="w-full max-w-sm bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105"
              onClick={() => handleGroupClick(group.title)}
            >
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-3 truncate">
                  {group.title}
                </h3>
                <div className="flex flex-col mb-4 overflow-hidden border border-gray-200">
                  {group.colors.map((color, colorIndex) => (
                    <div
                      key={colorIndex}
                      className="w-full h-8 shadow-sm"
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    ></div>
                  ))}
                </div>
                <p className="text-sm text-gray-600">
                  {group.colors.length} shades available
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