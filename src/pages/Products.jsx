import React, { useState, useEffect, useMemo } from 'react';
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
  const [search, setSearch] = useState('');
  const [checked, setChecked] = useState({});
  const [expanded, setExpanded] = useState([true, true, true]);
  const [sortOrder, setSortOrder] = useState('');
  const [showFilter, setShowFilter] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Price bounds
  const prices = allProducts.map(p => p.price || 0).filter(n => Number.isFinite(n));
  const dataMin = prices.length ? Math.min(...prices) : 0;
  const dataMax = prices.length ? Math.max(...prices) : 10000;

  // Applied vs Draft
  const [price, setPrice] = useState({ min: dataMin, max: dataMax });        // applied
  const [priceDraft, setPriceDraft] = useState({ min: dataMin, max: dataMax }); // editable

  useEffect(() => { document.title = 'Products'; }, []);

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

  // Persist state (only applied price)
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

  // Filter + sort (memoized) — uses APPLIED price
  const filteredProducts = useMemo(() => {
    let list = allProducts.filter(product => {
      if (search && !String(product.name || '').toLowerCase().includes(search.toLowerCase())) return false;

      if (selected['Category']?.length) {
        if (!selected['Category'].includes(product.category)) return false;
      }
      if (selected['Substrate']?.length) {
        const mapped = mapToStandardSubstrates(Array.isArray(product.substrate) ? product.substrate : []);
        if (!mapped.some(g => selected['Substrate'].includes(g))) return false;
      }
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
  }, [allProducts, search, selected, sortOrder, price]);

  const handleCheck = (group, option) => {
    setChecked(prev => ({ ...prev, [`${group}-${option}`]: !prev[`${group}-${option}`] }));
  };
  const handleToggle = idx => setExpanded(exp => exp.map((v, i) => (i === idx ? !v : v)));

  return (
    <div className="pt-16 md:pt-20 min-h-screen bg-[#f9f6f2] pb-20 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto mb-10 pt-10">
        <h1 className="text-3xl md:text-4xl font-bold text-[#493657] mb-4">All Products</h1>

        {/* Search + Sort */}
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <input
            type="text"
            placeholder="Search by product name..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full max-w-md px-4 py-2 rounded-lg border border-[#e5e0d8] focus:outline-none focus:ring-2 focus:ring-[#F0C85A]"
          />
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
          price={price} // show applied range in chips
          onRemove={(group, value) => setChecked(prev => ({ ...prev, [`${group}-${value}`]: false }))}
          onClearAll={() => {
            setChecked({});
            setPrice({ min: dataMin, max: dataMax });
            setPriceDraft({ min: dataMin, max: dataMax });
            setSortOrder('');
            setSearch('');
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
              {filteredProducts.length === 0 && (
                <div className="col-span-full text-center text-[#493657] text-lg">No products found.</div>
              )}
              {filteredProducts.map((product, idx) => (
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
