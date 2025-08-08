import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { flatColors } from '../data/flatColors';
import Filter from '../components/ColorComponents/Filter';
import ColorBox from '../components/ColorComponents/ColorBox';
import { InspirationCard } from '../components/ColorComponents/Inspiration';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

const slugify = (text) => text.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and');
const unslugify = (text) => text.replace(/-/g, ' ').replace(/and/g, '&').toUpperCase();
const formatCaps = (text) =>
  text.replace(/\b\w+/g, word => word[0].toUpperCase() + word.slice(1).toLowerCase());

const FamilyColorPage = () => {
  const { familyName } = useParams();
  const navigate = useNavigate();
  const family = unslugify(familyName);
  const familyHeading = formatCaps(family);

  const colorGridRef = useRef(null);

  const [activeFilters, setActiveFilters] = useState({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const familyColors = flatColors.filter((c) => c.color_family === family);

  // Reset filters and scroll when familyName changes
  useEffect(() => {
    setActiveFilters({});
    if (inspirationRef.current) {
      inspirationRef.current.scrollLeft = 0;
      updateScrollButtons();
    }
  }, [familyName]);

  const filteredColors = useMemo(() => {
    if (Object.keys(activeFilters).length === 0) return familyColors;
    return familyColors.filter(color =>
      Object.entries(activeFilters).every(([filterKey, filterValues]) => {
        if (filterValues.length === 0) return true;
        const colorValue = color[filterKey] || color[filterKey === 'project' ? 'Project' : filterKey];
        return filterValues.includes(colorValue);
      })
    );
  }, [familyColors, activeFilters]);

  const handleFilterChange = (newFilters) => setActiveFilters(newFilters);
  const getActiveFilterCount = () => Object.values(activeFilters).flat().length;
  const clearAllFilters = () => setActiveFilters({});

  // Inspiration scroll logic
  const inspirationRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const scrollAmount = 300;

  const scroll = (dir) => {
    if (inspirationRef.current) {
      inspirationRef.current.scrollBy({ left: dir * scrollAmount, behavior: 'smooth' });
    }
  };

  const updateScrollButtons = () => {
    const el = inspirationRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 5);
  };

  useEffect(() => {
    const el = inspirationRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateScrollButtons);
    updateScrollButtons();
    return () => el.removeEventListener('scroll', updateScrollButtons);
  }, []);

  if (!familyColors.length) {
    return <div className="pt-32 text-center text-black">No colors found.</div>;
  }

  return (
    <div className="pt-24 md:pt-32 pb-20 bg-white text-[#1a1a1a] min-h-screen">
      {/* Heading */}
      <div className="mb-12 px-6 md:px-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">{familyHeading} Paint Colors</h1>
        <p className="text-md text-gray-700">Explore a range of {familyHeading} paint colors to find the perfect shade for your space.</p>
      </div>

      {/* Inspiration Section */}
     <section className="mb-12 px-6 md:px-12 mt-4">
      <div className="overflow-x-auto">
        <div className="flex space-x-6 pb-2">
          {familyColors.slice(0, 6).map((color, index) => (
            <InspirationCard key={index} colorName={color.name} />
          ))}
        </div>
      </div>
    </section>


      {/* Filter Controls */}
      <div className="px-10 mx-auto mb-8">
        <div className="mt-4 text-sm text-gray-600">
          Showing {filteredColors.length} of {familyColors.length} colors
        </div>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">All Colors</h3>
          <div className="flex items-center gap-3">
            {getActiveFilterCount() > 0 && (
              <button
                onClick={clearAllFilters}
                className="px-4 py-2 text-xs md:text-sm text-red-600 hover:text-red-800 underline transition-colors"
              >
                Clear All Filters
              </button>
            )}
            <button
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <span>Filter</span>
              {getActiveFilterCount() > 0 && (
                <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-1">
                  {getActiveFilterCount()}
                </span>
              )}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Filter Modal */}
      <Filter
        colors={familyColors}
        onFilterChange={handleFilterChange}
        activeFilters={activeFilters}
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        scrollToRef = {colorGridRef}
      />

      {/* Color Grid */}
      <section ref={colorGridRef} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 px-10 mx-auto">
        {filteredColors.map((color, idx) => (
          <ColorBox key={idx} color={color} familyName={familyName} />
        ))}
      </section>

      {/* No Results Message */}
      {filteredColors.length === 0 && (
        <div className="text-center py-12 px-10">
          <div className="text-gray-500 text-lg mb-4">No colors match your current filters</div>
          <button
            onClick={clearAllFilters}
            className="px-6 py-2 bg-gradient-to-r from-[#f3de79] to-[#a57f24] text-black rounded-lg transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default FamilyColorPage;
