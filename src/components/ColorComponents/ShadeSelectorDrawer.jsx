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

const ShadeSelectorDrawer = ({ shades, selectedColor, onColorSelect, colorList: providedList }) => {
  const scrollContainerRef = useRef(null);
  const group = groupedShades.find((g) => slugify(g.family) === shades);
  const fallbackList = group ? group.colors : [];
  const colorList = providedList?.length ? providedList : fallbackList;

  useEffect(() => {
    if (scrollContainerRef.current && selectedColor) {
      const container = scrollContainerRef.current;
      const elementId = `shade-${selectedColor.slug || selectedColor.hex?.replace('#', '')}`;
      const selectedElement = document.getElementById(elementId);
      const triangle = document.getElementById('shade-indicator');

      setTimeout(() => {
        if (!selectedElement || !triangle) return;

        const containerRect = container.getBoundingClientRect();
        const selectedRect = selectedElement.getBoundingClientRect();
        const triangleRect = triangle.getBoundingClientRect();

        const selectedCenterX = selectedRect.left + selectedRect.width / 2;
        const triangleCenterX = triangleRect.left + triangleRect.width / 2;

        const scrollDelta = selectedCenterX - triangleCenterX;

        container.scrollBy({ left: scrollDelta, behavior: 'smooth' });
      }, 0);
    }
  }, [selectedColor]);

  const handleKeyDown = (e, color) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onColorSelect(color);
    }
  };

  return (
    <div className="w-full bg-white border-b border-gray-200 py-6 relative">
      <div id="shade-indicator" className="absolute top-[24px] left-1/2 transform -translate-x-1/2 z-30 pointer-events-none">
        <div className="border-l-[16px] border-r-[16px] border-t-[20px] border-l-transparent border-r-transparent border-t-white" />
      </div>

      <div className="flex flex-col items-center px-4">
        <div
          ref={scrollContainerRef}
          className="overflow-x-auto whitespace-nowrap scrollbar-hide px-10 w-full"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className="inline-flex items-center">
            <div className="w-[50vw] flex-shrink-0" />

            {colorList.map((color) => {
              const isSelected = selectedColor && (selectedColor.slug ? selectedColor.slug === color.slug : selectedColor.hex === color.hex);
              const [tooltipPos, setTooltipPos] = React.useState({ x: 0, y: 0 });
              const [showTooltip, setShowTooltip] = React.useState(false);
              const background = color.actualHex || color.hex || '#CCCCCC';
              const elementId = `shade-${color.slug || String(color.hex).replace('#', '')}`;

              const handleMouseMove = (e) => {
                if (!isSelected) {
                  setTooltipPos({ x: e.clientX + 12, y: e.clientY + 12 });
                }
              };

              const handleMouseEnter = () => {
                if (!isSelected) setShowTooltip(true);
              };

              const handleMouseLeave = () => {
                setShowTooltip(false);
              };

              return (
                <div
                  key={elementId}
                  id={elementId}
                  className={`group flex-shrink-0 w-24 h-24 cursor-pointer focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-gray-800 relative transition-all duration-300 snap-center ${
                    isSelected ? 'border-4 border-black' : ''
                  }`}
                  style={{ backgroundColor: background }}
                  onClick={() => onColorSelect(color)}
                  onKeyDown={(e) => handleKeyDown(e, color)}
                  onMouseMove={handleMouseMove}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  tabIndex={0}
                  aria-label={`Select color ${color.name}`}
                >
                  {showTooltip && (
                    <div
                      style={{
                        position: 'fixed',
                        top: tooltipPos.y,
                        left: tooltipPos.x,
                        background: 'rgba(0,0,0,0.85)',
                        color: '#fff',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        pointerEvents: 'none',
                        whiteSpace: 'nowrap',
                        zIndex: 9999,
                      }}
                    >
                      {color.name}
                    </div>
                  )}
                </div>
              );
            })}

            <div className="w-[50vw] flex-shrink-0" />
          </div>
        </div>

        <div className="mt-4 text-sm text-gray-700 whitespace-nowrap">Explore more shades</div>
      </div>
    </div>
  );
};

export default ShadeSelectorDrawer;
