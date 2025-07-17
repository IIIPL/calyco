import React, { useState, useEffect } from 'react';
import { products as allProducts, getProductById, getProductsByCategory } from '../data/products';
import { Link } from 'react-router-dom';
import { FilterSidebar } from '../components/FilterSidebar';
import ProductCard from '../components/ProductCard';

// Use only Category and Application Surface as filter groups
const FILTER_GROUPS = ['Category', 'Application Surface', 'Application Area'];

// --- Substrate Mapping Logic (copied from FilterSidebar) ---
const substrateMapping = {
  "plaster": "Plaster & POP",
  "pop": "Plaster & POP",
  "drywall": "Drywall & Cement Board",
  "cement board": "Drywall & Cement Board",
  "cement sheet": "Drywall & Cement Board",
  "masonry": "Concrete & Masonry",
  "concrete": "Concrete & Masonry",
  "brick": "Concrete & Masonry",
  "aac": "Concrete & Masonry",
  "wood": "Wood & Ply",
  "ply": "Wood & Ply",
  "metal": "Metal & Steel",
  "steel": "Metal & Steel",
  "tile": "Tile & Ceramic",
  "ceramic": "Tile & Ceramic",
  "junction": "Multi-surface / Junctions",
  "multi-surface": "Multi-surface / Junctions"
};
function mapToStandardSubstrates(substrates) {
  const matched = new Set();
  substrates.forEach(s => {
    const sub = s.toLowerCase();
    for (const [key, group] of Object.entries(substrateMapping)) {
      if (sub.includes(key)) matched.add(group);
    }
  });
  return [...matched];
}

// --- Application Area Mapping Logic (synchronized with FilterSidebar) ---
const applicationAreaMapping = {
  "bathroom": "Bathroom",
  "utility": "Bathroom",
  "kitchen": "Kitchen",
  "children": "Children's Room",
  "child": "Children's Room",
  "bedroom": "Bedroom",
  "living": "Living",
  "dining": "Living",
  "lounge": "Living",
  "personal": "Living",
  "formal": "Living",
  "hallway": "Living",
  "office": "Office",
  "exterior": "Exterior",
  "villa": "Exterior",
  "architectural": "Exterior",
  "roof": "Roof/Deck",
  "deck": "Roof/Deck",
  "staircase": "Stairs/Lobby",
  "lobby": "Stairs/Lobby",
  "high-exposure": "Exterior",
  "multi-purpose": "Special",
  "multi": "Special",
  "baked clay": "Special",
  "bricks": "Special",
  "tile": "Special",
  "meditation": "Special",
  "commercial": "Office",
  "offices": "Office",
  "hallways": "Living",
  "staircases": "Stairs/Lobby",
  "lobbies": "Stairs/Lobby",
  "kitchens": "Kitchen",
  "bedrooms": "Bedroom",
  "children's": "Children's Room",
  "kids": "Children's Room",
};
const APPLICATION_GROUPS_ORDER = [
  "Bathroom",
  "Kitchen",
  "Bedroom",
  "Living",
  "Children's Room",
  "Exterior",
  "Roof/Deck",
  "Office",
  "Stairs/Lobby",
  "Special",
  "Other"
];
function mapToStandardApplicationAreas(applications) {
  const matched = new Set();
  applications.forEach(a => {
    const app = a.toLowerCase();
    let found = false;
    for (const [key, group] of Object.entries(applicationAreaMapping)) {
      if (app.includes(key)) {
        matched.add(group);
        found = true;
      }
    }
    if (!found) matched.add("Other");
  });
  return [...matched];
}

export const Products = () => {
  const [search, setSearch] = useState('');
  const [checked, setChecked] = useState({});
  const [expanded, setExpanded] = useState([true, true, true]); // Updated for three filter groups
  const [sortOrder, setSortOrder] = useState('');
  const [showFilter, setShowFilter] = useState(true);
  // State for mobile filter panel
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    document.title = 'Products';
  }, []);

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
    // Application Surface filter
    if (selected['Application Surface'] && selected['Application Surface'].length) {
      // Map product.substrate to standard groups
      const mappedGroups = mapToStandardSubstrates(Array.isArray(product.substrate) ? product.substrate : []);
      if (!mappedGroups.some(g => selected['Application Surface'].includes(g))) return false;
    }
    // Application Area filter
    if (selected['Application Area'] && selected['Application Area'].length) {
      const appList = Array.isArray(product.application) ? product.application : (product.application ? [product.application] : []);
      const mappedAreas = mapToStandardApplicationAreas(appList);
      if (!mappedAreas.some(area => selected['Application Area'].includes(area))) return false;
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
          {/* Mobile: Show Filters Button and Sort by Price in same row */}
          <div className="w-full flex md:hidden items-center gap-2 mb-4">
            <button
              className="px-3 py-2 bg-[#493657] text-white font-semibold rounded-md shadow hover:bg-[#301A44] transition text-sm"
              onClick={() => setMobileFilterOpen(open => !open)}
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
          {/* Desktop: Show/Hide Filters Button and Sort by Price */}
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
        {/* Mobile: Collapsible Filter Panel */}
        {mobileFilterOpen && (
          <div className="md:hidden mb-6 animate-fade-in-down">
            <FilterSidebar checked={checked} onCheck={handleCheck} expanded={expanded} onToggle={handleToggle} />
          </div>
        )}
        {/* Desktop: Sidebar and Product Grid */}
        <div className="flex flex-row items-start gap-4">
          {/* Desktop Sidebar */}
          <div className="hidden md:block">
            {showFilter && (
              <FilterSidebar checked={checked} onCheck={handleCheck} expanded={expanded} onToggle={handleToggle} />
            )}
          </div>
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

