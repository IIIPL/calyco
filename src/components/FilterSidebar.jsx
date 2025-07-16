import React, { useState } from 'react';

const FILTERS = [
  {
    label: 'Area',
    field: 'area_of_use',
    options: [
      'Interior', 'Exterior', 'Both'
    ],
  },
  {
    label: 'Type',
    field: 'product_type',
    options: [
      'Interior', 'Exterior', 'Wood Finishes', 'Enamel & Wood Finishes', 'Industrial Coatings', 'Specialty'
    ],
  },
  {
    label: 'Material',
    field: 'material_base',
    options: [
      'Gypsum', 'Wood', 'Concrete', 'Composite', 'Masonry', 'Metal', 'Paver', 'Stone', 'Stucco', 'Tile', 'Vinyl', 'Brick', 'Precast', 'Glass'
    ],
  },
  {
    label: 'Application',
    field: 'application_area',
    options: [
      'Walls', 'Decks', 'Basements', 'Driveways', 'Fences', 'Verandas', 'Patios', 'Flooring', 'Roofs', 'Cladding', 'Walkways', 'Furniture', 'Garage'
    ],
  },
  {
    label: 'Finish',
    field: 'finish_base_type',
    options: [
      'Opaque', 'Semi-Transparent', 'Transparent', 'Natural', 'Acrylic', 'Oil', 'Water', 'Polyurethane'
    ],
  },
];

const DEFAULT_VISIBLE = 6;

export const FilterSidebar = ({ checked, onCheck, expanded, onToggle, showMoreState, setShowMoreState }) => {
  // Local state for Show More/Less per group
  const [showMore, setShowMore] = useState(Array(FILTERS.length).fill(false));

  const handleShowMore = idx => {
    setShowMore(sm => sm.map((v, i) => (i === idx ? !v : v)));
  };

  return (
    <aside className="w-72 min-w-[260px] bg-white rounded-xl shadow p-6 border border-[#e5e0d8] mr-8">
      <h2 className="text-xl font-bold text-[#493657] mb-6">Filters</h2>
      {FILTERS.map((group, idx) => {
        // For 'Finish', always show all options and never show 'Show More'
        const isFinish = group.label === 'Finish';
        const visibleOptions = isFinish ? group.options : (showMore[idx] ? group.options : group.options.slice(0, DEFAULT_VISIBLE));
        const hasShowMore = !isFinish && group.options.length > DEFAULT_VISIBLE;
        return (
          <div key={group.label} className="mb-6">
            <button
              className="flex items-center justify-between w-full font-semibold text-[#493657] text-base mb-2 focus:outline-none"
              onClick={() => onToggle(idx)}
              aria-expanded={expanded[idx]}
            >
              <span>{group.label}</span>
              <span className={`transition-transform ${expanded[idx] ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {expanded[idx] && (
              <div className="pl-1 flex flex-col gap-2">
                {visibleOptions.map(option => (
                  <label key={option} className="flex items-center gap-2 text-[#493657] text-base cursor-pointer">
                    <input
                      type="checkbox"
                      checked={!!checked[`${group.label}-${option}`]}
                      onChange={() => onCheck(group.label, option)}
                      className="accent-[#F0C85A] w-4 h-4"
                    />
                    <span>{option}</span>
                  </label>
                ))}
                {hasShowMore && (
                  <button
                    className="text-[#493657] text-sm font-medium mt-1 flex items-center gap-1 hover:underline focus:outline-none"
                    onClick={() => handleShowMore(idx)}
                  >
                    <span className="text-lg">{showMore[idx] ? '−' : '+'}</span> {showMore[idx] ? 'Show Less' : 'Show More'}
                  </button>
                )}
              </div>
            )}
            <div className="border-b border-[#e5e0d8] mt-4" />
          </div>
        );
      })}
    </aside>
  );
};

export default FilterSidebar; 