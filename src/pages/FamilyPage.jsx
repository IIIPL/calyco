import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { flatColors } from '../data/flatColors';
import Filter from '../components/ColorComponents/Filter';
import ColorBox from '../components/ColorComponents/ColorBox';
import { InspirationCard } from '../components/ColorComponents/Inspiration';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import ColorDisclaimer from "../components/ColorComponents/ColorDisclaimer"; // add import
import FamilyNavigator from '../components/ColorComponents/FamilyNavigator';


const slugify = (text) => text.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and');
const unslugify = (text) => text.replace(/-/g, ' ').replace(/and/g, '&').toUpperCase();
const formatCaps = (text) =>
  text.replace(/\b\w+/g, word => word[0].toUpperCase() + word.slice(1).toLowerCase());

const FamilyColorPage = () => {
  const { familyName } = useParams();
  const navigate = useNavigate();
  const family = unslugify(familyName);
  const familyHeading = formatCaps(family);
  useEffect(() => {
    if (familyHeading) {
      document.title = `${familyHeading} Paint Colors | Calyco Paints`;
    }
  }, [familyHeading]);
  
  const btnRefs = useRef({});
  const [dropdownPos, setDropdownPos] = useState({ left: 0, top: 0 });


  const colorGridRef = useRef(null);

  const [activeFilters, setActiveFilters] = useState({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const inlineBarRef = useRef(null);
  const [openMenu, setOpenMenu] = useState(null);


  const familyColors = flatColors.filter((c) => c.color_family === family);
  const calcDropdownPos = (key) => {
    const btn = btnRefs.current[key];
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const panelW = 240; // matches w-60
    const left = Math.min(rect.left, window.innerWidth - panelW - 16);
    const top = rect.bottom + 8;
    setDropdownPos({ left, top });
  };


  // Reset filters and scroll when familyName changes
  useEffect(() => {
    setActiveFilters({});
    if (inspirationRef.current) {
      inspirationRef.current.scrollLeft = 0;
      updateScrollButtons();
    }
  }, [familyName]);
   const titleCase = (v='') => v.toString().replace(/\b\w/g, c => c.toUpperCase()).trim();
  const getUniqueValues = (key, split = false) => {
    let values = familyColors.map(c => (key === 'Project' ? c.Project : c[key])).filter(Boolean);
    if (split) values = values.flatMap(v => v.split(',').map(x => x.trim())).filter(Boolean);
    const tc = values.map(titleCase);
    return [...new Set(tc)];
  };
  useEffect(() => { setOpenMenu(null); }, [familyName]);

  // Precompute options once and reuse in inline bar + modal
  const filterOptions = useMemo(() => ({
    group: getUniqueValues('group'),
    tonality: getUniqueValues('tonality'),
    project: getUniqueValues('Project', true), // key name "project"
    opacity: getUniqueValues('opacity'),
    styling: getUniqueValues('styling'),
    primary_color: getUniqueValues('primary_color'),
    color_temperature: getUniqueValues('color_temperature'),
    interior_or_exterior: getUniqueValues('interior_or_exterior'),
    collection: getUniqueValues('collection'),
    style: getUniqueValues('style'),
  }), [familyColors]);

  // Inline toggle (same logic as modal)
  const toggleInlineFilter = (category, value) => {
    setActiveFilters(prev => {
      const current = prev[category] || [];
      const nextForCategory = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value];

      const next = { ...prev };
      if (nextForCategory.length === 0) delete next[category];
      else next[category] = nextForCategory;
      return next;
    });
    // optional: scroll to grid
    requestAnimationFrame(() => {
      if (colorGridRef?.current) {
        const offset = 120;
        const top = colorGridRef.current.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: top - offset, behavior: 'smooth' });
      }
    });
  };
  const filteredColors = useMemo(() => {
  if (Object.keys(activeFilters).length === 0) return familyColors;

  const titleCase = (v='') => v.toString().replace(/\b\w/g, c => c.toUpperCase()).trim();

  const getColorValues = (color, key) => {
    // Handle "project"/"Project" as comma-separated list
    if (key.toLowerCase() === 'project') {
      return (color.Project || '')
        .split(',')
        .map(s => titleCase(s))
        .filter(Boolean);
    }
    // Single-value fields
    const raw = color[key] ?? color[key === 'project' ? 'Project' : key];
    return raw ? [titleCase(raw)] : [];
  };

  return familyColors.filter(color =>
    Object.entries(activeFilters).every(([filterKey, selected]) => {
      if (!selected?.length) return true;
      const colorVals = getColorValues(color, filterKey);
      // OR within a category
      return selected.some(sel => colorVals.includes(titleCase(sel)));
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

  useEffect(() => {
  const onDocClick = (e) => {
    if (inlineBarRef.current && !inlineBarRef.current.contains(e.target)) {
      setOpenMenu(null);
    }
  };
  document.addEventListener('mousedown', onDocClick);
  return () => document.removeEventListener('mousedown', onDocClick);
}, []);

// close on Esc
useEffect(() => {
  const onKey = (e) => e.key === 'Escape' && setOpenMenu(null);
  document.addEventListener('keydown', onKey);
  return () => document.removeEventListener('keydown', onKey);
}, []);

  useEffect(() => {
    const el = inlineBarRef.current;
    if (!el || !openMenu) return;
    const onScroll = () => calcDropdownPos(openMenu);
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [openMenu]);


  useEffect(() => {
    if (!openMenu) return;
    const onMove = () => calcDropdownPos(openMenu);
    window.addEventListener('scroll', onMove, { passive: true });
    window.addEventListener('resize', onMove);
    return () => {
      window.removeEventListener('scroll', onMove);
      window.removeEventListener('resize', onMove);
    };
  }, [openMenu]);


  return (
    <div className="pt-24 md:pt-32 pb-20 bg-white text-[#1a1a1a] min-h-screen">
      {/* breadcrumb */}
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="px-6 md:px-12 mb-4 text-sm text-gray-600"
      >
        <span
          onClick={() => navigate('/colors')}
          className="cursor-pointer underline hover:no-underline"
        >
          Paint Colors
        </span>
        <span className="mx-2">›</span>
        <span className="text-gray-800 font-medium">{familyHeading}</span>
      </nav>

      {/* Heading */}
      <div className="mb-12 px-6 md:px-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">{familyHeading} Paint Colors</h1>
        <FamilyNavigator />
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
      <div className="px-10 mx-auto mb-4">
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

        {/* INLINE FILTER BAR */}
        {/* INLINE FILTER BAR */}
<div
  ref={inlineBarRef}
  className="mt-3 flex flex-nowrap gap-3 overflow-x-auto overflow-y-visible pb-2 sm:flex-wrap sm:overflow-x-visible"
>


  {Object.entries(filterOptions).map(([key, options]) => (
    options.length > 0 && (
      <div key={key} className="relative shrink-0">
        <button
          ref={el => (btnRefs.current[key] = el)}
          type="button"
          onClick={() => {
            setOpenMenu(prev => (prev === key ? null : key));
            setTimeout(() => calcDropdownPos(key), 0);
          }}

          className="px-3 py-1.5 rounded-lg border bg-white text-sm flex items-center gap-2 hover:bg-gray-50 whitespace-nowrap"
        >
          <span>{key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
          {activeFilters[key]?.length > 0 && (
            <span className="text-xs bg-blue-600 text-white rounded-full px-2 py-0.5">
              {activeFilters[key].length}
            </span>
          )}
          <svg
            className={`w-4 h-4 text-gray-500 transition-transform ${openMenu === key ? 'rotate-180' : ''}`}
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {openMenu === key && (
          <div
            className="fixed z-[100] w-60 max-h-72 overflow-y-auto bg-white border rounded-lg shadow-lg p-3"
            style={{ left: dropdownPos.left, top: dropdownPos.top }}
          >

            <div className="space-y-2">
              {options.map((value) => (
                <label key={value} className="flex items-center gap-2 text-sm py-1">
                  <input
                    type="checkbox"
                    className="accent-[#3f2d4d]"
                    checked={activeFilters[key]?.includes(value) || false}
                    onChange={() => toggleInlineFilter(key, value)}
                  />
                  <span>{value}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  ))}
</div>

      </div>

      {/* Filter Modal — now reusing same options */}
      <Filter
        colors={familyColors}
        filterOptions={filterOptions} // <-- reuse
        onFilterChange={handleFilterChange}
        activeFilters={activeFilters}
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        scrollToRef={colorGridRef}
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


      <div className="px-6 md:px-12">
        <ColorDisclaimer variant="short" />
      </div>
    </div>
  );
};

export default FamilyColorPage;
