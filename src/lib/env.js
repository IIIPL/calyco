// Shopify environment configuration - Updated with new secure token
export const SHOP_DOMAIN =
  import.meta.env.VITE_SHOPIFY_STOREFRONT_DOMAIN ||
  '';

export const SHOP_TOKEN =
  import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN ||
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
