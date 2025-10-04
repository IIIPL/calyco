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
    console.log('═══════════════════════════════════════════════════════');
    console.log('[CALYCO CHECKOUT] Starting checkout process...');
    console.log('[CALYCO CHECKOUT] Cart items:', JSON.stringify(state.items, null, 2));
    console.log('═══════════════════════════════════════════════════════');

    try {
      // Check if cart has any Shopify products (Nova/CALYCO Interior)
      const hasShopifyProducts = state.items.some(item => {
        const isShopify =
          item.id === 'nova' ||
          item.name?.toLowerCase().includes('nova') ||
          item.name?.toLowerCase().includes('calyco interior') ||
          item.name?.toLowerCase().includes('interior latex');

        console.log(`[CALYCO CHECKOUT] Item "${item.name}" (id: ${item.id}) - Is Shopify? ${isShopify}`);
        return isShopify;
      });

      console.log('[CALYCO CHECKOUT] Has Shopify products?', hasShopifyProducts);

      if (hasShopifyProducts) {
        console.log('[CALYCO CHECKOUT] 🚀 Loading Shopify client...');

        const { shopifyClient } = await import('../lib/shopify');
        const { SHOPIFY_READY } = await import('../lib/env');

        console.log('[CALYCO CHECKOUT] SHOPIFY_READY:', SHOPIFY_READY);
        console.log('[CALYCO CHECKOUT] shopifyClient exists?', !!shopifyClient);

        if (SHOPIFY_READY && shopifyClient) {
          console.log('[CALYCO CHECKOUT] ✅ Shopify is ready! Creating checkout...');

          const checkout = await shopifyClient.checkout.create();
          console.log('[CALYCO CHECKOUT] ✅ Checkout created:', checkout.id);

          const lineItems = state.items
            .filter(item => {
              const match = item.id === 'nova' ||
                item.name?.toLowerCase().includes('nova') ||
                item.name?.toLowerCase().includes('calyco interior') ||
                item.name?.toLowerCase().includes('interior latex');
              console.log(`[CALYCO CHECKOUT] Filtering item "${item.name}" - Match? ${match}`);
              return match;
            })
            .map(item => {
              console.log(`[CALYCO CHECKOUT] Mapping item:`, item);
              console.log(`[CALYCO CHECKOUT] - selectedSize: "${item.selectedSize}"`);
              console.log(`[CALYCO CHECKOUT] - selectedSheen: "${item.selectedSheen}"`);
              console.log(`[CALYCO CHECKOUT] - selectedColor:`, item.selectedColor);

              // Normalize size to handle different formats
              const normalizeSize = (size) => {
                if (!size) return null;
                const sizeStr = size.toString().toUpperCase().trim();

                // Handle various formats: "1L", "1 L", "1 litre", "1 LITRE", "1 Litre", etc.
                if (sizeStr.includes('1') && (sizeStr.includes('L') || sizeStr.includes('LITRE'))) return '1L';
                if (sizeStr.includes('4') && (sizeStr.includes('L') || sizeStr.includes('LITRE'))) return '4L';
                if (sizeStr.includes('10') && (sizeStr.includes('L') || sizeStr.includes('LITRE'))) return '10L';
                if (sizeStr.includes('20') && (sizeStr.includes('L') || sizeStr.includes('LITRE'))) return '20L';

                return null;
              };

              const normalizedSize = normalizeSize(item.selectedSize);
              console.log(`[CALYCO CHECKOUT] - Original size: "${item.selectedSize}" → Normalized: "${normalizedSize}"`);

              const sizeMap = {
                '1L': 'gid://shopify/ProductVariant/42585860702326',
                '4L': 'gid://shopify/ProductVariant/42585863258230',
                '10L': 'gid://shopify/ProductVariant/42585863290998',
                '20L': 'gid://shopify/ProductVariant/42585863323766',
              };

              const variantId = sizeMap[normalizedSize];
              console.log(`[CALYCO CHECKOUT] - Variant ID for "${item.selectedSize}":`, variantId);

              const lineItem = {
                variantId: variantId,
                quantity: item.quantity,
                customAttributes: [
                  { key: 'Sheen', value: item.selectedSheen || '' },
                  { key: 'Color Family', value: item.selectedColor?.family || item.selectedColor?.colorFamily || '' },
                  { key: 'Color', value: item.selectedColor?.name || item.selectedColor?.colorName || '' },
                  { key: 'Color Type', value: item.selectedColorType === 'ready-mixed' ? 'Ready-Mixed Color' : 'Tint-on-Demand' },
                ]
              };

              console.log('[CALYCO CHECKOUT] - Created line item:', lineItem);
              return lineItem;
            })
            .filter(item => {
              const hasVariant = !!item.variantId;
              console.log(`[CALYCO CHECKOUT] Line item has variant? ${hasVariant}:`, item);
              return hasVariant;
            });

          console.log('[CALYCO CHECKOUT] Final line items array:', JSON.stringify(lineItems, null, 2));
          console.log('[CALYCO CHECKOUT] Line items count:', lineItems.length);

          if (lineItems.length > 0) {
            console.log('[CALYCO CHECKOUT] ✅ Adding', lineItems.length, 'items to checkout...');

            const updatedCheckout = await shopifyClient.checkout.addLineItems(
              checkout.id,
              lineItems
            );

            console.log('[CALYCO CHECKOUT] ✅ Items added successfully!');
            console.log('[CALYCO CHECKOUT] 🔗 Checkout URL:', updatedCheckout.webUrl);
            console.log('[CALYCO CHECKOUT] 🚀 Redirecting to Shopify in 1 second...');
            console.log('═══════════════════════════════════════════════════════');

            // Small delay so you can see the logs
            setTimeout(() => {
              window.location.href = updatedCheckout.webUrl;
            }, 1000);
            return;
          } else {
            console.log('[CALYCO CHECKOUT] ❌ No valid line items (all missing variant IDs)');
            console.log('[CALYCO CHECKOUT] ⚠️ Falling back to /checkout');
          }
        } else {
          console.log('[CALYCO CHECKOUT] ❌ Shopify not ready');
          console.log('[CALYCO CHECKOUT] - SHOPIFY_READY:', SHOPIFY_READY);
          console.log('[CALYCO CHECKOUT] - shopifyClient:', shopifyClient);
          console.log('[CALYCO CHECKOUT] ⚠️ Falling back to /checkout');
        }
      } else {
        console.log('[CALYCO CHECKOUT] ℹ️ No Shopify products in cart');
        console.log('[CALYCO CHECKOUT] ⚠️ Using regular checkout');
      }
    } catch (err) {
      console.error('[CALYCO CHECKOUT] ❌ ERROR:', err);
      console.error('[CALYCO CHECKOUT] Error stack:', err.stack);
    }

    // Fallback to regular checkout
    console.log('[CALYCO CHECKOUT] 🔄 Redirecting to /checkout');
    console.log('═══════════════════════════════════════════════════════');
    window.location.href = '/checkout';
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