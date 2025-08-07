import React, { useRef, useEffect } from 'react';

const ShadeSelectorDrawer = ({ shades, selectedColor, onColorSelect }) => {
  const scrollContainerRef = useRef(null);
  
  // Scroll to selected color when component mounts or selectedColor changes
  useEffect(() => {
    if (scrollContainerRef.current && selectedColor) {
      const selectedElement = document.getElementById(`shade-${selectedColor.hex}`);
      if (selectedElement) {
        const container = scrollContainerRef.current;
        const scrollLeft = selectedElement.offsetLeft - container.offsetWidth / 2 + selectedElement.offsetWidth / 2;
        container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      }
    }
  }, [selectedColor]);

  // Handle keyboard navigation
  const handleKeyDown = (e, color) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onColorSelect(color);
    }
  };

  return (
    <div className="w-full bg-white border-b border-gray-200 py-4">
      <div className="flex items-center justify-between px-4">
        {/* Shade Scroll Strip */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto scrollbar-hide flex-grow"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {shades.map((color) => {
            const isSelected = selectedColor && selectedColor.hex === color.hex;
            return (
              <div
                key={color.hex}
                id={`shade-${color.hex}`}
                className="relative group flex-shrink-0 w-20 h-24 cursor-pointer focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-gray-800"
                style={{ backgroundColor: color.hex }}
                onClick={() => onColorSelect(color)}
                onKeyDown={(e) => handleKeyDown(e, color)}
                tabIndex={0}
                aria-label={`Select color ${color.name}`}
              >
                {/* Triangle pointer above selected color */}
                {isSelected && (
                  <div className="absolute -top-[10px] left-1/2 transform -translate-x-1/2">
                    <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-b-[10px] border-transparent border-b-white" />
                  </div>
                )}
                
                {/* Hover tooltip with color name */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
                  {color.name}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Explore text */}
        <div className="ml-4 flex-shrink-0 text-sm text-gray-700 whitespace-nowrap hidden sm:block">
          Explore more shades
        </div>
      </div>
    </div>
  );
};

export default ShadeSelectorDrawer;