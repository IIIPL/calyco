import { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Info, Phone, Mail, User, X, ShoppingCart, ArrowRight, ChevronDown, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import ColorSelectorModal from '../components/ColorSelectorModal';
import CartPopup from '../components/CartPopup';
import { products as catalogProducts } from '../data/products.js';
import texturesData from '../data/textures';
import SEO from '../components/SEO';

const BudgetCalculator = () => {
  const navigate = useNavigate();
  const { addToCart, goToCheckout } = useCart();

  const textureOptions = useMemo(
    () =>
      texturesData.map((texture) => ({
        slug: texture.slug,
        name: texture.name,
        description: texture.description,
        image: texture.image,
        category: texture.category,
        application: texture.application
      })),
    []
  );

  const textureMap = useMemo(() => {
    const map = {};
    textureOptions.forEach((texture) => {
      map[texture.slug] = texture;
    });
    return map;
  }, [textureOptions]);

  // Calculator type state
  const [calculatorType, setCalculatorType] = useState('paint'); // 'paint' or 'texture'

  // Paint calculator state
  const [carpetArea, setCarpetArea] = useState('');
  const [paintCategory, setPaintCategory] = useState('interior');
  const [paintProductType, setPaintProductType] = useState('premium');

  // Texture calculator state
  const [paintableArea, setPaintableArea] = useState('');
  const [selectedTexture, setSelectedTexture] = useState(textureOptions[0]?.slug || '');
  const [isTextureDropdownOpen, setIsTextureDropdownOpen] = useState(false);

  // Common state
  const [results, setResults] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showColorModal, setShowColorModal] = useState(false);
  const [cartPopup, setCartPopup] = useState({ isVisible: false, item: null });

  // Booking form state
  const [bookingData, setBookingData] = useState({
    name: '',
    phone: '',
    email: ''
  });

  const textureDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (textureDropdownRef.current && !textureDropdownRef.current.contains(event.target)) {
        setIsTextureDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const selectedTextureDetails = textureMap[selectedTexture] || textureOptions[0];

  // Paint products data
  const paintProducts = {
    interior: {
      premium: {
        name: 'Premium Interior Emulsion',
        tagline: 'Low Sheen Finish',
        pricePerLitre: 600,
        coverage: 160,
        image: '/Assets/Product Images/Premium Interior Emulsion/premium-interior-bucket-transparent.webp',
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
        image: '/Assets/Product Images/Luxury Interior Emulsion/luxury-interior-bucket-transparent.webp',
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
        image: '/Assets/Product Images/Premium Exterior Emulsion/premium-exterior-bucket-transparent.webp',
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
        image: '/Assets/Product Images/Luxury Exterior Emulsion/luxury-exterior-bucket-transparent.webp',
        packs: [
          { size: 1, price: 800 },
          { size: 4, price: 2200 },
          { size: 10, price: 5200 },
          { size: 20, price: 9700 }
        ]
      }
    }
  };

  const TEXTURE_PRICE_PER_SQFT = 60;
  const BOOKING_AMOUNT = 499;

  // Helper function to find Shopify variant ID from catalog
  const findVariantId = (productSlug, size, finish) => {
    try {
      // Map budget calculator product types to catalog product slugs
      // Budget Calculator Logic:
      // - interior.premium = "Premium Interior Emulsion" (Low Sheen) → Premium-Interior-Emulsion
      // - interior.luxury = "Luxury Interior Emulsion" (Pearl) → Interior-Latex-Paint (Pearl)
      // - exterior.premium = "Premium Exterior Emulsion" (Matte) → Premium-Exterior-Emulsion
      // - exterior.luxury = "Luxury Exterior Emulsion" (High Sheen) → Exterior-Latex-Paint (High Sheen)
      const productMap = {
        'interior-premium': 'Premium-Interior-Emulsion',
        'interior-luxury': 'Interior-Latex-Paint',
        'exterior-premium': 'Premium-Exterior-Emulsion',
        'exterior-luxury': 'Exterior-Latex-Paint'
      };

      const catalogSlug = productMap[productSlug];
      if (!catalogSlug) {
        console.warn('[BudgetCalculator] No catalog mapping for:', productSlug);
        return null;
      }

      const product = catalogProducts.find(p => p.slug === catalogSlug || p.id === catalogSlug);
      if (!product) {
        console.warn('[BudgetCalculator] Product not found in catalog:', catalogSlug);
        return null;
      }

      // Normalize size (remove 'L' suffix if present)
      const normalizedSize = size.toString().replace('L', '').trim() + 'L';

      // Normalize finish - handle different finish name formats
      let normalizedFinish = finish;
      if (finish === 'Low Sheen') {
        normalizedFinish = 'Low Sheen';
      } else if (finish === 'Pearl' || finish.includes('Pearl')) {
        normalizedFinish = 'Pearl';
      } else if (finish === 'Matte' || finish.includes('Matte')) {
        normalizedFinish = 'Matte Finish';
      } else if (finish === 'High Sheen' || finish.includes('High Sheen')) {
        normalizedFinish = 'High Sheen Finish';
      }

      // Look up variant ID in priceByFinish structure
      const variantData = product.priceByFinish?.[normalizedFinish]?.[normalizedSize];
      const variantId = variantData?.variantId || variantData?.variantID;

      if (!variantId) {
        console.warn('[BudgetCalculator] Variant ID not found for:', {
          productSlug: productSlug,
          catalogSlug: catalogSlug,
          size: normalizedSize,
          finish: normalizedFinish,
          availableFinishes: Object.keys(product.priceByFinish || {}),
          availableSizes: product.priceByFinish?.[normalizedFinish] ? Object.keys(product.priceByFinish[normalizedFinish]) : []
        });
      }

      return variantId || null;
    } catch (error) {
      console.error('[BudgetCalculator] Error finding variant ID:', error);
      return null;
    }
  };

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
      const selectedProduct = textureMap[selectedTexture] || textureOptions[0];

      if (!selectedProduct) {
        setIsCalculating(false);
        return;
      }

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

  // Handle Buy Now button click for paint
  const handleBuyNow = () => {
    setShowColorModal(true);
  };

  // Cart popup handlers
  const closeCartPopup = () => {
    setCartPopup({ isVisible: false, item: null });
  };

  const handleContinueShopping = () => {
    setCartPopup({ isVisible: false, item: null });
    // Stay on current page
  };

  const handleCheckout = async () => {
    setCartPopup({ isVisible: false, item: null });
    await goToCheckout();
  };

  // Handle color selection and add to cart
  const handleColorSelect = async (selectedColor) => {
    if (!results || !results.packSelection) {
      alert('Error: No pack selection found');
      return;
    }

    try {
      // Add each pack to cart with selected color
      for (const pack of results.packSelection.selection) {
        const product = results.product;

        // Create product object for cart
        const cartProduct = {
          id: `${paintCategory}-${paintProductType}`,
          name: product.name,
          display_name: product.name,
          slug: `${paintCategory}-${paintProductType}`,
          image: product.image,
          bucketImage: product.image,
          price: pack.price
        };

        // Determine sheen/finish based on product
        let sheen = product.tagline || '';
        if (product.tagline.includes('Low Sheen')) {
          sheen = 'Low Sheen';
        } else if (product.tagline.includes('Pearl')) {
          sheen = 'Pearl';
        } else if (product.tagline.includes('Matte')) {
          sheen = 'Matte';
        } else if (product.tagline.includes('High Sheen')) {
          sheen = 'High Sheen';
        }

        // Find Shopify variant ID for this specific size and finish
        console.log('[BudgetCalculator] Before findVariantId:', {
          paintCategory,
          paintProductType,
          productSlug: `${paintCategory}-${paintProductType}`,
          packSize: pack.size,
          sizeWithL: `${pack.size}L`,
          sheen: sheen,
          productTagline: product.tagline
        });

        const variantId = findVariantId(
          `${paintCategory}-${paintProductType}`,
          `${pack.size}L`,
          sheen
        );

        console.log('[BudgetCalculator] After findVariantId:', {
          product: `${paintCategory}-${paintProductType}`,
          size: `${pack.size}L`,
          finish: sheen,
          variantId: variantId,
          color: selectedColor
        });

        if (!variantId) {
          console.error('[BudgetCalculator] No variant ID found for pack:', {
            category: paintCategory,
            type: paintProductType,
            size: `${pack.size}L`,
            finish: sheen
          });
          alert(`Unable to add ${pack.size}L pack to cart. Missing product variant. Please contact support.`);
          continue; // Skip this pack but continue with others
        }

        // Add to cart with proper color data and variant ID
        await addToCart(
          cartProduct,
          sheen,
          `${pack.size}L`,
          pack.qty,
          pack.price,
          {
            name: selectedColor.name,
            hex: selectedColor.hex,
            code: selectedColor.code, // Fixed: use actual color code, not hex
            family: selectedColor.family
          },
          'paint',
          {
            variantId: variantId
          }
        );
      }

      // Close color selector modal
      setShowColorModal(false);

      // Show cart popup with the first added item
      const firstPack = results.packSelection.selection[0];
      setCartPopup({
        isVisible: true,
        item: {
          name: results.product?.name,
          hex: selectedColor.hex,
          colorName: selectedColor.name,
          price: `₹${firstPack.price}`
        }
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Error adding items to cart. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <SEO
        title="Paint Budget Calculator - Calyco Paints"
        description="Estimate your painting costs accurately with the Calyco Budget Calculator. Get quotes for interior, exterior, and textured finishes."
        url="https://calycopaints.com/budget-calculator"
      />
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
                className={`relative p-6 rounded-lg border-2 transition-all ${calculatorType === 'paint'
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
                className={`relative p-6 rounded-lg border-2 transition-all ${calculatorType === 'texture'
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
                        className={`relative p-4 rounded-lg border-2 transition-all ${paintCategory === 'interior'
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
                        className={`relative p-4 rounded-lg border-2 transition-all ${paintCategory === 'exterior'
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
                          className={`relative p-4 rounded-lg border-2 transition-all ${paintProductType === key
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
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Choose Your Texture Finish
                    </label>
                    <p className="text-xs text-gray-500 mb-3">
                      Browse our premium catalog and pick the finish you love. Every option uses the same all-inclusive ₹60/sqft rate.
                    </p>
                    <div className="relative" ref={textureDropdownRef}>
                      <button
                        type="button"
                        onClick={() => setIsTextureDropdownOpen((prev) => !prev)}
                        className="w-full text-left rounded-2xl border border-gray-200 bg-white shadow-sm px-4 py-3 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                      >
                        <div className="flex items-center gap-4">
                          <div className="h-14 w-14 rounded-xl border border-gray-200 overflow-hidden flex-shrink-0 bg-gray-50">
                            {selectedTextureDetails ? (
                              <img
                                src={selectedTextureDetails.image}
                                alt={selectedTextureDetails.name}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="h-full w-full bg-gray-100" />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="text-xs uppercase tracking-[0.25em] text-gray-500 mb-1">Selected Texture</p>
                            <p className="text-lg font-semibold text-gray-900">
                              {selectedTextureDetails ? selectedTextureDetails.name : 'Choose a texture'}
                            </p>
                            <p className="text-sm text-gray-500">
                              {selectedTextureDetails
                                ? `${selectedTextureDetails.category} | ${selectedTextureDetails.application}`
                                : 'Select a finish to continue'}
                            </p>
                          </div>
                          <ChevronDown
                            className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isTextureDropdownOpen ? 'rotate-180' : ''
                              }`}
                          />
                        </div>
                      </button>
                      <div
                        className={`absolute left-0 right-0 mt-3 rounded-2xl border border-gray-200 bg-white shadow-2xl transition-all duration-200 origin-top z-20 ${isTextureDropdownOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
                          }`}
                      >
                        <div className="max-h-72 overflow-y-auto bg-white rounded-2xl">
                          {textureOptions.map((texture) => {
                            const isSelected = selectedTexture === texture.slug;
                            return (
                              <button
                                type="button"
                                key={texture.slug}
                                onClick={() => {
                                  setSelectedTexture(texture.slug);
                                  setIsTextureDropdownOpen(false);
                                }}
                                className={`w-full flex items-center justify-between gap-3 px-4 py-3 text-left transition border-b last:border-b-0 ${isSelected ? 'bg-white ring-1 ring-purple-200' : 'hover:bg-gray-50'
                                  }`}
                              >
                                <div className="flex items-center gap-3">
                                  <div className="h-12 w-12 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0 bg-gray-50">
                                    <img
                                      src={texture.image}
                                      alt={texture.name}
                                      className="h-full w-full object-cover"
                                      loading="lazy"
                                    />
                                  </div>
                                  <p className="text-sm font-semibold text-gray-900">{texture.name}</p>
                                </div>
                                {isSelected && (
                                  <span className="text-purple-600">
                                    <Check className="w-4 h-4" />
                                  </span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Selected Texture Info */}
                  <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
                    <div className="flex items-start gap-3">
                      <Info className="text-blue-600 flex-shrink-0 mt-1" size={22} />
                      <div className="flex-1">
                        <p className="text-sm text-blue-900 leading-relaxed">
                          {selectedTextureDetails?.description ||
                            'Once you pick a texture, we will hold your place in the schedule and a consultant will confirm the exact finish.'}
                        </p>
                        <p className="text-sm font-bold text-blue-900 mt-3">
                          ₹{TEXTURE_PRICE_PER_SQFT}/sqft (complete solution)
                        </p>
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
                              <img src={results.product.image} alt={results.product.name} className="w-12 h-12 object-contain" />
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
                        onClick={handleBuyNow}
                        className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <ShoppingCart size={18} />
                        Buy Now
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
          className="mt-8 rounded-2xl px-5 py-6 text-white"
          style={{
            background: 'linear-gradient(135deg, #1A0B21 0%, #432553 55%, #5B2F7A 100%)'
          }}
        >
          <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-6 text-center md:text-left">
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 flex-1">
              <div className="w-14 h-14 bg-white/15 rounded-full flex items-center justify-center backdrop-blur-sm">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-lg md:text-xl font-semibold leading-tight text-white/95">
                Book a site visit for ₹{BOOKING_AMOUNT} and get precise estimates for your painting project.
              </p>
            </div>
            <button
              onClick={handleBookNow}
              className="w-full md:w-auto bg-white text-[#432553] px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg"
            >
              Book Site Visit
            </button>
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

      {/* Color Selector Modal */}
      <ColorSelectorModal
        isOpen={showColorModal}
        onClose={() => setShowColorModal(false)}
        onColorSelect={handleColorSelect}
        productInfo={results ? {
          name: results.product?.name,
          totalCost: results.totalCost
        } : null}
      />

      {/* Cart Popup */}
      <CartPopup
        isVisible={cartPopup.isVisible}
        onClose={closeCartPopup}
        item={cartPopup.item}
        onContinueShopping={handleContinueShopping}
        onCheckout={handleCheckout}
      />
    </div>
  );
};

export default BudgetCalculator;
