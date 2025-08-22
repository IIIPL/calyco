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
import { flatColors } from '../data/flatColors';
import { reverseColorNameMapping } from '../data/colorNameMapping';
import { getColorBrightness } from '../utils/colorHelpers';

// Color Families for filtering
const COLOR_FAMILIES = [
  'Neutrals', 'Greys', 'Pastels', 'Bold', 'Earthy', 
  'Blues', 'Greens', 'Reds & Oranges', 'Browns'
];

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
    let filtered = flatColors;

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(color => 
        color.name.toLowerCase().includes(term) ||
        color.hex.toLowerCase().includes(term) ||
        (color.tags && color.tags.some(tag => tag.toLowerCase().includes(term)))
      );
    }

    // Family filter
    if (selectedFamily) {
      filtered = filtered.filter(color => color.color_family === selectedFamily);
    }

    // Temperature filter
    if (selectedTemperature) {
      filtered = filtered.filter(color => color.color_temperature === selectedTemperature);
    }

    // Tonality filter
    if (selectedTonality) {
      filtered = filtered.filter(color => color.tonality === selectedTonality);
    }

    // Suitability filter
    if (selectedSuitability) {
      filtered = filtered.filter(color => color.recommended_use?.includes(selectedSuitability));
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
      const family = color.color_family;
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
    const familySlug = color.color_family.toLowerCase().replace(/\s+/g, '-');
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
              Discover the Calyco Sacred Palette
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-white mb-8 max-w-3xl mx-auto"
            >
              108 low-VOC shades built for modern living and professional durability.
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
                <option value="Cool">Cool</option>
                <option value="Warm">Warm</option>
              </select>

              {/* Tonality Filter */}
              <select
                value={selectedTonality}
                onChange={(e) => setSelectedTonality(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-900"
              >
                <option value="">All Tonalities</option>
                <option value="Light">Light</option>
                <option value="Medium">Medium</option>
                <option value="Dark">Dark</option>
              </select>

              {/* Suitability Filter */}
              <select
                value={selectedSuitability}
                onChange={(e) => setSelectedSuitability(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-900"
              >
                <option value="">All Uses</option>
                <option value="Interior">Interior</option>
                <option value="Exterior">Exterior</option>
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-900"
              >
                <option value="name">A-Z</option>
                <option value="popular">Popular</option>
                <option value="light-dark">Light → Dark</option>
                <option value="dark-light">Dark → Light</option>
              </select>
              
              {/* View Mode Toggle */}
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-2 text-sm ${viewMode === 'grid' ? 'bg-gray-900 text-white' : 'bg-white text-gray-700'}`}
                >
                  <Squares2X2Icon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('lifestyle')}
                  className={`px-3 py-2 text-sm ${viewMode === 'lifestyle' ? 'bg-gray-900 text-white' : 'bg-white text-gray-700'}`}
                >
                  <PhotoIcon className="w-4 h-4" />
                </button>
              </div>

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

      

                        {/* Hero Section */}
      <section className="py-20 bg-[#b45309] relative overflow-hidden">
        <div className="absolute w-20 h-20 bg-white/10 rounded-full top-10 right-15 animate-bounce"></div>
        <div className="absolute w-16 h-16 bg-white/10 rounded-full bottom-20 left-10 animate-bounce" style={{animationDelay: '-4s'}}></div>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-20">
            <h1 className="text-5xl md:text-6xl font-light text-white mb-6 leading-tight tracking-tight">
              Bring out the best<br/>in your spaces
            </h1>
            <p className="text-xl md:text-2xl text-white/85 mb-10 font-light tracking-wide">
              Premium, eco-friendly paints that elevate<br/>every room, every wall.
            </p>

          </div>
          <div className="relative h-96 md:h-[500px] rounded-3xl overflow-hidden mb-10 bg-gradient-to-br from-gray-700 to-gray-600 shadow-2xl">
            <div className="w-full h-full flex items-center justify-center relative">
              <img 
                alt="Professional family and contractors trust Calyco" 
                className="w-full h-full object-cover rounded-3xl" 
                src="/Assets/ChatGPT Image Aug 22, 2025, 01_32_07 PM.png"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white/95 p-10 rounded-3xl shadow-2xl backdrop-blur-sm border border-white/20">
              <h3 className="text-3xl font-normal text-[#2a2a2a] mb-4 leading-tight tracking-tight">
                Paint that lasts<br/>longer
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed mb-6 font-normal">
                Advanced one-coat formulas for beauty and durability.
              </p>
              <div className="h-48 rounded-2xl mb-6 overflow-hidden">
                <img 
                  src="/Assets/allguard.png" 
                  alt="AllGuard premium paint showing quality and durability" 
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            </div>
            <div className="bg-white/95 p-10 rounded-3xl shadow-2xl backdrop-blur-sm border border-white/20">
              <h3 className="text-3xl font-normal text-[#2a2a2a] mb-4 leading-tight tracking-tight">
                What<br/>professionals say
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed mb-6 font-normal">
                Calyco paints helped us finish faster, with fewer coats, and the quality is unmatched.
              </p>
              <div className="h-48 rounded-2xl mb-6 overflow-hidden">
                <img 
                  alt="Professional contractors and builders trust Calyco" 
                  className="w-full h-full object-cover object-bottom rounded-2xl" 
                  src="/Assets/trust-image.png"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-900 w-full">
        <div className="w-full max-w-none mx-auto px-6">
          <div className="w-full space-y-0">
            <div className="border-b border-gray-200 last:border-b-0">
              <button className="w-full py-8 text-left flex justify-between items-center hover:bg-gray-800/50 transition-colors duration-200">
                <span className="text-xl font-bold text-white">What is Calyco Paints?</span>
                <span className="text-white text-2xl font-bold transform transition-transform duration-300">+</span>
              </button>
            </div>
            <div className="border-b border-gray-200 last:border-b-0">
              <button className="w-full py-8 text-left flex justify-between items-center hover:bg-gray-800/50 transition-colors duration-200">
                <span className="text-xl font-bold text-white">How is Calyco different from other paint brands?</span>
                <span className="text-white text-2xl font-bold transform transition-transform duration-300">+</span>
              </button>
            </div>
            <div className="border-b border-gray-200 last:border-b-0">
              <button className="w-full py-8 text-left flex justify-between items-center hover:bg-gray-800/50 transition-colors duration-200">
                <span className="text-xl font-bold text-white">Are Calyco paints safe for children and pets?</span>
                <span className="text-white text-2xl font-bold transform transition-transform duration-300">+</span>
              </button>
            </div>
            <div className="border-b border-gray-200 last:border-b-0">
              <button className="w-full py-8 text-left flex justify-between items-center hover:bg-gray-800/50 transition-colors duration-200">
                <span className="text-xl font-bold text-white">What does low-VOC mean?</span>
                <span className="text-white text-2xl font-bold transform transition-transform duration-300">+</span>
              </button>
            </div>
            <div className="border-b border-gray-200 last:border-b-0">
              <button className="w-full py-8 text-left flex justify-between items-center hover:bg-gray-800/50 transition-colors duration-200">
                <span className="text-xl font-bold text-white">What surfaces can Calyco paints be used on?</span>
                <span className="text-white text-2xl font-bold transform transition-transform duration-300">+</span>
              </button>
            </div>
            <div className="border-b border-gray-200 last:border-b-0">
              <button className="w-full py-8 text-left flex justify-between items-center hover:bg-gray-800/50 transition-colors duration-200">
                <span className="text-xl font-bold text-white">Are your paints waterproof and weather-resistant?</span>
                <span className="text-white text-2xl font-bold transform transition-transform duration-300">+</span>
              </button>
            </div>
            <div className="text-center mt-12">
              <button className="inline-flex items-center gap-3 px-8 py-4 bg-white text-[#1A1C24] rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 hover:scale-105 shadow-lg">
                See All FAQs
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 9l6 6 6-6"></path>
                </svg>
              </button>
            </div>
          </div>
                    </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 bg-white border-t border-[#E5E5E5]">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8 md:mb-12">
            Ready to paint a better future?
          </h2>
          <div className="flex flex-col md:flex-row gap-3 md:gap-4 justify-center items-center">
            <button 
              onClick={() => navigate('/products')}
              className="w-full md:w-auto px-6 py-3 bg-black text-white rounded-full font-medium text-base hover:bg-gray-800 transition-colors duration-300"
            >
              Explore Products
            </button>
            <button 
              onClick={() => navigate('/contact')}
              className="w-full md:w-auto px-6 py-3 border-2 border-black text-black rounded-full font-medium text-base hover:bg-black hover:text-white transition-all duration-300"
            >
              Contact Us
            </button>
          </div>
        </div>
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
        <p className="text-sm text-gray-600 mb-3">{color.color_family}</p>
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
              ✕
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
                      <span className="text-gray-600">Hex:</span>
                      <span className="ml-2 font-mono">{color.hex}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Family:</span>
                      <span className="ml-2">{color.color_family}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Temperature:</span>
                      <span className="ml-2">{color.color_temperature}</span>
                      </div>
                    <div>
                      <span className="text-gray-600">Tonality:</span>
                      <span className="ml-2">{color.tonality}</span>
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
                      return <li key={productId}>• {product?.name}</li>;
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