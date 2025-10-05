// Shopify environment configuration — uses build-time env with runtime fallback
const DEFAULT_DOMAIN = 'calycopaints.myshopify.com';
const DEFAULT_TOKEN = '81950262da6c235154f5de3277b6401c';

export const SHOP_DOMAIN =
  import.meta.env.VITE_SHOPIFY_STOREFRONT_DOMAIN ||
  DEFAULT_DOMAIN;

export const SHOP_TOKEN =
  import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN ||
  DEFAULT_TOKEN;

export const SHOPIFY_READY = Boolean(SHOP_DOMAIN && SHOP_TOKEN);

if (typeof window !== 'undefined') {
  console.log(
    '[CALYCO] Shopify env → domain:',
    SHOP_DOMAIN,
    'token set:',
    Boolean(SHOP_TOKEN)
  );
}
