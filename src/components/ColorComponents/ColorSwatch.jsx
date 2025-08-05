// src/components/ColorComponents/ColorSwatch.jsx
import React, { useState } from 'react';
import { FaCopy, FaTimes, FaPlus } from 'react-icons/fa';
import { getContrastTextColor } from '../../utils/colorutils';

const ColorSwatch = ({ 
  color, 
  size = 'medium', 
  showName = true, 
  showHex = true, 
  removable = false,
  addable = false,
  onRemove,
  onAdd,
  className = ''
}) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopyHex = () => {
    navigator.clipboard.writeText(color.hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sizeClasses = {
    small: 'h-16 w-16',
    medium: 'h-24 w-24',
    large: 'h-32 w-32',
    xlarge: 'h-48 w-48'
  };



  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div 
        className={`${sizeClasses[size]} rounded-lg shadow-md flex items-center justify-center relative overflow-hidden`}
        style={{ backgroundColor: color.hex }}
      >
        {removable && (
          <button 
            onClick={() => onRemove(color.name)}
            className="absolute top-1 right-1 bg-black bg-opacity-30 text-white rounded-full p-1 hover:bg-opacity-50 transition-all"
            aria-label="Remove color"
          >
            <FaTimes className="text-xs" />
          </button>
        )}
        
        {addable && (
          <button 
            onClick={() => onAdd(color)}
            className="absolute bottom-1 right-1 bg-black bg-opacity-30 text-white rounded-full p-1 hover:bg-opacity-50 transition-all"
            aria-label="Add to comparison"
          >
            <FaPlus className="text-xs" />
          </button>
        )}
        
        {showHex && (
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-30 p-1 text-center">
            <span className="text-xs font-mono text-white">{color.hex}</span>
          </div>
        )}
      </div>
      
      {showName && (
        <div className="mt-2 text-center">
          <p className="text-sm font-medium text-gray-800 truncate max-w-full">{color.name}</p>
        </div>
      )}
      
      <button 
        onClick={handleCopyHex}
        className={`mt-1 text-xs flex items-center ${copied ? 'text-green-600' : 'text-gray-600'} hover:text-blue-600`}
      >
        <FaCopy className="mr-1" /> {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  );
};

export default ColorSwatch;