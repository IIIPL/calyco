import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useCart } from "../context/CartContext";

const CartPopup = ({ isVisible, onClose, item, onContinueShopping, onCheckout }) => {
  const { getCartItemCount, items } = useCart();
  const cartItemCount = getCartItemCount();

  console.log("CartPopup props:", { isVisible, item, cartItemCount });

  if (!isVisible || !item) return null;

  // Try to find a matching cart item for a fallback image and supportsColor
  let matchingCartItem = null;
  if (Array.isArray(items)) {
    for (let i = items.length - 1; i >= 0; i -= 1) {
      const cartIt = items[i];
      if (
        cartIt?.name === item.name &&
        (!item.selectedSize || cartIt?.selectedSize === item.selectedSize) &&
        (!item.selectedFinish || cartIt?.selectedSheen === item.selectedFinish)
      ) {
        matchingCartItem = cartIt;
        break;
      }
    }
  }

  const inferredSupportsColor = (() => {
    const n = (item.name || "").toLowerCase();
    if (n.includes("texture")) return true;
    if (n.includes("emulsion")) return true;
    if (n.includes("sealer")) return true;
    if (n.includes("waterproof")) return true;
    return false;
  })();

  const popupSupportsColor =
    item.supportsColor !== undefined
      ? item.supportsColor
      : (matchingCartItem?.supportsColor !== undefined
        ? matchingCartItem.supportsColor
        : inferredSupportsColor);

  const displayImage =
    item.image ||
    item.bucketImage ||
    item.thumbnail ||
    item.productImage ||
    matchingCartItem?.image ||
    matchingCartItem?.bucketImage ||
    null;

  const quantity = item.quantity || 1;
  const price = item.price || "";
  const detailLines = [
    item.selectedFinish,
    item.selectedSize,
    popupSupportsColor && item.colorName && item.colorFamily
      ? `${item.colorName} • ${item.colorFamily}`
      : popupSupportsColor ? (item.colorName || item.colorFamily) : null,
    item.typeLabel,
  ].filter(Boolean);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed top-24 right-2 sm:right-4 z-[60] w-[calc(100%-1rem)] sm:w-96 max-w-md bg-white rounded-lg shadow-lg border border-gray-100"
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
          <div className="p-3 sm:p-4">
            <div className="flex items-center gap-3 sm:gap-6">
              {/* Product image or color swatch */}
              {displayImage ? (
                <img
                  src={displayImage}
                  alt={item.name}
                  className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg object-contain border border-gray-200 flex-shrink-0 bg-white"
                />
              ) : popupSupportsColor ? (
                <div
                  className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg border border-gray-200 flex-shrink-0"
                  style={{ backgroundColor: item.hex || "#f3f4f6" }}
                />
              ) : (
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg border border-gray-200 flex-shrink-0 bg-white" />
              )}

              {/* Product details */}
              <div className="flex-1 min-w-0">
                <p className="text-sm sm:text-lg font-semibold text-gray-900 truncate">
                  {item.name}
                </p>
                {detailLines.length > 0 && (
                  <p className="text-xs sm:text-sm text-gray-600 mt-1 truncate">
                    {detailLines.join(" • ")}
                  </p>
                )}
                <p className="text-xs sm:text-sm text-gray-600 mt-1">Qty: {quantity}</p>
              </div>

              {/* Price */}
              <div className="text-right flex-shrink-0">
                <p className="text-sm sm:text-lg font-bold text-gray-900 whitespace-nowrap">{price}</p>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="p-3 sm:p-4 border-t border-gray-50">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-0">
              <button
                onClick={onContinueShopping}
                className="flex-1 text-sm sm:text-base text-gray-600 hover:text-gray-900 transition-colors font-medium text-center py-2 sm:py-0"
              >
                Continue Shopping
              </button>
              <div className="hidden sm:block w-px h-5 bg-gray-200 mx-3"></div>
              <button
                onClick={onCheckout}
                className="flex-1 bg-gray-900 text-white py-3 px-4 rounded-lg text-sm sm:text-base font-medium hover:bg-gray-800 transition-colors"
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
