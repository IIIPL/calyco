import { useState, useCallback } from 'react';

/**
 * Lazy-loaded Shopify checkout hook
 * Only initializes when user clicks checkout
 */
export function useShopifyCheckout() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const initiateCheckout = useCallback(async (cartItems) => {
    setLoading(true);
    setError(null);

    try {
      const { createCart, SHOPIFY_READY } = await import('../lib/shopify');

      if (!SHOPIFY_READY) {
        throw new Error('Shopify not configured');
      }

      const lines = cartItems
        .map(item => ({
          merchandiseId: getVariantId(item),
          quantity: item.quantity,
          attributes: [
            { key: 'Sheen', value: item.selectedSheen || '' },
            { key: 'Color Family', value: item.selectedColor?.family || '' },
            { key: 'Color', value: item.selectedColor?.name || '' },
            { key: 'Size', value: item.selectedSize || '' },
          ].map(attr => ({ ...attr, value: attr.value ?? '' })),
        }))
        .filter(line => line.merchandiseId);

      if (lines.length === 0) {
        window.location.href = '/checkout';
        return;
      }

      const cart = await createCart({ lines });
      if (!cart?.checkoutUrl) {
        throw new Error('Unable to retrieve Shopify checkout URL');
      }

      window.location.href = cart.checkoutUrl;
    } catch (err) {
      console.error('Shopify checkout error:', err);
      setError(err.message || 'Shopify checkout failed');
      window.location.href = '/checkout';
    } finally {
      setLoading(false);
    }
  }, []);

  return { initiateCheckout, loading, error };
}

function getVariantId(cartItem) {
  if (cartItem.id === 'nova' || cartItem.name?.includes('Nova') || cartItem.name?.includes('CALYCO Interior')) {
    const sizeMap = {
      '1L': 'gid://shopify/ProductVariant/42585860702326',
      '4L': 'gid://shopify/ProductVariant/42585863258230',
      '10L': 'gid://shopify/ProductVariant/42585863290998',
      '20L': 'gid://shopify/ProductVariant/42585863323766',
    };
    return sizeMap[cartItem.selectedSize];
  }

  return null;
}
