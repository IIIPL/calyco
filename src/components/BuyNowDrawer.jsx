import React, { useState, useEffect, useRef } from 'react';
import { compatibleProducts } from '../data/compatibleProducts';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

export const BuyNowDrawer = ({ isOpen, onClose, currentColor }) => {
  // --- CHANGE: don't early-return on isOpen; keep mounted so exit animation can play
  if (!currentColor) return null;

  const {
    name = "",
    hex = "#301A44",
    description = "",
    color_family = "",
  } = currentColor || {};

  const { addToCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const drawerRef = useRef(null);

  const compatible = products
    .filter(p => compatibleProducts.includes(p.name))
    .slice(0, 5);

  useEffect(() => {
    if (!isOpen) {
      setSelectedProduct(null);
      setSelectedSize('');
      setQuantity(1);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (isOpen && drawerRef.current && !drawerRef.current.contains(e.target)) onClose();
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isOpen, onClose]);

  const canAdd = selectedProduct && selectedSize;

  const safeColor = currentColor && currentColor.hex ? currentColor : null;
  return (
    <>
      {/* --- CHANGE: backdrop always mounted; animate opacity + toggle pointer-events */}
      <div
        className={`fixed inset-0 z-40 bg-black backdrop-blur-sm transition-opacity duration-500
        ${isOpen ? 'opacity-40 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      />

      {/* --- CHANGE: keep drawer mounted; animate translate + opacity */}
      <div
        ref={drawerRef}
        aria-hidden={!isOpen}
        className={`fixed top-0 right-0 h-full w-full sm:w-[520px] lg:w-[600px] z-50
        bg-white shadow-2xl rounded-l-xl transform will-change-transform will-change-opacity
        transition-[transform,opacity] duration-500
        ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.22,0.8,0.2,1)' }} // “drawn” feel
      >
        <div className="p-6 h-full overflow-y-auto flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-[#493657]">Buy with this Color</h2>
            <button
              onClick={onClose}
              className="text-2xl font-semibold text-gray-500 hover:text-gray-800 transition-colors duration-200"
            >
              ×
            </button>
          </div>

          {/* Color Preview */}
          <div className="mb-8">
            <div
              className="h-32 rounded-xl shadow-lg border border-gray-200 transition-all duration-300 flex items-center justify-center text-gray-500"
              style={{ backgroundColor: safeColor ? safeColor.hex : '#f7f7f7' }}
            >
              {!safeColor && <span>Select a color</span>}
            </div>
            <h3 className="text-2xl mt-4 font-semibold text-[#342347]">{safeColor ? safeColor.name : 'No color selected'}</h3>
            {safeColor && <p className="text-gray-600 mt-2 leading-relaxed">{safeColor.description || ''}</p>}
          </div>

          {/* Product List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
            {compatible.map((product) => (
              <div
                key={product.name}
                onClick={() => setSelectedProduct(product)}
                className={`p-5 border rounded-xl cursor-pointer transition-all duration-300 flex flex-col hover:shadow-lg hover:border-[#493657] ${
                  selectedProduct?.name === product.name
                    ? 'border-[#493657] bg-[#f3eef8] shadow-md'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <div className="flex gap-4 items-center">
                  <img
                    src={product.images?.[0]}
                    alt={`CALYCO ${product.name} paint product`}
                    className="w-20 h-20 object-contain rounded-lg border border-gray-100"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-base text-[#342347]">{product.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">₹{product.price} / litre</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Size Selector */}
          {selectedProduct && (
            <div className="mb-6">
              <label className="block mb-3 font-medium text-[#342347]">Size</label>
              <select
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-[#342347] focus:outline-none focus:ring-2 focus:ring-[#493657] transition-all duration-200"
                value={selectedSize}
                onChange={e => setSelectedSize(e.target.value)}
              >
                <option value="">Choose a size</option>
                {selectedProduct.packaging?.map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>
          )}

          {/* Quantity Stepper */}
          {selectedProduct && (
            <div className="mb-8 flex items-center justify-between">
              <label className="font-medium text-[#342347]">Quantity</label>
              <div className="flex items-center gap-4">
                <button
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-200 ${
                    quantity <= 1 ? 'bg-gray-300 text-white' : 'bg-[#493657] text-white hover:bg-[#5a4067]'
                  }`}
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  type="button"
                >
                  −
                </button>
                <span className="w-10 text-center text-lg font-medium text-[#342347]">{quantity}</span>
                <button
                  className="w-10 h-10 rounded-xl bg-[#493657] text-white flex items-center justify-center hover:bg-[#5a4067] transition-colors duration-200"
                  onClick={() => setQuantity(q => q + 1)}
                  type="button"
                >
                  +
                </button>
              </div>
            </div>
          )}

          {/* Add to Cart */}
          <button
            disabled={!canAdd}
            onClick={() => {
              addToCart(
                selectedProduct,
                null,
                selectedSize,
                quantity,
                undefined,
                { name, hex }
              );
              onClose();
            }}
            className={`mt-auto w-full py-4 rounded-xl font-semibold transition-all duration-300 ${
              canAdd
                ? 'bg-[#493657] hover:bg-[#5a4067] text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
                : 'bg-gray-300 text-white cursor-not-allowed'
            }`}
          >
            {canAdd ? 'Add to Cart' : 'Select a product and size'}
          </button>
        </div>
      </div>
    </>
  );
};
