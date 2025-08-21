import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ToolsAndResources = () => {
  const navigate = useNavigate();
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [calculatorData, setCalculatorData] = useState({
    mode: 'area',
    area: '',
    unit: 'sqm',
    length: '',
    width: '',
    height: '',
    doors: 1,
    windows: 2,
    coats: 2
  });
  const [result, setResult] = useState(null);
  const [errors, setErrors] = useState({});

  // Coverage constants
  const COVERAGE_PER_LITRE = 11; // sqm per litre
  const DOOR_AREA = 2.0; // m²
  const WINDOW_AREA = 1.5; // m²

  // Load saved data from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('calyco_coverage_v1');
    if (saved) {
      try {
        setCalculatorData(JSON.parse(saved));
      } catch (e) {
        console.warn('Failed to load saved calculator data');
      }
    }
  }, []);

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem('calyco_coverage_v1', JSON.stringify(calculatorData));
  }, [calculatorData]);

  const tools = [
    {
      id: 'visualizer',
      title: 'Color Visualizer',
      subtitle: 'See colours in your room.',
      cta: 'Open Visualizer',
      link: '/visualizer',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      )
    },
    {
      id: 'calculator',
      title: 'Color Calculator',
      subtitle: 'Estimate paint & packs.',
      cta: 'Calculate Coverage',
      action: () => setIsCalculatorOpen(true),
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: 'downloads',
      title: 'Download Guides',
      subtitle: 'TDS, SDS & brochures.',
      cta: 'Browse Downloads',
      link: '/downloads',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      id: 'quiz',
      title: 'Color Quiz',
      subtitle: 'Find your perfect shade.',
      cta: 'Start Quiz',
      link: '/colors/quiz',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  const validateInputs = () => {
    const newErrors = {};
    
    if (calculatorData.mode === 'area') {
      const area = parseFloat(calculatorData.area);
      if (!area || area <= 0) {
        newErrors.area = 'Please enter a valid area';
      }
    } else {
      const length = parseFloat(calculatorData.length);
      const width = parseFloat(calculatorData.width);
      const height = parseFloat(calculatorData.height);
      
      if (!length || length <= 0) newErrors.length = 'Please enter a valid length';
      if (!width || width <= 0) newErrors.width = 'Please enter a valid width';
      if (!height || height <= 0) newErrors.height = 'Please enter a valid height';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateCoverage = () => {
    if (!validateInputs()) {
      // Show toast for invalid inputs
      console.log('Please enter a valid area.');
      return;
    }

    let area = 0;
    
    if (calculatorData.mode === 'area') {
      area = parseFloat(calculatorData.area);
      if (calculatorData.unit === 'ft2') {
        area = area * 0.0929; // Convert to sqm
      }
    } else {
      const length = parseFloat(calculatorData.length);
      const width = parseFloat(calculatorData.width);
      const height = parseFloat(calculatorData.height);
      const doors = parseInt(calculatorData.doors);
      const windows = parseInt(calculatorData.windows);
      
      // Calculate wall area: (L + W) * 2 * H - (doors*doorArea + windows*windowArea)
      area = (length + width) * 2 * height - (doors * DOOR_AREA + windows * WINDOW_AREA);
    }

    if (area <= 0) {
      setResult(null);
      return;
    }

    // Calculate litres needed: (area / coverage) * coats
    const litres = (area / COVERAGE_PER_LITRE) * calculatorData.coats;
    
    // Calculate pack recommendations using greedy algorithm
    const packs = [];
    let remaining = litres;
    
    if (remaining >= 20) {
      const count20L = Math.floor(remaining / 20);
      packs.push({ size: 20, count: count20L });
      remaining -= count20L * 20;
    }
    
    if (remaining >= 5) {
      const count5L = Math.floor(remaining / 5);
      packs.push({ size: 5, count: count5L });
      remaining -= count5L * 5;
    }
    
    if (remaining > 0) {
      packs.push({ size: 1, count: Math.ceil(remaining) });
    }

    setResult({ litres: Math.round(litres * 10) / 10, packs });
  };

  const addToCart = () => {
    // TODO: Implement cart integration
    console.log('Adding to cart:', result);
    // Show success toast
    console.log('Added recommended packs');
    setIsCalculatorOpen(false);
    setResult(null);
  };

  const resetCalculator = () => {
    setCalculatorData({
      mode: 'area',
      area: '',
      unit: 'sqm',
      length: '',
      width: '',
      height: '',
      doors: 1,
      windows: 2,
      coats: 2
    });
    setResult(null);
    setErrors({});
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <>
      <section className="py-20 bg-[#FAFAF7]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-[#1A1A1A] mb-4">
              Tools & Resources
            </h2>
            <p className="max-w-xl mx-auto text-base text-gray-600">
              Plan faster. Choose smarter. Paint without guesswork.
            </p>
          </motion.div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 relative">
            {/* Inner container shadow */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-transparent rounded-3xl pointer-events-none" />
            
            {tools.map((tool, index) => (
              <motion.article
                key={tool.id}
                custom={index}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="group relative"
                aria-labelledby={`tool-${tool.id}-title`}
              >
                <div
                  onClick={tool.action || (() => navigate(tool.link))}
                  data-analytics={`tools_${tool.id}_open`}
                  className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-[#E6E6E6] hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-[#C8A951]/30 min-h-[200px] md:min-h-[220px] flex flex-col"
                  role="button"
                  tabIndex={0}
                  aria-label={`${tool.title} - ${tool.subtitle}`}
                >
                  {/* Icon */}
                  <div className="w-14 h-14 bg-[#532E8A]/12 rounded-xl flex items-center justify-center text-[#532E8A] mb-6">
                    {tool.icon}
                  </div>

                  {/* Content */}
                  <h3 id={`tool-${tool.id}-title`} className="text-xl font-semibold text-[#1A1A1A] mb-3 leading-tight">
                    {tool.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-6 max-w-[48ch] flex-1">
                    {tool.subtitle}
                  </p>

                  {/* CTA Button */}
                  <button
                    className="bg-[#532E8A] text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-[#4A1F7A] hover:-translate-y-[1px] hover:shadow-md active:translate-y-0 transition-all duration-200 inline-flex items-center gap-2 w-fit group/btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (tool.action) {
                        tool.action();
                      } else {
                        navigate(tool.link);
                      }
                    }}
                    aria-label={`${tool.cta} - ${tool.title}`}
                  >
                    {tool.cta}
                    <span className="transition-transform duration-200 group-hover/btn:translate-x-0.5">→</span>
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator Modal */}
      <AnimatePresence>
        {isCalculatorOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setIsCalculatorOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="calculator-title"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 id="calculator-title" className="text-xl font-semibold text-[#1A1A1A]">
                  Coverage Calculator
                </h3>
                <button
                  onClick={() => setIsCalculatorOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                  aria-label="Close calculator"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Mode Toggle */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Calculation Mode</label>
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setCalculatorData({ ...calculatorData, mode: 'area' })}
                    className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                      calculatorData.mode === 'area' ? 'bg-white text-[#532E8A] shadow-sm' : 'text-gray-600'
                    }`}
                  >
                    Area
                  </button>
                  <button
                    onClick={() => setCalculatorData({ ...calculatorData, mode: 'dimensions' })}
                    className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                      calculatorData.mode === 'dimensions' ? 'bg-white text-[#532E8A] shadow-sm' : 'text-gray-600'
                    }`}
                  >
                    Room Dimensions
                  </button>
                </div>
              </div>

              {/* Input Fields */}
              {calculatorData.mode === 'area' ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Area</label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={calculatorData.area}
                        onChange={(e) => setCalculatorData({ ...calculatorData, area: e.target.value })}
                        className={`flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#532E8A] focus:border-transparent ${
                          errors.area ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter area"
                      />
                      <select
                        value={calculatorData.unit}
                        onChange={(e) => setCalculatorData({ ...calculatorData, unit: e.target.value })}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#532E8A] focus:border-transparent"
                      >
                        <option value="sqm">sqm</option>
                        <option value="ft2">ft²</option>
                      </select>
                    </div>
                    {errors.area && <p className="text-red-500 text-sm mt-1">{errors.area}</p>}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Length (m)</label>
                      <input
                        type="number"
                        value={calculatorData.length}
                        onChange={(e) => setCalculatorData({ ...calculatorData, length: e.target.value })}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#532E8A] focus:border-transparent ${
                          errors.length ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Length"
                      />
                      {errors.length && <p className="text-red-500 text-sm mt-1">{errors.length}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Width (m)</label>
                      <input
                        type="number"
                        value={calculatorData.width}
                        onChange={(e) => setCalculatorData({ ...calculatorData, width: e.target.value })}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#532E8A] focus:border-transparent ${
                          errors.width ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Width"
                      />
                      {errors.width && <p className="text-red-500 text-sm mt-1">{errors.width}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Height (m)</label>
                    <input
                      type="number"
                      value={calculatorData.height}
                      onChange={(e) => setCalculatorData({ ...calculatorData, height: e.target.value })}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#532E8A] focus:border-transparent ${
                        errors.height ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Height"
                    />
                    {errors.height && <p className="text-red-500 text-sm mt-1">{errors.height}</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Doors</label>
                      <input
                        type="number"
                        value={calculatorData.doors}
                        onChange={(e) => setCalculatorData({ ...calculatorData, doors: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#532E8A] focus:border-transparent"
                        placeholder="Number of doors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Windows</label>
                      <input
                        type="number"
                        value={calculatorData.windows}
                        onChange={(e) => setCalculatorData({ ...calculatorData, windows: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#532E8A] focus:border-transparent"
                        placeholder="Number of windows"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Coats Selection */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Number of Coats</label>
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setCalculatorData({ ...calculatorData, coats: 1 })}
                    className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                      calculatorData.coats === 1 ? 'bg-white text-[#532E8A] shadow-sm' : 'text-gray-600'
                    }`}
                  >
                    1 Coat
                  </button>
                  <button
                    onClick={() => setCalculatorData({ ...calculatorData, coats: 2 })}
                    className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                      calculatorData.coats === 2 ? 'bg-white text-[#532E8A] shadow-sm' : 'text-gray-600'
                    }`}
                  >
                    2 Coats
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={calculateCoverage}
                  className="flex-1 bg-[#532E8A] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#4A1F7A] transition-colors duration-200"
                >
                  Calculate Coverage
                </button>
                <button
                  onClick={resetCalculator}
                  className="px-4 py-3 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                  aria-label="Reset calculator"
                >
                  Reset
                </button>
              </div>

              {/* Results */}
              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-[#FAFAF7] rounded-lg"
                  aria-live="polite"
                >
                  <h4 className="font-semibold text-[#1A1A1A] mb-2">
                    You'll need ~ {result.litres} L
                  </h4>
                  {result.packs.length > 0 && (
                    <p className="text-sm text-gray-600 mb-3">
                      Recommended packs: {result.packs.map((pack, i) => 
                        `${pack.count} × ${pack.size}L${i < result.packs.length - 1 ? ' + ' : ''}`
                      ).join('')}
                    </p>
                  )}
                  <div className="space-y-2">
                    <button
                      onClick={addToCart}
                      data-analytics="tools_calculator_addpacks"
                      className="w-full bg-[#C8A951] text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-[#B89A4A] transition-colors duration-200"
                      disabled={result.packs.length === 0}
                    >
                      Add recommended packs
                    </button>
                    <button className="w-full text-[#532E8A] text-sm hover:underline transition-colors duration-200">
                      View coverage assumptions
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ToolsAndResources;
