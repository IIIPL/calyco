import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { flatColors } from "../data/flatColors";
import { reverseColorNameMapping } from "../data/colorNameMapping";

// Get unique color families from flatColors
const colorFamilies = [...new Set(flatColors.map(color => color.color_family))];

// Create thumbnails for each family using the first color from each family
const familyThumbnails = colorFamilies.reduce((acc, family) => {
  const firstColor = flatColors.find(color => color.color_family === family);
  // Get actual hex color from the mapping
  const actualHexColor = reverseColorNameMapping[firstColor?.hex] || "#CCCCCC";
  acc[family] = actualHexColor;
  return acc;
}, {});

const ColorsDropdown = ({ onSelect, isMobile = false }) => {
  const [hoveredFamily, setHoveredFamily] = useState(colorFamilies[0]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleAllClick = () => {
    navigate("/colors");
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (onSelect) onSelect();
  };

  const handleFamilyClick = (familyName) => {    
    navigate(`/colors/family/${familyName.replace(/\s+/g, "-").toLowerCase()}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (onSelect) onSelect();
  };

  if (isMobile) {
    return (
      <div className="w-full flex flex-col items-start">
        <button
          onClick={() => setOpen(!open)}
          className="text-[#493657] hover:text-[#F0C85A] flex justify-between w-full"
        >
          <span>Colors</span>
          <span className={`transform transition-transform ${open ? 'rotate-90' : ''}`}>▶</span>
        </button>
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${open ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'} w-full`}
        >
          <div className="pl-4 py-2 flex flex-col gap-2">
            <button
              onClick={handleAllClick}
              className="text-[#493657] hover:text-[#F0C85A] uppercase font-bold text-left"
            >SEE ALL COLORS</button>
            {colorFamilies.map((family) => (
              <button
                key={family}
                onClick={() => handleFamilyClick(family)}
                className="text-left text-[#493657] hover:text-[#F0C85A] text-base"
              >{family}</button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed left-0 top-[6.5rem] w-full bg-white border-t border-b border-[#e5e0d8] shadow-lg z-50 font-poppins">
      <div
        className="
          max-w-screen-xl mx-auto
          px-4 sm:px-6 md:px-10 lg:px-24
          py-8 md:py-12 lg:py-14
          flex justify-between items-start
          gap-0
        "
      >
        {/* Left Column: All Colors (narrower on smaller desktops) */}
        <div
          className="
            flex flex-col
            min-w-[120px] max-w-[140px]
            sm:min-w-[140px] sm:max-w-[160px]
            md:min-w-[180px] md:max-w-[200px]
            lg:min-w-[200px] lg:max-w-[220px]
            border-r border-[#e5e0d8]
            pr-2 sm:pr-3 md:pr-6 lg:pr-10
          "
        >
          <button
            className="text-left text-sm sm:text-base lg:text-lg font-bold uppercase py-1.5 md:py-2 px-0 mb-1 border-b-2 border-[#493657] text-[#493657] hover:text-[#F0C85A]"
            onClick={handleAllClick}
          >
            SEE ALL COLORS
          </button>
        </div>

        {/* Middle Column: Family List (kept close to left rail) */}
        <div
          className="
            flex flex-col flex-1
            pl-2 sm:pl-3 md:pl-4 lg:pl-12
            pr-2 md:pr-4
            max-h-[50vh] md:max-h-[400px] overflow-y-auto
          "
        >
          <ul className="space-y-2 text-[#493657]">
            {colorFamilies.map((family) => (
              <li
                key={family}
                className={`text-base cursor-pointer transition-colors py-1 px-0 ${hoveredFamily === family ? "font-bold" : "hover:text-[#F0C85A]"}`}
                onMouseEnter={() => setHoveredFamily(family)}
                onClick={() => handleFamilyClick(family)}
              >
                {family}
              </li>
            ))}
          </ul>
        </div>

        {/* Right Column: Swatch Thumbnail (responsive width + height) */}
        <div
          className="
            flex items-center justify-center
            min-w-[140px] max-w-[180px]
            sm:min-w-[180px] sm:max-w-[220px]
            md:min-w-[220px] md:max-w-[280px]
            lg:min-w-[260px] lg:max-w-[420px]
          "
        >
          <div
            className="w-full h-40 md:h-56 lg:h-64 rounded-xl shadow-md border border-gray-100"
            style={{ backgroundColor: familyThumbnails[hoveredFamily] }}
          />
        </div>
      </div>
    </div>
  );
};

export default ColorsDropdown;
