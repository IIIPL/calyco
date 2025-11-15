import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ChevronDown } from 'lucide-react';
import { getAllColors } from '../data/calycoColors.js';

const ColorSelectorModal = ({ isOpen, onClose, onColorSelect, productInfo }) => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [activeFamily, setActiveFamily] = useState('Whites');

  // Get all colors from the 150+ color CSV database
  const allColors = useMemo(() => getAllColors(), []);

  // Organize colors by family from the actual Calyco color database
  const colorsByFamily = useMemo(() => {
    return allColors.reduce((acc, color) => {
      const family = color.colorFamily;
      if (!acc[family]) {
        acc[family] = [];
      }
      acc[family].push(color);
      return acc;
    }, {});
  }, [allColors]);

  // Define the order and display names for color families - matching the CSV database (all 12 families)
  const familyOrder = [
    { key: 'Whites', display: 'Whites' },
    { key: 'Grays', display: 'Grays' },
    { key: 'Earth Tones', display: 'Earth Tones' },
    { key: 'Blues', display: 'Blues' },
    { key: 'Greens', display: 'Greens' },
    { key: 'Yellows & Golds', display: 'Yellows & Golds' },
    { key: 'Reds & Pinks', display: 'Reds & Pinks' },
    { key: 'Purples & Violets', display: 'Purples & Violets' },
    { key: 'Beiges & Tans', display: 'Beiges & Tans' },
    { key: 'Oranges', display: 'Oranges' },
    { key: 'Blacks & Deep Tones', display: 'Blacks & Deep Tones' },
    { key: 'Specialty Metallics', display: 'Specialty Metallics' }
  ];

  // Family styling data similar to ColorExplore
  const familyData = {
    'Whites': { color: '#F7F4EF', textColor: '#2C3E50', accentColor: '#EDE8DC' },
    'Grays': { color: '#8E959C', textColor: '#FFFFFF', accentColor: '#5E6670' },
    'Earth Tones': { color: '#8A5C3D', textColor: '#FFFFFF', accentColor: '#B27A4F' },
    'Blues': { color: '#2D5C8A', textColor: '#FFFFFF', accentColor: '#4A7FB5' },
    'Greens': { color: '#3E6D4C', textColor: '#FFFFFF', accentColor: '#5A8A65' },
    'Yellows & Golds': { color: '#D9B234', textColor: '#2C2C2C', accentColor: '#F4C74E' },
    'Reds & Pinks': { color: '#B94249', textColor: '#FFFFFF', accentColor: '#E05B67' },
    'Purples & Violets': { color: '#6F4A74', textColor: '#FFFFFF', accentColor: '#8A61A0' },
    'Beiges & Tans': { color: '#C3A985', textColor: '#2C2C2C', accentColor: '#D6BA96' },
    'Oranges': { color: '#D7662E', textColor: '#FFFFFF', accentColor: '#F08545' },
    'Blacks & Deep Tones': { color: '#2B2B2B', textColor: '#FFFFFF', accentColor: '#4A4A4A' },
    'Specialty Metallics': { color: '#9A9FA6', textColor: '#2C2C2C', accentColor: '#C3C6CC' }
  };

  const handleColorClick = (color) => {
    setSelectedColor(color);
  };

  const handleAddToCart = () => {
    if (selectedColor) {
      // Pass color data in the format expected by cart
      onColorSelect({
        name: selectedColor.name || selectedColor.calycoName,
        hex: selectedColor.hex || selectedColor.hexCode,
        code: selectedColor.code || selectedColor.ralCode,
        family: selectedColor.colorFamily
      });
      setSelectedColor(null);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 flex items-center justify-center z-[9999] p-2 sm:p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl max-w-6xl w-full h-[95vh] sm:max-h-[90vh] flex flex-col shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header - Compact on mobile */}
          <div className="bg-gradient-to-r from-[#0F1221] to-[#1a1f35] p-3 sm:p-6 text-white shrink-0">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg sm:text-2xl font-bold mb-1">Select Your Color</h2>
                <p className="text-xs sm:text-sm text-white/80">Choose from our curated collection</p>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
              >
                <X size={20} className="sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>

          {/* Product Info Summary - Compact on mobile */}
          {productInfo && (
            <div className="bg-gray-50 border-b border-gray-200 p-3 sm:p-4 shrink-0">
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm text-gray-600">Product Selected</p>
                  <p className="font-semibold text-sm sm:text-base text-gray-900 truncate">{productInfo.name}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs sm:text-sm text-gray-600">Total</p>
                  <p className="text-lg sm:text-xl font-bold text-[#D4AF37]">₹{productInfo.totalCost?.toFixed(0)}</p>
                </div>
              </div>
            </div>
          )}

          {/* Color Family Tabs - Horizontal scroll on mobile, grid on desktop */}
          <div className="border-b border-gray-200 bg-white shrink-0">
            {/* Mobile: Horizontal scroll */}
            <div className="sm:hidden overflow-x-auto scrollbar-hide">
              <div className="flex gap-2 p-2 min-w-max">
                {familyOrder.map((family) => {
                  const colors = colorsByFamily[family.key] || [];
                  if (colors.length === 0) return null;

                  const familyInfo = familyData[family.key] || { color: '#E0E0E0', textColor: '#2C3E50' };
                  const isActive = activeFamily === family.key;

                  return (
                    <button
                      key={family.key}
                      onClick={() => setActiveFamily(family.key)}
                      className={`px-3 py-1.5 rounded-lg font-medium text-[10px] transition-all whitespace-nowrap ${
                        isActive
                          ? 'shadow-md'
                          : 'hover:shadow-sm'
                      }`}
                      style={{
                        backgroundColor: isActive ? familyInfo.color : '#F3F4F6',
                        color: isActive ? familyInfo.textColor : '#6B7280'
                      }}
                    >
                      {family.display} ({colors.length})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Desktop: Grid */}
            <div className="hidden sm:block p-4">
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                {familyOrder.map((family) => {
                  const colors = colorsByFamily[family.key] || [];
                  if (colors.length === 0) return null;

                  const familyInfo = familyData[family.key] || { color: '#E0E0E0', textColor: '#2C3E50' };
                  const isActive = activeFamily === family.key;

                  return (
                    <button
                      key={family.key}
                      onClick={() => setActiveFamily(family.key)}
                      className={`px-3 py-2.5 rounded-lg font-medium text-xs transition-all ${
                        isActive
                          ? 'shadow-md scale-105'
                          : 'hover:shadow-sm'
                      }`}
                      style={{
                        backgroundColor: isActive ? familyInfo.color : '#F3F4F6',
                        color: isActive ? familyInfo.textColor : '#6B7280'
                      }}
                    >
                      <div className="truncate leading-tight">{family.display}</div>
                      <div className="text-[9px] opacity-75 mt-0.5">({colors.length})</div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Active Family Colors Grid - Scrollable area */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFamily}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {(() => {
                  const colors = colorsByFamily[activeFamily] || [];
                  const activeFamilyInfo = familyOrder.find(f => f.key === activeFamily);

                  return (
                    <div>
                      <div className="mb-3 sm:mb-4">
                        <h3 className="text-base sm:text-xl font-bold text-gray-900">{activeFamilyInfo?.display}</h3>
                        <p className="text-xs sm:text-sm text-gray-600">{colors.length} colors available</p>
                      </div>

                      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-2 sm:gap-3 pb-4">
                        {colors.map((color, index) => {
                          const colorName = color.name || color.calycoName;
                          const colorHex = color.hex || color.hexCode;
                          const colorCode = color.code || color.ralCode;
                          const isSelected = selectedColor?.code === colorCode || selectedColor?.ralCode === colorCode;

                          return (
                            <motion.button
                              key={colorCode}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.2, delay: index * 0.01 }}
                              onClick={() => handleColorClick(color)}
                              className={`relative group flex flex-col items-center p-2 rounded-lg border-2 transition-all ${
                                isSelected
                                  ? 'border-[#D4AF37] bg-[#D4AF37]/5 shadow-md'
                                  : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                              }`}
                            >
                              {/* Color Swatch */}
                              <div
                                className={`w-12 h-12 sm:w-14 sm:h-14 rounded-lg mb-1.5 sm:mb-2 shadow-sm border-2 ${
                                  isSelected ? 'border-[#D4AF37]' : 'border-white'
                                }`}
                                style={{ backgroundColor: colorHex }}
                              />

                              {/* Color Name */}
                              <p className={`text-[9px] sm:text-[10px] font-medium text-center line-clamp-2 leading-tight ${
                                isSelected ? 'text-[#D4AF37]' : 'text-gray-700'
                              }`}>
                                {colorName}
                              </p>

                              {/* Color Code */}
                              <p className="text-[8px] sm:text-[9px] text-gray-500 mt-0.5">{colorCode}</p>

                              {/* Selected Checkmark */}
                              {isSelected && (
                                <div className="absolute top-1 right-1 w-4 h-4 sm:w-5 sm:h-5 bg-[#D4AF37] rounded-full flex items-center justify-center">
                                  <Check size={10} className="sm:w-3 sm:h-3 text-white" />
                                </div>
                              )}
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })()}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer with Selection Info and Add to Cart - Sticky at bottom */}
          <div className="bg-gray-50 border-t border-gray-200 p-3 sm:p-6 shrink-0">
            {selectedColor ? (
              <div className="flex items-center justify-between mb-3 sm:mb-4 gap-2">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                  <div
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg shadow-md border-2 border-white shrink-0"
                    style={{ backgroundColor: selectedColor.hex || selectedColor.hexCode }}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs sm:text-sm text-gray-600">Selected Color</p>
                    <p className="font-semibold text-sm sm:text-base text-gray-900 truncate">{selectedColor.name || selectedColor.calycoName}</p>
                    <p className="text-[10px] sm:text-xs text-gray-500">{selectedColor.code || selectedColor.ralCode}</p>
                  </div>
                </div>
                <div className="text-right shrink-0 hidden sm:block">
                  <p className="text-xs text-gray-500">{selectedColor.colorFamily}</p>
                </div>
              </div>
            ) : (
              <p className="text-center text-gray-500 mb-3 sm:mb-4 text-xs sm:text-sm">Please select a color to continue</p>
            )}

            <div className="flex gap-2 sm:gap-3">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2.5 sm:px-6 sm:py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors text-sm sm:text-base"
              >
                Cancel
              </button>
              <button
                onClick={handleAddToCart}
                disabled={!selectedColor}
                className="flex-1 px-4 py-2.5 sm:px-6 sm:py-3 bg-[#D4AF37] text-white font-semibold rounded-lg hover:bg-[#bb9831] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md text-sm sm:text-base"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ColorSelectorModal;
