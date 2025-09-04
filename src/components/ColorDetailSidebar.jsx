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
  similarColors = [] 
}) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [cartPopup, setCartPopup] = useState({ isVisible: false, item: null });
  
  if (!selectedColor) return null;

  const handleAddToCart = () => {
    console.log(`Added ${selectedColor.name} to cart`);
    
    // Create a product object for the cart
    const productForCart = {
      id: `color-${selectedColor.name.toLowerCase().replace(/\s+/g, '-')}`,
      name: selectedColor.name,
      display_name: selectedColor.name,
      price: 499, // Default price for color samples
      image: `data:image/svg+xml;base64,${btoa(`
        <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" fill="${selectedColor.hex}"/>
        </svg>
      `)}`
    };
    
    // Add to actual cart
    addToCart(productForCart, 'Sample', 'Sample', 1, 499, {
      name: selectedColor.name,
      hex: selectedColor.hex
    });
    
    // Show cart popup (toast notification) first
    console.log('Setting cart popup to visible with item:', selectedColor.name);
    setCartPopup({ isVisible: true, item: {
      name: selectedColor.name,
      hex: selectedColor.hex,
      price: '₹499'
    }});
    
    // Auto-hide popup after 3 seconds and then close sidebar
    setTimeout(() => {
      console.log('Auto-hiding cart popup and closing sidebar');
      setCartPopup({ isVisible: false, item: null });
      onClose(); // Close sidebar after toast disappears
    }, 3000);
  };

  const handleSimilarColorClick = (color) => {
    // Navigate to the color's product page
    const colorSlug = color.name.toLowerCase().replace(/\s+/g, '-');
    navigate(`/colors/family/bedroom/${colorSlug}`);
    onClose(); // Close the sidebar
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
                    <span className="text-lg text-gray-600 font-mono">
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

                {/* Action Button */}
                <div className="mb-6">
                  <button 
                    onClick={handleAddToCart}
                    className="w-full flex items-center justify-center gap-2 bg-[#1a1a2e] text-white font-semibold py-3 px-4 rounded-lg hover:bg-[#16213e] transition-colors border border-[#1a1a2e] hover:border-[#16213e]"
                  >
                    <ShoppingCartIcon className="w-5 h-5" />
                    Add to Cart
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
                        <div className="text-xs text-gray-500">{color.code}</div>
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
