# Shopify to Razorpay Migration Guide

## Overview

This document explains what changed during the migration from Shopify checkout to Razorpay direct checkout.

---

## What Changed

### Before (Shopify)
```
Cart → Shopify API → Shopify Checkout → Shopify Payment → Redirect Back
```

### After (Razorpay)
```
Cart → Your Backend → Razorpay Payment → Order Stored Locally
```

---

## Files Modified

### ✅ Removed/Replaced

| File | Status | Notes |
|------|--------|-------|
| `src/config/shopify.js` | ❌ No longer used | Shopify API configuration |
| `src/lib/shopify.js` | ❌ No longer used | Shopify GraphQL client |
| `src/hooks/useShopifyCheckout.js` | ❌ No longer used | Shopify checkout hook |
| `src/components/ShopifyCheckoutButton.jsx` | ❌ No longer used | Shopify button component |
| `src/context/CartContext.jsx` | ✅ Replaced | Removed all Shopify dependencies |

**Backups Created:**
- `src/context/CartContext.shopify.backup.jsx` - Original Shopify version

### ✅ Created

| File | Purpose |
|------|---------|
| `server/index.js` | Express API server |
| `server/routes/paymentRoutes.js` | Razorpay payment endpoints |
| `server/routes/orderRoutes.js` | Order management endpoints |
| `server/services/OrderService.js` | Order storage and retrieval |
| `server/package.json` | Backend dependencies |

### ✅ Updated

| File | Changes |
|------|---------|
| `src/services/paymentService.js` | Now calls backend API instead of direct Razorpay |
| `src/components/RazorpayPayment.jsx` | Now accepts `orderId` prop |
| `src/pages/Checkout.jsx` | Integrated with backend API |
| `.env.example` | Removed Shopify vars, added API URL |

---

## Product Data Changes

### Before
```javascript
{
  "id": "PremiumInteriorEmulsion",
  "priceByFinish": {
    "Low Sheen": {
      "1L": {
        "price": 600,
        "variantId": "gid://shopify/ProductVariant/42663690600566"  // ← Shopify ID
      }
    }
  }
}
```

### After
```javascript
{
  "id": "PremiumInteriorEmulsion",
  "priceByFinish": {
    "Low Sheen": {
      "1L": {
        "price": 600
        // ← No Shopify variant ID needed!
      }
    }
  }
}
```

**Note:** You can remove `variantId` fields from product data, but keeping them won't break anything.

---

## Cart Behavior Changes

### Before (Shopify)
- Cart synced with Shopify API
- Required network connection for cart operations
- Shopify variant IDs required
- Checkout redirected to Shopify's hosted page

### After (Razorpay)
- Cart stored in browser localStorage only
- Works offline until checkout
- No variant IDs needed
- Checkout happens on your own page

---

## Checkout Flow Comparison

### Before (Shopify Checkout)

```javascript
// Old CartContext.jsx
const goToCheckout = async () => {
  // 1. Create Shopify cart
  const cart = await createCart({ lines });

  // 2. Redirect to Shopify's checkout page
  window.location.href = cart.checkoutUrl;

  // 3. Customer completes payment on Shopify
  // 4. Shopify handles everything
  // 5. Redirect back to your site (maybe)
};
```

### After (Razorpay Checkout)

```javascript
// New CartContext.jsx
const goToCheckout = () => {
  // 1. Navigate to your own checkout page
  navigate('/checkout');
};

// In Checkout.jsx
const handlePayment = async () => {
  // 2. Create order in your database
  const order = await createOrderRecord({...});

  // 3. Create Razorpay order
  const rzpOrder = await createOrder(amount);

  // 4. Show Razorpay payment modal
  setShowRazorpayPayment(true);

  // 5. Verify payment on your backend
  const verified = await verifyPayment(response);

  // 6. Update order status
  await updateOrderStatus(orderId, 'paid');
};
```

---

## Environment Variables

### Before
```env
VITE_SHOPIFY_STOREFRONT_DOMAIN=calycopaints.myshopify.com
VITE_SHOPIFY_STOREFRONT_TOKEN=your_token_here
VITE_RAZORPAY_ID=your_razorpay_key
```

### After
```env
VITE_RAZORPAY_ID=your_razorpay_key
VITE_API_URL=http://localhost:3001
```

### New Backend Variables
```env
# server/.env
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
PORT=3001
CLIENT_URL=http://localhost:5173
```

---

## Database/Storage

### Before
- Orders stored in Shopify
- Accessed via Shopify Admin
- Shopify handled inventory

### After
- Orders stored in `server/data/orders.json`
- Can be viewed/managed via custom admin panel
- You handle inventory (TODO)

---

## Benefits of Migration

### ✅ Cost Savings
- No Shopify transaction fees (2% + payment gateway fees)
- Pay only Razorpay fees (2% on domestic cards)

### ✅ Control
- Own your customer data
- Custom checkout experience
- No platform lock-in

### ✅ Flexibility
- Add custom payment options
- Implement custom discount logic
- Build custom admin dashboard

### ✅ Performance
- No Shopify API delays
- Faster cart operations
- Local storage = instant updates

---

## What You Lost (Tradeoffs)

### ❌ Shopify Features
- Built-in inventory management
- Automatic stock tracking
- Shopify admin dashboard
- Multi-channel selling
- Abandoned cart emails
- Fraud detection

### ℹ️ What You Need to Build
- Order management dashboard
- Inventory tracking system
- Email notifications
- Analytics/reporting

---

## Migration Checklist

If migrating an existing site:

- [ ] Backup current codebase
- [ ] Set up Razorpay account
- [ ] Create backend server
- [ ] Configure environment variables
- [ ] Test payment flow in test mode
- [ ] Migrate product data (remove variant IDs)
- [ ] Test cart operations
- [ ] Test checkout with test cards
- [ ] Verify order creation
- [ ] Switch to live Razorpay keys
- [ ] Deploy backend to production
- [ ] Update frontend API URL
- [ ] Monitor for errors

---

## Rollback Plan

If you need to revert to Shopify:

1. **Restore Old Files**
   ```bash
   cp src/context/CartContext.shopify.backup.jsx src/context/CartContext.jsx
   ```

2. **Restore Environment Variables**
   ```env
   VITE_SHOPIFY_STOREFRONT_DOMAIN=calycopaints.myshopify.com
   VITE_SHOPIFY_STOREFRONT_TOKEN=your_token
   ```

3. **Remove Backend Dependencies**
   - Stop backend server
   - Revert checkout page changes

---

## Code Examples

### Old: Adding to Shopify Cart
```javascript
const addToCart = async (product, size, quantity) => {
  const variantId = product.shopify_variant_map[size];

  const cart = await createCart({
    lines: [{
      merchandiseId: variantId,
      quantity
    }]
  });

  syncCart(cart);
};
```

### New: Adding to Local Cart
```javascript
const addToCart = async (product, size, quantity) => {
  const item = createLocalCartItem({
    product,
    size,
    quantity,
    price: product.priceByFinish[finish][size].price
  });

  setItems(prev => [...prev, item]);
  // Automatically saved to localStorage
};
```

---

## Testing

### Test Checklist

- [ ] Add product to cart
- [ ] Update cart quantity
- [ ] Remove from cart
- [ ] Clear cart
- [ ] Navigate to checkout
- [ ] Fill customer details
- [ ] Complete payment (test mode)
- [ ] Verify order created
- [ ] Check order in `server/data/orders.json`
- [ ] Verify payment in Razorpay dashboard

---

## Support & Resources

- **Razorpay Docs**: https://razorpay.com/docs/
- **Express.js Docs**: https://expressjs.com/
- **Migration Issues**: Create GitHub issue or contact dev team

---

## Summary

**Before**: Shopify handled everything, but you paid fees and had limited control.

**After**: You control everything, save on fees, but need to build some features yourself.

This migration gives you:
- 💰 Lower costs
- 🎨 Full customization
- 📊 Own your data
- 🚀 Better performance

Trade-offs:
- 🛠️ More maintenance
- 📝 Need to build admin tools
- 🔧 Responsible for infrastructure

Choose based on your needs and technical capabilities!
