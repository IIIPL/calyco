import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaTrash, FaMinus, FaPlus } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

export const CartModal = ({ isOpen, onClose }) => {
  const { items, removeFromCart, updateQuantity, getCartTotal, clearCart, goToCheckout } = useCart();
  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(item);
    } else {
      updateQuantity(item, newQuantity);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-2 sm:px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
              <h2 className="text-xl sm:text-2xl font-bold text-[#493657]">Shopping Cart</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <FaTimes className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto max-h-[60vh]">
              {items.length === 0 ? (
                <div className="p-6 sm:p-8 text-center">
                  <div className="text-6xl mb-4">🛒</div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-600 mb-2">Your cart is empty</h3>
                  <p className="text-gray-500">Add some products to get started!</p>
                </div>
              ) : (
                <div className="p-4 sm:p-6 space-y-4">
                  {items.map((item, index) => (
                    <motion.div
                      key={`${item.id}-${item.selectedSheen}-${item.selectedSize}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg"
                    >
                      {/* Product Image */}
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 sm:w-16 sm:h-16 object-contain rounded"
                      />

                      {/* Product Details */}
                      <div className="flex-1">
                        <h3 className="font-semibold text-[#493657] text-sm sm:text-base">{item.name}</h3>
                        <p className="text-xs sm:text-sm text-gray-600">
                          {item.selectedSheen} • {item.selectedSize}
                        </p>
                        {/* ✅ Show selected color */}
                        <div className="flex items-center gap-2 mt-1">
                          <div 
                            className="w-4 h-4 rounded-full border"
                            style={{ backgroundColor: item.selectedColor?.hex || '#F8F4E3' }}
                          />
                          <p className="text-sm text-gray-600">
                            {item.selectedColor?.name || "Serene Ivory"}
                          </p>
                        </div>
                        <p className="text-base sm:text-lg font-bold text-[#F0C85A]">
                          {formatPrice(item.price)}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleQuantityChange(item, item.quantity - 1)}
                          className="w-8 h-8 rounded-full bg-[#493657] text-white flex items-center justify-center hover:bg-[#5a4067] transition-colors"
                        >
                          <FaMinus className="w-3 h-3" />
                        </button>
                        <span className="w-6 sm:w-8 text-center font-semibold text-sm sm:text-base">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item, item.quantity + 1)}
                          className="w-8 h-8 rounded-full bg-[#493657] text-white flex items-center justify-center hover:bg-[#5a4067] transition-colors"
                        >
                          <FaPlus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                      >
                        <FaTrash className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-gray-200 p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-base sm:text-lg font-semibold text-[#493657]">Total:</span>
                  <span className="text-xl sm:text-2xl font-bold text-[#F0C85A]">
                    {formatPrice(getCartTotal())}
                  </span>
                </div>
                <div className="flex gap-2 sm:gap-3">
                  <button
                    onClick={clearCart}
                    className="flex-1 px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base"
                  >
                    Clear Cart
                  </button>
                  <button
                    onClick={async () => {
                      onClose();
                      await goToCheckout();
                    }}
                    className="flex-1 px-3 py-2 sm:px-4 sm:py-3 bg-[#493657] text-white rounded-lg hover:bg-[#5a4067] transition-colors font-semibold text-sm sm:text-base"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

