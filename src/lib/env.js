// Shopify environment configuration — includes runtime fallbacks
const DEFAULT_DOMAIN = 'calycopaints.myshopify.com';
const DEFAULT_TOKEN = '78f2d102a709a99eeeb63ede0784c998';

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
