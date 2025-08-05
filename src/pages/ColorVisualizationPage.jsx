// src/pages/ColorVisualizationPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useColors } from '../context/ColorContext';
import { useColorVisualization } from '../context/ColorVisualizationContext.jsx';
import ColorSwatch from '../components/ColorComponents/ColorSwatch';
import ColorPalette from '../components/ColorComponents/ColorPalette';
import ColorComparison from '../components/ColorComponents/ColorComparison';
import { FaSearch, FaRandom, FaEye, FaPlus } from 'react-icons/fa';

const ColorVisualizationPage = () => {
  const navigate = useNavigate();
  const { allColors, getColorByName } = useColors();
  const { 
    selectedColor, 
    harmonyType, 
    comparisonColors,
    selectColor, 
    changeHarmonyType,
    addToComparison,
    removeFromComparison 
  } = useColorVisualization();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredColors, setFilteredColors] = useState([]);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredColors([]);
    } else {
      const term = searchTerm.toLowerCase();
      const results = allColors.filter(color => 
        color.name.toLowerCase().includes(term) || 
        color.description.toLowerCase().includes(term)
      );
      setFilteredColors(results.slice(0, 10));
    }
  }, [searchTerm, allColors]);

  const handleColorSelect = (colorName) => {
    const color = getColorByName(colorName);
    if (color) {
      selectColor(color);
      setSearchTerm('');
      setFilteredColors([]);
    }
  };

  const handleRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * allColors.length);
    selectColor(allColors[randomIndex]);
  };

  const handleViewDetails = (color) => {
    navigate(`/colors/family/${color.color_family.replace(/\s+/g, "-").toLowerCase()}/${encodeURIComponent(color.name)}`);
  };

  return (
    <div className="min-h-screen bg-white mt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Color Visualization</h1>
          <p className="text-gray-600">Explore colors, create palettes, and compare colors</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Color Selection */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Select a Color</h2>
              
              <div className="relative mb-4">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search colors..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <button
                onClick={handleRandomColor}
                className="w-full flex items-center justify-center py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md transition-colors mb-4"
              >
                <FaRandom className="mr-2" /> Random Color
              </button>
              
              {filteredColors.length > 0 && (
                <div className="mt-4 max-h-60 overflow-y-auto">
                  <h3 className="font-medium text-gray-700 mb-2">Search Results:</h3>
                  <div className="space-y-2">
                    {filteredColors.map((color) => (
                      <div 
                        key={color.name} 
                        className="flex items-center p-2 hover:bg-gray-50 rounded-md cursor-pointer"
                        onClick={() => handleColorSelect(color.name)}
                      >
                        <div 
                          className="h-8 w-8 rounded-md mr-3" 
                          style={{ backgroundColor: color.hex }}
                        ></div>
                        <span className="text-sm text-gray-800">{color.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <ColorComparison />
          </div>
          
          {/* Middle Column - Color Display */}
          <div className="lg:col-span-2">
            {selectedColor ? (
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/2">
                    <div 
                      className="h-64 w-full rounded-lg flex items-center justify-center relative"
                      style={{ backgroundColor: selectedColor.hex }}
                    >
                      <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-md">
                        {selectedColor.name}
                      </div>
                    </div>
                    
                    <div className="mt-4 flex justify-center space-x-3">
                      <button
                        onClick={() => addToComparison(selectedColor)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
                      >
                        <FaPlus className="mr-2" /> Add to Comparison
                      </button>
                      <button
                        onClick={() => handleViewDetails(selectedColor)}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors flex items-center"
                      >
                        <FaEye className="mr-2" /> View Details
                      </button>
                    </div>
                  </div>
                  
                  <div className="md:w-1/2">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedColor.name}</h2>
                    <p className="text-gray-600 mb-4">{selectedColor.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex">
                        <span className="font-medium w-32 text-gray-700">Hex Code:</span>
                        <span className="text-gray-600">{selectedColor.hex}</span>
                      </div>
                      <div className="flex">
                        <span className="font-medium w-32 text-gray-700">Color Family:</span>
                        <span className="text-gray-600">{selectedColor.color_family}</span>
                      </div>
                      <div className="flex">
                        <span className="font-medium w-32 text-gray-700">Temperature:</span>
                        <span className="text-gray-600">{selectedColor.color_temperature}</span>
                      </div>
                      <div className="flex">
                        <span className="font-medium w-32 text-gray-700">Recommended For:</span>
                        <span className="text-gray-600">{selectedColor.recommended_use}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {['complementary', 'analogous', 'triadic'].map(type => (
                      <button
                        key={type}
                        onClick={() => changeHarmonyType(type)}
                        className={`px-3 py-1 rounded-md transition-colors text-sm ${
                          harmonyType === type 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                        }`}
                      >
                        {type.replace(/([A-Z])/g, ' $1').trim()}
                      </button>
                    ))}
                  </div>
                  
                  <ColorPalette baseColor={selectedColor} paletteType={harmonyType} />
                </div>
              </div>
            ) : (
              <div className="bg-white p-12 rounded-lg shadow-md text-center">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Select a Color to Visualize</h2>
                <p className="text-gray-600 mb-6">Search for a color or generate a random color to get started</p>
                <button
                  onClick={handleRandomColor}
                  className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center mx-auto"
                >
                  <FaRandom className="mr-2" /> Random Color
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorVisualizationPage;