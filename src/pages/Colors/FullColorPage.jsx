import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { flatColors } from '../../data/flatColors';

const FullColorPage = () => {
  const { colorName } = useParams();
  const navigate = useNavigate();
  const sanitized = colorName.toLowerCase().replace(/\s+/g, '');
  const color = flatColors.find(
    c => c.name.toLowerCase().replace(/\s+/g, '') === sanitized
  );

  if (!color) {
    return (
      <div className="p-20 text-center text-gray-600">Color not found.</div>
    );
  }

  return (
    <div className="bg-[#f5f4f1] min-h-screen py-16 text-[#1a1a1a]">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-sm mb-6 flex items-center space-x-2 text-gray-600">
          <span
            onClick={() => navigate('/colors')}
            className="underline cursor-pointer hover:text-black"
          >
            Paint Colors
          </span>
          <span>›</span>
          <span className="font-medium text-[#1a1a1a]">{color.name}</span>
        </div>

        <h1 className="text-4xl font-semibold mb-2">{color.name}</h1>
        <p className="text-gray-600 mb-8">{color.description}</p>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2 rounded-lg h-64 border" style={{ backgroundColor: color.hex }}></div>
          <div className="w-full md:w-1/2 flex flex-col gap-2 text-sm">
            <div><span className="font-medium">Hex:</span> {color.hex}</div>
            <div><span className="font-medium">Color Family:</span> {color.color_family}</div>
            <div><span className="font-medium">Recommended Use:</span> {color.recommended_use}</div>
            <div><span className="font-medium">Base:</span> {color.base}</div>
            <div><span className="font-medium">Color Temperature:</span> {color.color_temperature}</div>
            <div><span className="font-medium">Tonality:</span> {color.tonality}</div>
            <div><span className="font-medium">Tone:</span> {color.tone}</div>
            <div><span className="font-medium">Opacity:</span> {color.opacity}</div>
            <div><span className="font-medium">Styling:</span> {color.styling}</div>
            <div><span className="font-medium">Rooms:</span> {color.rooms}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullColorPage;
