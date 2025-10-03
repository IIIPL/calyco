import Client from 'shopify-buy';

export const shopifyClient = Client.buildClient({
  domain: process.env.REACT_APP_SHOPIFY_STOREFRONT_DOMAIN,
  storefrontAccessToken: process.env.REACT_APP_SHOPIFY_STOREFRONT_TOKEN,
});

export async function ensureCheckout(checkoutId) {
  try {
    if (checkoutId) {
      const existing = await shopifyClient.checkout.fetch(checkoutId);
      if (!existing?.completedAt) return existing;
    }
  } catch {}
  return shopifyClient.checkout.create();
}
