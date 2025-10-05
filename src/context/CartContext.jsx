import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';
// Shopify imports commented out for performance - causing 5min load times
// import { shopifyClient, ensureCheckout } from '../lib/shopify';
// import { SHOPIFY_READY } from '../lib/env';

// if (!SHOPIFY_READY) {
//   console.error('[CALYCO] Shopify env not configured');
// }

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.items.find(item =>
        item.id === action.payload.id &&
        item.selectedSheen === action.payload.selectedSheen &&
        item.selectedSize === action.payload.selectedSize &&
        item.selectedColorType === action.payload.selectedColorType &&
        item.selectedColor?.name === action.payload.selectedColor?.name
      );

      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id &&
            item.selectedSheen === action.payload.selectedSheen &&
            item.selectedSize === action.payload.selectedSize &&
            item.selectedColorType === action.payload.selectedColorType &&
            item.selectedColor?.name === action.payload.selectedColor?.name
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          )
        };
      } else {
        return {
          ...state,
          items: [...state.items, action.payload]
        };
      }

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item =>
          !(item.id === action.payload.id &&
            item.selectedSheen === action.payload.selectedSheen &&
            item.selectedSize === action.payload.selectedSize &&
            item.selectedColorType === action.payload.selectedColorType &&
            item.selectedColor?.name === action.payload.selectedColor?.name)
        )
      };

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id &&
          item.selectedSheen === action.payload.selectedSheen &&
          item.selectedSize === action.payload.selectedSize &&
          item.selectedColorType === action.payload.selectedColorType &&
          item.selectedColor?.name === action.payload.selectedColor?.name
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };

    case 'CLEAR_CART':
      return {
        ...state,
        items: []
      };

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: []
  });
  const [checkout, setCheckout] = useState(null);
  const [loading, setLoading] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('calycoCart');
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      parsedCart.items.forEach(item => {
        dispatch({ type: 'ADD_TO_CART', payload: item });
      });
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('calycoCart', JSON.stringify(state));
  }, [state]);

  // Initialize Shopify checkout - disabled for performance
  // Only initialize when user actually tries to checkout
  useEffect(() => {
    // Shopify checkout initialization disabled - will be lazy-loaded on demand
  }, []);

  const addToCart = (product, selectedSheen, selectedSize, quantity, priceOverride, selectedColor, selectedColorType) => {
    const defaultColor = {
      name: "Serene Ivory",
      hex: "#F8F4E3"
    };

    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        id: product.id,
        name: product.display_name || product.name,
        price: parseFloat(priceOverride !== undefined ? priceOverride : product.price) || 0,
        selectedSheen,
        selectedSize,
        selectedColorType: selectedColorType || 'ready-mixed',
        quantity: parseInt(quantity) || 1,
        image: product.image,
        selectedColor: selectedColor || defaultColor
      }
    });
  };

  const removeFromCart = (item) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: item
    });
  };

  const updateQuantity = (item, quantity) => {
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { ...item, quantity: parseInt(quantity) || 1 }
    });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getCartTotal = () => {
    return state.items.reduce((total, item) => {
      const price = parseFloat(item.price) || 0;
      const quantity = parseInt(item.quantity) || 0;
      return total + (price * quantity);
    }, 0);
  };

  const getCartItemCount = () => {
    return state.items.reduce((count, item) => count + item.quantity, 0);
  };

  // Shopify-specific functions - disabled for performance
  const add = async ({ variantId, quantity = 1, custom = [] }) => {
    console.log('Shopify checkout disabled for performance');
    return null;
  };

  const remove = async (lineItemId) => {
    console.log('Shopify checkout disabled for performance');
    return null;
  };

  const updateQty = async (lineItemId, quantity) => {
    console.log('Shopify checkout disabled for performance');
    return null;
  };

  // Lazy-loaded Shopify checkout - only loads when user clicks checkout
  const goToCheckout = async () => {
    const debug = {
      timestamp: new Date().toISOString(),
      items: state.items,
      steps: [],
    };

    const addStep = (message, data) => {
      const entry = { message };
      if (data !== undefined) {
        entry.data = data;
      }
      debug.steps.push(entry);
      if (data !== undefined) {
        console.log('[CALYCO CHECKOUT]', message, data);
      } else {
        console.log('[CALYCO CHECKOUT]', message);
      }
    };

    const flushDebug = (status, extra = {}) => {
      debug.status = status;
      if (extra && Object.keys(extra).length) {
        debug.extra = extra;
      }
      try {
        sessionStorage.setItem('shopifyCheckoutDebug', JSON.stringify(debug));
      } catch (storageErr) {
        console.warn('[CALYCO CHECKOUT] Unable to persist debug info', storageErr);
      }
    };

    console.log('═══════════════════════════════════════════════════════');
    addStep('Starting checkout process...', state.items);

    try {
      const hasShopifyProducts = state.items.some(item => {
        const isShopify =
          item.id === 'nova' ||
          item.name?.toLowerCase().includes('nova') ||
          item.name?.toLowerCase().includes('calyco interior') ||
          item.name?.toLowerCase().includes('interior latex');

        addStep(`Checking Shopify match for ${item.name}`, { id: item.id, isShopify });
        return isShopify;
      });

      addStep('Has Shopify products?', hasShopifyProducts);

      if (hasShopifyProducts) {
        addStep('Loading Shopify cart client...');

        const { createCart, SHOPIFY_READY } = await import('../lib/shopify');

        addStep('Shopify readiness check', { SHOPIFY_READY });

        if (SHOPIFY_READY) {
          const cartLines = state.items
            .filter(item => {
              const match = item.id === 'nova' ||
                item.name?.toLowerCase().includes('nova') ||
                item.name?.toLowerCase().includes('calyco interior') ||
                item.name?.toLowerCase().includes('interior latex');
              addStep(`Filtering item ${item.name}`, { match });
              return match;
            })
            .map(item => {
              addStep('Mapping item', {
                id: item.id,
                name: item.name,
                selectedSize: item.selectedSize,
                selectedSheen: item.selectedSheen,
                quantity: item.quantity,
              });

              const normalizeSize = (size) => {
                if (!size) return null;
                const sizeStr = size.toString().toUpperCase().trim();

                if (sizeStr.includes('1') && (sizeStr.includes('L') || sizeStr.includes('LITRE'))) return '1L';
                if (sizeStr.includes('4') && (sizeStr.includes('L') || sizeStr.includes('LITRE'))) return '4L';
                if (sizeStr.includes('10') && (sizeStr.includes('L') || sizeStr.includes('LITRE'))) return '10L';
                if (sizeStr.includes('20') && (sizeStr.includes('L') || sizeStr.includes('LITRE'))) return '20L';

                return null;
              };

              const normalizedSize = normalizeSize(item.selectedSize);
              addStep('Normalized size', { original: item.selectedSize, normalized: normalizedSize });

              const sizeMap = {
                '1L': 'gid://shopify/ProductVariant/42585860702326',
                '4L': 'gid://shopify/ProductVariant/42585863258230',
                '10L': 'gid://shopify/ProductVariant/42585863290998',
                '20L': 'gid://shopify/ProductVariant/42585863323766',
              };

              const variantId = sizeMap[normalizedSize];
              addStep('Resolved variant ID', { size: normalizedSize, variantId });

              if (!variantId) return null;

              const attributes = [
                { key: 'Sheen', value: item.selectedSheen || '' },
                { key: 'Color Family', value: item.selectedColor?.family || item.selectedColor?.colorFamily || '' },
                { key: 'Color', value: item.selectedColor?.name || item.selectedColor?.colorName || '' },
                { key: 'Color Type', value: item.selectedColorType === 'ready-mixed' ? 'Ready-Mixed Color' : 'Tint-on-Demand' },
                { key: 'Size', value: normalizedSize || item.selectedSize || '' },
              ].map(attr => ({ ...attr, value: attr.value ?? '' }));

              return {
                merchandiseId: variantId,
                quantity: item.quantity,
                attributes,
              };
            })
            .filter(item => {
              const hasVariant = !!item?.merchandiseId;
              addStep('Line item variant check', { hasVariant, variantId: item?.merchandiseId });
              return hasVariant;
            });

          addStep('Final cart lines', cartLines);

          if (cartLines.length > 0) {
            addStep('Creating Shopify cart...', { count: cartLines.length });

            const cart = await createCart({ lines: cartLines });

            addStep('Shopify cart created', { cartId: cart?.id, checkoutUrl: cart?.checkoutUrl });
            flushDebug('shopify', { cartId: cart?.id, webUrl: cart?.checkoutUrl, lines: cartLines });
            console.log('═══════════════════════════════════════════════════════');

            setTimeout(() => {
              window.location.href = cart?.checkoutUrl;
            }, 1000);
            return;
          } else {
            addStep('No valid cart lines after variant mapping');
            flushDebug('fallback', { reason: 'no-valid-cart-lines' });
          }
        } else {
          addStep('Shopify not ready', { SHOPIFY_READY });
          flushDebug('fallback', { reason: 'shopify-not-ready', SHOPIFY_READY });
        }
      } else {
        addStep('No Shopify products detected in cart');
        flushDebug('fallback', { reason: 'no-shopify-products' });
      }
    } catch (err) {
      console.error('[CALYCO CHECKOUT] ERROR:', err);
      console.error('[CALYCO CHECKOUT] Error stack:', err.stack);
      flushDebug('error', { message: err.message, stack: err.stack });
    }

    addStep('Redirecting to /checkout as fallback');
    console.log('═══════════════════════════════════════════════════════');
    setTimeout(() => {
      window.location.href = '/checkout';
    }, 100);
  };
  const value = {
    items: state.items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemCount,
    checkout,
    add,
    remove,
    updateQty,
    goToCheckout,
    loading
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartProvider; 