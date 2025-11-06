import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Info, Phone, Mail, User, X, ShoppingCart, ArrowRight } from 'lucide-react';

const BudgetCalculator = () => {
  // Calculator type state
  const [calculatorType, setCalculatorType] = useState('paint'); // 'paint' or 'texture'

  // Paint calculator state
  const [carpetArea, setCarpetArea] = useState('');
  const [paintCategory, setPaintCategory] = useState('interior');
  const [paintProductType, setPaintProductType] = useState('premium');

  // Texture calculator state
  const [paintableArea, setPaintableArea] = useState('');
  const [selectedTexture, setSelectedTexture] = useState('stone-finish');

  // Common state
  const [results, setResults] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Booking form state
  const [bookingData, setBookingData] = useState({
    name: '',
    phone: '',
    email: ''
  });

  // Paint products data
  const paintProducts = {
    interior: {
      premium: {
        name: 'Premium Interior Emulsion',
        tagline: 'Low Sheen Finish',
        pricePerLitre: 600,
        coverage: 160,
        image: '/Assets/Product Images/Premium Interior Emulsion/premium-interior-bucket-transparent.png',
        packs: [
          { size: 1, price: 600 },
          { size: 4, price: 1700 },
          { size: 10, price: 4100 },
          { size: 20, price: 8000 }
        ]
      },
      luxury: {
        name: 'Luxury Interior Emulsion',
        tagline: 'Pearl Finish',
        pricePerLitre: 800,
        coverage: 160,
        image: '/Assets/Product Images/Luxury Interior Emulsion/luxury-interior-bucket-transparent.png',
        packs: [
          { size: 1, price: 800 },
          { size: 4, price: 2200 },
          { size: 10, price: 5200 },
          { size: 20, price: 9700 }
        ]
      }
    },
    exterior: {
      premium: {
        name: 'Premium Exterior Emulsion',
        tagline: 'Matte Finish',
        pricePerLitre: 600,
        coverage: 140,
        image: '/Assets/Product Images/Premium Exterior Emulsion/premium-exterior-bucket-transparent.png',
        packs: [
          { size: 1, price: 600 },
          { size: 4, price: 1700 },
          { size: 10, price: 4100 },
          { size: 20, price: 8000 }
        ]
      },
      luxury: {
        name: 'Luxury Exterior Emulsion',
        tagline: 'High Sheen Finish',
        pricePerLitre: 800,
        coverage: 140,
        image: '/Assets/Product Images/Luxury Exterior Emulsion/luxury-exterior-bucket-transparent.png',
        packs: [
          { size: 1, price: 800 },
          { size: 4, price: 2200 },
          { size: 10, price: 5200 },
          { size: 20, price: 9700 }
        ]
      }
    }
  };

  // Texture products data
  const textureProducts = {
    'stone-finish': {
      name: 'Stone Finish',
      description: 'Premium stone texture with natural look',
      image: '/Assets/Texture Images/quality.png',
      variants: ['Stone 01', 'Stone 02', 'Stone 03', 'Stone 04', 'Stone 05', 'Stone 06', 'Stone 07', 'Stone 10', 'Stone 95', 'Stone 99']
    },
    'rustik': {
      name: 'Rustik Texture',
      description: 'Elegant rustic finish for modern homes',
      image: '/Assets/Texture Images/terracotta.png',
      variants: ['Rustik Fine', 'Rustik Regular']
    },
    'fine-texture': {
      name: 'Fine Texture',
      description: 'Smooth fine texture for sophisticated walls',
      image: '/Assets/Texture Images/quality.png',
      variants: ['Fine White', 'Perlina Fine']
    },
    'spray-coat': {
      name: 'Spray Coat',
      description: 'Modern spray texture patterns',
      image: '/Assets/Texture Images/quality.png',
      variants: ['Spray Compact', 'Spray Bubbles']
    }
  };

  const TEXTURE_PRICE_PER_SQFT = 60;
  const BOOKING_AMOUNT = 499;

  // Optimize pack selection for paint
  const optimizePacks = (litresNeeded, packs) => {
    const sortedPacks = [...packs].sort((a, b) => b.size - a.size);
    let remaining = litresNeeded;
    const selection = [];

    for (const pack of sortedPacks) {
      const qty = Math.floor(remaining / pack.size);
      if (qty > 0) {
        selection.push({ ...pack, qty });
        remaining -= qty * pack.size;
      }
    }

    if (remaining > 0) {
      const smallestPack = sortedPacks[sortedPacks.length - 1];
      const existing = selection.find(s => s.size === smallestPack.size);
      if (existing) {
        existing.qty += 1;
      } else {
        selection.push({ ...smallestPack, qty: 1 });
      }
    }

    const totalLitres = selection.reduce((sum, pack) => sum + pack.size * pack.qty, 0);
    const totalCost = selection.reduce((sum, pack) => sum + pack.price * pack.qty, 0);

    return { selection, totalLitres, totalCost };
  };

  // Calculate paint budget
  const calculatePaintBudget = () => {
    if (!carpetArea || parseFloat(carpetArea) <= 0) {
      alert('Please enter a valid carpet area');
      return;
    }

    setIsCalculating(true);

    setTimeout(() => {
      const carpetAreaNum = parseFloat(carpetArea);
      const paintableArea = carpetAreaNum * 3.5;
      const selectedProduct = paintProducts[paintCategory][paintProductType];

      const coats = 2;
      const totalCoverage = paintableArea * coats;
      const litresNeeded = totalCoverage / selectedProduct.coverage;
      const litresWithWastage = litresNeeded * 1.1;
      const packSelection = optimizePacks(litresWithWastage, selectedProduct.packs);

      setResults({
        type: 'paint',
        carpetArea: carpetAreaNum,
        paintableArea: paintableArea,
        litresNeeded: litresWithWastage,
        packSelection: packSelection,
        totalCost: packSelection.totalCost,
        totalLitres: packSelection.totalLitres,
        product: selectedProduct
      });

      setIsCalculating(false);
    }, 300);
  };

  // Calculate texture budget
  const calculateTextureBudget = () => {
    if (!paintableArea || parseFloat(paintableArea) <= 0) {
      alert('Please enter a valid paintable area');
      return;
    }

    setIsCalculating(true);

    setTimeout(() => {
      const areaNum = parseFloat(paintableArea);
      const totalCost = areaNum * TEXTURE_PRICE_PER_SQFT;
      const selectedProduct = textureProducts[selectedTexture];

      setResults({
        type: 'texture',
        paintableArea: areaNum,
        totalCost: totalCost,
        pricePerSqft: TEXTURE_PRICE_PER_SQFT,
        texture: selectedProduct
      });

      setIsCalculating(false);
    }, 300);
  };

  const handleCalculate = () => {
    if (calculatorType === 'paint') {
      calculatePaintBudget();
    } else {
      calculateTextureBudget();
    }
  };

  // Reset when switching calculator type
  const handleCalculatorTypeChange = (type) => {
    setCalculatorType(type);
    setResults(null);
    setCarpetArea('');
    setPaintableArea('');
  };

  // Handle booking modal
  const handleBookNow = () => {
    setShowBookingModal(true);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();

    if (!bookingData.name || !bookingData.phone || !bookingData.email) {
      alert('Please fill all fields');
      return;
    }

    console.log('Booking Data:', {
      ...bookingData,
      calculatorType,
      paintableArea: results.paintableArea,
      texture: results.texture.name,
      totalCost: results.totalCost,
      bookingAmount: BOOKING_AMOUNT
    });

    setShowBookingModal(false);
    setShowConfirmation(true);

    setTimeout(() => {
      setShowConfirmation(false);
      setBookingData({ name: '', phone: '', email: '' });
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#F7F5FF] via-[#EFE9FC] to-[#F5F0FB]" />
        <div className="absolute -top-16 -left-20 w-64 h-64 rounded-full bg-[#432452]/10 blur-3xl" />
        <div className="absolute top-24 right-10 w-48 h-48 rounded-full bg-[#998850]/15 blur-[140px]" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-18 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[#0F1221]">
              <span className="text-[#998850]">Budget</span> Calculator
            </h1>
            <p className="text-base sm:text-lg text-[#0F1221]/70 max-w-3xl mx-auto">
              Get instant, accurate estimates for paint or texture services with Calyco&apos;s planning toolkit.
              Tailored to your space. Transparent by design.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Calculator Type Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Choose Calculator Type</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => handleCalculatorTypeChange('paint')}
                className={`relative p-6 rounded-lg border-2 transition-all ${
                  calculatorType === 'paint'
                    ? 'border-purple-600 bg-purple-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="text-center">
                  <div className="text-4xl mb-3">🎨</div>
                  <p className={`text-lg font-bold mb-1 ${calculatorType === 'paint' ? 'text-purple-600' : 'text-gray-700'}`}>
                    Paint Calculator
                  </p>
                  <p className="text-sm text-gray-600">
                    For interior & exterior painting
                  </p>
                </div>
                {calculatorType === 'paint' && (
                  <div className="absolute top-3 right-3 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </button>

              <button
                type="button"
                onClick={() => handleCalculatorTypeChange('texture')}
                className={`relative p-6 rounded-lg border-2 transition-all ${
                  calculatorType === 'texture'
                    ? 'border-purple-600 bg-purple-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="text-center">
                  <div className="text-4xl mb-3">🏗️</div>
                  <p className={`text-lg font-bold mb-1 ${calculatorType === 'texture' ? 'text-purple-600' : 'text-gray-700'}`}>
                    Texture Calculator
                  </p>
                  <p className="text-sm text-gray-600">
                    For textured wall finishes
                  </p>
                </div>
                {calculatorType === 'texture' && (
                  <div className="absolute top-3 right-3 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Calculator Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Calculator Form */}
          <div className="lg:col-span-2 space-y-6">
            {calculatorType === 'paint' ? (
              // PAINT CALCULATOR
              <motion.div
                key="paint-calculator"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-6">Paint Calculator</h2>

                <div className="space-y-6">
                  {/* Carpet Area */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Carpet Area (Sq.Ft) *
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={carpetArea}
                      onChange={(e) => setCarpetArea(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900"
                      placeholder="Enter carpet area"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      The floor area of your space (excluding walls)
                    </p>
                  </div>

                  {/* Category Selection */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Select Category
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setPaintCategory('interior')}
                        className={`relative p-4 rounded-lg border-2 transition-all ${
                          paintCategory === 'interior'
                            ? 'border-purple-600 bg-purple-50'
                            : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}
                      >
                        <div className="text-center">
                          <div className="text-3xl mb-2">🏠</div>
                          <p className={`font-semibold ${paintCategory === 'interior' ? 'text-purple-600' : 'text-gray-700'}`}>
                            Interior
                          </p>
                        </div>
                        {paintCategory === 'interior' && (
                          <div className="absolute top-2 right-2 w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaintCategory('exterior')}
                        className={`relative p-4 rounded-lg border-2 transition-all ${
                          paintCategory === 'exterior'
                            ? 'border-purple-600 bg-purple-50'
                            : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}
                      >
                        <div className="text-center">
                          <div className="text-3xl mb-2">🌆</div>
                          <p className={`font-semibold ${paintCategory === 'exterior' ? 'text-purple-600' : 'text-gray-700'}`}>
                            Exterior
                          </p>
                        </div>
                        {paintCategory === 'exterior' && (
                          <div className="absolute top-2 right-2 w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Product Type Selection */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Choose Product
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {Object.entries(paintProducts[paintCategory]).map(([key, product]) => (
                        <button
                          key={key}
                          type="button"
                          onClick={() => setPaintProductType(key)}
                          className={`relative p-4 rounded-lg border-2 transition-all ${
                            paintProductType === key
                              ? 'border-purple-600 bg-purple-50'
                              : 'border-gray-200 bg-white hover:border-gray-300'
                          }`}
                        >
                          <div className="flex flex-col items-center">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-20 h-20 object-contain mb-2"
                            />
                            <p className={`font-semibold text-sm ${paintProductType === key ? 'text-purple-600' : 'text-gray-700'}`}>
                              {key === 'premium' ? 'Premium' : 'Luxury'}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">{product.tagline}</p>
                            <p className="text-sm font-bold text-gray-900 mt-2">₹{product.pricePerLitre}/L</p>
                          </div>
                          {paintProductType === key && (
                            <div className="absolute top-2 right-2 w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center">
                              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Calculate Button */}
                  <button
                    onClick={handleCalculate}
                    disabled={!carpetArea || isCalculating}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-purple-600 text-white text-base font-semibold rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                  >
                    <Calculator size={20} />
                    {isCalculating ? 'Calculating...' : 'Calculate Budget'}
                  </button>
                </div>
              </motion.div>
            ) : (
              // TEXTURE CALCULATOR
              <motion.div
                key="texture-calculator"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-6">Texture Calculator</h2>

                <div className="space-y-6">
                  {/* Paintable Area */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Area to be Painted with Texture (Sq.Ft) *
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={paintableArea}
                      onChange={(e) => setPaintableArea(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900"
                      placeholder="Enter area to be textured"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Enter the exact wall/ceiling area you want textured
                    </p>
                  </div>

                  {/* Texture Selection */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Choose Your Texture Finish
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {Object.entries(textureProducts).map(([key, product]) => (
                        <button
                          key={key}
                          type="button"
                          onClick={() => setSelectedTexture(key)}
                          className={`relative p-4 rounded-lg border-2 transition-all text-left ${
                            selectedTexture === key
                              ? 'border-purple-600 bg-purple-50'
                              : 'border-gray-200 bg-white hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-16 h-16 object-cover rounded"
                            />
                            <div className="flex-1">
                              <p className={`font-semibold text-sm ${selectedTexture === key ? 'text-purple-600' : 'text-gray-700'}`}>
                                {product.name}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">{product.description}</p>
                            </div>
                          </div>
                          {selectedTexture === key && (
                            <div className="absolute top-2 right-2 w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center">
                              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Selected Texture Info */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Info className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-blue-900 mb-1">Selected: {textureProducts[selectedTexture].name}</p>
                        <p className="text-xs text-blue-700">Available variants: {textureProducts[selectedTexture].variants.join(', ')}</p>
                        <p className="text-sm font-bold text-blue-900 mt-2">₹{TEXTURE_PRICE_PER_SQFT}/sqft (complete solution)</p>
                      </div>
                    </div>
                  </div>

                  {/* Calculate Button */}
                  <button
                    onClick={handleCalculate}
                    disabled={!paintableArea || isCalculating}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-purple-600 text-white text-base font-semibold rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                  >
                    <Calculator size={20} />
                    {isCalculating ? 'Calculating...' : 'Calculate Budget'}
                  </button>
                </div>
              </motion.div>
            )}

            {/* Results Section */}
            {results && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-6">Your Estimate</h2>

                {results.type === 'paint' ? (
                  // PAINT RESULTS
                  <>
                    {/* Summary Cards */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-xs text-gray-600 mb-1">Carpet Area</p>
                        <p className="text-2xl font-bold text-gray-900">{results.carpetArea.toFixed(0)}</p>
                        <p className="text-xs text-gray-500">Sq.Ft</p>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-4">
                        <p className="text-xs text-purple-700 mb-1">Paintable Area</p>
                        <p className="text-2xl font-bold text-purple-900">{results.paintableArea.toFixed(0)}</p>
                        <p className="text-xs text-purple-600">Sq.Ft (walls & ceiling)</p>
                      </div>
                    </div>

                    {/* Selected Product */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-6 flex items-center gap-4">
                      <img src={results.product.image} alt={results.product.name} className="w-16 h-16 object-contain" />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{results.product.name}</p>
                        <p className="text-sm text-gray-600">{results.product.tagline}</p>
                      </div>
                    </div>

                    {/* Pack Breakdown */}
                    <div className="border-t border-gray-200 pt-4 mb-4">
                      <h3 className="text-sm font-semibold text-gray-900 mb-3">Recommended Packs</h3>
                      <div className="space-y-3">
                        {results.packSelection.selection.map((pack, index) => (
                          <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                            <div className="flex items-center gap-3">
                              <img src={results.product.image} alt="" className="w-12 h-12 object-contain" />
                              <div>
                                <p className="font-medium text-gray-900">{pack.size}L Pack</p>
                                <p className="text-sm text-gray-600">Quantity: {pack.qty}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-gray-900">₹{(pack.price * pack.qty).toFixed(0)}</p>
                              <p className="text-xs text-gray-500">₹{pack.price}/unit</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Total */}
                    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg p-6 text-white">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-lg font-semibold">Total Estimate</span>
                        <span className="text-3xl font-bold">₹{results.totalCost.toFixed(0)}</span>
                      </div>
                      <p className="text-xs text-white/80">Total Paint: {results.totalLitres}L (includes 10% wastage)</p>
                      <button
                        onClick={() => window.location.href = '/products'}
                        className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <ShoppingCart size={18} />
                        Shop Now
                      </button>
                    </div>
                  </>
                ) : (
                  // TEXTURE RESULTS
                  <>
                    {/* Summary Card */}
                    <div className="bg-purple-50 rounded-lg p-4 mb-6">
                      <p className="text-xs text-purple-700 mb-1">Area to be Textured</p>
                      <p className="text-3xl font-bold text-purple-900">{results.paintableArea.toFixed(0)}</p>
                      <p className="text-xs text-purple-600">Sq.Ft</p>
                    </div>

                    {/* Selected Texture */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-6 flex items-center gap-4">
                      <img src={results.texture.image} alt={results.texture.name} className="w-16 h-16 object-cover rounded" />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{results.texture.name}</p>
                        <p className="text-sm text-gray-600">{results.texture.description}</p>
                        <p className="text-sm text-gray-700 mt-1">₹{TEXTURE_PRICE_PER_SQFT}/sqft</p>
                      </div>
                    </div>

                    {/* Cost Breakdown */}
                    <div className="border-t border-gray-200 pt-4 mb-4">
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Texture Area</span>
                          <span className="font-medium text-gray-900">{results.paintableArea.toFixed(0)} sqft</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Rate per sqft</span>
                          <span className="font-medium text-gray-900">₹{TEXTURE_PRICE_PER_SQFT}</span>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Includes material + labor + application</span>
                        </div>
                      </div>
                    </div>

                    {/* Total Cost */}
                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg p-6 text-white mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-lg font-semibold">Total Estimate</span>
                        <span className="text-3xl font-bold">₹{results.totalCost.toFixed(0)}</span>
                      </div>
                      <p className="text-xs text-white/80">Complete texture painting solution</p>
                    </div>

                    {/* Book Now Button */}
                    <button
                      onClick={handleBookNow}
                      className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-amber-500 text-white text-lg font-bold rounded-lg hover:bg-amber-600 transition-colors shadow-lg"
                    >
                      <Phone size={20} />
                      Book Now for ₹{BOOKING_AMOUNT}
                    </button>
                    <p className="text-xs text-center text-gray-500 mt-2">
                      Pay ₹{BOOKING_AMOUNT} to confirm. Our team will contact you shortly.
                    </p>
                  </>
                )}
              </motion.div>
            )}
          </div>

          {/* Right Sidebar - Info */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-24"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Info className="text-blue-600" size={20} />
                </div>
                <h3 className="text-lg font-bold text-gray-900">How It Works</h3>
              </div>

              {calculatorType === 'paint' ? (
                // Paint Calculator Info
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-700 font-medium mb-2">Simple Formula:</p>
                    <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                      <p className="font-mono text-sm text-blue-900 font-semibold">
                        Paintable Area = Carpet Area × 3.5
                      </p>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600 space-y-2">
                    <p className="font-medium text-gray-900">Why 3.5x?</p>
                    <p className="leading-relaxed">
                      The total paintable surface—including all walls and ceilings—is approximately 3.5 times your carpet area.
                    </p>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-sm font-medium text-gray-900 mb-2">What's Included:</p>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-0.5">✓</span>
                        <span>2 coats recommended</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-0.5">✓</span>
                        <span>10% wastage allowance</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-0.5">✓</span>
                        <span>Optimized pack selection</span>
                      </li>
                    </ul>
                  </div>
                </div>
              ) : (
                // Texture Calculator Info
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-700 font-medium mb-2">Simple Calculation:</p>
                    <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                      <p className="font-mono text-sm text-blue-900 font-semibold">
                        Total Cost = Area × ₹60/sqft
                      </p>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600 space-y-2">
                    <p className="font-medium text-gray-900">How to measure?</p>
                    <p className="leading-relaxed">
                      Measure the exact wall or ceiling area you want to texture. Include only the surfaces to be textured, not the entire room.
                    </p>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-sm font-medium text-gray-900 mb-2">What's Included:</p>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-0.5">✓</span>
                        <span>Premium texture material</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-0.5">✓</span>
                        <span>Professional application</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-0.5">✓</span>
                        <span>Complete labor charges</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-0.5">✓</span>
                        <span>Surface preparation</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mt-4">
                    <p className="text-xs font-semibold text-amber-900 mb-1">Booking Process:</p>
                    <ol className="text-xs text-amber-800 space-y-1 list-decimal list-inside">
                      <li>Pay ₹{BOOKING_AMOUNT} booking amount</li>
                      <li>Our team will contact you</li>
                      <li>Site visit & confirmation</li>
                      <li>Professional application</li>
                    </ol>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Site Inspection Service - Delhi NCR */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg p-8 text-white"
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-shrink-0">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold mb-2">Free Site Inspection in Delhi NCR</h3>
              <p className="text-white/90 mb-4">
                Get accurate measurements and professional recommendations from our experts. Book a site visit for just ₹{BOOKING_AMOUNT} and get precise estimates for your painting project.
              </p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">Professional Assessment</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">Detailed Quotation</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">Color Consultation</span>
                </div>
              </div>
            </div>
            <div className="flex-shrink-0">
              <button
                onClick={handleBookNow}
                className="bg-white text-purple-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors shadow-lg"
              >
                Book Site Visit
              </button>
            </div>
          </div>
        </motion.div>

        {/* Understanding Painting Costs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Understanding Your Painting Investment</h2>

          <div className="prose prose-sm max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6">
              Planning to transform your home with fresh paint or protective wall finishes? Understanding the cost structure is essential for smart budgeting. Our transparent calculator helps you estimate expenses accurately, ensuring no surprises during your painting project.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-purple-50 rounded-lg p-6 border border-purple-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-xl">🎨</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Paint Calculator</h3>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Perfect for interior and exterior painting projects. Get instant estimates based on your carpet area, paint quality, and coverage requirements.
                </p>
                <div className="text-xs text-gray-600 space-y-1">
                  <p>✓ Premium & Luxury options</p>
                  <p>✓ Optimized pack selection</p>
                  <p>✓ Direct shop & order</p>
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-6 border border-green-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                    <span className="text-xl">🏗️</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Texture Calculator</h3>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Complete solution for textured wall finishes. All-inclusive pricing covers material, labor, and professional application.
                </p>
                <div className="text-xs text-gray-600 space-y-1">
                  <p>✓ ₹60/sqft all-inclusive</p>
                  <p>✓ Multiple texture options</p>
                  <p>✓ Book with ₹{BOOKING_AMOUNT}</p>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-4">Key Factors Affecting Painting Costs</h3>

            <div className="space-y-4 mb-8">
              <div className="border-l-4 border-purple-600 pl-4">
                <h4 className="font-bold text-gray-900 mb-1">Paint Quality & Type</h4>
                <p className="text-sm text-gray-700">
                  Premium paints (₹600/L) offer excellent coverage and durability, while luxury options (₹800/L) provide superior finish and longer life. Choose based on your requirements and budget.
                </p>
              </div>

              <div className="border-l-4 border-purple-600 pl-4">
                <h4 className="font-bold text-gray-900 mb-1">Surface Area</h4>
                <p className="text-sm text-gray-700">
                  For paint: We use the standard 3.5x formula (Paintable Area = Carpet Area × 3.5) to calculate total wall and ceiling area. For textures: Direct measurement of areas to be textured.
                </p>
              </div>

              <div className="border-l-4 border-purple-600 pl-4">
                <h4 className="font-bold text-gray-900 mb-1">Application Type</h4>
                <p className="text-sm text-gray-700">
                  Interior paints cover 160 sqft/L while exterior paints cover 140 sqft/L due to rougher surfaces. Texture applications are priced at ₹60/sqft including all material and labor.
                </p>
              </div>

              <div className="border-l-4 border-purple-600 pl-4">
                <h4 className="font-bold text-gray-900 mb-1">Additional Services</h4>
                <p className="text-sm text-gray-700">
                  Surface preparation, primer application, waterproofing, and special finishes may add to the base cost but ensure professional, long-lasting results.
                </p>
              </div>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-4">What's Included in Our Estimates</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Premium Quality Paint</p>
                  <p className="text-xs text-gray-600">Durable, eco-friendly formulations</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Wastage Allowance</p>
                  <p className="text-xs text-gray-600">10% buffer for optimal coverage</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Multiple Coats</p>
                  <p className="text-xs text-gray-600">2 coats recommended for best finish</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Cost Optimization</p>
                  <p className="text-xs text-gray-600">Smart pack selection for savings</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Professional Guidance</p>
                  <p className="text-xs text-gray-600">Expert recommendations included</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Transparent Pricing</p>
                  <p className="text-xs text-gray-600">No hidden charges or surprises</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>

          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">How accurate is the paint calculator?</h3>
              <p className="text-gray-700">
                Our calculator uses the industry-standard 3.5x formula and accounts for 2 coats plus 10% wastage. While highly accurate, actual requirements may vary slightly based on surface texture, paint absorption, and application method. For precise estimates, book a site inspection.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">What is the difference between Premium and Luxury paints?</h3>
              <p className="text-gray-700">
                Premium paints (₹600/L) offer excellent coverage, durability, and value for money. Luxury paints (₹800/L) provide superior finish quality, enhanced washability, better color retention, and longer life. Both options are eco-friendly and safe for your home.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">How does the texture service work?</h3>
              <p className="text-gray-700">
                Our texture service is all-inclusive at ₹60/sqft. This covers premium texture material, professional application, complete labor charges, and surface preparation. Book with ₹{BOOKING_AMOUNT} to confirm your project, and our team will handle everything from consultation to completion.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">What does the ₹{BOOKING_AMOUNT} site inspection include?</h3>
              <p className="text-gray-700">
                Available in Delhi NCR, our site inspection includes professional area measurement, surface condition assessment, detailed quotation, color consultation, and expert recommendations. The booking amount is adjustable against your final project cost.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Why use the carpet area formula for paint calculation?</h3>
              <p className="text-gray-700">
                The paintable area (walls + ceiling) is typically 3.5 times your carpet area. This standard formula accounts for wall height and ceiling space, providing an accurate estimate without complex measurements. For textures, we use direct area measurement since it's only applied to specific surfaces.
              </p>
            </div>

            <div className="pb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Are there any additional costs I should know about?</h3>
              <p className="text-gray-700">
                The calculator provides estimates for paint/texture costs. Additional services like extensive surface repair, primer for unpainted walls, waterproofing, furniture moving, or special decorative finishes may incur extra charges. Our site inspection will identify all requirements for a complete quotation.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg border border-purple-100 p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Calyco's Budget Calculator?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Instant Estimates</h3>
              <p className="text-sm text-gray-700">
                Get accurate cost calculations in seconds. No waiting, no guesswork - just clear, transparent pricing for your painting project.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Budget Control</h3>
              <p className="text-sm text-gray-700">
                Plan your expenses effectively with detailed breakdowns. Compare options and make informed decisions that fit your budget.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Quality Assurance</h3>
              <p className="text-sm text-gray-700">
                Premium products, professional service, and transparent pricing. We stand behind every estimate with our commitment to quality.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Important Notes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 bg-amber-50 border border-amber-200 rounded-lg p-6"
        >
          <h3 className="text-base font-bold text-gray-900 mb-3">Important Notes</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-amber-600 mt-0.5">•</span>
              <span>Estimates are indicative; final costs may vary based on site conditions</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 mt-0.5">•</span>
              <span>Paint prices include material costs; labor charges separate</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 mt-0.5">•</span>
              <span>Texture pricing is all-inclusive (material + labor + application)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 mt-0.5">•</span>
              <span>Booking amount adjustable in final payment for service bookings</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 mt-0.5">•</span>
              <span>Site inspection service currently available only in Delhi NCR</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 mt-0.5">•</span>
              <span>All products are eco-friendly and safe for residential use</span>
            </li>
          </ul>
        </motion.div>
      </div>

      {/* Booking Modal (for texture only) */}
      <AnimatePresence>
        {showBookingModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowBookingModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Almost there!</h2>
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>

              <p className="text-gray-600 mb-6">How would you like to proceed?</p>

              <div className="bg-amber-50 border-2 border-amber-400 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-3xl">🤝</div>
                  <div>
                    <p className="font-bold text-gray-900">Fix this price and arrange a call-back</p>
                    <p className="text-sm text-gray-600">Your relationship manager will call you shortly</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-gray-900">₹{BOOKING_AMOUNT}.00</p>
                  <p className="text-xs text-gray-500">(Inc. All taxes)</p>
                </div>
              </div>

              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <User size={16} className="inline mr-1" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={bookingData.name}
                    onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Phone size={16} className="inline mr-1" />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={bookingData.phone}
                    onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter your phone"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Mail size={16} className="inline mr-1" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={bookingData.email}
                    onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-amber-500 text-white font-bold py-4 rounded-lg hover:bg-amber-600 transition-colors text-lg shadow-lg"
                >
                  Book Now - ₹{BOOKING_AMOUNT}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirmation Toast */}
      <AnimatePresence>
        {showConfirmation && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 right-8 bg-green-500 text-white rounded-lg shadow-2xl p-6 max-w-md z-50"
          >
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-1">Booking Confirmed!</h3>
                <p className="text-sm text-white/90">
                  Thank you for booking! Our relationship manager will contact you shortly to discuss your texture painting requirements.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BudgetCalculator;
