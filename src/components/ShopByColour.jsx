import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllColors } from '../data/calycoColors.js';
import { getBoldColors, getSoothingNeutralColors } from '../data/homepageColors.js';

const flatColors = getAllColors();

// Get colors from database
const boldColorsFromDB = getBoldColors();
const neutralColorsFromDB = getSoothingNeutralColors();

// Create palettes using database colors - store full color objects
const PALETTES = {
  bold: boldColorsFromDB,
  neutral: neutralColorsFromDB
};

const ShopByColour = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState('bold');

  // Function to navigate to color detail page
  const handleColorClick = (color) => {
    // Convert color family to URL-friendly format
    const family = (color.colorFamily || color.color_family)
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[&]/g, '-');

    // Convert color name to URL-friendly format
    const colorName = color.name
      .toLowerCase()
      .replace(/\s+/g, '-');

    // Navigate to individual color detail page
    navigate(`/colors/family/${family}/${colorName}`);
  };

  return (
    <section className="w-full flex items-start bg-transparent pb-32 md:pb-40 mt-20">
      <div className="w-full px-2 sm:px-4 md:px-6">
        {/* Heading */}
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#1b1b1b] mb-2 md:mb-3 text-center">
          How do you want to transform your space?
        </h2>

        {/* Segmented Control */}
        <div className="flex justify-center mb-2 md:mb-3 py-4">
          <div className="inline-grid grid-flow-col gap-2 rounded-full bg-[#ece7df] p-2 shadow-inner">
          <button
            onClick={() => setMode('bold')}
            className={`px-4 py-1.5 rounded-full font-bold text-sm md:text-base tracking-[.2px] transition-all ${
              mode === 'bold'
                ? 'bg-gradient-to-b from-[#5c476a] to-[#7b6693] text-white shadow-[0_8px_18px_rgba(90,70,110,.35)]'
                : 'text-[#3a2d1b] hover:bg-black/5'
            }`}
          >
            Bold Colors
          </button>
                      <button
              onClick={() => setMode('neutral')}
              className={`px-4 py-1.5 rounded-full font-bold text-sm md:text-base tracking-[.2px] transition-all ${
                mode === 'neutral'
                  ? 'bg-gradient-to-b from-[#caa04b] to-[#e0be6a] text-[#1b1b1b] shadow-[0_8px_18px_rgba(180,130,40,.35)]'
                  : 'text-[#3a2d1b] hover:bg-black/5'
              }`}
            >
              Soothing Neutrals
            </button>
          </div>
        </div>

        {/* Swatches Grid - 2 rows on mobile, 8 columns on desktop */}
        <div className="grid grid-cols-4 md:grid-cols-8 gap-3 md:gap-4">
          {PALETTES[mode].map((color) => {
            const hex = color.hex.startsWith('#') ? color.hex : `#${color.hex}`;
            return (
              <button
                key={color.code || color.name}
                title={`${color.name} - ${color.code || ''}`}
                onClick={() => handleColorClick(color)}
                className="aspect-square rounded-xl shadow-[0_8px_16px_rgba(0,0,0,.12)] ring-1 ring-white/40 focus:outline-none focus:ring-2 focus:ring-black/30 hover:scale-105 transition-transform duration-200"
                style={{ backgroundColor: hex }}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ShopByColour;
