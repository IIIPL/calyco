import React from 'react';
import { useNavigate } from 'react-router-dom';

const ColorTile = ({ color }) => {
  const navigate = useNavigate();
  if (!color) return null;
  return (
    <button
      onClick={() => navigate(`/colors/${color.slug || color.name?.toLowerCase().replace(/\s+/g, '-')}`)}
      className="group relative aspect-square w-full rounded-2xl overflow-hidden border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F0C85A]"
      aria-label={`${color.name} ${color.hex}`}
    >
      <div className="absolute inset-0" style={{ backgroundColor: color.hex }} />
      <div className="absolute inset-x-0 bottom-0 p-3 bg-black/0 group-hover:bg-black/30 transition">
        <p className="text-white/0 group-hover:text-white text-sm font-medium">{color.name}</p>
        <p className="text-white/0 group-hover:text-white/80 text-xs">{color.hex}</p>
      </div>
    </button>
  );
};

export default ColorTile;


