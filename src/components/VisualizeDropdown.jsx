// src/components/VisualizeDropdown.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const VisualizeDropdown = ({ onSelect, isMobile }) => {
  const visualizationTools = [
    { name: 'Color Visualization', path: '/visualization', description: 'Explore color harmonies and combinations' },
    { name: 'Room Visualizer', path: '/room-visualization', description: 'Visualize colors in your room with sample photos' }
  ];

  if (isMobile) {
    return (
      <div className="w-full">
        <div className="flex flex-col gap-2 w-full">
          {visualizationTools.map((tool) => (
            <Link
              key={tool.path}
              to={tool.path}
              className="text-[#493657] hover:text-[#F0C85A] w-full text-left py-2 px-4 rounded-lg hover:bg-[#f0f0f0] transition-colors"
              onClick={onSelect}
            >
              <div className="font-medium">{tool.name}</div>
              <div className="text-sm text-gray-600">{tool.description}</div>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-80 bg-white shadow-lg rounded-lg overflow-hidden z-50">
      <div className="p-4">
        <h3 className="font-bold text-lg text-[#493657] mb-3">Visualization Tools</h3>
        <div className="space-y-3">
          {visualizationTools.map((tool) => (
            <Link
              key={tool.path}
              to={tool.path}
              className="block p-3 rounded-lg hover:bg-[#f9f6f2] transition-colors"
              onClick={onSelect}
            >
              <div className="font-medium text-[#493657]">{tool.name}</div>
              <div className="text-sm text-gray-600">{tool.description}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VisualizeDropdown;