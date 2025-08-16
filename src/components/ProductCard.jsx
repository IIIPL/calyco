import { Link } from 'react-router-dom';
import { useState, useMemo } from 'react';
import QuickBuy from './QuickBuy';
import { products } from '../data/products';

// Small icon used on card
const CoverageIcon = () => (
  <svg className="w-5 h-5 text-[#493657] inline-block mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M4 9h16M9 4v16" /></svg>
);

// helper: find product in catalog by id OR name
const findProduct = (id, name) => {
  const key = (id || name || '').toString().toLowerCase();
  return products.find(p =>
    (p.name && p.name.toLowerCase() === key) ||
    (p.product_number && p.product_number.toLowerCase() === key) ||
    (p.url && p.url.split('/').pop()?.toLowerCase() === key)
  );
};

export default function ProductCard({
  id,
  name,
  image,
  price,
  sizes = [],        // optional: fallback sizes
  sheens = [],       // optional: fallback sheens
  areaCoverage,
}) {
  const [openQB, setOpenQB] = useState(false);

  // Prefer full product from catalog; fallback to props-derived object
  const catalogProduct = findProduct(id, name);
  const product = catalogProduct
    ? catalogProduct
    : {
        id,
        name,
        display_name: name,
        price,
        images: image ? [image] : [],
        image,
        packaging: sizes,
        finish_type_sheen: sheens,
      };

  const displaySize = (product.packaging && product.packaging[0]) || sizes[0] || '1L';

  return (
    <div className="p-0 w-full max-w-xs mx-auto flex flex-col items-start bg-transparent border-none shadow-none">
      <Link to={`/product/${product.name}`} onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="w-full flex mb-2">
        <img src={(product.images && product.images[0]) || product.image} alt={product.name} className="w-56 h-56 object-contain drop-shadow-lg ml-0 mr-auto" />
      </Link>

      <div className="mt-2 mb-1 text-[#493657] font-bold text-lg leading-tight uppercase text-left w-full break-words">
        {product.name}
      </div>

      {product.price != null && (
        <div className="text-[#493657] text-xl font-bold mb-1 w-full">
          ₹{product.price} <span className="text-xs text-[#493657] font-medium">/ {displaySize}</span>
        </div>
      )}

      {areaCoverage && (
        <div className="flex items-center text-[#493657] text-base font-medium mb-2 w-full">
          <CoverageIcon />{areaCoverage}
        </div>
      )}

      <div className="border-b border-[#e5e0d8] w-full my-2" />

      <div className="w-full flex justify-start gap-2">
        <Link 
          to={`/product/${product.name}`}
          className="mt-1 px-4 py-2 bg-[#493657] text-white text-sm rounded hover:bg-[#5a4067] transition font-semibold"
          onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
        >
          View Details
        </Link>

        <button
          type="button"
          onClick={() => setOpenQB(true)}
          className="mt-1 px-4 py-2 bg-[#F0C85A] text-[#493657] text-sm rounded hover:bg-[#e6bd52] transition font-semibold"
        >
          Buy Now
        </button>
      </div>

      <QuickBuy
        isOpen={openQB}
        onClose={() => setOpenQB(false)}
        product={product}
        sizes={product.packaging || sizes}
        sheens={product.finish_type_sheen || sheens}
      />
    </div>
  );
}
