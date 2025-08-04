import React, { useEffect, useRef, useState } from 'react';
import { Button } from '../Button';

const Filter = ({ colors, onFilterChange, activeFilters, isOpen, onClose, scrollToRef }) => {
  const [expandedCategories, setExpandedCategories] = useState(new Set());
  const [tempFilters, setTempFilters] = useState({});
  useEffect(() => {
    if (isOpen) {
      setTempFilters(activeFilters); // copy external filters into local temp
    }
  }, [isOpen]);

  const getUniqueValues = (key, split = false) => {
    let values = colors.map(color => color[key]).filter(Boolean);
    if (split) {
      values = values.flatMap(value => value.split(',').map(v => v.trim())).filter(Boolean);
    }
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
    style: getUniqueValues('style')
  };



  



  const filtersRef = useRef({});
  const toggleCategory = (category) => {
    const newExpanded = new Set(expandedCategories);
    const willExpand = !newExpanded.has(category);
    
    if (willExpand) {
      newExpanded.add(category);
      setExpandedCategories(newExpanded);

      // wait for DOM to render before scrolling
      setTimeout(() => {
        filtersRef.current[category]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } else {
      newExpanded.delete(category);
      setExpandedCategories(newExpanded);
    }
  };

  const getActiveFilterCount = () => {
    return Object.values(activeFilters).flat().length;
  };

  
  if (!isOpen) return null;

  const handleFilterChange = (category, value) => {
    const newFilters = { ...tempFilters };

    if (newFilters[category]?.includes(value)) {
      newFilters[category] = newFilters[category].filter(v => v !== value);
      if (newFilters[category].length === 0) delete newFilters[category];
    } else {
      newFilters[category] = [...(newFilters[category] || []), value];
    }

    setTempFilters(newFilters);
  };

  const clearAllFilters = () => {
      setTempFilters({});
    };
    const applyFilters = () => {
    onFilterChange(tempFilters);
    onClose();
    setTimeout(() => {
      if (scrollToRef?.current) {
        const offset = 120;
        const elementTop = scrollToRef.current.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: elementTop - offset, behavior: 'smooth' });
      }
    }, 200);
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[80vh] flex flex-col mx-4 sm:mx-0" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b flex-shrink-0">
          <h3 className="text-lg font-semibold">Filters</h3>
          <div className="flex items-center gap-4">
            {getActiveFilterCount() > 0 && (
              <button
                onClick={clearAllFilters}
                className="text-sm text-[#3f2d4d] hover:text-[#23182b] underline"
              >
                Clear All
              </button>
            )}
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {Object.entries(filterOptions).map(([key, options]) => (
            options.length > 0 && (
              <div key={key} ref={el => filtersRef.current[key] = el} className="border-b border-gray-200">
                <button
                  onClick={() => toggleCategory(key)}
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium">
                    {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    {tempFilters[key]?.length > 0 && (
                      <span className="ml-2 text-sm text-[#4d4b2d] font-bold">
                        ({tempFilters[key].length})
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
                          checked={tempFilters[key]?.includes(value) || false}
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

        <div className="p-6 border-t flex-shrink-0">
          <button
            onClick={applyFilters}
            className="w-full  bg-[#3f2d4d] hover:bg-[#23182b] text-white py-3 px-4 rounded-lg  transition-colors font-medium"
          >
            Apply Filters
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default Filter;
