import React from 'react';
import SEO from '../components/SEO';
import { products } from '../data/products';
import QuickBuy from '../components/QuickBuy';

const ContractorsPage = () => {
  const shortlist = products.slice(0, 6);
  return (
    <div className="pt-20 px-6 md:px-12 max-w-7xl mx-auto">
      <SEO 
        title="Contractors — Calyco"
        description="Quick-buy for contractors and bulk reorder support."
        ogType="website"
      />
      <h1 className="text-3xl md:text-4xl font-bold text-[#342347]">Contractors</h1>
      <p className="text-gray-600 mt-2">Quick-Buy, reorder links, and margin advantage.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {shortlist.map((p) => (
          <div key={p.name} className="rounded-2xl border border-[#e5e0d8] p-4 bg-white">
            <div className="flex gap-4 items-center">
              <img src={p.images?.[0] || p.image} alt={p.display_name || p.name} className="w-24 h-24 object-contain" loading="lazy" />
              <div className="flex-1">
                <h3 className="font-semibold text-[#342347]">{p.display_name || p.name}</h3>
                <p className="text-sm text-gray-600">₹{p.price} / L</p>
                <QuickBuy product={p} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {["Better margins","Priority dispatch","Site assistance"].map(b => (
          <div key={b} className="p-4 rounded-xl bg-[#F0C85A]/20 text-[#342347] font-medium border border-[#F0C85A]/30">{b}</div>
        ))}
      </div>

      <div className="mt-10">
        <a href="/contact" className="inline-block px-6 py-3 rounded-xl bg-[#493657] text-white font-semibold hover:bg-[#5a4067]">Contact Sales</a>
      </div>
    </div>
  );
};

export default ContractorsPage;


