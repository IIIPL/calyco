import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';
import { shopifyClient, ensureCheckout } from '../lib/shopify';
import { SHOPIFY_READY } from '../lib/env';

if (!SHOPIFY_READY) {
  console.error('[CALYCO] Shopify env not configured');
}

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

  // Initialize Shopify checkout
  useEffect(() => {
    if (!SHOPIFY_READY) return;
    (async () => {
      const saved = localStorage.getItem('checkoutId');
      const co = await ensureCheckout(saved);
      if (co?.id) {
        setCheckout(co);
        localStorage.setItem('checkoutId', co.id);
      }
    })();
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

  // Shopify-specific functions
  const add = async ({ variantId, quantity = 1, custom = [] }) => {
    if (!SHOPIFY_READY || !shopifyClient || !checkout?.id) return;
    setLoading(true);
    try {
      const items = [{ variantId, quantity, customAttributes: custom }];
      const updated = await shopifyClient.checkout.addLineItems(checkout.id, items);
      setCheckout(updated);
      return updated;
    } finally {
      setLoading(false);
    }
  };

  const remove = async (lineItemId) => {
    if (!SHOPIFY_READY || !shopifyClient || !checkout?.id) return;
    setLoading(true);
    try {
      const updated = await shopifyClient.checkout.removeLineItems(checkout.id, [lineItemId]);
      setCheckout(updated);
      return updated;
    } finally {
      setLoading(false);
    }
  };

  const updateQty = async (lineItemId, quantity) => {
    if (!SHOPIFY_READY || !shopifyClient || !checkout?.id) return;
    setLoading(true);
    try {
      const updated = await shopifyClient.checkout.updateLineItems(checkout.id, [{ id: lineItemId, quantity }]);
      setCheckout(updated);
      return updated;
    } finally {
      setLoading(false);
    }
  };

  const goToCheckout = () => {
    if (checkout?.webUrl) window.location.href = checkout.webUrl;
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