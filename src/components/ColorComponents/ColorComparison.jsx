// src/components/ColorComponents/ColorComparison.jsx
import React from 'react';
import { useColorVisualization } from '../../context/ColorVisualizationContext.jsx';
import ColorSwatch from './ColorSwatch';
import { FaTrash } from 'react-icons/fa';

const ColorComparison = () => {
  const { comparisonColors, removeFromComparison, clearComparison } = useColorVisualization();

  if (comparisonColors.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Color Comparison</h2>
        <p className="text-gray-600 text-center py-8">No colors selected for comparison. Add colors from the color gallery.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Color Comparison</h2>
        <button 
          onClick={clearComparison}
          className="text-sm text-red-600 hover:text-red-800 flex items-center"
        >
          <FaTrash className="mr-1" /> Clear All
        </button>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {comparisonColors.map((color, index) => (
          <ColorSwatch 
            key={index} 
            color={color} 
            size="medium" 
            showName={true} 
            showHex={true}
            removable={true}
            onRemove={removeFromComparison}
          />
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-gray-50 rounded-md">
        <h3 className="font-medium text-gray-800 mb-2">Tips:</h3>
        <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
          <li>Compare colors side by side to see how they work together</li>
          <li>Click on a color to see its details</li>
          <li>Copy hex codes to use in your design projects</li>
        </ul>
      </div>
    </div>
  );
};

export default ColorComparison;