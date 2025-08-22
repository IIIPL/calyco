import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calculator, ShoppingCart, Settings, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';

const CoverageCalculator = () => {
  const { addToCart } = useCart();
  
  // Form state
  const [formData, setFormData] = useState({
    roomType: 'bedroom',
    width: '',
    length: '',
    height: '',
    paintSurface: 'both',
    doors: 0,
    windows: 0,
    customOpenings: 0,
    coats: 2,
    productId: '',
    finishTone: 'mid',
    wastagePct: 10
  });

  const [showAdvanced, setShowAdvanced] = useState(false);
  const [results, setResults] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // Room type options
  const roomTypes = [
    { value: 'bedroom', label: 'Bedroom' },
    { value: 'living', label: 'Living Room' },
    { value: 'kitchen', label: 'Kitchen' },
    { value: 'bath', label: 'Bathroom' },
    { value: 'exterior', label: 'Exterior Wall' },
    { value: 'ceiling', label: 'Ceiling Only' },
    { value: 'custom', label: 'Custom' }
  ];

  // Paint surface options
  const paintSurfaces = [
    { value: 'walls', label: 'Walls' },
    { value: 'ceiling', label: 'Ceiling' },
    { value: 'both', label: 'Both' }
  ];

  // Finish tone options
  const finishTones = [
    { value: 'light', label: 'Light' },
    { value: 'mid', label: 'Mid' },
    { value: 'dark', label: 'Dark' }
  ];

  // Get recommended products based on room type
  const recommendedProducts = useMemo(() => {
    const roomTypeMap = {
      bedroom: ['Nova', 'SilkTouch'],
      living: ['Nova', 'SilkTouch'],
      kitchen: ['WallArmor', 'DampShield'],
      bath: ['WallArmor', 'DampShield'],
      exterior: ['CalmXterior', 'RegalXterior'],
      ceiling: ['PureTone', 'InteriorFlat'],
      custom: ['Nova', 'SilkTouch']
    };
    
    const recommended = roomTypeMap[formData.roomType] || ['Nova'];
    return products.filter(p => recommended.includes(p.name));
  }, [formData.roomType]);

  // Set default product when room type changes
  useEffect(() => {
    if (recommendedProducts.length > 0 && !formData.productId) {
      setFormData(prev => ({ ...prev, productId: recommendedProducts[0].id }));
    }
  }, [recommendedProducts, formData.productId]);

  // Get selected product
  const selectedProduct = useMemo(() => {
    return products.find(p => p.id === formData.productId) || recommendedProducts[0];
  }, [formData.productId, recommendedProducts]);

  // Calculate coverage and costs
  const calculateCoverage = () => {
    if (!selectedProduct || !formData.width || !formData.length || !formData.height) {
      return null;
    }

    const W = parseFloat(formData.width);
    const L = parseFloat(formData.length);
    const H = parseFloat(formData.height);
    const doors = parseInt(formData.doors) || 0;
    const windows = parseInt(formData.windows) || 0;
    const customOpenings = parseFloat(formData.customOpenings) || 0;

    // Calculate areas
    const A_walls = 2 * (W + L) * H;
    const A_ceiling = W * L;
    const A_openings = doors * 1.89 + windows * 1.44 + customOpenings;

    // Total paintable area
    let A_total = 0;
    if (formData.paintSurface === 'walls' || formData.paintSurface === 'both') {
      A_total += A_walls;
    }
    if (formData.paintSurface === 'ceiling' || formData.paintSurface === 'both') {
      A_total += A_ceiling;
    }
    A_total = Math.max(A_total - A_openings, 0);

    // Apply coats
    const A_coated = A_total * formData.coats;

    // Coverage calculation
    const toneFactor = formData.finishTone === 'dark' ? 0.9 : formData.finishTone === 'light' ? 1.1 : 1.0;
    const coverage = toneFactor * selectedProduct.coverage.max_m2_per_l;
    
    // Litres needed
    const L_raw = A_coated / coverage;
    const L_with_wastage = L_raw * (1 + formData.wastagePct / 100);

    return {
      area: A_total,
      areaCoated: A_coated,
      litresRaw: L_raw,
      litresWithWastage: L_with_wastage,
      coverage: coverage
    };
  };

  // Optimize pack selection
  const optimizePacks = (litres) => {
    if (!selectedProduct || !selectedProduct.price.packs) return null;

    const packs = [...selectedProduct.price.packs].sort((a, b) => b.size_l - a.size_l);
    let remaining = litres;
    const selection = [];

    // Fill with largest packs first
    for (const pack of packs) {
      const qty = Math.floor(remaining / pack.size_l);
      if (qty > 0) {
        selection.push({ ...pack, qty });
        remaining -= qty * pack.size_l;
      }
    }

    // Add smallest pack if there's remaining
    if (remaining > 0 && packs.length > 0) {
      const smallestPack = packs[packs.length - 1];
      const existing = selection.find(s => s.size_l === smallestPack.size_l);
      if (existing) {
        existing.qty += 1;
      } else {
        selection.push({ ...smallestPack, qty: 1 });
      }
      remaining = 0;
    }

    const totalLitres = selection.reduce((sum, pack) => sum + pack.size_l * pack.qty, 0);
    const totalCost = selection.reduce((sum, pack) => sum + pack.mrp * pack.qty, 0);

    return { selection, totalLitres, totalCost };
  };

  // Handle form submission
  const handleCalculate = () => {
    setIsCalculating(true);
    
    setTimeout(() => {
      const coverage = calculateCoverage();
      if (coverage) {
        const packs = optimizePacks(coverage.litresWithWastage);
        setResults({ ...coverage, ...packs });
      }
      setIsCalculating(false);
    }, 500);
  };

  // Handle add to cart
  const handleAddToCart = () => {
    if (!results || !results.selection) return;

    results.selection.forEach(pack => {
      addToCart(
        selectedProduct,
        `${pack.size_l}L`,
        `${pack.size_l}L`,
        pack.qty,
        pack.mrp,
        { size: pack.size_l, coverage: results.coverage }
      );
    });
  };

  // Calculate VOC savings
  const calculateVOCSavings = () => {
    if (!results || !selectedProduct) return null;
    
    const conventionalVOC = 150; // g/L assumption
    const savedVOC = (conventionalVOC - selectedProduct.voc_content_g_per_l) * results.totalLitres;
    return Math.max(savedVOC, 0);
  };

  const vocSavings = calculateVOCSavings();

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-xl font-extrabold text-white mb-2">Calculate your paint needs in seconds</h3>
        <p className="text-white/90 text-sm">Room size → coverage → litres → cost</p>
      </div>

      {/* Input Form */}
      <div className="space-y-2 mb-3">
        {/* Room Type & Dimensions */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-white mb-2">Room Type</label>
            <select
              value={formData.roomType}
              onChange={(e) => setFormData(prev => ({ ...prev, roomType: e.target.value }))}
              className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-lg text-white text-sm focus:outline-none focus:border-white/50 focus:ring-2 focus:ring-white/20"
            >
              {roomTypes.map(type => (
                <option key={type.value} value={type.value} className="bg-gray-800 text-white">
                  {type.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-2">Paint Surface</label>
            <select
              value={formData.paintSurface}
              onChange={(e) => setFormData(prev => ({ ...prev, paintSurface: e.target.value }))}
              className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-lg text-white text-sm focus:outline-none focus:border-white/50 focus:ring-2 focus:ring-white/20"
            >
              {paintSurfaces.map(surface => (
                <option key={surface.value} value={surface.value} className="bg-gray-800 text-white">
                  {surface.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Dimensions */}
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-sm font-medium text-white mb-2">Width (m)</label>
            <input
              type="number"
              step="0.1"
              value={formData.width}
              onChange={(e) => setFormData(prev => ({ ...prev, width: e.target.value }))}
              className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-lg text-white text-sm focus:outline-none focus:border-white/50 focus:ring-2 focus:ring-white/20"
              placeholder="0.0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-2">Length (m)</label>
            <input
              type="number"
              step="0.1"
              value={formData.length}
              onChange={(e) => setFormData(prev => ({ ...prev, length: e.target.value }))}
              className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-lg text-white text-sm focus:outline-none focus:border-white/50 focus:ring-2 focus:ring-white/20"
              placeholder="0.0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-2">Height (m)</label>
            <input
              type="number"
              step="0.1"
              value={formData.height}
              onChange={(e) => setFormData(prev => ({ ...prev, height: e.target.value }))}
              className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-lg text-white text-sm focus:outline-none focus:border-white/50 focus:ring-2 focus:ring-white/20"
              placeholder="0.0"
            />
          </div>
        </div>

        {/* Openings */}
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-sm font-medium text-white mb-2">Doors</label>
            <input
              type="number"
              min="0"
              value={formData.doors}
              onChange={(e) => setFormData(prev => ({ ...prev, doors: e.target.value }))}
              className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-lg text-white text-sm focus:outline-none focus:border-white/50 focus:ring-2 focus:ring-white/20"
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-2">Windows</label>
            <input
              type="number"
              min="0"
              value={formData.windows}
              onChange={(e) => setFormData(prev => ({ ...prev, windows: e.target.value }))}
              className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-lg text-white text-sm focus:outline-none focus:border-white/50 focus:ring-2 focus:ring-white/20"
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-2">Custom (m²)</label>
            <input
              type="number"
              step="0.1"
              min="0"
              value={formData.customOpenings}
              onChange={(e) => setFormData(prev => ({ ...prev, customOpenings: e.target.value }))}
              className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-lg text-white text-sm focus:outline-none focus:border-white/50 focus:ring-2 focus:ring-white/20"
              placeholder="0.0"
            />
          </div>
        </div>

        {/* Product & Settings */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-white mb-2">Product</label>
            <select
              value={formData.productId}
              onChange={(e) => setFormData(prev => ({ ...prev, productId: e.target.value }))}
              className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-lg text-white text-sm focus:outline-none focus:border-white/50 focus:ring-2 focus:ring-white/20"
            >
              {recommendedProducts.map(product => (
                <option key={product.id} value={product.id} className="bg-gray-800 text-white">
                  {product.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-2">Finish Tone</label>
            <select
              value={formData.finishTone}
              onChange={(e) => setFormData(prev => ({ ...prev, finishTone: e.target.value }))}
              className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-lg text-white text-sm focus:outline-none focus:border-white/50 focus:ring-2 focus:ring-white/20"
            >
              {finishTones.map(tone => (
                <option key={tone.value} value={tone.value} className="bg-gray-800 text-white">
                  {tone.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Coats */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">Coats</label>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, coats: 1 }))}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                formData.coats === 1 
                  ? 'bg-white text-gray-900 shadow-lg' 
                  : 'bg-white/10 text-white border border-white/30 hover:bg-white/20 hover:border-white/50'
              }`}
            >
              1 Coat
            </button>
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, coats: 2 }))}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                formData.coats === 2 
                  ? 'bg-white text-gray-900 shadow-lg' 
                  : 'bg-white/10 text-white border border-white/30 hover:bg-white/20 hover:border-white/50'
              }`}
            >
              2 Coats
            </button>
          </div>
        </div>

        {/* Advanced Settings */}
        <div>
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-2 text-sm text-white/70 hover:text-white/90 transition-colors font-medium"
          >
            <Settings size={14} />
            Advanced settings
            <ChevronDown size={14} className={`transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
          </button>
          
          {showAdvanced && (
            <div className="mt-3 p-3 bg-white/10 rounded-lg border border-white/20">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Wastage %</label>
                <input
                  type="number"
                  min="0"
                  max="50"
                  value={formData.wastagePct}
                  onChange={(e) => setFormData(prev => ({ ...prev, wastagePct: parseFloat(e.target.value) || 0 }))}
                  className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-lg text-white text-sm focus:outline-none focus:border-white/50 focus:ring-2 focus:ring-white/20"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Button */}
      <div className="mb-4">
        <button
          onClick={handleCalculate}
          disabled={!formData.width || !formData.length || !formData.height || isCalculating}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-900 text-base font-semibold rounded-lg hover:bg-gray-100 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
        >
          <Calculator size={18} />
          {isCalculating ? 'Calculating...' : 'Calculate'}
        </button>
      </div>

      {/* Results */}
      {results && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 rounded-lg p-4 border border-white/20 space-y-4"
        >
          {/* Area & Product */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-white/70 mb-1">Required Area</p>
              <p className="text-lg font-bold text-white">{results.area.toFixed(1)} m²</p>
            </div>
            <div>
              <p className="text-sm text-white/70 mb-1">Product</p>
              <p className="text-lg font-bold text-white">{selectedProduct?.name}</p>
            </div>
          </div>

          {/* Litres & Coverage */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-white/70 mb-1">Litres Needed</p>
              <p className="text-lg font-bold text-white">{results.litresWithWastage.toFixed(1)} L</p>
            </div>
            <div>
              <p className="text-sm text-white/70 mb-1">Coverage</p>
              <p className="text-lg font-bold text-white">{results.coverage.toFixed(1)} m²/L</p>
            </div>
          </div>

          {/* Pack Breakdown */}
          {results.selection && (
            <div>
              <p className="text-sm text-white/70 mb-2">Pack Breakdown</p>
              <div className="space-y-1">
                {results.selection.map((pack, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-white font-medium">{pack.qty} × {pack.size_l}L</span>
                    <span className="text-white/90">₹{pack.mrp}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Cost */}
          {results.totalCost && (
            <div className="border-t border-white/30 pt-3">
              <div className="flex justify-between items-center">
                <span className="text-base font-semibold text-white">Total Cost</span>
                <span className="text-2xl font-bold text-white">₹{results.totalCost.toFixed(0)}</span>
              </div>
            </div>
          )}

          {/* VOC Savings */}
          {vocSavings && vocSavings > 0 && (
            <div className="bg-green-500/20 border border-green-500/40 rounded-lg p-3">
              <p className="text-sm text-green-300 font-medium">
                ~{vocSavings > 1000 ? `${(vocSavings/1000).toFixed(1)} kg` : `${vocSavings.toFixed(0)} g`} VOC avoided vs conventional
              </p>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default CoverageCalculator;
