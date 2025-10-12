import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
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

const ColorBox = ({ color, familyName }) => {
  const navigate = useNavigate();

  const getTextColor = (hexColor) => {
    const actualHex = resolveHex({ hex: hexColor, actualHex: hexColor.startsWith('#') ? hexColor : undefined });
    const r = parseInt(actualHex.substring(1, 3), 16);
    const g = parseInt(actualHex.substring(3, 5), 16);
    const b = parseInt(actualHex.substring(5, 7), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 150 ? 'text-gray-900' : 'text-white';
  };

  const handleClick = () => {
    const familySlug = slugify(familyName);
    const colorSlug = color.slug || slugify(color.name);
    navigate(`/colors/family/${familySlug}/${colorSlug}`);
  };

  const actualHexColor = resolveHex(color);
  const textColor = getTextColor(actualHexColor);

  return (
    <motion.div
      onClick={handleClick}
      className="relative cursor-pointer group"
      whileHover={{ scale: 1.1, zIndex: 10 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <div
        className="relative w-full aspect-square rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border-2 border-white group-hover:border-gray-300"
        style={{ backgroundColor: actualHexColor }}
      >
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>

        <div className="absolute inset-0 flex flex-col justify-end p-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="text-white text-center bg-black/70 backdrop-blur-sm rounded-lg p-2">
            <div className="font-semibold text-xs leading-tight mb-1">
              {color.name}
            </div>
            <div className={`text-[10px] opacity-75 font-mono ${textColor === 'text-gray-900' ? 'text-gray-200' : ''}`}>
              {displayCode(color)}
            </div>
          </div>
        </div>

        <div className="absolute top-1 right-1 w-3 h-3 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
          <svg className="w-2 h-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
};

export default ColorBox;
