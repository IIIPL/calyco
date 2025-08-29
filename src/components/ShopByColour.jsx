import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { flatColors } from '../data/flatColors';

const PALETTES = {
  bold: [
    '#6A3BA5','#9B1D20','#E07A5F','#F2CC8F','#457B9D','#1D3557','#0FA3B1','#2E4057',
    '#F79D65','#E63946','#7B2CBF','#F4A261','#3A86FF','#8338EC','#FB5607','#3A5A40'
  ],
  neutral: [
    '#CDBEAA','#D7CEC7','#B6B6B4','#EDE8E2','#C2B8B2','#BCA88E','#C7C7BB','#DED7CF',
    '#E9E4DC','#B1A79B','#C0B7A4','#D5CFC7','#EAE6DF','#BFB9AE','#C6C1B8','#D8D2C6'
  ]
};

const ShopByColour = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState('bold');

  // Function to get color family from hex
  const getColorFamilyFromHex = (hex) => {
    // Remove # if present and convert to uppercase for matching
    const cleanHex = hex.replace('#', '').toUpperCase();
    
    // Find the color in flatColors data
    const color = flatColors.find(c => c.hex === cleanHex);
    
    if (color) {
      // Convert color family to URL-friendly format
      return color.color_family.toLowerCase().replace(/\s+/g, '-').replace(/[&]/g, 'and');
    }
    
    // Fallback mapping for colors not in flatColors
    const fallbackMapping = {
      // Bold colors mapping
      '6A3BA5': 'purples-and-pinks',
      '9B1D20': 'reds-and-oranges',
      'E07A5F': 'reds-and-oranges',
      'F2CC8F': 'yellows-and-greens',
      '457B9D': 'blues',
      '1D3557': 'blues',
      '0FA3B1': 'blues',
      '2E4057': 'greys',
      'F79D65': 'reds-and-oranges',
      'E63946': 'reds-and-oranges',
      '7B2CBF': 'purples-and-pinks',
      'F4A261': 'reds-and-oranges',
      '3A86FF': 'blues',
      '8338EC': 'purples-and-pinks',
      'FB5607': 'reds-and-oranges',
      '3A5A40': 'greens',
      
      // Neutral colors mapping
      'CDBEAA': 'whites-and-off-whites',
      'D7CEC7': 'whites-and-off-whites',
      'B6B6B4': 'greys',
      'EDE8E2': 'whites-and-off-whites',
      'C2B8B2': 'whites-and-off-whites',
      'BCA88E': 'browns',
      'C7C7BB': 'whites-and-off-whites',
      'DED7CF': 'whites-and-off-whites',
      'E9E4DC': 'whites-and-off-whites',
      'B1A79B': 'browns',
      'C0B7A4': 'browns',
      'D5CFC7': 'whites-and-off-whites',
      'EAE6DF': 'whites-and-off-whites',
      'BFB9AE': 'whites-and-off-whites',
      'C6C1B8': 'whites-and-off-whites',
      'D8D2C6': 'whites-and-off-whites'
    };
    
    return fallbackMapping[cleanHex] || 'colors';
  };

  const handleColorClick = (hex) => {
    const colorFamily = getColorFamilyFromHex(hex);
    navigate(`/colors/family/${colorFamily}`);
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
          {PALETTES[mode].map((hex) => (
            <button
              key={hex}
              title={hex}
              onClick={() => handleColorClick(hex)}
              className="aspect-square rounded-xl shadow-[0_8px_16px_rgba(0,0,0,.12)] ring-1 ring-white/40 focus:outline-none focus:ring-2 focus:ring-black/30 hover:scale-105 transition-transform duration-200"
              style={{ backgroundColor: hex }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopByColour;
