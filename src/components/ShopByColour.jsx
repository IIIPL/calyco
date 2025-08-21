import React from 'react';

const colors = [
  { name: 'GREY MIST', hex: '#C9CCCD' },
  { name: 'GREY THUNDER', hex: '#9DA0A3' },
  { name: 'LAVENDER', hex: '#D4C8CD' },
  { name: 'LILAC', hex: '#C9BDC7' },
  { name: 'LINEN', hex: '#D3CABB' },
  { name: 'PURPLE', hex: '#776A8C' },
  { name: 'SAGE GREEN', hex: '#A8B99D' },
  { name: 'BRICK RED', hex: '#8A3F3E' },
];

const toTitle = (s) => s.toLowerCase().replace(/(^|\s)\S/g, (t) => t.toUpperCase());

const ShopByColour = () => {
  return (
    <section className="py-8 bg-white">
      <div className="w-full px-4 md:px-8 lg:px-12">
        <h2 className="text-[20px] font-bold text-[#354147] mb-4">Shop by colour</h2>

        {/* One-row horizontal slider */}
        <div className="w-full overflow-x-auto overflow-y-hidden scrollbar-hide">
          <div className="flex flex-nowrap gap-6">
            {colors.map((c) => (
              <div key={c.name} className="flex-shrink-0 w-[260px] group cursor-pointer">
                <div
                  className="w-full aspect-square rounded-2xl overflow-hidden shadow-md border border-black/5 transition-all duration-300 group-hover:shadow-lg group-hover:scale-105"
                  style={{ backgroundColor: c.hex }}
                  aria-label={c.name}
                />
                <div className="mt-2 text-sm text-[#354147]">{toTitle(c.name)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopByColour;
