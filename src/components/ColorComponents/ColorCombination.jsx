import React from 'react';
import { useNavigate } from 'react-router-dom';

const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')        // Replace spaces with hyphens
    .replace(/[^\w\-&]+/g, '')   // Remove all non-word chars EXCEPT hyphens and '&'
    .replace(/\-\-+/g, '-');     // Collapse multiple hyphens





// cart and info icons: 
const CartIcon = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {/* basket + frame */}
    <path d="M3 6h2l1.7 8.2a1 1 0 0 0 1 .8H17.5a1 1 0 0 0 1-.7l2-6.8H6.2" />
    {/* wheels as solid dots */}
    <circle cx="9.25" cy="19.5" r="1.25" fill="currentColor" stroke="none" />
    <circle cx="16.75" cy="19.5" r="1.25" fill="currentColor" stroke="none" />
  </svg>
);

const InfoPlusIcon = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {/* square/info card */}
    <rect x="4" y="4.5" width="14" height="14" rx="2" />
    <path d="M7.5 10h7M7.5 13.5h6" />
    {/* small plus in corner */}
    <path d="M18.5 4.5v4M16.5 6.5h4" />
  </svg>
);

const ColorCombination = ({ currentColor, similarColors, onOpenDrawer }) => {
  const navigate = useNavigate();
  const combinationColors = similarColors.slice(0, 2);

  const getTextColor = (hexColor) => {
    const r = parseInt(hexColor.substring(1, 3), 16);
    const g = parseInt(hexColor.substring(3, 5), 16);
    const b = parseInt(hexColor.substring(5, 7), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 150 ? 'text-black' : 'text-white';
  };

  const handleColorClick = (color) => {
    const familySlug = slugify(color.color_family);
    const colorSlug = slugify(color.name);
    navigate(`/colors/family/${familySlug}/${colorSlug}`);
  };

  const renderSwatch = (color, extraClasses = '') => {
    const textColor = getTextColor(color.hex);
    return (
      <div
        key={color.name}
        className={`relative cursor-pointer group transition-opacity ${extraClasses}`}
        style={{ backgroundColor: color.hex }}
        onClick={() => handleColorClick(color)}
      >
        {/* Hover controls */}
        <div className="absolute top-2 right-2 z-10 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button
            type="button"
            aria-label="Quick buy with this color"
            className="transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F0C85A] hover:scale-110 hover:bg-white/10 px-1.5 py-1 rounded-md"
            onClick={(e) => {
              e.stopPropagation();
              onOpenDrawer?.({
                name: color.name,
                hex: color.hex,
                description: color.description || '',
                color_family: color.color_family,
              });
            }}
          >
            <CartIcon className={`h-6 w-6 ${textColor}`} />
          </button>

          <button
            type="button"
            aria-label="View color details"
            title="Details"
            className="px-1.5 py-1 rounded-md bg-white/0 hover:bg-white/10 transition"
            onClick={(e) => {
              e.stopPropagation();
              handleColorClick(color);
            }}
          >
            <InfoPlusIcon className={`h-6 w-6 ${textColor}`} />
          </button>
        </div>

        {/* Label */}
        <div className={`absolute bottom-0 left-0 p-4 ${textColor}`}>
          <div className="text-lg font-semibold">{color.name}</div>
          <div className="text-sm opacity-90">{color.hex}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex h-64 overflow-hidden shadow-lg">
        {/* Left Section - Main Color (58%) */}
        <div className="w-[58%]">
          {renderSwatch(currentColor, 'w-full h-full')}
        </div>

        {/* Right Section - Two Stacked Colors (42%) */}
        <div className="w-[42%] flex flex-col">
          {combinationColors.map((color, index) =>
            renderSwatch(color, `flex-1 ${index === 0 ? 'border-b border-white/20' : ''}`)
          )}
        </div>
      </div>
    </div>
  );
};

export default ColorCombination;
