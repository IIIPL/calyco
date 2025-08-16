import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products as allProducts } from '../data/products';
import { FilterSidebar } from '../components/FilterSidebar';
import ProductCard from '../components/ProductCard';
import ActiveFilters from '../components/ActiveFilters';
import {
  mapToStandardSubstrates,
  mapToStandardApplicationAreas
} from '../utils/mapping';

const FILTER_GROUPS = ['Category', 'Substrate', 'Application Area'];

export const Products = () => {
  // applied vs draft search
  const [search, setSearch] = useState('');
  const [searchDraft, setSearchDraft] = useState('');

  const [checked, setChecked] = useState({});
  const [expanded, setExpanded] = useState([true, true, true]);
  const [sortOrder, setSortOrder] = useState('');
  const [showFilter, setShowFilter] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => { document.title = 'Products'; }, []);
  useEffect(() => { setSearchDraft(search); }, [search]);

  // Restore persisted state
  useEffect(() => {
    const saved = sessionStorage.getItem('productFilters');
    if (saved) {
      const s = JSON.parse(saved);
      if (s.search !== undefined) setSearch(s.search);
      if (s.checked) setChecked(s.checked);
      if (s.sortOrder) setSortOrder(s.sortOrder);
    }
  }, []);

  // URL → filters (react when URL changes)
  useEffect(() => {
    const cats = searchParams.getAll('category');
    const subs = searchParams.getAll('substrate');
    const apps = searchParams.getAll('application');

    // prefer ?search=, fallback to legacy ?q=
    const q = searchParams.get('search') ?? searchParams.get('q');
    const sort = searchParams.get('sort');

    const urlChecked = {};
    cats.forEach(c => { urlChecked[`Category-${c}`] = true; });
    subs.forEach(s => { urlChecked[`Substrate-${s}`] = true; });
    apps.forEach(a => { urlChecked[`Application Area-${a}`] = true; });

    if (Object.keys(urlChecked).length) setChecked(prev => ({ ...prev, ...urlChecked }));

    if (q !== null) setSearch(q);
    if (sort) setSortOrder(sort);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // Persist state
  useEffect(() => {
    sessionStorage.setItem('productFilters', JSON.stringify({ search, checked, sortOrder }));
  }, [search, checked, sortOrder]);

  // Build selected map BEFORE filtering
  const selected = useMemo(() => {
    const out = {};
    for (const g of FILTER_GROUPS) {
      out[g] = Object.keys(checked)
        .filter(key => key.startsWith(`${g}-`) && checked[key])
        .map(key => key.replace(`${g}-`, ''));
    }
    return out;
  }, [checked]);

  // Apply *non-search* filters (category/substrate/app-area) + sort
  const baseFiltered = useMemo(() => {
    const q = (search || '').trim().toLowerCase();

      let list = allProducts
    .map(product => {
      const name = String(product.display_name || product.name || '').toLowerCase();
      const category = String(product.category || '').toLowerCase();
      const subsRaw = Array.isArray(product.substrate) ? product.substrate : (product.substrate ? [product.substrate] : []);
      const subs = subsRaw.map(s => String(s).toLowerCase());
      const subsGroups = mapToStandardSubstrates(subsRaw).map(s => String(s).toLowerCase());

      let rank = 0; // 0=name hit, 1=category hit, 2=substrate hit, 3=no hit
      if (q) {
        const nameHit = name.includes(q);
        const catHit = category.includes(q);
        const subHit = subs.some(s => s.includes(q)) || subsGroups.some(s => s.includes(q));
        rank = nameHit ? 0 : catHit ? 1 : subHit ? 2 : 3;
      }

      return { ...product, __rank: rank };
    })
    .filter(product => {
      if (q && product.__rank === 3) return false; // exclude non-matches when a query exists

      if (selected['Category']?.length && !selected['Category'].includes(product.category)) return false;

      const mapped = mapToStandardSubstrates(Array.isArray(product.substrate) ? product.substrate : []);
      if (selected['Substrate']?.length && !mapped.some(g => selected['Substrate'].includes(g))) return false;

      if (selected['Application Area']?.length) {
        const appList = Array.isArray(product.application) ? product.application : (product.application ? [product.application] : []);
        const areas = mapToStandardApplicationAreas(appList);
        if (!areas.some(a => selected['Application Area'].includes(a))) return false;
      }

      return true;
    });

    if (sortOrder === 'asc') list = list.slice().sort((a, b) => (a.price || 0) - (b.price || 0));
    else if (sortOrder === 'desc') list = list.slice().sort((a, b) => (b.price || 0) - (a.price || 0));

    return list;
  }, [allProducts, selected, sortOrder, search]);


  // Bucket by search: name first (no heading), else category, else substrate
  const {
    nameMatches,
    categoryMatches,
    substrateMatches,
    categoryLabel,
    substrateLabel
  } = useMemo(() => {
    const q = (search || '').trim().toLowerCase();
    if (!q) {
      return {
        nameMatches: baseFiltered,
        categoryMatches: [],
        substrateMatches: [],
        categoryLabel: '',
        substrateLabel: ''
      };
    }

    const nameMatches = baseFiltered.filter(p =>
      String(p.display_name || p.name || '').toLowerCase().includes(q)
    );

    const inName = new Set(nameMatches.map(p => p.name));
    const categoryMatches = baseFiltered.filter(p =>
      !inName.has(p.name) &&
      String(p.category || '').toLowerCase().includes(q)
    );

    const inNameOrCat = new Set([...nameMatches, ...categoryMatches].map(p => p.name));
    const substrateMatches = baseFiltered.filter(p => {
      if (inNameOrCat.has(p.name)) return false;
      const raw = Array.isArray(p.substrate) ? p.substrate : (p.substrate ? [p.substrate] : []);
      const rawL = raw.map(s => String(s).toLowerCase());
      const groupedL = mapToStandardSubstrates(raw).map(s => String(s).toLowerCase());
      return rawL.some(s => s.includes(q)) || groupedL.some(s => s.includes(q));
    });

    // Labels for the headings (one-liners)
    const categorySet = new Set(categoryMatches.map(p => p.category).filter(Boolean));
    const categoryLabel = Array.from(categorySet).join(', ');

    const subSet = new Set();
    substrateMatches.forEach(p => {
      const raw = Array.isArray(p.substrate) ? p.substrate : (p.substrate ? [p.substrate] : []);
      const grouped = mapToStandardSubstrates(raw);
      [...raw, ...grouped].forEach(s => {
        if (String(s).toLowerCase().includes(q)) subSet.add(String(s));
      });
    });
    const substrateLabel = Array.from(subSet).join(', ');

    return { nameMatches, categoryMatches, substrateMatches, categoryLabel, substrateLabel };
  }, [baseFiltered, search]);

  // Click/Enter to apply search + sync URL
  const applySearch = () => {
    setSearch(searchDraft);

    const params = new URLSearchParams(searchParams);
    const trimmed = (searchDraft || '').trim();
    if (trimmed) {
      params.set('search', trimmed);
      params.delete('q'); // clean legacy
    } else {
      params.delete('search');
      params.delete('q');
    }
    setSearchParams(params); // updates URL
  };

  const handleCheck = (group, option) => {
    setChecked(prev => ({ ...prev, [`${group}-${option}`]: !prev[`${group}-${option}`] }));
  };
  const handleToggle = idx => setExpanded(exp => exp.map((v, i) => (i === idx ? !v : v)));

  const qActive = (search || '').trim().length > 0;
  const nothingFound =
    qActive
      ? (nameMatches.length === 0 && categoryMatches.length === 0 && substrateMatches.length === 0)
      : baseFiltered.length === 0;

  // --- Filter Option Counts ---
  const getFilterCounts = (groupLabel, options) => {
    // For each option, count how many products would match if that option were toggled ON (with all other filters as currently set)
    return options.map(option => {
      // Simulate checked state with this option ON
      const simulatedChecked = { ...checked, [`${groupLabel}-${option}`]: true };
      const simulatedSelected = {};
      for (const g of FILTER_GROUPS) {
        simulatedSelected[g] = Object.keys(simulatedChecked)
          .filter(key => key.startsWith(`${g}-`) && simulatedChecked[key])
          .map(key => key.replace(`${g}-`, ''));
      }
      // Filter products as in baseFiltered, but with simulatedSelected
      let count = allProducts.filter(product => {
        // Category
        if (groupLabel === 'Category' && simulatedSelected['Category']?.length && !simulatedSelected['Category'].includes(product.category)) return false;
        if (groupLabel !== 'Category' && selected['Category']?.length && !selected['Category'].includes(product.category)) return false;
        // Substrate
        const mapped = mapToStandardSubstrates(Array.isArray(product.substrate) ? product.substrate : []);
        if (groupLabel === 'Substrate' && simulatedSelected['Substrate']?.length && !mapped.some(g => simulatedSelected['Substrate'].includes(g))) return false;
        if (groupLabel !== 'Substrate' && selected['Substrate']?.length && !selected['Substrate'].includes(g => mapped.includes(g))) return false;
        // Application Area
        if (groupLabel === 'Application Area' && simulatedSelected['Application Area']?.length) {
          const appList = Array.isArray(product.application) ? product.application : (product.application ? [product.application] : []);
          const areas = mapToStandardApplicationAreas(appList);
          if (!areas.some(a => simulatedSelected['Application Area'].includes(a))) return false;
        }
        if (groupLabel !== 'Application Area' && selected['Application Area']?.length) {
          const appList = Array.isArray(product.application) ? product.application : (product.application ? [product.application] : []);
          const areas = mapToStandardApplicationAreas(appList);
          if (!areas.some(a => selected['Application Area'].includes(a))) return false;
        }
        // (Removed price filter logic here)
        return true;
      }).length;
      return count;
    });
  };
  // ---
  // --- Sorting Dropdown ---
  const sortOptions = [
    { value: '', label: 'Most Popular' },
    { value: 'asc', label: 'Price: Low to High' },
    { value: 'desc', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest First' },
  ];
  // ---
  // --- Update URL on filter/sort change ---
  useEffect(() => {
    const params = new URLSearchParams();
    // Filters
    Object.keys(checked).forEach(key => {
      if (checked[key]) {
        const [group, value] = key.split('-');
        if (group && value) {
          if (group === 'Category') params.append('category', value);
          if (group === 'Substrate') params.append('substrate', value);
          if (group === 'Application Area') params.append('application', value);
        }
      }
    });
    // Search
    if (search) params.set('search', search);
    // Sort
    if (sortOrder) params.set('sort', sortOrder);
    // (Removed price min/max params)
    setSearchParams(params, { replace: true });
  }, [checked, search, sortOrder, setSearchParams]);
  // ---
  // --- Sorting logic ---
  const sortedFiltered = useMemo(() => {
    let list = baseFiltered;
    if (sortOrder === 'asc') list = list.slice().sort((a, b) => (a.price || 0) - (b.price || 0));
    else if (sortOrder === 'desc') list = list.slice().sort((a, b) => (b.price || 0) - (a.price || 0));
    else if (sortOrder === 'newest') list = list.slice().sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    // Most Popular: default order
    return list;
  }, [baseFiltered, sortOrder]);
  // ... existing code ...
  return (
    <div className="pt-16 md:pt-20 min-h-screen bg-[#f9f6f2] pb-20 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto mb-10 pt-10">
      <h1 className="text-3xl md:text-4xl font-bold text-[#493657] mb-4 flex items-baseline gap-2">
        PRODUCTS
        {((selected['Category']?.length || 0) > 0 ||
          (selected['Substrate']?.length || 0) > 0 ||
          (selected['Application Area']?.length || 0) > 0 ||
          search.trim().length > 0) && (
          <span className="text-base md:text-lg text-[#493657]/70 font-medium">
            ({sortedFiltered.length})
          </span>
        )}
      </h1>


        {/* Search + Sort */}
        <div className="flex flex-wrap items-center gap-4 mb-4">  
          <input
            type="text"
            placeholder="Search by name, category, or substrate..."
            value={searchDraft}
            onChange={e => setSearchDraft(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') applySearch(); }}
            className="w-full max-w-md px-4 py-2 rounded-lg border border-[#e5e0d8] focus:outline-none focus:ring-2 focus:ring-[#F0C85A]"
          />
          <button
            onClick={applySearch}
            className="px-4 py-2 bg-[#493657] text-white font-semibold rounded-md shadow hover:bg-[#301A44] transition text-base"
          >
            Search
          </button>
          {/* Mobile controls */}
          <div className="w-full flex md:hidden items-center gap-2 mb-2">
            <button
              className="px-3 py-2 bg-[#493657] text-white font-semibold rounded-md shadow hover:bg-[#301A44] transition text-sm"
              onClick={() => setMobileFilterOpen(o => !o)}
            >
              {mobileFilterOpen ? 'Hide Filters' : 'Show Filters'}
            </button>
            <label htmlFor="sortDropdown" className="text-[#493657] font-medium ml-2">Sort:</label>
            <select
              id="sortDropdown"
              value={sortOrder}
              onChange={e => setSortOrder(e.target.value)}
              className="px-3 py-2 rounded-lg border border-[#e5e0d8] bg-white text-[#493657] focus:outline-none text-sm"
            >
              {sortOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>
          {/* Desktop controls */}
          <div className="ml-auto hidden md:flex items-center gap-2 w-full md:w-auto">
            <button
              className="px-4 py-2 bg-[#493657] text-white font-semibold rounded-md shadow hover:bg-[#301A44] transition text-base mr-2"
              onClick={() => setShowFilter(f => !f)}
            >
              {showFilter ? 'Hide Filters' : 'Show Filters'}
            </button>
            <label htmlFor="sortDropdown" className="text-[#493657] font-medium ml-2">Sort:</label>
            <select
              id="sortDropdown"
              value={sortOrder}
              onChange={e => setSortOrder(e.target.value)}
              className="px-3 py-2 rounded-lg border border-[#e5e0d8] bg-white text-[#493657] focus:outline-none text-base"
            >
              {sortOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>
        </div>
        {/* (Removed PriceRange and price controls) */}
        <ActiveFilters
          selected={selected}
          onRemove={(group, value) => setChecked(prev => ({ ...prev, [`${group}-${value}`]: false }))}
          onClearAll={() => {
            setChecked({});
            setSortOrder('');
            setSearch('');
            setSearchDraft('');
            const params = new URLSearchParams(searchParams);
            params.delete('search');
            params.delete('q');
            setSearchParams(params);
          }}
        />
        {/* Mobile sidebar */}
        {mobileFilterOpen && (
          <div className="md:hidden mb-6 animate-fade-in-down">
            <FilterSidebar checked={checked} onCheck={handleCheck} expanded={expanded} onToggle={handleToggle} getFilterCounts={getFilterCounts} />
          </div>
        )}
        {/* Layout */}
        <div className="flex flex-row items-start gap-4">
          {/* Desktop sidebar */}
          <div className="hidden md:block sticky top-28 self-start max-h-[calc(100vh-7rem)] overflow-y-auto">
            {showFilter && (
              <FilterSidebar checked={checked} onCheck={handleCheck} expanded={expanded} onToggle={handleToggle} getFilterCounts={getFilterCounts} />
            )}
          </div>
          {/* Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
              {/* Nothing found */}
              {nothingFound && (
                <div className="col-span-full text-center text-[#493657] text-lg">No products found.</div>
              )}
              {/* If searching and name matches exist: show them (no heading) */}
              {qActive && nameMatches.length > 0 && nameMatches.map((product, idx) => (
                <ProductCard
                  key={product.name + idx}
                  id={product.name}
                  name={product.display_name || product.name}
                  image={product.images[0]}
                  price={product.price}
                  finishTypeSheen={product.finish_type_sheen}
                  packaging={product.packaging}
                  areaCoverage={product.coverage || (product.technical_specs && product.technical_specs.coverage) || ''}
                />
              ))}
              {/* If searching and no name matches, but category matches exist: show a one-line heading + products */}
              {qActive && categoryMatches.length > 0 && (
                <>
                  {nameMatches.length === 0 && (
                    <div className="col-span-full">
                      <h2 className="text-xl md:text-2xl font-bold text-[#493657]">
                        Showing category: {categoryLabel || search}
                      </h2>
                      <p className="text-[#493657]/70">Products under the matching category.</p>
                    </div>
                  )}
                  {categoryMatches.map((product, idx) => (
                    <ProductCard
                      key={product.name + idx}
                      id={product.name}
                      name={product.display_name || product.name}
                      image={product.images[0]}
                      price={product.price}
                      finishTypeSheen={product.finish_type_sheen}
                      packaging={product.packaging}
                      areaCoverage={product.coverage || (product.technical_specs && product.technical_specs.coverage) || ''}
                    />
                  ))}
                </>
              )}
              {/* If no name/category matches, but substrate matches exist: show a one-line heading + products */}
              {qActive && substrateMatches.length > 0 && (
                <>
                  {nameMatches.length === 0 && (
                    <div className="col-span-full">
                      <h2 className="text-xl md:text-2xl font-bold text-[#493657]">
                        Showing substrate: {substrateLabel || search}
                      </h2>
                      <p className="text-[#493657]/70">Products compatible with the matching substrate.</p>
                    </div>
                  )}
                  {substrateMatches.map((product, idx) => (
                    <ProductCard
                      key={product.name + idx}
                      id={product.name}
                      name={product.display_name || product.name}
                      image={product.images[0]}
                      price={product.price}
                      finishTypeSheen={product.finish_type_sheen}
                      packaging={product.packaging}
                      areaCoverage={product.coverage || (product.technical_specs && product.technical_specs.coverage) || ''}
                    />
                  ))}
                </>
              )}
              {/* No search active: show the baseFiltered grid like before */}
              {!qActive && sortedFiltered.length > 0 && sortedFiltered.map((product, idx) => (
                <ProductCard
                  key={product.name + idx}
                  id={product.name}
                  name={product.display_name || product.name}
                  image={product.images[0]}
                  price={product.price}
                  finishTypeSheen={product.finish_type_sheen}
                  packaging={product.packaging}
                  areaCoverage={product.coverage || (product.technical_specs && product.technical_specs.coverage) || ''}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
