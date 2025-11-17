import React, { useMemo, useState } from 'react';
import SEO from '../components/SEO';
import { products } from '../data/products';
import DownloadCard from '../components/DownloadCard';

const DownloadsPage = () => {
  const [q, setQ] = useState('');
  const list = useMemo(() => {
    const query = (q || '').toLowerCase();
    return products.filter(p => (p.display_name || p.name || '').toLowerCase().includes(query));
  }, [q]);

  return (
    <div className="pt-20 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
      <SEO 
        title="Downloads — Calyco"
        description="Technical data sheets, safety data sheets, and warranties."
        ogType="website"
      />
      <h1 className="text-3xl md:text-4xl font-bold text-[#342347]">Downloads</h1>
      <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search products" className="mt-4 w-full max-w-md px-3 py-2 rounded-lg border border-gray-300" />

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {list.map(p => (
          <div key={p.name} className="rounded-2xl border border-[#e5e0d8] p-4 bg-white">
            <div className="flex items-center gap-4">
              <img src={p.images?.[0] || p.image} alt={p.display_name || p.name} className="w-20 h-20 object-contain" loading="lazy" />
              <div className="flex-1">
                <h3 className="font-semibold text-[#342347]">{p.display_name || p.name}</h3>
                <DownloadCard docs={p.docs || {}} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DownloadsPage;


