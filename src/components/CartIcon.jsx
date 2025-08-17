import { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { CartModal } from './CartModal';

export const CartIcon = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { getCartItemCount } = useCart();
  const itemCount = getCartItemCount();

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="relative p-2 text-[#493657] hover:text-[#F0C85A] transition-colors"
        aria-label="Open cart"
      >
        <FaShoppingCart className="w-6 h-6" aria-hidden="true" />
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-[#F0C85A] text-[#493657] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {itemCount > 99 ? '99+' : itemCount}
          </span>
        )}
      </button>
      
      <CartModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}; 