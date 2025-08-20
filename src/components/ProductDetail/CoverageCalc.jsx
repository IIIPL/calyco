import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const CoverageCalc = ({ 
  coveragePerLitre, 
  coatsOptions, 
  defaultCoats, 
  efficiency, 
  onCalculate, 
  onAddRecommended 
}) => {
  const [unit, setUnit] = useState("sqm"); // sqm or sqft
  const [inputs, setInputs] = useState({
    area: "",
    doors: 0,
    windows: 0,
    coats: defaultCoats,
    efficiency: efficiency
  });
  const [results, setResults] = useState(null);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Load saved values from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('coverageCalcData');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setInputs(prev => ({ ...prev, ...parsed }));
      } catch (e) {
        console.log('Could not parse saved coverage data');
      }
    }
  }, []);

  // Save values to localStorage
  useEffect(() => {
    localStorage.setItem('coverageCalcData', JSON.stringify(inputs));
  }, [inputs]);

  const handleInputChange = (field, value) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const calculateCoverage = () => {
    const area = parseFloat(inputs.area) || 0;
    const doors = inputs.doors || 0;
    const windows = inputs.windows || 0;
    const coats = inputs.coats || 1;
    const efficiency = inputs.efficiency || 0.9;

    if (area <= 0) {
      setResults(null);
      return;
    }

    // Convert area to sqm if needed
    let areaInSqm = area;
    if (unit === "sqft") {
      areaInSqm = area * 0.0929; // Convert sqft to sqm
    }

    // Add extra area for doors and windows (rough estimates)
    const doorArea = doors * 2; // 2 sqm per door
    const windowArea = windows * 1.5; // 1.5 sqm per window
    const totalArea = areaInSqm + doorArea + windowArea;

    // Calculate litres needed
    const litresNeeded = (totalArea / coveragePerLitre) * coats / efficiency;

    // Round up to nearest 0.5L
    const litresRounded = Math.ceil(litresNeeded * 2) / 2;

    setResults({
      area: areaInSqm,
      totalArea,
      litresNeeded: litresRounded,
      coats,
      efficiency
    });

    onCalculate(inputs);
  };

  const getPackRecommendation = () => {
    if (!results) return null;

    const litres = results.litresNeeded;
    
    // Simple pack recommendation logic
    if (litres <= 1) return "1 × 1L";
    if (litres <= 5) return "1 × 5L";
    if (litres <= 10) return "2 × 5L";
    if (litres <= 20) return "1 × 20L";
    if (litres <= 25) return "1 × 20L + 1 × 5L";
    if (litres <= 40) return "2 × 20L";
    
    // For larger quantities, calculate optimal combination
    const packs20L = Math.floor(litres / 20);
    const remaining = litres % 20;
    
    if (remaining === 0) {
      return `${packs20L} × 20L`;
    } else if (remaining <= 5) {
      return `${packs20L} × 20L + 1 × 5L`;
    } else if (remaining <= 10) {
      return `${packs20L} × 20L + 2 × 5L`;
    } else {
      return `${packs20L + 1} × 20L`;
    }
  };

  const formatArea = (value) => {
    if (unit === "sqft") {
      return `${value} sq ft`;
    }
    return `${value} sq m`;
  };

  const packRecommendation = getPackRecommendation();

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 lg:p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          Coverage Calculator
        </h2>
        <p className="text-lg text-gray-600">
          Estimate how much paint you'll need for your project
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Input Section */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-900">Room Dimensions</h3>
          
          {/* Unit Toggle */}
          <div className="flex items-center justify-center lg:justify-start gap-4">
            <span className="text-sm font-medium text-gray-700">Units:</span>
            <div className="bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setUnit("sqm")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  unit === "sqm"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Square Meters
              </button>
              <button
                onClick={() => setUnit("sqft")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  unit === "sqft"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Square Feet
              </button>
            </div>
          </div>

          {/* Area Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Room Area ({unit === "sqm" ? "sq m" : "sq ft"})
            </label>
            <input
              type="number"
              value={inputs.area}
              onChange={(e) => handleInputChange("area", e.target.value)}
              placeholder={unit === "sqm" ? "e.g., 25" : "e.g., 270"}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Doors & Windows */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Doors</label>
              <input
                type="number"
                value={inputs.doors}
                onChange={(e) => handleInputChange("doors", parseInt(e.target.value) || 0)}
                placeholder="0"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Windows</label>
              <input
                type="number"
                value={inputs.windows}
                onChange={(e) => handleInputChange("windows", parseInt(e.target.value) || 0)}
                placeholder="0"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Advanced Options */}
          <div className="space-y-4">
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="text-sm text-purple-600 hover:text-purple-700 font-medium"
            >
              {showAdvanced ? "Hide" : "Show"} Advanced Options
            </button>
            
            {showAdvanced && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4"
              >
                {/* Coats */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Number of Coats</label>
                  <div className="flex gap-3">
                    {coatsOptions.map((coat) => (
                      <button
                        key={coat}
                        onClick={() => handleInputChange("coats", coat)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          inputs.coats === coat
                            ? "bg-purple-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {coat} {coat === 1 ? "Coat" : "Coats"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Efficiency */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Application Efficiency: {Math.round(inputs.efficiency * 100)}%
                  </label>
                  <input
                    type="range"
                    min="0.7"
                    max="1.0"
                    step="0.05"
                    value={inputs.efficiency}
                    onChange={(e) => handleInputChange("efficiency", parseFloat(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>70% (Spray)</span>
                    <span>90% (Roller)</span>
                    <span>100% (Brush)</span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Calculate Button */}
          <motion.button
            onClick={calculateCoverage}
            disabled={!inputs.area || parseFloat(inputs.area) <= 0}
            className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Calculate Coverage
          </motion.button>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-900">Results</h3>
          
          {results ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Coverage Summary */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="text-center space-y-4">
                  <div className="text-4xl font-bold text-purple-600">
                    {results.litresNeeded}L
                  </div>
                  <p className="text-gray-600">Total paint needed</p>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Room area:</span>
                  <span className="font-medium">{formatArea(results.area)}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Total area (with doors/windows):</span>
                  <span className="font-medium">{formatArea(results.totalArea)}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Coats:</span>
                  <span className="font-medium">{results.coats}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Efficiency:</span>
                  <span className="font-medium">{Math.round(results.efficiency * 100)}%</span>
                </div>
              </div>

              {/* Pack Recommendation */}
              {packRecommendation && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Recommended Packs</h4>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 mb-2">
                      {packRecommendation}
                    </div>
                    <p className="text-sm text-green-700">
                      This will give you approximately {results.litresNeeded}L of paint
                    </p>
                  </div>
                </div>
              )}

              {/* Add Recommended CTA */}
              <motion.button
                onClick={onAddRecommended}
                className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Add Recommended Packs
              </motion.button>
            </motion.div>
          ) : (
            <div className="bg-gray-50 rounded-xl p-8 text-center">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h3m-6 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <p className="text-gray-600">
                Enter your room dimensions above to calculate paint requirements
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Tips */}
      <div className="mt-8 p-4 bg-blue-50 rounded-xl">
        <h4 className="font-semibold text-blue-800 mb-2">💡 Pro Tips</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Measure the actual wall area, not floor area</li>
          <li>• Add 10-15% extra for cutting in and touch-ups</li>
          <li>• Different surfaces may require different amounts of paint</li>
          <li>• Consider buying slightly more to ensure color consistency</li>
        </ul>
      </div>
    </div>
  );
};

export default CoverageCalc;
