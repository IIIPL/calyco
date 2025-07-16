import React, { useState } from 'react';
import { products as allProducts, getProductById, getProductsByCategory } from '../data/products';
import { Link } from 'react-router-dom';
import { FilterSidebar } from '../components/FilterSidebar';
import ProductCard from '../components/ProductCard';

// Use both 'Category' and 'Substrate' as filter groups
const FILTER_GROUPS = ['Category', 'Substrate'];

export const Products = () => {
  const [search, setSearch] = useState('');
  const [checked, setChecked] = useState({});
  const [expanded, setExpanded] = useState([true, true]); // One for each filter group
  const [sortOrder, setSortOrder] = useState('');
  const [showFilter, setShowFilter] = useState(true);

  // Handlers for sidebar
  const handleCheck = (group, option) => {
    setChecked(prev => ({
      ...prev,
      [`${group}-${option}`]: !prev[`${group}-${option}`],
    }));
  };
  const handleToggle = idx => {
    setExpanded(exp => exp.map((v, i) => (i === idx ? !v : v)));
  };

  // Filtering logic
  const selected = {};
  for (const group of FILTER_GROUPS) {
    selected[group] = Object.keys(checked)
      .filter(key => key.startsWith(`${group}-`) && checked[key])
      .map(key => key.replace(`${group}-`, ''));
  }

  let filteredProducts = allProducts.filter(product => {
    // Search by name
    if (search && !product.name.toLowerCase().includes(search.toLowerCase())) return false;
    // Category filter
    if (selected['Category'].length) {
      if (!selected['Category'].includes(product.category)) return false;
    }
    // Substrate filter
    if (selected['Substrate'] && selected['Substrate'].length) {
      if (!product.substrate || !product.substrate.some(s => selected['Substrate'].includes(s))) return false;
    }
    return true;
  });

  // Sort by price
  if (sortOrder === 'asc') {
    filteredProducts = filteredProducts.slice().sort((a, b) => (a.price || 0) - (b.price || 0));
  } else if (sortOrder === 'desc') {
    filteredProducts = filteredProducts.slice().sort((a, b) => (b.price || 0) - (a.price || 0));
  }

  return (
    <div className="min-h-screen bg-[#f9f6f2] pt-32 pb-20 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-[#493657] mb-4">All Products</h1>
        {/* Search Bar & Sort */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by product name..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full max-w-md px-4 py-2 rounded-lg border border-[#e5e0d8] focus:outline-none focus:ring-2 focus:ring-[#F0C85A]"
          />
          <div className="ml-auto flex items-center gap-2">
            <label htmlFor="sortPrice" className="text-[#493657] font-medium">Sort by Price:</label>
            <select
              id="sortPrice"
              value={sortOrder}
              onChange={e => setSortOrder(e.target.value)}
              className="px-3 py-2 rounded-lg border border-[#e5e0d8] bg-white text-[#493657] focus:outline-none"
            >
              <option value="">None</option>
              <option value="asc">Low to High</option>
              <option value="desc">High to Low</option>
            </select>
            {/* Show/Hide Filter Button moved here */}
            <button
              className="px-6 py-2 rounded-lg border border-[#e5e0d8] bg-white text-[#493657] font-semibold shadow hover:bg-[#F0C85A]/10 transition"
              onClick={() => setShowFilter(f => !f)}
            >
              {showFilter ? 'Hide Filter' : 'Show Filter'}
            </button>
          </div>
        </div>
        {/* Show/Hide Filter Button */}
        <div className="flex flex-row items-start gap-4">
          {/* Filter Sidebar */}
          {showFilter && (
            <FilterSidebar checked={checked} onCheck={handleCheck} expanded={expanded} onToggle={handleToggle} />
          )}
          {/* Product Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
              {filteredProducts.length === 0 && (
                <div className="col-span-full text-center text-[#493657] text-lg">No products found.</div>
              )}
              {filteredProducts.map((product, idx) => (
                <ProductCard
                  key={product.name + idx}
                  id={product.name}
                  name={product.display_name}
                  image={product.image}
                  price={product.price}
                  finishTypeSheen={product.finish_type_sheen}
                  packaging={product.packaging}
                  areaCoverage={product.coverage || (product.technical_specs && product.technical_specs.coverage) || ''}
                  // Add more props as needed for your new product structure
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
