const vite = typeof import.meta !== 'undefined' ? import.meta.env : {};

export const SHOP_DOMAIN =
  vite?.VITE_SHOPIFY_STOREFRONT_DOMAIN ||
  process.env.REACT_APP_SHOPIFY_STOREFRONT_DOMAIN ||
  '';

export const SHOP_TOKEN =
  vite?.VITE_SHOPIFY_STOREFRONT_TOKEN ||
  process.env.REACT_APP_SHOPIFY_STOREFRONT_TOKEN ||
  '';

export const SHOPIFY_READY = Boolean(SHOP_DOMAIN && SHOP_TOKEN);

if (typeof window !== 'undefined') {
  console.log(
    '[CALYCO] Shopify env → domain:',
    SHOP_DOMAIN,
    'token set:',
    Boolean(SHOP_TOKEN)
  );
}
