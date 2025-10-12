import { useState, useCallback } from 'react';
import { shopifyConfig } from '../config/shopify';

const normaliseDomain = (domain = '') => domain.replace(/^https?:\/\//, '').replace(/\/+$/, '');

const resolveShopifyDomain = () => {
  const envDomain =
    typeof import.meta !== 'undefined' && import.meta.env
      ? import.meta.env.VITE_SHOPIFY_DOMAIN ||
        import.meta.env.VITE_SHOPIFY_STOREFRONT_DOMAIN ||
        ''
      : '';

  const configuredDomain = shopifyConfig?.domain || '';
  const rawDomain = envDomain || configuredDomain || 'calycopaints.myshopify.com';
  return normaliseDomain(rawDomain);
};

const extractIdFromGid = (gid = '') => gid.split('/').pop() || '';

const isHomepageUrl = (url = '', domain) => {
  if (!url) return true;
  const cleanDomain = normaliseDomain(domain || resolveShopifyDomain());
  const trimmed = url.trim();
  const homepage = `https://${cleanDomain}`;
  return trimmed === homepage || trimmed === `${homepage}/`;
};

const buildPermalinkFromLineInputs = (domain, lines = []) => {
  if (!Array.isArray(lines) || lines.length === 0) {
    return '';
  }

  const cleanDomain = normaliseDomain(domain || resolveShopifyDomain());
  const permalinkItems = lines
    .map((line) => {
      const variantGid = line?.merchandiseId;
      if (!variantGid) return null;
      const numericId = extractIdFromGid(variantGid);
      const quantity = Math.max(1, line?.quantity || 1);
      if (!numericId) return null;
      return `${numericId}:${quantity}`;
    })
    .filter(Boolean);

  if (!permalinkItems.length) {
    return '';
  }

  return `https://${cleanDomain}/cart/${permalinkItems.join(',')}`;
};

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
        throw new Error('No Shopify variants available for checkout.');
      }

      const cart = await createCart({ lines });
      const shopifyDomain = resolveShopifyDomain();
      let checkoutUrl = (cart?.checkoutUrl || '').trim();

      if (!checkoutUrl || isHomepageUrl(checkoutUrl, shopifyDomain)) {
        const cartId = extractIdFromGid(cart?.id || '');
        if (cartId) {
          const constructed = `https://${shopifyDomain}/cart/c/${cartId}`;
          if (!isHomepageUrl(constructed, shopifyDomain)) {
            checkoutUrl = constructed;
          }
        }

        if (!checkoutUrl || isHomepageUrl(checkoutUrl, shopifyDomain)) {
          const permalink = buildPermalinkFromLineInputs(shopifyDomain, lines);
          if (permalink && !isHomepageUrl(permalink, shopifyDomain)) {
            checkoutUrl = permalink;
          }
        }
      }

      console.log('[CALYCO] Shopify checkout hook debug:', {
        cartId: cart?.id,
        rawCheckoutUrl: cart?.checkoutUrl,
        finalCheckoutUrl: checkoutUrl,
        lineInputs: lines,
        domain: shopifyDomain,
      });

      if (!checkoutUrl || isHomepageUrl(checkoutUrl, shopifyDomain)) {
        throw new Error('Unable to determine Shopify checkout URL');
      }

      if (typeof window !== 'undefined') {
        window.location.href = checkoutUrl;
      }
    } catch (err) {
      console.error('Shopify checkout error:', err);
      setError(err.message || 'Shopify checkout failed');
      if (typeof window !== 'undefined') {
        alert('Checkout is unavailable right now. Please try again shortly.');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  return { initiateCheckout, loading, error };
}

function getVariantId(cartItem) {
  if (cartItem?.variantId) {
    return cartItem.variantId;
  }

  const normalizedId = (cartItem?.id || '').toString().toLowerCase();
  const isInteriorLatex =
    normalizedId === 'nova' ||
    cartItem?.name?.toLowerCase()?.includes('calyco interior latex paint') ||
    cartItem?.name?.toLowerCase()?.includes('nova');

  if (!isInteriorLatex) {
    return null;
  }

  const finish = cartItem?.selectedSheen || 'Low Sheen';
  const size = (cartItem?.selectedSize || '').replace(/\s+/g, '');
  const key = `${size}-${finish}`;

  const variantMap = {
    '1L-Low Sheen': 'gid://shopify/ProductVariant/42619088371830',
    '4L-Low Sheen': 'gid://shopify/ProductVariant/42619088437366',
    '10L-Low Sheen': 'gid://shopify/ProductVariant/42619088502902',
    '20L-Low Sheen': 'gid://shopify/ProductVariant/42619088568438',
    '1L-Pearl': 'gid://shopify/ProductVariant/42619088339062',
    '4L-Pearl': 'gid://shopify/ProductVariant/42619088404598',
    '10L-Pearl': 'gid://shopify/ProductVariant/42619088470134',
    '20L-Pearl': 'gid://shopify/ProductVariant/42619088535670',
  };

  return variantMap[key] || null;
}
