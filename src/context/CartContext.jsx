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
        item.selectedColor?.name === action.payload.selectedColor?.name
      );

      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id &&
            item.selectedSheen === action.payload.selectedSheen &&
            item.selectedSize === action.payload.selectedSize &&
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

  const addToCart = (product, selectedSheen, selectedSize, quantity, priceOverride, selectedColor) => {
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
    try {
      // Check if cart has any Shopify products (Nova/CALYCO Interior)
      const hasShopifyProducts = state.items.some(item =>
        item.id === 'nova' ||
        item.name?.includes('Nova') ||
        item.name?.includes('CALYCO Interior')
      );

      if (hasShopifyProducts) {
        // Dynamically import Shopify checkout hook
        const { useShopifyCheckout } = await import('../hooks/useShopifyCheckout');
        // Note: Can't use hooks here, so we'll import the logic directly

        const { shopifyClient } = await import('../lib/shopify');
        const { SHOPIFY_READY } = await import('../lib/env');

        if (SHOPIFY_READY && shopifyClient) {
          // Create checkout and add items
          const checkout = await shopifyClient.checkout.create();

          const lineItems = state.items
            .filter(item => item.id === 'nova' || item.name?.includes('Nova'))
            .map(item => {
              const sizeMap = {
                '1L': 'gid://shopify/ProductVariant/42585860702326',
                '4L': 'gid://shopify/ProductVariant/42585863258230',
                '10L': 'gid://shopify/ProductVariant/42585863290998',
                '20L': 'gid://shopify/ProductVariant/42585863323766',
              };

              return {
                variantId: sizeMap[item.selectedSize],
                quantity: item.quantity,
                customAttributes: [
                  { key: 'Sheen', value: item.selectedSheen || '' },
                  { key: 'Color Family', value: item.selectedColor?.family || '' },
                  { key: 'Color', value: item.selectedColor?.name || '' },
                ]
              };
            })
            .filter(item => item.variantId);

          if (lineItems.length > 0) {
            const updatedCheckout = await shopifyClient.checkout.addLineItems(
              checkout.id,
              lineItems
            );

            // Redirect to Shopify checkout
            window.location.href = updatedCheckout.webUrl;
            return;
          }
        }
      }
    } catch (err) {
      console.error('Shopify checkout failed:', err);
    }

    // Fallback to regular checkout
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