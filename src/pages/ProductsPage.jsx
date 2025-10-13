import React, { useMemo, useState } from 'react';
import SEO from '../components/SEO';
import { products } from '../data/products';
import BucketCard from '../components/BucketCard';

const FEATURED_PRODUCT_IDS = new Set(['Nova', 'ExteriorLatex']);
const FEATURED_PRODUCT_NAMES = new Set(['Stain & Sealer']);

const ProductsPage = () => {
  const [cat, setCat] = useState('');
  const [finish, setFinish] = useState('');
  const featuredProducts = useMemo(() => {
    return products.filter(
      (p) => FEATURED_PRODUCT_IDS.has(p.id) || FEATURED_PRODUCT_NAMES.has(p.name)
    );
  }, []);

  const list = useMemo(() => {
    return featuredProducts.filter(p =>
      (!cat || p.category === cat) &&
      (!finish || (p.finish_type_sheen || []).includes(finish))
    );
  }, [cat, finish, featuredProducts]);

  const filteredProducts = featuredProducts;
  
  const categories = Array.from(new Set(filteredProducts.map(p => p.category).filter(Boolean)));
  const finishes = Array.from(new Set(filteredProducts.flatMap(p => p.finish_type_sheen || [])));

  return (
    <div className="pt-20 px-6 md:px-12 max-w-7xl mx-auto">
      <SEO 
        title="Products — Calyco"
        description="Premium interior, exterior, wood, floor and industrial coatings."
        ogType="website"
      />
      <h1 className="text-3xl md:text-4xl font-bold text-[#342347]">Products</h1>

      <div className="mt-4 flex flex-wrap gap-3">
        <select value={cat} onChange={(e) => setCat(e.target.value)} className="px-3 py-2 rounded-lg border border-gray-300">
          <option value="">All Categories</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={finish} onChange={(e) => setFinish(e.target.value)} className="px-3 py-2 rounded-lg border border-gray-300">
          <option value="">All Finishes</option>
          {finishes.map(f => <option key={f} value={f}>{f}</option>)}
        </select>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6 justify-items-center">
        {list.map(p => {
          const name = String(p.name || '').toLowerCase();
          const displayName = FEATURED_PRODUCT_IDS.has(p.id) || name.includes('interior latex paint')
            ? 'Calyco Interior Latex Paint'
            : p.id === 'ExteriorLatex' || name.includes('exterior latex paint')
              ? 'Calyco Exterior Latex Paint'
              : FEATURED_PRODUCT_NAMES.has(p.name)
                ? 'Calyco Defence'
                : (p.display_name || p.name);
          return (
            <BucketCard
              key={p.id || p.name}
              product={{ ...p, display_name: displayName }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProductsPage;


