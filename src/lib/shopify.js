import Client from 'shopify-buy';
import { SHOP_DOMAIN, SHOP_TOKEN, SHOPIFY_READY } from './env';

export const shopifyClient = SHOPIFY_READY
  ? Client.buildClient({
      domain: SHOP_DOMAIN,
      storefrontAccessToken: SHOP_TOKEN,
    })
  : null;

export async function ensureCheckout(checkoutId) {
  if (!shopifyClient) return null;
  try {
    if (checkoutId) {
      const existing = await shopifyClient.checkout.fetch(checkoutId);
      if (!existing?.completedAt) return existing;
    }
  } catch {}
  return shopifyClient.checkout.create();
}
