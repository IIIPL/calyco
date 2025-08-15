import React, { useState, useEffect, useRef } from 'react';
import { products } from '../data/products';
import {
  orderedSubstrateGroups,
  APPLICATION_GROUPS_ORDER,
  mapToStandardApplicationAreas,
  APPLICATION_TOOLTIPS,
  mapToStandardCategories,
  sortCategoriesWithOrder
} from '../utils/mapping';

const HoverTip = ({ text, children, openDelay = 250, closeDelay = 120 }) => {
  const [open, setOpen] = useState(false);
  const openT = useRef(null);
  const closeT = useRef(null);

  const show = () => {
    clearTimeout(closeT.current);
    openT.current = setTimeout(() => setOpen(true), openDelay);
  };
  const hide = () => {
    clearTimeout(openT.current);
    closeT.current = setTimeout(() => setOpen(false), closeDelay);
  };

  useEffect(() => () => {
    clearTimeout(openT.current);
    clearTimeout(closeT.current);
  }, []);

  return (
    <span
      className="relative inline-flex items-center"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}

      {text && (
        <span
          role="tooltip"
          aria-hidden={!open}
          className={[
            "pointer-events-none absolute left-1/2 top-[calc(100%+8px)] -translate-x-1/2 z-50",
            "transition-all duration-150",
            open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"
          ].join(" ")}
        >
          <span className="relative block">
            <span className="block bg-[#2c2240] text-white text-[14px] leading-snug px-3 py-2 rounded-lg shadow-xl border border-white/10 max-w-[260px] whitespace-pre-line">
              {text}
            </span>
            <span className="absolute left-1/2 -translate-x-1/2 -top-1.5 w-3 h-3 bg-[#2c2240] rotate-45 shadow-xl" />
          </span>
        </span>
      )}
    </span>
  );
};

// Build Filter Options
const rawCategories = products.map(p => p.category).filter(Boolean);
const uniqueCategories = sortCategoriesWithOrder(
  mapToStandardCategories(rawCategories)
);

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
    <aside className="w-72 min-w-[260px] bg-white rounded-xl shadow p-6 border border-[#e5e0d8] mr-8 overflow-visible">
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
                  <label key={option} className="relative flex items-center gap-2 text-[#493657] text-base cursor-pointer">
                    <input
                      type="checkbox"
                      checked={!!checked[`${group.label}-${option}`]}
                      onChange={() => onCheck(group.label, option)}
                      className="accent-[#F0C85A] w-4 h-4"
                    />
                    {group.label === 'Application Area' ? (
                      <HoverTip text={APPLICATION_TOOLTIPS[option]}>
                        <span className="hover:underline decoration-dotted underline-offset-4">{option}</span>
                      </HoverTip>
                    ) : (
                      <span>{option}</span>
                    )}
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
