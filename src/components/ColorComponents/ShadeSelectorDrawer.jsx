import React, { useRef, useEffect } from 'react';
import { groupedShades } from '../../data/groupedShades';

const slugify = (text) =>
  typeof text === 'string'
    ? text
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-&]+/g, '')
        .replace(/\-\-+/g, '-')
    : '';

const ShadeSelectorDrawer = ({ shades, selectedColor, onColorSelect }) => {
  const scrollContainerRef = useRef(null);
  const group = groupedShades.find(g => slugify(g.family) === shades);
  const colorList = group ? group.colors : [];
  
  // Scroll selected swatch to center on load or when selection changes
  useEffect(() => {
  if (scrollContainerRef.current && selectedColor) {
    const container = scrollContainerRef.current;
    const selectedElement = document.getElementById(`shade-${selectedColor.hex.replace('#', '')}`);
    const triangle = document.getElementById('shade-indicator');

    setTimeout(() => {
      if (!selectedElement || !triangle) return;

      const containerWidth = container.offsetWidth;
      const swatchOffsetLeft = selectedElement.offsetLeft;
      const swatchWidth = selectedElement.offsetWidth;

      const scrollTarget = swatchOffsetLeft - (containerWidth / 2) + (swatchWidth / 2);
      const maxScroll = container.scrollWidth - container.clientWidth;
      const clamped = Math.max(0, Math.min(scrollTarget, maxScroll));

      container.scrollTo({ left: clamped, behavior: 'smooth' });
    }, 10);
  }
}, [selectedColor]);

  

  // Handle keyboard events
  const handleKeyDown = (e, color) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onColorSelect({ ...color, color_family: group.family });
    }
  };

  return (
    <div className="w-full bg-white border-b border-gray-200 py-6 relative">
      {/* Centered triangle indicator */}
      <div id="shade-indicator" className="absolute top-[24px] left-1/2 transform -translate-x-1/2 z-30 pointer-events-none">
        <div className="border-l-[16px] border-r-[16px] border-t-[20px] border-l-transparent border-r-transparent border-t-white" />
      </div>
      
      {/* Scrollable shade strip */}
      <div className="flex items-center justify-between px-4">
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto scrollbar-hide flex-grow gap-2 px-10 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {colorList.map((color) => {
            const isSelected = selectedColor && selectedColor.hex === color.hex;
            return (
              <div
                key={color.hex}
                id={`shade-${color.hex.replace('#', '')}`}
                className={`group flex-shrink-0 w-20 h-24 cursor-pointer focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-gray-800 relative transition-all duration-300 snap-center ${
                  isSelected ? 'ring-2 ring-black' : ''
                }`}
                style={{ backgroundColor: color.hex }}
                onClick={() => onColorSelect({ ...color, color_family: group.family })}
                onKeyDown={(e) => handleKeyDown(e, color)}
                tabIndex={0}
                aria-label={`Select color ${color.name}`}
              >
                {/* Hover tooltip with name */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 whitespace-nowrap">
                  {color.name}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Fixed label */}
        <div className="ml-4 flex-shrink-0 text-sm text-gray-700 whitespace-nowrap">
          Explore more shades
        </div>
      </div>
    </div>
  );
};

export default ShadeSelectorDrawer;