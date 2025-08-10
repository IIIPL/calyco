import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products as allProducts } from '../data/products';
import { FilterSidebar } from '../components/FilterSidebar';
import ProductCard from '../components/ProductCard';
import ActiveFilters from '../components/ActiveFilters';
import PriceRange from '../components/PriceRange';
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

  // Price bounds
  const prices = allProducts.map(p => p.price || 0).filter(n => Number.isFinite(n));
  const dataMin = prices.length ? Math.min(...prices) : 0;
  const dataMax = prices.length ? Math.max(...prices) : 10000;

  // Applied vs Draft price
  const [price, setPrice] = useState({ min: dataMin, max: dataMax });        // applied
  const [priceDraft, setPriceDraft] = useState({ min: dataMin, max: dataMax }); // editable

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
      if (s.price) { setPrice(s.price); setPriceDraft(s.price); }
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
    const min = searchParams.get('min');
    const max = searchParams.get('max');

    const urlChecked = {};
    cats.forEach(c => { urlChecked[`Category-${c}`] = true; });
    subs.forEach(s => { urlChecked[`Substrate-${s}`] = true; });
    apps.forEach(a => { urlChecked[`Application Area-${a}`] = true; });

    if (Object.keys(urlChecked).length) setChecked(prev => ({ ...prev, ...urlChecked }));

    if (q !== null) setSearch(q);
    if (sort) setSortOrder(sort);

    if (min || max) {
      const minVal = Number(min ?? dataMin);
      const maxVal = Number(max ?? dataMax);
      const next = {
        min: Number.isFinite(minVal) ? minVal : dataMin,
        max: Number.isFinite(maxVal) ? maxVal : dataMax,
      };
      setPrice(next);
      setPriceDraft(next);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // Persist state
  useEffect(() => {
    sessionStorage.setItem('productFilters', JSON.stringify({ search, checked, sortOrder, price }));
  }, [search, checked, sortOrder, price]);

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

  // Apply *non-search* filters (category/substrate/app-area/price) + sort
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

      const p = Number(product.price || 0);
      if (p < price.min || p > price.max) return false;

      return true;
    });

    if (sortOrder === 'asc') list = list.slice().sort((a, b) => (a.price || 0) - (b.price || 0));
    else if (sortOrder === 'desc') list = list.slice().sort((a, b) => (b.price || 0) - (a.price || 0));

    return list;
  }, [allProducts, selected, sortOrder, price, search]);


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

  return (
    <div className="pt-16 md:pt-20 min-h-screen bg-[#f9f6f2] pb-20 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto mb-10 pt-10">
        <h1 className="text-3xl md:text-4xl font-bold text-[#493657] mb-4">All Products</h1>

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
            <label htmlFor="sortPrice" className="text-[#493657] font-medium ml-2">Sort by Price:</label>
            <select
              id="sortPrice"
              value={sortOrder}
              onChange={e => setSortOrder(e.target.value)}
              className="px-3 py-2 rounded-lg border border-[#e5e0d8] bg-white text-[#493657] focus:outline-none text-sm"
            >
              <option value="">None</option>
              <option value="asc">Low to High</option>
              <option value="desc">High to Low</option>
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
            <label htmlFor="sortPrice" className="text-[#493657] font-medium ml-2">Sort by Price:</label>
            <select
              id="sortPrice"
              value={sortOrder}
              onChange={e => setSortOrder(e.target.value)}
              className="px-3 py-2 rounded-lg border border-[#e5e0d8] bg-white text-[#493657] focus:outline-none text-base"
            >
              <option value="">None</option>
              <option value="asc">Low to High</option>
              <option value="desc">High to Low</option>
            </select>
          </div>
        </div>

        {/* Price control + chips */}
        <div className="mb-4">
          <PriceRange
            min={dataMin}
            max={dataMax}
            value={priceDraft}
            applied={price}
            onChange={setPriceDraft}
            onApply={(val) => setPrice(val)}
          />
        </div>

        <ActiveFilters
          selected={selected}
          price={price}
          onRemove={(group, value) => setChecked(prev => ({ ...prev, [`${group}-${value}`]: false }))}
          onClearAll={() => {
            setChecked({});
            setPrice({ min: dataMin, max: dataMax });
            setPriceDraft({ min: dataMin, max: dataMax });
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
            <FilterSidebar checked={checked} onCheck={handleCheck} expanded={expanded} onToggle={handleToggle} />
          </div>
        )}

        {/* Layout */}
        <div className="flex flex-row items-start gap-4">
          {/* Desktop sidebar */}
          <div className="hidden md:block sticky top-28 self-start max-h-[calc(100vh-7rem)] overflow-y-auto">
            {showFilter && (
              <FilterSidebar checked={checked} onCheck={handleCheck} expanded={expanded} onToggle={handleToggle} />
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
                  image={product.image || (product.images && product.images[0])}
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
                      image={product.image || (product.images && product.images[0])}
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
                      image={product.image || (product.images && product.images[0])}
                      price={product.price}
                      finishTypeSheen={product.finish_type_sheen}
                      packaging={product.packaging}
                      areaCoverage={product.coverage || (product.technical_specs && product.technical_specs.coverage) || ''}
                    />
                  ))}
                </>
              )}

              {/* No search active: show the baseFiltered grid like before */}
              {!qActive && baseFiltered.length > 0 && baseFiltered.map((product, idx) => (
                <ProductCard
                  key={product.name + idx}
                  id={product.name}
                  name={product.display_name || product.name}
                  image={product.image || (product.images && product.images[0])}
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
