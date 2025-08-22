import React from 'react';
import { useNavigate } from 'react-router-dom';
import { reverseColorNameMapping } from '../data/colorNameMapping';

const colors = [
  { name: 'GREY MIST', hex: 'GM9304' },
  { name: 'GREY THUNDER', hex: 'GT9873' },
  { name: 'LAVENDER', hex: 'LV8498' },
  { name: 'LILAC', hex: 'LL9037' },
  { name: 'LINEN', hex: 'LN3788' },
  { name: 'PURPLE', hex: 'PP7768' },
  { name: 'SAGE GREEN', hex: 'SG8994' },
  { name: 'BRICK RED', hex: 'BR9307' },
];

const toTitle = (s) => s.toLowerCase().replace(/(^|\s)\S/g, (t) => t.toUpperCase());

const ShopByColour = () => {
  const navigate = useNavigate();

  // Map color names to their family routes
  const getColorFamilyRoute = (colorName) => {
    const colorToFamilyMap = {
      'GREY MIST': 'greys',
      'GREY THUNDER': 'greys',
      'LAVENDER': 'purples-&-pinks',
      'LILAC': 'purples-&-pinks',
      'LINEN': 'whites-&-off-whites',
      'PURPLE': 'purples-&-pinks',
      'SAGE GREEN': 'greens',
      'BRICK RED': 'reds-&-oranges'
    };
    
    const family = colorToFamilyMap[colorName];
    return family ? `/colors/family/${family}` : '/colors';
  };

  return (
    <section className="py-8 bg-white">
      <div className="w-full px-4 md:px-8 lg:px-12">
        <h2 className="text-[20px] font-bold text-[#354147] mb-4">Shop by colour</h2>

        {/* One-row horizontal slider */}
        <div className="w-full overflow-x-auto overflow-y-hidden scrollbar-hide">
          <div className="flex flex-nowrap gap-6">
            {colors.map((c) => (
              <div 
                key={c.name} 
                className="flex-shrink-0 w-[260px] group cursor-pointer"
                onClick={() => navigate(getColorFamilyRoute(c.name))}
              >
                <div
                  className="w-full aspect-square rounded-2xl overflow-hidden shadow-md border border-black/5 transition-all duration-300 group-hover:shadow-lg group-hover:scale-105"
                  style={{ backgroundColor: reverseColorNameMapping[c.hex] || c.hex }}
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
