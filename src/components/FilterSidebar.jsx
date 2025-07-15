import React from 'react';

const FILTERS = [
  {
    label: 'Interior / Exterior',
    options: [
      'Interior',
      'Exterior',
      'Interior / Exterior',
    ],
  },
  {
    label: 'Product Type',
    options: [
      'Paint',
      'Primer',
      'Stain',
      'Spray Paint & Decorative Finishes',
      'Finishes',
      'Show More', // For UI only
    ],
  },
  {
    label: 'Substrate',
    options: [
      'Drywall',
      'Wood',
      'Concrete',
      'Composite',
      'Show More', // For UI only
    ],
  },
  {
    label: 'Project Area',
    options: [
      'House Interior',
      'House Exterior',
      'Wood Decks',
      'Basement',
      'Show More', // For UI only
    ],
  },
  // Add more groups as needed
];

export const FilterSidebar = ({ checked, onCheck, expanded, onToggle }) => {
  return (
    <aside className="w-72 min-w-[260px] bg-white rounded-xl shadow p-6 border border-[#e5e0d8] mr-8">
      <h2 className="text-xl font-bold text-[#493657] mb-6">Filters</h2>
      {FILTERS.map((group, idx) => (
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
              {group.options.map(option => (
                option === 'Show More' ? (
                  <button
                    key={option}
                    className="text-[#493657] text-sm font-medium mt-1 flex items-center gap-1 hover:underline focus:outline-none"
                  >
                    <span className="text-lg">+</span> Show More
                  </button>
                ) : (
                  <label key={option} className="flex items-center gap-2 text-[#493657] text-base cursor-pointer">
                    <input
                      type="checkbox"
                      checked={!!checked[`${group.label}-${option}`]}
                      onChange={() => onCheck(group.label, option)}
                      className="accent-[#F0C85A] w-4 h-4"
                    />
                    <span>{option}</span>
                  </label>
                )
              ))}
            </div>
          )}
          <div className="border-b border-[#e5e0d8] mt-4" />
        </div>
      ))}
    </aside>
  );
};

export default FilterSidebar; 