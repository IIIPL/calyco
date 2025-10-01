import React, { useEffect, useRef, useState } from 'react';
import { Button } from '../Button';

const Filter = ({ colors, onFilterChange, activeFilters, isOpen, onClose, scrollToRef }) => {
  const [expandedCategories, setExpandedCategories] = useState(new Set());
  const filtersRef = useRef({});

  useEffect(() => {
    if (!isOpen) setExpandedCategories(new Set());
  }, [isOpen]);

  const getUniqueValues = (key, split = false) => {
    let values = colors.map(color => color[key]).filter(Boolean);
    if (split) values = values.flatMap(v => v.split(',').map(x => x.trim())).filter(Boolean);
    const titleCased = values.map(v => v.replace(/\b\w/g, c => c.toUpperCase()));
    return [...new Set(titleCased)];
  };

  const filterOptions = {
    group: getUniqueValues('group'),
    tonality: getUniqueValues('tonality'),
    project: getUniqueValues('Project', true),
    opacity: getUniqueValues('opacity'),
    styling: getUniqueValues('styling'),
    primary_color: getUniqueValues('primary_color'),
    color_temperature: getUniqueValues('color_temperature'),
    interior_or_exterior: getUniqueValues('interior_or_exterior'),
    collection: getUniqueValues('collection'),
    style: getUniqueValues('style'),
  };

  const toggleCategory = (category) => {
    const next = new Set(expandedCategories);
    const willExpand = !next.has(category);
    willExpand ? next.add(category) : next.delete(category);
    setExpandedCategories(next);
    if (willExpand) {
      setTimeout(() => {
        filtersRef.current[category]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  const getActiveFilterCount = () => Object.values(activeFilters).flat().length;

  // LIVE apply on every click
  const handleFilterChange = (category, value) => {
    const current = activeFilters[category] || [];
    let nextForCategory;
    if (current.includes(value)) {
      nextForCategory = current.filter(v => v !== value);
    } else {
      nextForCategory = [...current, value];
    }

    const next = { ...activeFilters };
    if (nextForCategory.length === 0) delete next[category];
    else next[category] = nextForCategory;

    onFilterChange(next);

    // optional: nudge view to the grid immediately
    requestAnimationFrame(() => {
      if (scrollToRef?.current) {
        const offset = 120;
        const top = scrollToRef.current.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: top - offset, behavior: 'smooth' });
      }
    });
  };

  const clearAllFilters = () => onFilterChange({});

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[80vh] flex flex-col mx-4 sm:mx-0" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b flex-shrink-0">
          <h3 className="text-lg font-semibold">Filters</h3>
          <div className="flex items-center gap-4">
            {getActiveFilterCount() > 0 && (
              <button onClick={clearAllFilters} className="text-sm text-[#3f2d4d] hover:text-[#23182b] underline">
                Clear All
              </button>
            )}
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {Object.entries(filterOptions).map(([key, options]) => (
            options.length > 0 && (
              <div key={key} ref={el => (filtersRef.current[key] = el)} className="border-b border-gray-200">
                <button
                  onClick={() => toggleCategory(key)}
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium">
                    {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    {activeFilters[key]?.length > 0 && (
                      <span className="ml-2 text-sm text-[#4d4b2d] font-bold">
                        ({activeFilters[key].length})
                      </span>
                    )}
                  </span>
                  <svg
                    className={`w-4 h-4 transition-transform ${expandedCategories.has(key) ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {expandedCategories.has(key) && (
                  <div className="px-4 pb-4 space-y-2">
                    {options.map(value => (
                      <label key={value} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={activeFilters[key]?.includes(value) || false}
                          onChange={() => handleFilterChange(key, value)}
                          className="mr-3"
                        />
                        <span className="text-sm">{value}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            )
          ))}
        </div>

        {/* Removed footer Apply button — live apply is active */}
      </div>
    </div>
  );
};

export default Filter;
