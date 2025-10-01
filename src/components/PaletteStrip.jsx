import React from 'react';

const PaletteStrip = ({ colors = [], onSelect }) => {
  return (
    <div className="flex gap-2 overflow-x-auto hide-scrollbar py-2" role="list" aria-label="Related shades">
      {colors.map((c) => (
        <button
          key={c.slug || c.name}
          onClick={() => onSelect && onSelect(c)}
          className="min-w-9 w-9 h-9 rounded-md border border-gray-200"
          style={{ backgroundColor: c.hex }}
          aria-label={`${c.name} ${c.hex}`}
        />
      ))}
    </div>
  );
};

export default PaletteStrip;


