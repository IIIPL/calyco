import React, { useState } from 'react';

const Filter = ({ colors, onFilterChange, activeFilters, isOpen, onClose }) => {
  const [expandedCategories, setExpandedCategories] = useState(new Set());

  // Extract unique values for each filter category
  const getUniqueValues = (key) => {
    const values = colors.map(color => color[key]).filter(Boolean);
    return [...new Set(values)];
  };

  const filterOptions = {
    group: getUniqueValues('group'),
    tone: getUniqueValues('tone'),
    project: getUniqueValues('Project'),
    opacity: getUniqueValues('opacity'),
    styling: getUniqueValues('styling')
  };

  const handleFilterChange = (category, value) => {
    const newFilters = { ...activeFilters };
    
    if (newFilters[category]?.includes(value)) {
      // Remove value if already selected
      newFilters[category] = newFilters[category].filter(v => v !== value);
      if (newFilters[category].length === 0) {
        delete newFilters[category];
      }
    } else {
      // Add value if not selected
      newFilters[category] = [...(newFilters[category] || []), value];
    }
    
    onFilterChange(newFilters);
  };

  const clearAllFilters = () => {
    onFilterChange({});
  };

  const toggleCategory = (category) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  const getActiveFilterCount = () => {
    return Object.values(activeFilters).flat().length;
  };

  const applyFilters = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b flex-shrink-0">
          <h3 className="text-lg font-semibold">Filters</h3>
          <div className="flex items-center gap-4">
            {getActiveFilterCount() > 0 && (
              <button
                onClick={clearAllFilters}
                className="text-sm text-blue-600 hover:text-blue-800 underline"
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

        {/* Filter Categories - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          {/* Color Group */}
          {filterOptions.group.length > 0 && (
            <div className="border-b border-gray-200">
              <button
                onClick={() => toggleCategory('group')}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium">Color Group</span>
                <svg
                  className={`w-4 h-4 transition-transform ${expandedCategories.has('group') ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {expandedCategories.has('group') && (
                <div className="px-4 pb-4 space-y-2">
                  {filterOptions.group.map(group => (
                    <label key={group} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={activeFilters.group?.includes(group) || false}
                        onChange={() => handleFilterChange('group', group)}
                        className="mr-3"
                      />
                      <span className="text-sm">{group}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Tone */}
          {filterOptions.tone.length > 0 && (
            <div className="border-b border-gray-200">
              <button
                onClick={() => toggleCategory('tone')}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium">Tone</span>
                <svg
                  className={`w-4 h-4 transition-transform ${expandedCategories.has('tone') ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {expandedCategories.has('tone') && (
                <div className="px-4 pb-4 space-y-2">
                  {filterOptions.tone.map(tone => (
                    <label key={tone} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={activeFilters.tone?.includes(tone) || false}
                        onChange={() => handleFilterChange('tone', tone)}
                        className="mr-3"
                      />
                      <span className="text-sm">{tone}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Project/Rooms */}
          {filterOptions.project.length > 0 && (
            <div className="border-b border-gray-200">
              <button
                onClick={() => toggleCategory('project')}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium">Rooms & Project ({filterOptions.project.length})</span>
                <svg
                  className={`w-4 h-4 transition-transform ${expandedCategories.has('project') ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {expandedCategories.has('project') && (
                <div className="px-4 pb-4 space-y-2">
                  {filterOptions.project.map(project => (
                    <label key={project} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={activeFilters.project?.includes(project) || false}
                        onChange={() => handleFilterChange('project', project)}
                        className="mr-3"
                      />
                      <span className="text-sm">{project}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Opacity */}
          {filterOptions.opacity.length > 0 && (
            <div className="border-b border-gray-200">
              <button
                onClick={() => toggleCategory('opacity')}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium">Opacity</span>
                <svg
                  className={`w-4 h-4 transition-transform ${expandedCategories.has('opacity') ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {expandedCategories.has('opacity') && (
                <div className="px-4 pb-4 space-y-2">
                  {filterOptions.opacity.map(opacity => (
                    <label key={opacity} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={activeFilters.opacity?.includes(opacity) || false}
                        onChange={() => handleFilterChange('opacity', opacity)}
                        className="mr-3"
                      />
                      <span className="text-sm">{opacity}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Styling */}
          {filterOptions.styling.length > 0 && (
            <div className="border-b border-gray-200">
              <button
                onClick={() => toggleCategory('styling')}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium">Styling</span>
                <svg
                  className={`w-4 h-4 transition-transform ${expandedCategories.has('styling') ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {expandedCategories.has('styling') && (
                <div className="px-4 pb-4 space-y-2">
                  {filterOptions.styling.map(styling => (
                    <label key={styling} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={activeFilters.styling?.includes(styling) || false}
                        onChange={() => handleFilterChange('styling', styling)}
                        className="mr-3"
                      />
                      <span className="text-sm">{styling}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Apply Filters Button - Fixed at bottom */}
        <div className="p-6 border-t flex-shrink-0">
          <button
            onClick={applyFilters}
            className="w-full bg-gray-800 text-white py-3 px-4 rounded-lg hover:bg-gray-900 transition-colors font-medium"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
