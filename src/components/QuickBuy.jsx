import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

const QuickBuy = ({ product, selectedColor }) => {
  const { addToCart } = useCart();
  const [size, setSize] = useState(product?.packaging?.[0] || '1L');
  const [qty, setQty] = useState(1);

  if (!product) return null;

  return (
    <div className="rounded-2xl border border-[#e5e0d8] p-4 bg-white">
      <div className="flex gap-3 items-center">
        <select value={size} onChange={(e) => setSize(e.target.value)} className="px-3 py-2 rounded-lg border border-gray-300">
          {(product.packaging || []).map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <div className="flex items-center gap-2">
          <button className={`w-8 h-8 rounded-lg ${qty <= 1 ? 'bg-gray-200 text-gray-400' : 'bg-[#493657] text-white'}`} onClick={() => setQty(q => Math.max(1, q - 1))} disabled={qty <= 1}>−</button>
          <span className="w-8 text-center">{qty}</span>
          <button className="w-8 h-8 rounded-lg bg-[#493657] text-white" onClick={() => setQty(q => q + 1)}>+</button>
        </div>
        <button
          className="ml-auto px-4 py-2 rounded-lg bg-[#F0C85A] text-[#342347] font-semibold hover:bg-[#e5ba4f]"
          onClick={() => addToCart(product, null, size, qty, undefined, selectedColor || null)}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default QuickBuy;


