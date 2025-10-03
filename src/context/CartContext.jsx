import React, { createContext, useContext, useEffect, useState } from 'react';
import { shopifyClient, ensureCheckout } from '../lib/shopify';
import { SHOPIFY_READY } from '../lib/env';

if (!SHOPIFY_READY) {
  console.error('[CALYCO] Shopify env not configured');
}

const CartCtx = createContext(null);
export const useCart = () => useContext(CartCtx);

export default function CartProvider({ children }) {
  const [checkout, setCheckout] = useState(null);
  const [loading, setLoading] = useState(false);

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

  return (
    <CartCtx.Provider value={{ checkout, add, remove, updateQty, goToCheckout, loading }}>
      {children}
    </CartCtx.Provider>
  );
} 