import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  createCart,
  addToCart as addToCartAPI,
  updateCartLines,
  removeFromCart as removeFromCartAPI,
  isShopifyConfigured,
  SHOPIFY_CART_STORAGE_KEY,
  shopifyConfig,
} from '../config/shopify';
import { products as catalogProducts } from '../data/products';

const CartContext = createContext(undefined);

const LOCAL_CART_STORAGE_KEY = 'calycoLocalCart';

const DEFAULT_COLOR = {
  name: 'Serene Ivory',
  hex: '#F8F4E3',
  code: '',
  family: '',
};

const normaliseColor = (color = {}) => ({
  name: color.name || color.colorName || DEFAULT_COLOR.name,
  hex: color.hex || color.colorHex || DEFAULT_COLOR.hex,
  code: color.code || color.tintCode || color.colorCode || DEFAULT_COLOR.code,
  family: color.family || color.colorFamily || DEFAULT_COLOR.family,
});

const localItemKey = (item) => {
  const colour = normaliseColor(item.selectedColor);
  return [item.id, item.selectedSheen || '', item.selectedSize || '', colour.name || ''].join('|');
};

const buildCustomAttributes = (attributes = {}) => {
  return Object.entries(attributes)
    .filter(([_, value]) => value !== undefined && value !== null && String(value).trim() !== '')
    .map(([key, value]) => ({ key, value: String(value) }));
};

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

const buildCartPermalinkFromLines = (domain, edges = []) => {
  if (!Array.isArray(edges) || edges.length === 0) {
    return '';
  }

  const cleanDomain = normaliseDomain(domain || resolveShopifyDomain());
  const permalinkItems = edges
    .map((edge) => {
      const merchandise = edge?.node?.merchandise;
      const variantGid = merchandise?.id || edge?.node?.merchandiseId;
      if (!variantGid) return null;
      const numericId = extractIdFromGid(variantGid);
      const quantity = Math.max(1, edge?.node?.quantity || 1);
      if (!numericId) return null;
      return `${numericId}:${quantity}`;
    })
    .filter(Boolean);

  if (permalinkItems.length === 0) {
    return '';
  }

  return `https://${cleanDomain}/cart/${permalinkItems.join(',')}`;
};

const normaliseSizeToken = (value = '') =>
  value.toString().trim().replace(/\s+/g, '').toLowerCase();

const normaliseFinishToken = (value = '') =>
  value.toString().trim().toLowerCase();

const matchCartItemToProduct = (item) => {
  if (!item) return null;
  const candidates = [
    item?.id,
    item?.name,
    item?.productId,
    item?.handle,
    item?.slug,
  ]
    .filter(Boolean)
    .map((entry) => entry.toString().toLowerCase());

  if (candidates.length === 0) {
    return null;
  }

  return (
    catalogProducts.find((product) => {
      const productCandidates = [
        product?.id,
        product?.name,
        product?.slug,
        product?.handle,
        product?.display_name,
      ]
        .filter(Boolean)
        .map((entry) => entry.toString().toLowerCase());
      return productCandidates.some((value) => candidates.includes(value));
    }) || null
  );
};

const findVariantInMap = (variantMap, sizeToken, finishToken) => {
  if (!variantMap || typeof variantMap !== 'object') {
    return null;
  }

  for (const [key, variantId] of Object.entries(variantMap)) {
    const [mapSize, ...rest] = key.split('-');
    const mapFinish = rest.join('-');
    if (!mapSize || !mapFinish) {
      continue;
    }
    if (
      normaliseSizeToken(mapSize) === sizeToken &&
      normaliseFinishToken(mapFinish) === finishToken
    ) {
      return variantId;
    }
  }
  return null;
};

const resolveVariantIdForItem = (item) => {
  if (!item) {
    return null;
  }

  if (item.variantId) {
    return item.variantId;
  }

  const itemId = item.id;
  if (
    typeof itemId === 'string' &&
    itemId.includes('gid://shopify/ProductVariant/')
  ) {
    return itemId;
  }

  const sizeToken = normaliseSizeToken(item.selectedSize);
  const finishToken = normaliseFinishToken(item.selectedSheen);

  if (!sizeToken || !finishToken) {
    return null;
  }

  const matchedProduct = matchCartItemToProduct(item);
  if (!matchedProduct) {
    return null;
  }

  let variantId =
    findVariantInMap(
      matchedProduct.shopify_variant_map,
      sizeToken,
      finishToken,
    ) || null;

  if (!variantId && matchedProduct.priceByFinish) {
    for (const [finishKey, sizes] of Object.entries(matchedProduct.priceByFinish)) {
      if (normaliseFinishToken(finishKey) !== finishToken) {
        continue;
      }
      if (!sizes || typeof sizes !== 'object') {
        continue;
      }
      for (const [sizeKey, info] of Object.entries(sizes)) {
        if (normaliseSizeToken(sizeKey) !== sizeToken) {
          continue;
        }
        if (info && typeof info === 'object') {
          variantId = info.variantId || info.variantID || null;
        }
        if (!variantId && typeof info === 'string') {
          variantId = info;
        }
        if (variantId) {
          break;
        }
      }
      if (variantId) {
        break;
      }
    }
  }

  return variantId || null;
};

const resolveVariantsForItems = (cartItems = []) => {
  const resolved = [];
  const missing = [];

  cartItems.forEach((item) => {
    const variantId = resolveVariantIdForItem(item);
    if (variantId) {
      resolved.push({ ...item, variantId });
    } else {
      missing.push(item);
    }
  });

  return { resolved, missing };
};

const mapLineItemToCartItem = (lineItem) => {
  if (!lineItem) {
    return null;
  }

  const customAttributes = lineItem.attributes || [];
  const findAttr = (key) => {
    const match = customAttributes.find((entry) => entry.key === key);
    return match ? match.value : '';
  };

  const merchandise = lineItem.merchandise || {};
  const fallbackSelectedOptions = (name) => {
    const option = merchandise.selectedOptions?.find((entry) => entry.name && entry.name.toLowerCase().includes(name));
    return option?.value || '';
  };

  const finish = findAttr('Finish') || fallbackSelectedOptions('finish');
  const size = findAttr('Size') || fallbackSelectedOptions('size') || merchandise.title?.split('/')?.[0]?.trim() || '';
  const productType = findAttr('Product Type') || 'paint';

  const color = {
    name: findAttr('Color Name') || DEFAULT_COLOR.name,
    hex: findAttr('Color Hex') || DEFAULT_COLOR.hex,
    code: findAttr('Color Code') || '',
    family: findAttr('Color Family') || DEFAULT_COLOR.family,
  };

  const priceAmount = merchandise.priceV2?.amount || 0;

  const imageSrc = merchandise.product?.featuredImage?.url || '/Assets/chair.png';

  return {
    lineItemId: lineItem.id,
    variantId: merchandise.id,
    id: merchandise.product?.id || merchandise.id || lineItem.id,
    name: merchandise.product?.title || 'Calyco Paint',
    price: parseFloat(priceAmount) || 0,
    quantity: lineItem.quantity || 1,
    selectedSheen: finish,
    selectedSize: size,
    selectedColorType: productType,
    selectedColor: color,
    image: imageSrc,
    customAttributes,
  };
};

const createLocalCartItem = ({ product, price, finish, size, quantity, color, productType, variantId }) => {
  const normalisedColor = normaliseColor(color);
  return {
    id: product?.id || product?.slug || product?.name || variantId || Math.random().toString(36).slice(2),
    name: product?.display_name || product?.name || 'Calyco Paint',
    price: parseFloat(price) || 0,
    selectedSheen: finish || '',
    selectedSize: size || '',
    selectedColorType: productType || 'paint',
    quantity: Math.max(1, parseInt(quantity, 10) || 1),
    image: product?.image || product?.bucketImage || '/Assets/chair.png',
    selectedColor: normalisedColor,
    variantId,
  };
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [initialised, setInitialised] = useState(false);

  const syncCart = useCallback((nextCart) => {
    if (!nextCart) {
      console.warn('[CALYCO] syncCart called with null/undefined cart');
      return;
    }
    console.log('[CALYCO] syncCart - Cart ID:', nextCart.id);
    console.log('[CALYCO] syncCart - checkoutUrl:', nextCart.checkoutUrl);
    console.log('[CALYCO] syncCart - Full cart:', nextCart);

    setCart(nextCart);
    const normalized = (nextCart.lines?.edges || [])
      .map((edge) => mapLineItemToCartItem(edge.node))
      .filter(Boolean);
    setItems(normalized);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(SHOPIFY_CART_STORAGE_KEY, nextCart.id);
    }
    setInitialised(true);
  }, []);

  const ensureCart = useCallback(async () => {
    if (!isShopifyConfigured) {
      return null;
    }

    if (cart?.id) {
      return cart;
    }

    setLoading(true);
    try {
      let storedId = null;
      if (typeof window !== 'undefined') {
        storedId = window.localStorage.getItem(SHOPIFY_CART_STORAGE_KEY);
      }

      let activeCart = null;

      // For now, always create a new cart since we can't fetch existing ones easily
      // In production, you might want to implement cart fetching
      if (!storedId) {
        activeCart = await createCart();
      } else {
        // Try to use stored cart, but create new one if it fails
        try {
          // Note: Cart fetching requires a separate query implementation
          // For simplicity, we'll create a new cart if we don't have one in state
          activeCart = await createCart();
        } catch (fetchError) {
          console.warn('[CALYCO] Unable to fetch stored cart. Creating a new one.', fetchError);
          activeCart = await createCart();
        }
      }

      syncCart(activeCart);
      return activeCart;
    } catch (err) {
      console.error('[CALYCO] Shopify cart initialisation failed', err);
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [cart, syncCart]);

  const loadLocalCart = useCallback(() => {
    if (typeof window === 'undefined') {
      setInitialised(true);
      return;
    }
    try {
      const raw = window.localStorage.getItem(LOCAL_CART_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed?.items)) {
          setItems(parsed.items);
        }
      }
    } catch (err) {
      console.warn('[CALYCO] Failed to parse local cart', err);
    } finally {
      setInitialised(true);
    }
  }, []);

  useEffect(() => {
    if (isShopifyConfigured) {
      ensureCart();
    } else {
      loadLocalCart();
    }
  }, [ensureCart, loadLocalCart]);

  useEffect(() => {
    if (!isShopifyConfigured && initialised && typeof window !== 'undefined') {
      window.localStorage.setItem(LOCAL_CART_STORAGE_KEY, JSON.stringify({ items }));
    }
  }, [items, initialised]);

  const addToCart = useCallback(
    async (
      product,
      selectedSheen,
      selectedSize,
      quantity = 1,
      priceOverride,
      selectedColor,
      selectedColorType = 'paint',
      options = {},
    ) => {
      const normalisedQuantity = Math.max(1, parseInt(quantity, 10) || 1);
      const colour = normaliseColor(selectedColor || {});
      const basePrice = priceOverride !== undefined ? priceOverride : product?.price;
      const productType = options.productType || selectedColorType || 'paint';
      const variantId = options.variantId;

      if (!isShopifyConfigured || !variantId) {
        const localItem = createLocalCartItem({
          product,
          price: basePrice,
          finish: selectedSheen,
          size: selectedSize,
          quantity: normalisedQuantity,
          color: colour,
          productType,
          variantId,
        });
        setItems((prev) => {
          const key = localItemKey(localItem);
          const existingIndex = prev.findIndex((entry) => localItemKey(entry) === key);
          if (existingIndex >= 0) {
            const updated = [...prev];
            updated[existingIndex] = {
              ...updated[existingIndex],
              quantity: updated[existingIndex].quantity + localItem.quantity,
              price: localItem.price,
            };
            return updated;
          }
          return [...prev, localItem];
        });
        return { variantId, quantity: normalisedQuantity };
      }

      try {
        setLoading(true);
        const activeCart = await ensureCart();
        if (!activeCart) {
          return null;
        }

        const baseAttributes = buildCustomAttributes({
          'Color Code': colour.code,
          'Color Name': colour.name,
          'Color Family': colour.family,
          'Color Hex': colour.hex,
          'Finish': selectedSheen,
          'Product Type': productType,
          'Size': selectedSize,
        });

        let extraAttributes = [];
        if (Array.isArray(options.attributes)) {
          extraAttributes = options.attributes
            .filter(
              (entry) =>
                entry &&
                Object.prototype.hasOwnProperty.call(entry, 'key') &&
                Object.prototype.hasOwnProperty.call(entry, 'value'),
            )
            .map((entry) => ({
              key: String(entry.key ?? '').trim(),
              value: String(entry.value ?? ''),
            }))
            .filter((entry) => entry.key.length > 0);
        } else if (
          options.attributes &&
          typeof options.attributes === 'object' &&
          !Array.isArray(options.attributes)
        ) {
          extraAttributes = buildCustomAttributes(options.attributes);
        }

        const mergedAttributesMap = new Map();
        [...baseAttributes, ...extraAttributes].forEach(({ key, value }) => {
          const trimmedKey = String(key || '').trim();
          if (!trimmedKey) return;
          const normalisedValue = value === undefined || value === null ? '' : String(value);
          mergedAttributesMap.set(trimmedKey, normalisedValue);
        });

        const attributes = Array.from(mergedAttributesMap.entries()).map(([key, value]) => ({
          key,
          value,
        }));

        console.log('[CALYCO] Adding to cart with:', {
          cartId: activeCart.id,
          merchandiseId: variantId,
          quantity: normalisedQuantity,
          attributes,
        });

        const updatedCart = await addToCartAPI(activeCart.id, [
          {
            merchandiseId: variantId,
            quantity: normalisedQuantity,
            attributes,
          },
        ]);

        console.log('[CALYCO] Item added successfully. Updated cart:', updatedCart);
        console.log('[CALYCO] Updated cart checkoutUrl:', updatedCart?.checkoutUrl);
        console.log('[CALYCO] Updated cart lines:', updatedCart?.lines?.edges?.length);

        syncCart(updatedCart);
        return { cart: updatedCart, variantId };
      } catch (err) {
        console.error('[CALYCO] Failed to add item to Shopify cart', err);
        setError(err);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [ensureCart, syncCart],
  );

  const remove = useCallback(
    async (lineItemId) => {
      if (isShopifyConfigured && lineItemId) {
        try {
          setLoading(true);
          const activeCart = await ensureCart();
          if (!activeCart) {
            return;
          }
          const updatedCart = await removeFromCartAPI(activeCart.id, [lineItemId]);
          syncCart(updatedCart);
        } catch (err) {
          console.error('[CALYCO] Failed to remove item from Shopify cart', err);
          setError(err);
        } finally {
          setLoading(false);
        }
        return;
      }

      setItems((prev) => prev.filter((item) => item.lineItemId !== lineItemId && item.id !== lineItemId));
    },
    [ensureCart, syncCart],
  );

  const removeFromCart = useCallback(
    async (item) => {
      if (item?.lineItemId) {
        await remove(item.lineItemId);
        return;
      }
      const key = localItemKey(item || {});
      setItems((prev) => prev.filter((existing) => localItemKey(existing) !== key));
    },
    [remove],
  );

  const updateQty = useCallback(
    async (lineItemId, quantity) => {
      const normalizedQuantity = Math.max(1, parseInt(quantity, 10) || 1);

      if (isShopifyConfigured && lineItemId) {
        try {
          setLoading(true);
          const activeCart = await ensureCart();
          if (!activeCart) {
            return;
          }
          const updatedCart = await updateCartLines(activeCart.id, [
            {
              id: lineItemId,
              quantity: normalizedQuantity,
            },
          ]);
          syncCart(updatedCart);
        } catch (err) {
          console.error('[CALYCO] Failed to update Shopify cart quantity', err);
          setError(err);
        } finally {
          setLoading(false);
        }
        return;
      }

      setItems((prev) =>
        prev.map((item) =>
          item.lineItemId === lineItemId || item.id === lineItemId
            ? { ...item, quantity: normalizedQuantity }
            : item,
        ),
      );
    },
    [ensureCart, syncCart],
  );

  const updateQuantity = useCallback(
    async (item, quantity) => {
      if (item?.lineItemId) {
        await updateQty(item.lineItemId, quantity);
        return;
      }

      const key = localItemKey(item || {});
      const normalizedQuantity = Math.max(1, parseInt(quantity, 10) || 1);
      setItems((prev) =>
        prev.map((existing) =>
          localItemKey(existing) === key
            ? { ...existing, quantity: normalizedQuantity }
            : existing,
        ),
      );
    },
    [updateQty],
  );

  const clearCart = useCallback(async () => {
    if (isShopifyConfigured) {
      try {
        setLoading(true);
        const newCart = await createCart();
        syncCart(newCart);
      } catch (err) {
        console.error('[CALYCO] Failed to reset Shopify cart', err);
        setError(err);
      } finally {
        setLoading(false);
      }
      return;
    }

    setItems([]);
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(LOCAL_CART_STORAGE_KEY);
    }
  }, [syncCart]);

  const subtotal = useMemo(
    () => items.reduce((total, item) => total + (parseFloat(item.price) || 0) * (item.quantity || 1), 0),
    [items],
  );

  const itemCount = useMemo(
    () => items.reduce((count, item) => count + (item.quantity || 0), 0),
    [items],
  );

  const getCartTotal = useCallback(() => subtotal, [subtotal]);
  const getCartItemCount = useCallback(() => itemCount, [itemCount]);

  const goToCheckout = useCallback(async () => {
    console.log('[CALYCO] ========== CHECKOUT DEBUG START ==========');
    console.log('[CALYCO] goToCheckout called');
    console.log('[CALYCO] isShopifyConfigured:', isShopifyConfigured);
    console.log('[CALYCO] Current items in cart:', items);
    console.log('[CALYCO] Items count:', items.length);

    // Check if cart has items
    if (!items || items.length === 0) {
      console.error('[CALYCO] Cart is empty!');
      alert('Your cart is empty. Please add items before checkout.');
      return null;
    }

    // If Shopify is not configured, log error and stop
    if (!isShopifyConfigured) {
      console.error('[CALYCO] Shopify checkout is not configured. Aborting redirect.');
      setError(new Error('Shopify checkout is not configured.'));
      if (typeof window !== 'undefined') {
        alert('Checkout is temporarily unavailable. Please contact support.');
      }
      return null;
    }

    console.log('[CALYCO] Current cart state:', cart);
    console.log('[CALYCO] Cart ID:', cart?.id);
    console.log('[CALYCO] Cart checkoutUrl:', cart?.checkoutUrl);
    console.log('[CALYCO] Cart lines:', cart?.lines);

    // Try to use existing cart first
    let activeCart = cart;

    // If no cart or no checkout URL, ensure cart is initialized
    if (!activeCart || !activeCart.checkoutUrl) {
      console.log('[CALYCO] No cart or checkout URL, calling ensureCart()');
      activeCart = await ensureCart();
    }

    console.log('[CALYCO] Active cart after ensure:', activeCart);
    console.log('[CALYCO] Active cart checkoutUrl:', activeCart?.checkoutUrl);
    console.log('[CALYCO] Active cart lines count:', activeCart?.lines?.edges?.length);

    if (!activeCart) {
      console.error('[CALYCO] No active cart available');
      setError(new Error('Unable to initialise Shopify cart.'));
      if (typeof window !== 'undefined') {
        alert('We could not prepare your cart for checkout. Please try again.');
      }
      return null;
    }

    // Check if Shopify cart has items
    const cartLineCount = activeCart?.lines?.edges?.length || 0;
    if (cartLineCount === 0) {
      console.warn('[CALYCO] Shopify cart is empty but local cart has items');
      console.log('[CALYCO] This means items were added to local cart, not Shopify cart');
      console.log('[CALYCO] Items in local cart:', items);

      // Try to sync local cart to Shopify cart
      console.log('[CALYCO] Attempting to add local cart items to Shopify...');

      try {
        setLoading(true);

        const { resolved: itemsForCheckout, missing: missingVariantItems } = resolveVariantsForItems(items);

        if (missingVariantItems.length > 0) {
          console.warn('[CALYCO] Items missing Shopify variant IDs:', missingVariantItems);
        }

        if (itemsForCheckout.length === 0) {
          console.error('[CALYCO] No items have Shopify variant IDs after resolution attempt');
          setError(new Error('Items in cart do not have Shopify variants.'));
          if (typeof window !== 'undefined') {
            alert('One or more items cannot be checked out online. Please contact support.');
          }
          setLoading(false);
          return null;
        }

        console.log('[CALYCO] Items prepared for Shopify checkout:', itemsForCheckout);

        // Add all items to Shopify cart
        const lines = itemsForCheckout.map(item => ({
          merchandiseId: item.variantId,
          quantity: item.quantity || 1,
          attributes: buildCustomAttributes({
            'Color Code': item.selectedColor?.code,
            'Color Name': item.selectedColor?.name,
            'Color Family': item.selectedColor?.family,
            'Color Hex': item.selectedColor?.hex,
            'Finish': item.selectedSheen,
            'Product Type': item.selectedColorType,
            'Size': item.selectedSize,
          }),
        }));

        console.log('[CALYCO] Adding lines to cart:', lines);

        const updatedCart = await addToCartAPI(activeCart.id, lines);
        console.log('[CALYCO] Successfully added items to Shopify cart:', updatedCart);
        console.log('[CALYCO] Updated cart has', updatedCart?.lines?.edges?.length, 'items');
        console.log('[CALYCO] Updated cart checkoutUrl:', updatedCart?.checkoutUrl);

        syncCart(updatedCart);
        activeCart = updatedCart;

        console.log('[CALYCO] Cart sync complete, proceeding to checkout...');
        setLoading(false);
      } catch (err) {
        console.error('[CALYCO] Failed to sync local cart to Shopify:', err);
        setLoading(false);
        setError(err);
        if (typeof window !== 'undefined') {
          alert('We could not sync your cart to Shopify. Please try again shortly.');
        }
        return null;
      }
    }

    const shopifyDomain = resolveShopifyDomain();
    let checkoutUrl = (activeCart?.checkoutUrl || '').trim();

    if (!checkoutUrl || isHomepageUrl(checkoutUrl, shopifyDomain)) {
      console.warn('[CALYCO] checkoutUrl empty or invalid, attempting manual construction');

      const cartId = extractIdFromGid(activeCart?.id || '');
      if (cartId) {
        const constructedUrl = `https://${shopifyDomain}/cart/c/${cartId}`;
        console.log('[CALYCO] Constructed checkout URL via cart ID:', constructedUrl);
        if (!isHomepageUrl(constructedUrl, shopifyDomain)) {
          checkoutUrl = constructedUrl;
        }
      }

      if (!checkoutUrl || isHomepageUrl(checkoutUrl, shopifyDomain)) {
        const edges = activeCart?.lines?.edges || [];
        const permalink = buildCartPermalinkFromLines(shopifyDomain, edges);
        if (permalink && !isHomepageUrl(permalink, shopifyDomain)) {
          console.log('[CALYCO] Constructed checkout URL via line items:', permalink);
          checkoutUrl = permalink;
        }
      }
    }

    console.log('[CALYCO] === CHECKOUT DEBUG ===');
    console.log('[CALYCO] Cart ID:', activeCart?.id);
    console.log('[CALYCO] Raw Shopify checkoutUrl:', activeCart?.checkoutUrl);
    console.log('[CALYCO] Shopify domain:', shopifyDomain);
    console.log('[CALYCO] Cart lines snapshot:', activeCart?.lines?.edges);
    console.log('[CALYCO] Final checkout URL:', checkoutUrl);
    console.log('[CALYCO] =======================');

    if (!checkoutUrl || isHomepageUrl(checkoutUrl, shopifyDomain)) {
      console.error('[CALYCO] Unable to determine a valid Shopify checkout URL');
      setError(new Error('Missing Shopify checkout URL.'));
      if (typeof window !== 'undefined') {
        alert('Unable to proceed to checkout. Please try again or contact support.');
      }
      return null;
    }

    const isValidShopifyUrl =
      checkoutUrl.includes('checkouts') ||
      checkoutUrl.includes('/cart/c/') ||
      checkoutUrl.startsWith(`https://${shopifyDomain}/cart/`);

    if (!isValidShopifyUrl) {
      console.error('[CALYCO] Invalid checkout URL format:', checkoutUrl);
      setError(new Error('Invalid Shopify checkout URL.'));
      if (typeof window !== 'undefined') {
        alert('Checkout link looks incorrect. Please try again.');
      }
      return null;
    }

    console.log('[CALYCO] ========== REDIRECTING TO SHOPIFY CHECKOUT ==========');
    console.log('[CALYCO] Valid Shopify URL detected:', checkoutUrl);
    console.log('[CALYCO] Redirecting in 100ms to ensure state is saved...');
    console.log('[CALYCO] ========================================');

    if (typeof window !== 'undefined') {
      // Small delay to ensure cart state is fully synced
      const redirectUrl = checkoutUrl;
      setTimeout(() => {
        console.log('[CALYCO] NOW REDIRECTING TO:', redirectUrl);
        window.location.href = redirectUrl;
      }, 100);
    }

    return activeCart;
  }, [cart, items, ensureCart, syncCart]);

  const value = {
    items,
    cart,
    checkout: cart, // Keep checkout for backward compatibility
    loading,
    error,
    initialised,
    isShopifyReady: isShopifyConfigured,
    shopifyDomain: shopifyConfig.domain,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemCount,
    goToCheckout,
    remove,
    updateQty,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartProvider;
