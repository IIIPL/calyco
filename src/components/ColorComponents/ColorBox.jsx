// components/ColorComponents/ColorBox.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const slugify = (t) =>
  t.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w\-&]+/g, '').replace(/\-\-+/g, '-');



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
          className="transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F0C85A] hover:scale-110 hover:bg-white/10 px-1.5 py-1 rounded-md"
          onClick={(e) => {
            e.stopPropagation();
            onOpenDrawer?.({ name: color.name, hex: color.hex, description: color.description || '' });
          }}
        >
          <CartIcon className={`h-7 w-7 ${textColor}`} />
        </button>

        <button
          type="button"
          aria-label="View color details"
          title="Details"
          className="px-1.5 py-1 rounded-md bg-white/0 hover:bg-white/10 transition"
          onClick={(e) => { e.stopPropagation(); goToDetails(); }}
        >
          <InfoPlusIcon className={`h-7 w-7 ${textColor}`} />
        </button>
      </div>


        {/* Info block (must NOT catch clicks) */}
        <div className="absolute inset-0 flex flex-col justify-end p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
          <div className={`${textColor} text-center backdrop-blur-sm rounded-lg p-2`}>
            <div className="font-semibold text-xs md:text-base leading-tight mb-1">{color.name}</div>
            <div className="text-[10px] opacity-75 font-mono md:text-xs">{color.hex}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
