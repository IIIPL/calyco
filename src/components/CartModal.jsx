import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaTrash, FaMinus, FaPlus } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

export const CartModal = ({ isOpen, onClose }) => {
  const { items, removeFromCart, updateQuantity, getCartTotal, clearCart, goToCheckout } = useCart();
  const closeButtonRef = useRef(null);
  const modalRef = useRef(null);
  const titleId = 'cart-modal-title';

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
      // Focus close button on open
      setTimeout(() => closeButtonRef.current?.focus(), 50);
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => document.body.classList.remove('modal-open');
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape' && isOpen) onClose(); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  // Focus trap
  useEffect(() => {
    if (!isOpen) return;
    const modal = modalRef.current;
    if (!modal) return;
    const focusable = modal.querySelectorAll(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const trap = (e) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    };
    modal.addEventListener('keydown', trap);
    return () => modal.removeEventListener('keydown', trap);
  }, [isOpen, items]);

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity <= 0) removeFromCart(item);
    else updateQuantity(item, newQuantity);
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(price);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center px-2 sm:px-4"
          role="presentation"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 flex-shrink-0">
              <h2 id={titleId} className="text-xl sm:text-2xl font-bold text-[#493657]">Shopping Cart</h2>
              <button
                ref={closeButtonRef}
                onClick={onClose}
                aria-label="Close cart"
                className="p-2 hover:bg-gray-100 rounded-full transition-colors focus-visible:outline-[#493657]"
              >
                <FaTimes className="w-5 h-5 text-gray-500" aria-hidden="true" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto">
              {(!items || items.length === 0) ? (
                <div className="p-6 sm:p-8 text-center">
                  <span className="mx-auto mb-4 block h-[3px] w-12 rounded-full bg-gray-300" aria-hidden="true" />
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-600 mb-2">Your cart is empty</h3>
                  <p className="text-gray-500">Add some products to get started!</p>
                  <button
                    onClick={onClose}
                    className="mt-4 px-5 py-2.5 bg-[#493657] text-white rounded-xl text-sm font-semibold hover:bg-[#5a4067] transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="p-4 sm:p-6 space-y-4">
                  {items.map((item, index) => (
                    <motion.div
                      key={`${item.id}-${item.selectedSheen}-${item.selectedSize}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-xl"
                    >
                      {/* Product Image */}
                      <img
                        src={item.image}
                        alt={`${item.name}${item.selectedSheen ? ` – ${item.selectedSheen}` : ''}${item.selectedSize ? ` ${item.selectedSize}` : ''}`}
                        className="w-14 h-14 sm:w-16 sm:h-16 object-contain rounded"
                        width="64"
                        height="64"
                      />

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-[#493657] text-sm sm:text-base truncate">{item.name}</h3>
                        <p className="text-xs sm:text-sm text-gray-600">
                          {item.selectedSheen} • {item.selectedSize}
                        </p>
                        {item.selectedColor?.name && (
                          <div className="flex items-center gap-2 mt-1">
                            <div
                              className="w-4 h-4 rounded-full border border-gray-200 flex-shrink-0"
                              style={{ backgroundColor: item.selectedColor.hex }}
                              aria-hidden="true"
                            />
                            <span className="text-xs text-gray-600">{item.selectedColor.name}</span>
                          </div>
                        )}
                        <p className="text-base sm:text-lg font-bold text-[#493657] mt-0.5">
                          {formatPrice(item.price)}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-1.5" role="group" aria-label={`Quantity for ${item.name}`}>
                        <button
                          onClick={() => handleQuantityChange(item, item.quantity - 1)}
                          aria-label={`Decrease quantity of ${item.name}`}
                          className="w-8 h-8 rounded-full bg-[#493657] text-white flex items-center justify-center hover:bg-[#5a4067] transition-colors"
                        >
                          <FaMinus className="w-3 h-3" aria-hidden="true" />
                        </button>
                        <span className="w-6 sm:w-8 text-center font-semibold text-sm sm:text-base" aria-live="polite">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item, item.quantity + 1)}
                          aria-label={`Increase quantity of ${item.name}`}
                          className="w-8 h-8 rounded-full bg-[#493657] text-white flex items-center justify-center hover:bg-[#5a4067] transition-colors"
                        >
                          <FaPlus className="w-3 h-3" aria-hidden="true" />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item)}
                        aria-label={`Remove ${item.name} from cart`}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                      >
                        <FaTrash className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items && items.length > 0 && (
              <div className="border-t border-gray-200 p-4 sm:p-6 flex-shrink-0 bg-white">
                <p className="text-[11px] text-gray-400 mb-3">
                  Prices exclusive of GST. Shipping calculated at checkout.
                </p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-base sm:text-lg font-semibold text-[#493657]">Subtotal:</span>
                  <span className="text-xl sm:text-2xl font-bold text-[#493657]">
                    {formatPrice(getCartTotal())}
                  </span>
                </div>
                <div className="flex gap-2 sm:gap-3">
                  <button
                    onClick={onClose}
                    className="flex-1 px-3 py-2.5 sm:px-4 sm:py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors text-sm sm:text-base"
                  >
                    Continue Shopping
                  </button>
                  <button
                    onClick={async () => { onClose(); await goToCheckout(); }}
                    className="flex-1 px-3 py-2.5 sm:px-4 sm:py-3 bg-[#493657] text-white rounded-xl hover:bg-[#5a4067] transition-colors font-semibold text-sm sm:text-base"
                  >
                    Checkout Securely →
                  </button>
                </div>
                <button
                  onClick={clearCart}
                  className="w-full mt-2 text-xs text-gray-400 hover:text-red-500 transition-colors py-1"
                >
                  Clear cart
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
