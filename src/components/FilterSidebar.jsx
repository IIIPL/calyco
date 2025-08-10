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
    <aside className="w-72 min-w-[260px] bg-white rounded-xl shadow p-6 border border-[#e5e0d8] mr-8">
      <h2 className="text-xl font-bold text-[#493657] mb-6">Filters</h2>
      {FILTERS.map((group, idx) => {
        const visibleOptions = showMore[idx] ? group.options : group.options.slice(0, DEFAULT_VISIBLE);
        const hasShowMore = group.options.length > DEFAULT_VISIBLE;

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
