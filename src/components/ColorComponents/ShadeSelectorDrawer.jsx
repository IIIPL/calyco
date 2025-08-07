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
    <div className="w-full bg-white py-6 border-b border-gray-200">
      <div className="container mx-auto px-4">
        <h2 className="text-xl font-semibold mb-4">Explore Shades</h2>
        
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto pb-4 scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className="flex">
            {shades.map((color) => (
              <div 
                key={color.hex}
                className="flex flex-col items-center flex-shrink-0"
              >
                {/* Triangle pointer for selected color */}
                {selectedColor && selectedColor.hex === color.hex && (
                  <div className="w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-gray-800 mb-1"></div>
                )}
                
                {/* Color block */}
                <div
                  id={`shade-${color.hex}`}
                  className="relative w-16 h-16 md:w-20 md:h-20 shadow-md cursor-pointer transform transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
                  style={{ backgroundColor: color.hex }}
                  onClick={() => onColorSelect(color)}
                  onKeyDown={(e) => handleKeyDown(e, color)}
                  tabIndex={0}
                  aria-label={`Select color ${color.name}`}
                >
                  {/* Tooltip on hover */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs opacity-0 hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                    {color.name}
                  </div>
                </div>
                
                {/* Color name (optional - can be shown if needed) */}
                {/* <p className="mt-2 text-xs text-gray-600 truncate w-16 text-center">{color.name}</p> */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShadeSelectorDrawer;