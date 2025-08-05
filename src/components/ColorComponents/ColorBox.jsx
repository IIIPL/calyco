import React from 'react';
import { useNavigate } from 'react-router-dom';

const slugify = (text) => text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '').replace(/&/g, 'and'); // To slugify the name

const ColorBox = ({ color, familyName }) => {
  const navigate = useNavigate();

  const getTextColor = (hexColor) => {
    const r = parseInt(hexColor.substring(1, 3), 16);
    const g = parseInt(hexColor.substring(3, 5), 16);
    const b = parseInt(hexColor.substring(5, 7), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 150 ? 'text-black' : 'text-white';
  };

  const handleClick = () => {
    // Ensure the family name and color name are both slugified properly
    const familySlug = slugify(familyName);
    const colorSlug = slugify(color.name);
    navigate(`/colors/family/${familySlug}/${colorSlug}`);
  };

  const textColor = getTextColor(color.hex);

  return (
    <div
      onClick={handleClick}
      className="relative cursor-pointer shadow-md transition-transform duration-300 ease-in-out transform hover:scale-110 md:hover:scale-150 hover:-translate-y-1 hover:z-20 hover:shadow-xl overflow-hidden w-full aspect-square md:aspect-[4/3] "
      style={{ backgroundColor: color.hex }}
    >
      <div className="absolute inset-0 flex flex-col justify-end p-2 md:p-3">
        <div className={`${textColor} text-center`}>
          <div className="font-semibold text-xs md:text-sm mb-0.5 md:mb-1 leading-tight">
            {color.name}
          </div>
          <div className="text-[10px] md:text-xs opacity-90">
            {color.hex}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorBox;
