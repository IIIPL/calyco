import React, { createContext, useCallback, useContext, useEffect, useMemo, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const CartContext = createContext(undefined);

const LOCAL_CART_STORAGE_KEY = 'calycoLocalCart';

const DEFAULT_COLOR = {
  name: 'Serene Ivory',
  hex: '#F8F4E3',
  code: '',
  family: '',
};

const isPaintProductType = (productType = 'paint') =>
  productType === 'paint' || productType === 'ready-mixed' || productType === 'tint-on-demand';

const normaliseColor = (color = {}, productType = 'paint') => {
  const isPaintProduct = isPaintProductType(productType);

  if (!isPaintProduct) {
    // For non-paint products, only return color if explicitly provided
    if (!color || (!color.name && !color.colorName && !color.hex && !color.colorHex)) {
      return null;
    }
  }

  return {
    name: color.name || color.colorName || (isPaintProduct ? DEFAULT_COLOR.name : ''),
    hex: color.hex || color.colorHex || (isPaintProduct ? DEFAULT_COLOR.hex : ''),
    code: color.code || color.tintCode || color.colorCode || DEFAULT_COLOR.code,
    family: color.family || color.colorFamily || DEFAULT_COLOR.family,
  };
};

const localItemKey = (item) => {
  const colour = normaliseColor(item.selectedColor, item.productType);
  return [item.id, item.selectedSheen || '', item.selectedSize || '', colour?.name || ''].join('|');
};

const createLocalCartItem = ({ product, price, finish, size, quantity, color, productType, mixingMode }) => {
  const actualProductType = product?.productType || productType || 'paint';
  const isPaintProduct = isPaintProductType(actualProductType);
  const normalisedColor = isPaintProduct ? normaliseColor(color, actualProductType) : null;
  return {
    id: product?.id || product?.slug || product?.name || Math.random().toString(36).slice(2),
    name: product?.display_name || product?.name || 'Calyco Paint',
    price: parseFloat(price) || 0,
    selectedSheen: finish || '',
    selectedSize: size || '',
    selectedColorType: productType || 'paint',
    quantity: Math.max(1, parseInt(quantity, 10) || 1),
    image: product?.image || product?.bucketImage || '/Assets/chair.png',
    selectedColor: normalisedColor,
    requiresShipping: product?.requiresShipping !== false, // Default to true unless explicitly false
    productType: actualProductType,
    mixingMode: mixingMode || null, // Store mixing mode (ready-mixed or tint-on-demand)
  };
};

export const CartProvider = ({ children }) => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [initialised, setInitialised] = useState(false);
  const itemsRef = useRef(items);

  // Load cart from localStorage on mount
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
          // Migrate existing cart items to fix color data for non-paint products
          const migratedItems = parsed.items.map(item => {
            const itemProductType = item.productType || 'paint';
            const isPaintProduct = itemProductType === 'paint' || itemProductType === 'ready-mixed' || itemProductType === 'tint-on-demand';

            // If it's not a paint product, remove color data
            if (!isPaintProduct && item.selectedColor) {
              return {
                ...item,
                selectedColor: null,
              };
            }

            return item;
          });

          setItems(migratedItems);
        }
      }
    } catch (err) {
      console.warn('[CALYCO] Failed to parse local cart', err);
    } finally {
      setInitialised(true);
    }
  }, []);

  useEffect(() => {
    loadLocalCart();
  }, [loadLocalCart]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (initialised && typeof window !== 'undefined') {
      window.localStorage.setItem(LOCAL_CART_STORAGE_KEY, JSON.stringify({ items }));
    }
    // Update ref to always have current items
    itemsRef.current = items;
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
      const productType = options.productType || selectedColorType || 'paint';
      const colour = normaliseColor(selectedColor || {}, productType);
      const basePrice = priceOverride !== undefined ? priceOverride : product?.price;
      const mixingMode = options.mixingMode || selectedColorType; // Use mixingMode from options, or fall back to selectedColorType for backward compatibility

      const localItem = createLocalCartItem({
        product,
        price: basePrice,
        finish: selectedSheen,
        size: selectedSize,
        quantity: normalisedQuantity,
        color: colour,
        productType,
        mixingMode,
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

      return { success: true, quantity: normalisedQuantity };
    },
    [],
  );

  const removeFromCart = useCallback(
    async (item) => {
      const key = localItemKey(item || {});
      setItems((prev) => prev.filter((existing) => localItemKey(existing) !== key));
    },
    [],
  );

  const updateQuantity = useCallback(
    async (item, quantity) => {
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
    [],
  );

  const clearCart = useCallback(async () => {
    setItems([]);
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(LOCAL_CART_STORAGE_KEY);
    }
  }, []);

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

  const goToCheckout = useCallback(() => {
    console.log('[CALYCO] Navigating to checkout page');

    // Use ref to get the most current items, not the closure value
    const currentItems = itemsRef.current;
    console.log('[CALYCO] Current items in cart:', currentItems);

    if (!currentItems || currentItems.length === 0) {
      console.error('[CALYCO] Cart is empty!');
      alert('Your cart is empty. Please add items before checkout.');
      return null;
    }

    // Navigate to checkout page
    navigate('/checkout');
  }, [navigate]);

  const value = {
    items,
    loading,
    error,
    initialised,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemCount,
    goToCheckout,
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
