import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MagnifyingGlassIcon, 
  FunnelIcon, 
  Squares2X2Icon, 
  PhotoIcon,
  EyeIcon,
  ShoppingCartIcon,
  ClipboardDocumentIcon,
  CalculatorIcon,
  SwatchIcon,
  ShieldCheckIcon,
  HomeIcon,
  UserGroupIcon,
  WrenchScrewdriverIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { getAllColors, getColorFamilies } from '../data/calycoColors.js';
import { reverseColorNameMapping } from '../data/colorNameMapping';
import { getColorBrightness } from '../utils/colorHelpers';

// Get all 442 colors and families
const ALL_COLORS = getAllColors();
const COLOR_FAMILIES = getColorFamilies().map(f => f.name);
const TEMPERATURE_OPTIONS = Array.from(
  new Set(ALL_COLORS.map(color => color.temperature || color.colorTemperature).filter(Boolean))
).sort();
const TONALITY_OPTIONS = Array.from(
  new Set(ALL_COLORS.map(color => color.tonality).filter(Boolean))
).sort();
const SUITABILITY_OPTIONS = (() => {
  const values = Array.from(
    new Set(
      ALL_COLORS
        .map(color => color.suitability || color.interiorExterior || color.usage)
        .filter(Boolean)
    )
  );
  const preferred = ['Interior', 'Exterior', 'Interior & Exterior'];
  const ordered = preferred.filter(value => values.includes(value));
  const remaining = values.filter(value => !preferred.includes(value)).sort();
  return [...ordered, ...remaining];
})();

// Compatible Products
const COMPATIBLE_PRODUCTS = [
  { id: 'Nova', name: 'Nova Interior Emulsion', type: 'Interior' },
  { id: 'SilkTouch', name: 'SilkTouch Premium Finish', type: 'Interior' },
  { id: 'LustroLite', name: 'LustroLite Low Sheen', type: 'Interior' },
  { id: 'PureTone', name: 'PureTone Matte', type: 'Interior' },
  { id: 'CalmXterior', name: 'CalmXterior Weather Shield', type: 'Exterior' }
];

const ColorsPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFamily, setSelectedFamily] = useState('');
  const [selectedTemperature, setSelectedTemperature] = useState('');
  const [selectedTonality, setSelectedTonality] = useState('');
  const [selectedSuitability, setSelectedSuitability] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'lifestyle'
  const [selectedColor, setSelectedColor] = useState(null);

  // Group colors by family
  const groupedColors = useMemo(() => {
    let filtered = ALL_COLORS;

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(color =>
        color.name.toLowerCase().includes(term) ||
        color.hex.toLowerCase().includes(term) ||
        color.code.toLowerCase().includes(term) ||
        color.colorFamily.toLowerCase().includes(term)
      );
    }

    // Family filter
    if (selectedFamily) {
      filtered = filtered.filter(color => color.colorFamily === selectedFamily);
    }

    // Temperature filter
    if (selectedTemperature) {
      filtered = filtered.filter(color =>
        color.temperature && color.temperature === selectedTemperature
      );
    }

    // Tonality filter
    if (selectedTonality) {
      filtered = filtered.filter(color =>
        color.tonality && color.tonality === selectedTonality
      );
    }

    // Suitability filter
    if (selectedSuitability) {
      filtered = filtered.filter(color => {
        const suitability = (color.suitability || color.interiorExterior || color.usage || "").trim();
        if (!suitability) return false;
        if (selectedSuitability === "Interior & Exterior") {
          return suitability === "Interior & Exterior" || suitability === "Interior";
        }
        return suitability === selectedSuitability;
      });
    }

    // Sort within each family
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'popular':
          return (b.popularity || 0) - (a.popularity || 0);
        case 'light-dark':
          return getColorBrightness(a.hex) - getColorBrightness(b.hex);
        case 'dark-light':
          return getColorBrightness(b.hex) - getColorBrightness(a.hex);
        default:
          return 0;
      }
    });

    // Group by color family
    const grouped = filtered.reduce((acc, color) => {
      const family = color.colorFamily;
      if (!acc[family]) {
        acc[family] = [];
      }
      acc[family].push(color);
      return acc;
    }, {});

    return grouped;
  }, [searchTerm, selectedFamily, selectedTemperature, selectedTonality, selectedSuitability, sortBy]);

  const getActualHexColor = useCallback((colorValue) => {
    if (colorValue && colorValue.startsWith('#')) {
      return colorValue;
    }
    return reverseColorNameMapping[colorValue] || '#CCCCCC';
  }, []);

  const getTextColor = useCallback((hexColor) => {
    const actualHex = getActualHexColor(hexColor);
    const r = parseInt(actualHex.substring(1, 3), 16);
    const g = parseInt(actualHex.substring(3, 5), 16);
    const b = parseInt(actualHex.substring(5, 7), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 150 ? 'text-gray-900' : 'text-white';
  }, [getActualHexColor]);

  const handleColorClick = useCallback((color) => {
    const familySlug = color.colorFamily.toLowerCase().replace(/\s+/g, '-');
    const colorSlug = color.name.toLowerCase().replace(/\s+/g, '-');
    navigate(`/colors/family/${familySlug}/${colorSlug}`);
  }, [navigate]);

  const clearFilters = useCallback(() => {
    setSearchTerm('');
    setSelectedFamily('');
    setSelectedTemperature('');
    setSelectedTonality('');
    setSelectedSuitability('');
  }, []);

  return (
    <div className="min-h-screen bg-white w-full">
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/Assets/Inspiration/IMG-20250718-WA0008.jpg" 
            alt="Beautiful home with Calyco paints" 
            className="w-full h-full object-cover"
          />
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="w-full max-w-none mx-auto text-center px-6">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-6xl font-bold text-white mb-6"
            >
              Discover the Calyco Color Palette
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-white mb-8 max-w-3xl mx-auto"
            >
              {ALL_COLORS.length} low-VOC shades built for modern living and professional durability.
            </motion.p>

              </div>
            </div>
      </section>

      {/* Controls Bar - Sticky */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm w-full">
        <div className="w-full max-w-none mx-auto px-6 py-4">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            {/* Search */}
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search colors by name, hex, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
              </div>
              
            {/* Filters */}
                      <div className="flex flex-wrap gap-2">
              {/* Family Filter */}
              <select
                value={selectedFamily}
                onChange={(e) => setSelectedFamily(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-900"
              >
                <option value="">All Families</option>
                {COLOR_FAMILIES.map(family => (
                  <option key={family} value={family}>{family}</option>
                ))}
              </select>

              {/* Temperature Filter */}
              <select
                value={selectedTemperature}
                onChange={(e) => setSelectedTemperature(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-900"
              >
                <option value="">All Temperatures</option>
                {TEMPERATURE_OPTIONS.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>

              {/* Tonality Filter */}
              <select
                value={selectedTonality}
                onChange={(e) => setSelectedTonality(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-900"
              >
                <option value="">All Tonalities</option>
                {TONALITY_OPTIONS.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>

              {/* Suitability Filter */}
              <select
                value={selectedSuitability}
                onChange={(e) => setSelectedSuitability(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-900"
              >
                <option value="">All Uses</option>
                {SUITABILITY_OPTIONS.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-900"
              >
                <option value="name">A-Z</option>
                <option value="light-dark">Light ÔåÆ Dark</option>
                <option value="dark-light">Dark ÔåÆ Light</option>
              </select>
              

              {/* Clear Filters */}
              {(searchTerm || selectedFamily || selectedTemperature || selectedTonality || selectedSuitability) && (
                <button
                  onClick={clearFilters}
                  className="px-3 py-2 text-sm text-red-600 hover:text-red-800 underline"
                >
                  Clear All
                </button>
              )}
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600">
            Showing {Object.keys(groupedColors).length} families with {Object.values(groupedColors).reduce((sum, colors) => sum + colors.length, 0)} colors
          </div>
        </div>
      </div>

            {/* Color Families Grid */}
      <section className="w-full max-w-none mx-auto px-4 sm:px-6 py-12">
        {viewMode === 'grid' ? (
          <div className="space-y-12">
            {Object.entries(groupedColors).map(([familyName, colors]) => (
              <div key={familyName} className="space-y-4">
                {/* Family Header */}
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">{familyName.toUpperCase()}</h2>
              <button
                    onClick={() => navigate(`/colors/family/${familyName.toLowerCase().replace(/\s+/g, '-')}`)}
                    className="text-gray-600 hover:text-gray-900 font-medium flex items-center gap-2"
                  >
                    VIEW ALL {colors.length} SHADES
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
                
                {/* Color Swatches - 7 per row */}
                <div className="grid grid-cols-7 gap-4">
                  {colors.slice(0, 7).map((color, index) => (
                    <ColorCard
                      key={color.name}
                      color={color}
                      getActualHexColor={getActualHexColor}
                      getTextColor={getTextColor}
                      onColorClick={handleColorClick}
                      index={index}
                    />
            ))}
          </div>
        </div>
            ))}
          </div>
        ) : (
          <div className="space-y-12">
            {Object.entries(groupedColors).map(([familyName, colors]) => (
              <div key={familyName} className="space-y-4">
                {/* Family Header */}
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">{familyName.toUpperCase()}</h2>
                  <button 
                    onClick={() => navigate(`/colors/family/${familyName.toLowerCase().replace(/\s+/g, '-')}`)}
                    className="text-gray-600 hover:text-gray-900 font-medium flex items-center gap-2"
                  >
                    VIEW ALL {colors.length} SHADES
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
                
                {/* Lifestyle Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                  {colors.slice(0, 5).map((color, index) => (
                    <LifestyleCard
                      key={color.name}
                      color={color}
                      getActualHexColor={getActualHexColor}
                      getTextColor={getTextColor}
                      onColorClick={handleColorClick}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>


      {/* Color Detail Modal */}
      {selectedColor && (
        <ColorDetailModal
          color={selectedColor}
          onClose={() => setSelectedColor(null)}
          getActualHexColor={getActualHexColor}
          getTextColor={getTextColor}
          compatibleProducts={COMPATIBLE_PRODUCTS}
        />
      )}
    </div>
  );
};

// Color Card Component
const ColorCard = ({ color, getActualHexColor, getTextColor, onColorClick, index }) => {
  const actualHexColor = getActualHexColor(color.hex);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.02 }}
      className="group cursor-pointer"
      onClick={() => onColorClick(color)}
    >
      <div className="relative">
        {/* Color Swatch */}
        <div
          className="w-full aspect-square rounded-lg shadow-md border border-gray-200 group-hover:shadow-lg transition-all duration-200 min-h-[140px] sm:min-h-[160px] md:min-h-[180px]"
          style={{ backgroundColor: actualHexColor }}
        >
          {/* Eco Badge */}
          <div className="absolute top-2 left-2">
            <SparklesIcon className="w-4 h-4 text-white drop-shadow-md" />
          </div>
        </div>

        {/* Color Info */}
        <div className="mt-3 text-center">
          <h3 className="text-sm font-medium text-gray-900 truncate mb-1">{color.name}</h3>
          <p className="text-xs text-gray-500 font-mono">{color.hex}</p>
        </div>
      </div>
    </motion.div>
  );
};

// Lifestyle Card Component
const LifestyleCard = ({ color, getActualHexColor, getTextColor, onColorClick, index }) => {
  const actualHexColor = getActualHexColor(color.hex);

  return (
          <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
      onClick={() => onColorClick(color)}
    >
      {/* Mock Lifestyle Image */}
      <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-gray-400 text-center">
            <PhotoIcon className="w-12 h-12 mx-auto mb-2" />
            <p className="text-sm">Lifestyle Preview</p>
                        </div>
                      </div>
        {/* Color Accent */}
        <div
          className="absolute bottom-4 right-4 w-16 h-16 rounded-lg shadow-lg"
          style={{ backgroundColor: actualHexColor }}
        />
            </div>

      {/* Content */}
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-1">{color.name}</h3>
        <p className="text-sm text-gray-600 mb-3">{color.colorFamily}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono text-gray-500">{color.hex}</span>
          <SparklesIcon className="w-4 h-4 text-green-600" />
        </div>
      </div>
    </motion.div>
  );
};





// Color Detail Modal Component
const ColorDetailModal = ({ color, onClose, getActualHexColor, getTextColor, compatibleProducts }) => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const actualHexColor = getActualHexColor(color.hex);
  const textColor = getTextColor(color.hex);

  const handleProductToggle = (productId) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold text-gray-900">{color.name}</h2>
                          <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              Ô£ò
                          </button>
                        </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Color Info */}
            <div>
              <div
                className="w-full h-64 rounded-xl mb-6"
                style={{ backgroundColor: actualHexColor }}
              />
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Color Information</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Code:</span>
                      <span className="ml-2 font-mono">{color.code}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Hex:</span>
                      <span className="ml-2 font-mono">{color.hex}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Family:</span>
                      <span className="ml-2">{color.colorFamily}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Temperature:</span>
                      <span className="ml-2">{color.temperature || 'N/A'}</span>
                      </div>
                    <div>
                      <span className="text-gray-600">Tonality:</span>
                      <span className="ml-2">{color.tonality || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Group:</span>
                      <span className="ml-2">{color.group || 'N/A'}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Compatible Products</h3>
                  <div className="space-y-2">
                    {compatibleProducts.map(product => (
                      <label key={product.id} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedProducts.includes(product.id)}
                          onChange={() => handleProductToggle(product.id)}
                          className="mr-3"
                        />
                        <span className="text-sm">{product.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Actions */}
            <div>
              <div className="space-y-4">
                <button className="w-full px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                  Open in Visualizer
                </button>
                <button className="w-full px-6 py-3 border border-gray-300 text-gray-900 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                  Copy Hex Code
                </button>
                <button className="w-full px-6 py-3 border border-gray-300 text-gray-900 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                  Bulk/Contractor Quote
                </button>
              </div>

              {selectedProducts.length > 0 && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Selected Products</h3>
                  <ul className="text-sm text-gray-600 mb-4">
                    {selectedProducts.map(productId => {
                      const product = compatibleProducts.find(p => p.id === productId);
                      return <li key={productId}>ÔÇó {product?.name}</li>;
                    })}
                  </ul>
                  <button className="w-full px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors">
                    Add to Cart
                  </button>
          </div>
          )}
        </div>
      </div>
        </div>
      </div>
    </div>
  );
};

export default ColorsPage;

