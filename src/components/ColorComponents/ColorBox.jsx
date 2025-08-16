// components/ColorComponents/ColorBox.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const slugify = (t) =>
  t.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w\-&]+/g, '').replace(/\-\-+/g, '-');

export default function ColorBox({ color, familyName, onOpenDrawer }) {
  const navigate = useNavigate();

  const getTextColor = (hex) => {
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return (r*299+g*587+b*114)/1000 > 150 ? 'text-gray-900' : 'text-white';
  };
  const goToDetails = () => {
    navigate(`/colors/family/${slugify(familyName)}/${slugify(color.name)}`);
  };
  const textColor = getTextColor(color.hex);

  return (
    <motion.div
      className="relative cursor-default group"
      whileHover={{ scale: 1.06, zIndex: 10 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.18 }}
    >
      <div
        className="relative w-full aspect-square rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border-2 border-white group-hover:border-[#F0C85A]"
        style={{ backgroundColor: color.hex }}
      >
        {/* Hover overlay (must NOT catch clicks) */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 pointer-events-none" />

        {/* Controls on top */}
        <div className="absolute top-2 right-2 z-10 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button
            type="button"
            aria-label="Quick buy with this color"
            className="transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F0C85A] hover:scale-110"
            onClick={(e) => {
              e.stopPropagation();
              onOpenDrawer?.({ name: color.name, hex: color.hex, description: color.description || '' });
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${textColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-2 9m13-9l2 9m-5-9v9" />
            </svg>
          </button>

          <button
            type="button"
            aria-label="View color details"
            className={`px-2 py-1 rounded-md bg-white/0 hover:bg-white/10 ${textColor} text-xs font-semibold transition`}
            onClick={(e) => { e.stopPropagation(); goToDetails(); }}
          >
            Details
          </button>
        </div>

        {/* Info block (must NOT catch clicks) */}
        <div className="absolute inset-0 flex flex-col justify-end p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
          <div className={`${textColor} text-center backdrop-blur-sm rounded-lg p-2`}>
            <div className="font-semibold text-xs leading-tight mb-1">{color.name}</div>
            <div className="text-[10px] opacity-75 font-mono">{color.hex}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
