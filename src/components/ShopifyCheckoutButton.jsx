import { useState } from 'react';
import { useCart } from '../context/CartContext';

/**
 * Smart checkout button that:
 * - Uses Shopify for Nova/CALYCO Interior products
 * - Falls back to /checkout for other products
 * - Lazy-loads Shopify only when clicked
 */
export default function ShopifyCheckoutButton({
  children = 'Checkout',
  className = '',
  disabled = false
}) {
  const { items, goToCheckout } = useCart();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      await goToCheckout();
    } finally {
      // Loading state will end when page redirects
      // But if it fails, we need to reset
      setTimeout(() => setLoading(false), 3000);
    }
  };

  const isDisabled = disabled || items.length === 0 || loading;

  return (
    <button
      onClick={handleCheckout}
      disabled={isDisabled}
      className={className}
    >
      {loading ? 'Loading checkout...' : children}
    </button>
  );
}
