import React from 'react';

const GridMasonry = ({ images = [] }) => {
  if (!Array.isArray(images) || images.length === 0) return null;
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
        {images.map((src, idx) => (
          <img key={idx} src={src} alt={`Inspiration ${idx + 1}`} loading="lazy" className="mb-4 w-full rounded-2xl shadow-sm break-inside-avoid" />
        ))}
      </div>
    </section>
  );
};

export default GridMasonry;


