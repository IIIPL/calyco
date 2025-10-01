import React from 'react';

const EcoStats = () => {
  const items = [
    { label: 'Low VOC', desc: 'Cleaner indoor air', icon: '🫧' },
    { label: 'Water-based', desc: 'Easy cleanup', icon: '💧' },
    { label: 'Safe for Kids', desc: 'Family-first', icon: '🧒' },
  ];

  return (
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((it) => (
          <div key={it.label} className="rounded-2xl border border-gray-200 p-6 flex items-start gap-4">
            <span aria-hidden className="text-2xl">{it.icon}</span>
            <div>
              <p className="font-semibold text-[#342347]">{it.label}</p>
              <p className="text-sm text-gray-600">{it.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EcoStats;


