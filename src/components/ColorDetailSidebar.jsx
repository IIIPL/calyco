import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartPopup from './CartPopup';

const ColorDetailSidebar = ({ 
  isOpen, 
  onClose, 
  selectedColor, 
  similarColors = [],
  onColorChange
}) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [cartPopup, setCartPopup] = useState({ isVisible: false, item: null });
  const [selectedSize, setSelectedSize] = useState('sample');
  const [quantity, setQuantity] = useState(1);
  const [showFullDisclaimer, setShowFullDisclaimer] = useState(false);
  
  if (!selectedColor) return null;

  const sizeOptions = [
    { id: 'sample', label: '8 Oz. Sample', price: 499 },
    { id: 'quart', label: '1 Quart', price: 1299 },
    { id: 'gallon', label: '1 Gallon', price: 2499 },
    { id: '5gallon', label: '5 Gallon', price: 9999 }
  ];

  const handleAddToCart = () => {
    const selectedSizeOption = sizeOptions.find(size => size.id === selectedSize);
    const totalPrice = selectedSizeOption.price * quantity;
    
    console.log(`Added ${selectedColor.name} to cart - ${selectedSizeOption.label} x${quantity}`);
    
    // Create a product object for the cart
    const productForCart = {
      id: `color-${selectedColor.name.toLowerCase().replace(/\s+/g, '-')}-${selectedSize}`,
      name: selectedColor.name,
      display_name: `${selectedColor.name} - ${selectedSizeOption.label}`,
      price: totalPrice,
      image: `data:image/svg+xml;base64,${btoa(`
        <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" fill="${selectedColor.hex}"/>
        </svg>
      `)}`
    };
    
    // Add to actual cart
    addToCart(productForCart, selectedSizeOption.label, selectedSizeOption.label, quantity, totalPrice, {
      name: selectedColor.name,
      hex: selectedColor.hex,
      size: selectedSizeOption.label
    });
    
    // Show cart popup (toast notification) first
    console.log('Setting cart popup to visible with item:', selectedColor.name);
    setCartPopup({ isVisible: true, item: {
      name: `${selectedColor.name} - ${selectedSizeOption.label}`,
      hex: selectedColor.hex,
      price: `₹${totalPrice}`,
      quantity: quantity
    }});
    
    // Auto-hide popup after 3 seconds and then close sidebar
    setTimeout(() => {
      console.log('Auto-hiding cart popup and closing sidebar');
      setCartPopup({ isVisible: false, item: null });
      onClose(); // Close sidebar after toast disappears
    }, 3000);
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prev => Math.max(1, prev - 1));
  };

  const handleSimilarColorClick = (color) => {
    // Update the selected color to show the similar color details
    // The parent component will handle updating the selectedColor state
    // We need to pass this color back to the parent
    if (onColorChange) {
      onColorChange(color);
    }
  };

  const closeCartPopup = () => {
    setCartPopup({ isVisible: false, item: null });
  };

  const handleContinueShopping = () => {
    setCartPopup({ isVisible: false, item: null });
    // Stay on current page
  };

  const handleCheckout = () => {
    setCartPopup({ isVisible: false, item: null });
    navigate('/checkout');
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={onClose}
            />
            
            {/* Sidebar */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-[#393939]">COLOR DETAIL</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <XMarkIcon className="w-6 h-6 text-gray-600" />
                </button>
              </div>

              {/* Color Swatch */}
              <div className="p-6">
                <div
                  className="w-full h-32 rounded-lg shadow-md mb-6"
                  style={{ backgroundColor: selectedColor.hex }}
                />
                
                {/* Color Info */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-[#393939] mb-2">
                    {selectedColor.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg text-gray-600 font-mono tracking-tight">
                      {selectedColor.code}
                    </span>
                    <div className="w-6 h-6 bg-[#F0C85A] rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-white">C</span>
                    </div>
                  </div>
                  
                  {/* Color Values */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-sm text-gray-500">LRV</div>
                      <div className="font-semibold text-[#393939]">45</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-500">R</div>
                      <div className="font-semibold text-[#393939]">180</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-500">G</div>
                      <div className="font-semibold text-[#393939]">165</div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <p className="text-gray-700 leading-relaxed">
                    {selectedColor.description || 
                      `A beautiful ${selectedColor.name.toLowerCase()} color that brings warmth and character to any space. Perfect for creating a cozy and inviting atmosphere.`}
                  </p>
                </div>

                {/* Disclaimer */}
                <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-sm text-amber-800 leading-relaxed">
                    <strong>Before finalising any shade or pattern,</strong> we strongly recommend ordering a Calyco Swatch (30 cm × 30 cm) of the actual painted surface.
                  </p>
                  
                  {showFullDisclaimer && (
                    <div className="mt-2">
                      <p className="text-sm text-amber-800 leading-relaxed">
                        Each swatch is peel-and-stick, so you can place it directly on your wall and see how the colour looks under different lighting conditions. Actual shade appearance may vary depending on surface preparation, lighting, and application method.
                      </p>
                    </div>
                  )}
                  
                  <button 
                    onClick={() => setShowFullDisclaimer(!showFullDisclaimer)}
                    className="text-sm text-amber-700 hover:text-amber-800 underline mt-2 font-medium"
                  >
                    {showFullDisclaimer ? 'Show Less' : 'Learn More'}
                  </button>
                </div>

                {/* Size Selection */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">SELECT SIZE</h4>
                    <button className="text-xs text-blue-600 hover:text-blue-700 underline">
                      How Much Paint Do I Need?
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {sizeOptions.map((size) => (
                      <button
                        key={size.id}
                        onClick={() => setSelectedSize(size.id)}
                        className={`p-3 rounded-lg border-2 transition-all text-left ${
                          selectedSize === size.id
                            ? 'border-[#1a1a2e] bg-gray-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="mb-1">
                          <span className="text-sm font-medium text-gray-900">{size.label}</span>
                        </div>
                        <div className="text-xs text-gray-600">₹{size.price}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity Selection */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">QTY</h4>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={decrementQuantity}
                      className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-lg font-medium text-gray-600">-</span>
                    </button>
                    <div className="w-16 h-10 rounded-lg border border-gray-300 flex items-center justify-center">
                      <span className="text-lg font-medium text-gray-900">{quantity}</span>
                    </div>
                    <button
                      onClick={incrementQuantity}
                      className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-lg font-medium text-gray-600">+</span>
                    </button>
                  </div>
                </div>

                {/* Action Button */}
                <div className="mb-6">
                  <button 
                    onClick={handleAddToCart}
                    className="w-full flex items-center justify-center gap-2 bg-[#1a1a2e] text-white font-semibold py-3 px-4 rounded-lg hover:bg-[#16213e] transition-colors border border-[#1a1a2e] hover:border-[#16213e]"
                  >
                    <ShoppingCartIcon className="w-5 h-5" />
                    Add to Cart - ₹{sizeOptions.find(size => size.id === selectedSize).price * quantity}
                  </button>
                </div>
              </div>

              {/* Similar Colors */}
              {similarColors.length > 0 && (
                <div className="p-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-[#393939] mb-4">SIMILAR COLORS</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {similarColors.map((color, index) => (
                      <button
                        key={index}
                        onClick={() => handleSimilarColorClick(color)}
                        className="text-center group hover:scale-105 transition-transform"
                      >
                        <div
                          className="w-full h-16 rounded-md shadow-sm border border-gray-200 mb-2 cursor-pointer hover:ring-2 hover:ring-[#F0C85A] transition-all"
                          style={{ backgroundColor: color.hex }}
                        />
                        <div className="text-xs font-semibold text-[#393939] truncate group-hover:text-[#F0C85A]">
                          {color.name}
                        </div>
                        <div className="text-xs text-gray-500 font-mono tracking-tight">{color.code}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      {/* Cart Popup (Toast Notification) - Outside AnimatePresence */}
      <CartPopup
        isVisible={cartPopup.isVisible}
        onClose={closeCartPopup}
        item={cartPopup.item}
        onContinueShopping={handleContinueShopping}
        onCheckout={handleCheckout}
      />
    </>
  );
};

export default ColorDetailSidebar;
