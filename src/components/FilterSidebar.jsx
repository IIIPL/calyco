import React, { useState } from 'react';
import { products } from '../data/products';
import {
  orderedSubstrateGroups,
  APPLICATION_GROUPS_ORDER,
  mapToStandardApplicationAreas
} from '../utils/mapping';

// Build Filter Options
const uniqueCategories = Array.from(new Set(products.map(p => p.category).filter(Boolean)));

const allRawApplications = products
  .flatMap(p => Array.isArray(p.application) ? p.application : (p.application ? [p.application] : []));
let uniqueGroupedApplicationAreas = Array.from(new Set(
  mapToStandardApplicationAreas(allRawApplications)
));
uniqueGroupedApplicationAreas = APPLICATION_GROUPS_ORDER.filter(g => uniqueGroupedApplicationAreas.includes(g));

const FILTERS = [
  { label: 'Category', field: 'category', options: uniqueCategories },
  { label: 'Substrate', field: 'substrate', options: orderedSubstrateGroups },
  { label: 'Application Area', field: 'application', options: uniqueGroupedApplicationAreas },
];

const DEFAULT_VISIBLE = 4;

export const FilterSidebar = ({ checked, onCheck, expanded, onToggle }) => {
  const [showMore, setShowMore] = useState(Array(FILTERS.length).fill(false));
  const handleShowMore = idx => setShowMore(prev => prev.map((val, i) => (i === idx ? !val : val)));

  return (
    <aside className="w-full bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-gradient-to-r from-[#493657] to-[#5a4067] rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-800">Filters</h2>
      </div>
      {FILTERS.map((group, idx) => {
        const visibleOptions = showMore[idx] ? group.options : group.options.slice(0, DEFAULT_VISIBLE);
        const hasShowMore = group.options.length > DEFAULT_VISIBLE;

        return (
          <div key={group.label} className="mb-6 last:mb-0">
            <button
              className="flex items-center justify-between w-full font-semibold text-gray-800 text-base mb-4 p-3 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#F0C85A] transition-all duration-200"
              onClick={() => onToggle(idx)}
              aria-expanded={expanded[idx]}
            >
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#F0C85A] rounded-full"></span>
                {group.label}
              </span>
              <svg 
                className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${expanded[idx] ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {expanded[idx] && (
              <div className="space-y-3 pl-2">
                {visibleOptions.map(option => (
                  <label key={option} className="flex items-center gap-3 text-gray-700 text-sm cursor-pointer group hover:text-gray-900 transition-colors duration-200">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={!!checked[`${group.label}-${option}`]}
                        onChange={() => onCheck(group.label, option)}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 border-2 rounded-md flex items-center justify-center transition-all duration-200 ${
                        checked[`${group.label}-${option}`] 
                          ? 'border-[#493657] bg-[#493657]' 
                          : 'border-gray-300 group-hover:border-gray-400'
                      }`}>
                        {checked[`${group.label}-${option}`] && (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <span className="font-medium">{option}</span>
                  </label>
                ))}
                
                {hasShowMore && (
                  <button
                    className="text-[#493657] text-sm font-medium mt-3 flex items-center gap-2 hover:text-[#5a4067] focus:outline-none focus:ring-2 focus:ring-[#F0C85A] rounded-lg px-2 py-1 transition-all duration-200"
                    onClick={() => handleShowMore(idx)}
                  >
                    <span className="text-lg font-bold">{showMore[idx] ? '−' : '+'}</span> 
                    {showMore[idx] ? 'Show Less' : `Show ${group.options.length - DEFAULT_VISIBLE} More`}
                  </button>
                )}
              </div>
            )}
          </div>
        );
      })}
    </aside>
  );
};

export default FilterSidebar;
