import { useState, useCallback } from 'react';

/**
 * Lazy-loaded Shopify checkout hook
 * Only initializes Shopify client when user clicks checkout
 */
export function useShopifyCheckout() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const initiateCheckout = useCallback(async (cartItems) => {
    setLoading(true);
    setError(null);

    try {
      // Dynamically import Shopify client only when needed
      const { shopifyClient, SHOPIFY_READY } = await import('../lib/shopify');

      if (!SHOPIFY_READY || !shopifyClient) {
        throw new Error('Shopify not configured');
      }

      // Create a new checkout
      const checkout = await shopifyClient.checkout.create();

      // Map cart items to Shopify line items
      const lineItems = cartItems.map(item => ({
        variantId: getVariantId(item),
        quantity: item.quantity,
        customAttributes: [
          { key: 'Sheen', value: item.selectedSheen || '' },
          { key: 'Color Family', value: item.selectedColor?.family || '' },
          { key: 'Color', value: item.selectedColor?.name || '' },
          { key: 'Size', value: item.selectedSize || '' },
        ]
      })).filter(item => item.variantId); // Only include items with valid variant IDs

      if (lineItems.length === 0) {
        // No Shopify products in cart, redirect to regular checkout
        window.location.href = '/checkout';
        return;
      }

      // Add line items to checkout
      const updatedCheckout = await shopifyClient.checkout.addLineItems(
        checkout.id,
        lineItems
      );

      // Redirect to Shopify checkout
      window.location.href = updatedCheckout.webUrl;
    } catch (err) {
      console.error('Shopify checkout error:', err);
      setError(err.message);
      // Fallback to regular checkout on error
      window.location.href = '/checkout';
    } finally {
      setLoading(false);
    }
  }, []);

  return { initiateCheckout, loading, error };
}

/**
 * Map cart item to Shopify variant ID
 * Add your product mappings here
 */
function getVariantId(cartItem) {
  // CALYCO Interior (Nova) product variants
  if (cartItem.id === 'nova' || cartItem.name?.includes('Nova') || cartItem.name?.includes('CALYCO Interior')) {
    const sizeMap = {
      '1L': 'gid://shopify/ProductVariant/42585860702326',
      '4L': 'gid://shopify/ProductVariant/42585863258230',
      '10L': 'gid://shopify/ProductVariant/42585863290998',
      '20L': 'gid://shopify/ProductVariant/42585863323766',
    };
    return sizeMap[cartItem.selectedSize];
  }

  // Add more product mappings here as you add them to Shopify
  // Example:
  // if (cartItem.id === 'puretone') {
  //   return sizeMap[cartItem.selectedSize];
  // }

  return null; // Return null for non-Shopify products
}
