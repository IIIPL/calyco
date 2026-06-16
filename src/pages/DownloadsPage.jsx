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
        title="Technical Downloads | Calyco"
        description="Download technical data sheets (TDS), safety data sheets (SDS), and warranty documents for Calyco paint products."
        url="https://calycopaints.com/downloads"
        ogType="website"
      />
      <h1 className="text-3xl md:text-4xl font-bold text-[#342347]">Technical Downloads</h1>
      <p className="text-gray-600 mt-2">TDS, SDS, and warranty documents for all Calyco products.</p>

      <div className="mt-6 relative max-w-md">
        <label htmlFor="downloads-search" className="sr-only">Search products</label>
        <input
          id="downloads-search"
          type="search"
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder="Search products…"
          autoComplete="off"
          className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#493657] text-sm"
        />
      </div>

      {list.length === 0 ? (
        <p className="mt-8 text-gray-500" role="status">No products match your search.</p>
      ) : (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {list.map(p => {
            const hasDocs = p.docs && Object.values(p.docs).some(Boolean);
            return (
              <div key={p.name} className="rounded-2xl border border-[#e5e0d8] p-4 bg-white">
                <div className="flex items-center gap-4">
                  <img
                    src={p.images?.[0] || p.image}
                    alt={p.display_name || p.name}
                    className="w-20 h-20 object-contain rounded flex-shrink-0"
                    loading="lazy"
                    width="80"
                    height="80"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-[#342347] truncate">{p.display_name || p.name}</h3>
                    {hasDocs ? (
                      <div className="mt-2">
                        <DownloadCard docs={p.docs || {}} />
                      </div>
                    ) : (
                      <p className="text-xs text-gray-400 mt-2">Documents available on request</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-12 rounded-2xl bg-[#493657]/5 border border-[#493657]/10 p-6">
        <h2 className="font-semibold text-[#342347]">Need a specific document?</h2>
        <p className="text-sm text-gray-600 mt-1 mb-4">
          Contact our technical team and we will send the relevant TDS, SDS, or certification within 24 hours.
        </p>
        <a
          href="/contact"
          className="inline-block px-5 py-2.5 rounded-xl bg-[#493657] text-white text-sm font-semibold hover:bg-[#5a4067] transition-colors"
        >
          Contact Technical Team
        </a>
      </div>
    </div>
  );
};

export default DownloadsPage;
