import { createContext, useContext, useReducer, useEffect } from 'react';
import { toast } from '../ui/toast';

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

  const addToCart = (product, selectedSheen, selectedSize, quantity, priceOverride, selectedColor) => {
    const defaultColor = { name: "Serene Ivory", hex: "#F8F4E3" };
  
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        id: product.id,
        name: product.display_name || product.name,
        price: priceOverride !== undefined ? priceOverride : product.price,
        selectedSheen,
        selectedSize,
        quantity,
        image: product.images[0],
        selectedColor: selectedColor || defaultColor
      }
    });
  
    // Toast
    const title = product.display_name || product.name;
    toast(`Added to cart: ${title}`);
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
      payload: { ...item, quantity }
    });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getCartTotal = () => {
    return state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemCount = () => {
    return state.items.reduce((count, item) => count + item.quantity, 0);
  };

  const value = {
    items: state.items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemCount
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