import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const StickyCTA = ({ price, size, finish, onAddToCart }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <AnimatePresence>
      {/* Mobile Sticky CTA - Hidden on desktop */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg"
      >
        <div className="px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Product Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3">
                {/* Size Badge */}
                <div className="w-12 h-12 bg-lilac rounded-full flex items-center justify-center">
                  <span className="text-lg font-bold text-calyco-purple">{size}</span>
                </div>
                
                {/* Price */}
                <div>
                  <div className="text-lg font-bold text-gray-900">
                    {formatPrice(price)}
                  </div>
                  <div className="text-xs text-gray-500">
                    {size} pack{finish ? ` • ${finish} finish` : ''}
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center gap-3">
              {/* Sample Button */}
              <button className="btn-gold px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
                ₹99 Sample
              </button>
              
              {/* Add to Cart Button */}
              <motion.button
                onClick={onAddToCart}
                className="btn-primary px-6 py-3 rounded-lg font-semibold transition-colors shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Add to Cart
              </motion.button>
            </div>
          </div>
        </div>

        {/* Safe Area for devices with home indicators */}
        <div className="h-safe-area-inset-bottom bg-white" />
      </motion.div>

      {/* Desktop Sticky CTA - Hidden on mobile */}
      <div className="hidden lg:block">
        {/* This component is only for mobile, so we return null on desktop */}
        {null}
      </div>
    </AnimatePresence>
  );
};

export default StickyCTA;
