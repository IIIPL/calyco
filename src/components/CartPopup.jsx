import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartPopup = ({ isVisible, onClose, item, onContinueShopping, onCheckout }) => {
  const { getCartItemCount } = useCart();
  const cartItemCount = getCartItemCount();
  
  if (!isVisible || !item) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed top-24 right-4 z-50 w-80 bg-white rounded-lg shadow-lg border border-gray-100"
        >
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b border-gray-50">
            <h3 className="text-base font-semibold text-gray-900">Added to Cart</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1"
            >
              <X size={16} />
            </button>
          </div>

          {/* Product item */}
          <div className="p-4">
            <div className="flex items-center gap-4">
              {/* Color swatch */}
              <div 
                className="w-12 h-12 rounded-lg border border-gray-200 flex-shrink-0"
                style={{ backgroundColor: item.hex }}
              />
              
              {/* Product details */}
              <div className="flex-1 min-w-0">
                <p className="text-base font-medium text-gray-900 truncate">
                  {item.name}
                </p>
                <p className="text-sm text-gray-500">Sample</p>
                <p className="text-sm text-gray-500">Qty: 1</p>
              </div>
              
              {/* Price */}
              <div className="text-right">
                <p className="text-base font-semibold text-gray-900">{item.price}</p>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="p-4 border-t border-gray-50">
            <div className="flex items-center">
              <button
                onClick={onContinueShopping}
                className="flex-1 text-base text-gray-600 hover:text-gray-900 transition-colors font-medium text-center"
              >
                Continue Shopping
              </button>
              <div className="w-px h-5 bg-gray-200 mx-3"></div>
              <button
                onClick={onCheckout}
                className="flex-1 bg-gray-900 text-white py-3 px-4 rounded-lg text-base font-medium hover:bg-gray-800 transition-colors"
              >
                Checkout
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CartPopup;
