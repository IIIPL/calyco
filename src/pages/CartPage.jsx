import React from 'react';
import SEO from '../components/SEO';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { items, removeFromCart, updateQuantity, getCartTotal, goToCheckout } = useCart();
  return (
    <div className="pt-20 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
      <SEO 
        title="Cart — Calyco"
        description="Your shopping cart with Calyco paints."
        ogType="website"
      />
      <h1 className="text-3xl md:text-4xl font-bold text-[#342347]">Cart</h1>
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {items.map((it, idx) => (
            <div key={idx} className="rounded-2xl bg-white border border-[#e5e0d8] p-4 flex gap-4 items-center">
              {it.image && <img src={it.image} alt={it.name} className="w-20 h-20 object-contain" />}
              <div className="flex-1">
                <div className="font-semibold text-[#342347]">{it.name}</div>
                <div className="text-sm text-gray-600">{it.selectedSize} {it.selectedSheen}</div>
                <div className="text-sm text-gray-600">Color: {it.selectedColor?.name || 'Serene Ivory'}</div>
                <div className="flex items-center gap-2 mt-2">
                  <button className="w-8 h-8 rounded bg-gray-200" onClick={() => updateQuantity(it, Math.max(1, it.quantity - 1))}>−</button>
                  <span>{it.quantity}</span>
                  <button className="w-8 h-8 rounded bg-gray-200" onClick={() => updateQuantity(it, it.quantity + 1)}>+</button>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold">₹{(it.price || 0) * (it.quantity || 1)}</div>
                <button className="text-sm text-red-600 mt-2" onClick={() => removeFromCart(it)}>Remove</button>
              </div>
            </div>
          ))}
          {items.length === 0 && <div className="text-gray-600">Your cart is empty.</div>}
        </div>
        <div className="rounded-2xl bg-white border border-[#e5e0d8] p-4">
          <div className="font-semibold text-[#342347]">Summary</div>
          <div className="mt-2 text-sm text-gray-600">GST number can be added during checkout.</div>
          <div className="mt-4 font-bold">Total: ₹{getCartTotal()}</div>
          <button
            onClick={goToCheckout}
            className="mt-4 w-full px-4 py-3 rounded-xl bg-[#493657] text-white font-semibold hover:bg-[#5a4067] transition-colors"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;


