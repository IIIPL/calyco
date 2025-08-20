import React from 'react';
import { useNavigate } from 'react-router-dom';

const BucketCard = ({ product }) => {
  const navigate = useNavigate();
  if (!product) return null;
  const features = (product.features || []).slice(0, 3);
  return (
    <div className="rounded-2xl border border-[#e5e0d8] bg-white p-4 hover:shadow-lg transition">
      <button onClick={() => navigate(`/product/${(product.name || '').toLowerCase()}`)} className="w-full">
        <img src={product.images?.[0] || product.image} alt={product.display_name || product.name} loading="lazy" className="w-full h-48 object-contain" />
      </button>
      <div className="mt-4">
        <h3 className="font-semibold text-[#342347]">{product.display_name || product.name}</h3>
        <ul className="mt-2 text-sm text-gray-600 space-y-1">
          {features.map((f, i) => <li key={i}>• {f}</li>)}
        </ul>
        <button onClick={() => navigate(`/product/${(product.name || '').toLowerCase()}`)} className="mt-3 w-full px-4 py-2 rounded-lg bg-[#493657] text-white font-medium hover:bg-[#5a4067]">View</button>
      </div>
    </div>
  );
};

export default BucketCard;


