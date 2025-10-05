import Client from 'shopify-buy';
import { SHOP_DOMAIN, SHOP_TOKEN, SHOPIFY_READY } from './env';

// Re-export SHOPIFY_READY for convenience
export { SHOPIFY_READY };

export const shopifyClient = SHOPIFY_READY
  ? Client.buildClient({
      domain: SHOP_DOMAIN,
      storefrontAccessToken: SHOP_TOKEN,
      apiVersion: '2023-07',
    })
  : null;

export async function ensureCheckout(checkoutId) {
  if (!shopifyClient) return null;
  try {
    if (checkoutId) {
      const existing = await shopifyClient.checkout.fetch(checkoutId);
      if (!existing?.completedAt) return existing;
    }
  } catch (err) {
    console.warn('[SHOPIFY] Could not fetch existing checkout:', err.message);
  }

  try {
    console.log('[SHOPIFY] Creating new checkout...');
    const checkout = await shopifyClient.checkout.create();
    console.log('[SHOPIFY] Checkout created successfully:', checkout.id);
    return checkout;
  } catch (err) {
    console.error('[SHOPIFY] Failed to create checkout:', err);
    throw err;
  }
}
