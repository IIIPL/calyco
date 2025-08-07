import React, { useState, useEffect, useRef } from 'react';
import { compatibleProducts } from '../data/compatibleProducts';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

export const BuyNowDrawer = ({ isOpen, onClose, currentColor }) => {
  const { addToCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const drawerRef = useRef(null);

  // Filter compatible products
  const compatible = products.filter(p =>
    compatibleProducts.includes(p.name)
  ).slice(0, 5);

  // Reset size and quantity when product changes or drawer closes
  useEffect(() => {
    setSelectedSize('');
    setQuantity(1);
  }, [selectedProduct, isOpen]);

  // Close when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (isOpen && drawerRef.current && !drawerRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isOpen, onClose]);

  // Only enable Add to Cart if product and size are selected
  const canAdd = selectedProduct && selectedSize;

  return (
    <>
      {/* Overlay with blur */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-40 transition-opacity duration-300" />
      )}

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={`fixed top-0 right-0 h-full w-full sm:w-[520px] bg-white z-50 shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6 h-full overflow-y-auto flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-[#493657]">Select Product</h2>
            <button onClick={onClose} className="text-xl">✕</button>
          </div>

          {/* Color Preview */}
          <div className="mb-6">
            <div className="h-24 rounded shadow-md" style={{ backgroundColor: currentColor.hex }} />
            <h3 className="text-lg mt-2 font-semibold">{currentColor.name}</h3>
            <p className="text-sm text-gray-600">{currentColor.description}</p>
          </div>

          {/* Product List */}
          <div className="space-y-4 mb-8">
            {compatible.map((product) => (
              <div
                key={product.name}
                onClick={() => setSelectedProduct(product)}
                className={`p-4 border rounded-lg cursor-pointer transition flex gap-4 items-center ${
                  selectedProduct?.name === product.name ? 'border-[#493657] bg-[#f3eef8]' : 'border-gray-300'
                }`}
              >
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-20 h-20 object-contain rounded-md bg-gray-50"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-base">{product.name}</h4>
                  <p className="text-sm text-gray-600">₹{product.price} / litre</p>
                </div>
              </div>
            ))}
          </div>

          {/* Size Selector */}
          {selectedProduct && (
            <div className="mb-6">
              <label className="block mb-2 font-medium text-[#493657]">Select Size</label>
              <select
                className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#493657]"
                value={selectedSize}
                onChange={e => setSelectedSize(e.target.value)}
              >
                <option value="">Choose a size</option>
                {selectedProduct.packaging && selectedProduct.packaging.map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>
          )}

          {/* Quantity Stepper */}
          {selectedProduct && (
            <div className="mb-6 flex items-center gap-4">
              <label className="font-medium text-[#493657]">Quantity</label>
              <div className="flex items-center gap-2">
                <button
                  className="w-8 h-8 rounded-full bg-[#493657] text-white flex items-center justify-center disabled:bg-gray-300"
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  type="button"
                >
                  -
                </button>
                <span className="w-8 text-center">{quantity}</span>
                <button
                  className="w-8 h-8 rounded-full bg-[#493657] text-white flex items-center justify-center"
                  onClick={() => setQuantity(q => q + 1)}
                  type="button"
                >
                  +
                </button>
              </div>
            </div>
          )}

          {/* Add to Cart Button */}
          <button
            disabled={!canAdd}
            onClick={() => {
              addToCart(
                selectedProduct,
                null,
                selectedSize,
                quantity,
                undefined,
                { name: currentColor.name, hex: currentColor.hex }
              );
              onClose();
            }}
            className={`mt-auto w-full py-3 rounded-lg text-white font-semibold transition-colors duration-200 ${
              canAdd ? 'bg-[#493657] hover:bg-[#5a4067]' : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            {canAdd ? 'Add to Cart' : 'Select a product and size'}
          </button>
        </div>
      </div>
    </>
  );
};
