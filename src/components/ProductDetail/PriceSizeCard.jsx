import React, { useState } from "react";
import { motion } from "framer-motion";

const PriceSizeCard = ({
  product,
  selectedSize,
  selectedFinish = 0,
  quantity,
  onSizeChange,
  onQuantityChange,
  onAddToCart
}) => {
  const [showEMIInfo, setShowEMIInfo] = useState(false);

  const finishName = product.finishes?.[selectedFinish]?.name || 'Low Sheen';

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const calculateSavings = (original, current) => {
    return original - current;
  };

  const getCurrentPrice = (sizeIndex) => {
    const size = product.sizes[sizeIndex];
    // If priceByFinish exists, use it; otherwise fall back to size.price
    if (size.priceByFinish && size.priceByFinish[finishName]) {
      return size.priceByFinish[finishName];
    }
    return size.price || 0;
  };

  const calculateTotal = () => {
    return getCurrentPrice(selectedSize) * quantity;
  };

  const getSizeInLitres = (sizeStr) => {
    return parseInt(sizeStr);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-grey-mist p-6 lg:p-8">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center lg:text-left">
          <h2 className="text-2xl lg:text-3xl font-bold text-charcoal-black mb-2">
            Select Size & Quantity
          </h2>
          <p className="text-grey-thunder">Choose the right amount for your project</p>
          <p className="mt-2 text-sm text-gray-600">Finish: <span className="font-semibold">{finishName}</span></p>
        </div>

        {/* Size Selector */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-charcoal-black">Select Size</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {product.sizes.map((size, index) => {
              const isSelected = selectedSize === index;
              const currentPrice = getCurrentPrice(index);
              const sizeInLitres = getSizeInLitres(size.size);
              const hasOriginalPrice = size.originalPrice && size.originalPrice > currentPrice;
              const savings = hasOriginalPrice ? calculateSavings(size.originalPrice, currentPrice) : 0;

              return (
                <motion.button
                  key={index}
                  onClick={() => onSizeChange(index)}
                  className={`relative p-4 rounded-xl border-2 transition-all duration-200 ${
                    isSelected
                      ? "border-calyco-purple bg-lilac ring-2 ring-lavender"
                      : "border-grey-mist hover:border-grey-thunder hover:bg-grey-mist"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Size Badge */}
                  <div className="text-center space-y-3">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full text-lg font-bold ${
                      isSelected ? "bg-calyco-purple text-white" : "bg-grey-mist text-grey-thunder"
                    }`}>
                      {size.size}
                    </div>

                    {/* Price */}
                    <div className="space-y-1">
                      <div className="text-2xl font-bold text-charcoal-black">
                        {formatPrice(currentPrice)}
                      </div>

                      {/* Original Price & Savings */}
                      {hasOriginalPrice && (
                        <div className="space-y-1">
                          <div className="text-sm text-grey-thunder line-through">
                            {formatPrice(size.originalPrice)}
                          </div>
                          <div className="text-sm font-medium text-sage-green">
                            Save {formatPrice(savings)}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Price per litre */}
                    <div className="text-xs text-grey-thunder">
                      {formatPrice(currentPrice / sizeInLitres)}/L
                    </div>
                  </div>

                  {/* Selected Indicator */}
                  {isSelected && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-calyco-purple rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Quantity Selector */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Quantity</h3>
          <div className="flex items-center justify-center lg:justify-start gap-4">
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => onQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              
              <span className="px-6 py-2 text-lg font-semibold text-gray-900 border-x border-gray-300">
                {quantity}
              </span>
              
              <button
                onClick={() => onQuantityChange(quantity + 1)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
            
            <span className="text-sm text-gray-600">
              {product.sizes[selectedSize].size} × {quantity}
            </span>
          </div>
        </div>

        {/* Total Price */}
        <div className="bg-gray-50 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-gray-900">Total Price</span>
            <span className="text-2xl font-bold text-gray-900">
              {formatPrice(calculateTotal())}
            </span>
          </div>
          
          {/* Savings Summary */}
          {product.sizes[selectedSize].originalPrice > product.sizes[selectedSize].price && (
            <div className="mt-2 text-sm text-green-600 font-medium">
              You save {formatPrice(calculateSavings(
                product.sizes[selectedSize].originalPrice * quantity, 
                calculateTotal()
              ))}
            </div>
          )}
        </div>

        {/* EMI & GST Info */}
        <div className="text-center lg:text-left">
          <button
            onClick={() => setShowEMIInfo(!showEMIInfo)}
            className="text-sm text-purple-600 hover:text-purple-700 font-medium underline"
          >
            EMI & GST invoice available
          </button>
          
          {showEMIInfo && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 p-3 bg-purple-50 rounded-lg text-sm text-purple-800"
            >
              <p>• EMI available on orders above ₹5,000</p>
              <p>• GST invoice provided for business customers</p>
              <p>• 0% EMI on select credit cards</p>
            </motion.div>
          )}
        </div>

        {/* Add to Cart CTA */}
        <motion.button
          onClick={onAddToCart}
          className="w-full btn-primary py-4 px-8 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Add to Cart
        </motion.button>

        {/* Mobile Sticky Note */}
        <div className="lg:hidden text-center text-sm text-gray-500">
          <p>💡 This CTA will be sticky on mobile devices</p>
        </div>
      </div>
    </div>
  );
};

export default PriceSizeCard;
