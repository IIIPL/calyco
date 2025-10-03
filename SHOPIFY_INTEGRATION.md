# Shopify Checkout Integration

## Overview

This project uses a **lazy-loaded Shopify integration** to prevent performance issues while still enabling Shopify checkout for specific products.

## How It Works

### 1. **Lazy Loading Strategy**
- Shopify client is **NOT** loaded on initial page load
- Only loads when user clicks "Checkout" button
- This prevents the 5-minute load time issue

### 2. **Smart Checkout Routing**

When user clicks checkout:
1. **Check cart contents** - Are there Shopify products (Nova/CALYCO Interior)?
2. **Load Shopify dynamically** - Import Shopify client only if needed
3. **Create checkout** - Add items with custom properties (Sheen, Color, Size)
4. **Redirect** - Either to Shopify checkout OR fallback `/checkout` page

### 3. **Product Mapping**

Products are mapped to Shopify variants in:
- `src/context/CartContext.jsx` (goToCheckout function)
- `src/hooks/useShopifyCheckout.js` (getVariantId function)

**Current Shopify Products:**
- **Nova / CALYCO Interior Latex Paint**
  - 1L: `gid://shopify/ProductVariant/42585860702326`
  - 4L: `gid://shopify/ProductVariant/42585863258230`
  - 10L: `gid://shopify/ProductVariant/42585863290998`
  - 20L: `gid://shopify/ProductVariant/42585863323766`

## Adding New Products to Shopify

### Step 1: Add Product to Shopify Store
1. Go to Shopify Admin → Products
2. Create product with variants (1L, 4L, 10L, 20L)
3. Copy the variant IDs (Admin API → GraphQL ID)

### Step 2: Update Code Mapping

Add to `src/context/CartContext.jsx`:

```javascript
const lineItems = state.items
  .filter(item =>
    item.id === 'nova' ||
    item.id === 'your-new-product-id' ||  // ADD THIS
    item.name?.includes('Nova') ||
    item.name?.includes('Your New Product')  // ADD THIS
  )
  .map(item => {
    const sizeMap = {
      '1L': item.id === 'nova'
        ? 'gid://shopify/ProductVariant/42585860702326'
        : 'gid://shopify/ProductVariant/YOUR_NEW_1L_ID',  // ADD THIS
      '4L': item.id === 'nova'
        ? 'gid://shopify/ProductVariant/42585863258230'
        : 'gid://shopify/ProductVariant/YOUR_NEW_4L_ID',  // ADD THIS
      // ... etc
    };
    // ...
  });
```

### Step 3: Update Shopify Check

In `goToCheckout` function:

```javascript
const hasShopifyProducts = state.items.some(item =>
  item.id === 'nova' ||
  item.id === 'your-new-product-id' ||  // ADD THIS
  item.name?.includes('Nova') ||
  item.name?.includes('Your New Product')  // ADD THIS
);
```

## Environment Variables

Required in `.env`:

```bash
REACT_APP_SHOPIFY_STOREFRONT_DOMAIN=calycopaints.myshopify.com
REACT_APP_SHOPIFY_STOREFRONT_TOKEN=78f2d102a709a99eeeb63ede0784c998
```

Or for Vite:

```bash
VITE_SHOPIFY_STOREFRONT_DOMAIN=calycopaints.myshopify.com
VITE_SHOPIFY_STOREFRONT_TOKEN=78f2d102a709a99eeeb63ede0784c998
```

## Using the Checkout Button

### Option 1: Use Cart Context (Recommended)

```jsx
import { useCart } from '../context/CartContext';

function MyComponent() {
  const { goToCheckout } = useCart();

  return (
    <button onClick={goToCheckout}>
      Checkout
    </button>
  );
}
```

### Option 2: Use ShopifyCheckoutButton Component

```jsx
import ShopifyCheckoutButton from '../components/ShopifyCheckoutButton';

function MyComponent() {
  return (
    <ShopifyCheckoutButton className="btn-primary">
      Proceed to Checkout
    </ShopifyCheckoutButton>
  );
}
```

## Custom Line-Item Properties

When items are sent to Shopify, they include:
- **Sheen** - Paint finish (Gloss, Matte, etc.)
- **Color Family** - Color family name
- **Color** - Specific color name

These appear in Shopify orders as line item properties.

## Testing Checkout Flow

1. Add Nova/CALYCO Interior product to cart
2. Select sheen, size, and color
3. Click "Checkout"
4. Should redirect to Shopify checkout
5. Verify line-item properties are visible in Shopify order

## Troubleshooting

### "Shopify checkout failed" error
- Check browser console for detailed error
- Verify environment variables are set
- Check Shopify Storefront API token permissions

### Redirects to /checkout instead of Shopify
- Check if product ID matches in `goToCheckout` function
- Verify variant IDs are correct
- Check browser console for errors

### Slow page load
- Make sure Shopify imports are **only** in `goToCheckout` function
- Never import shopify-buy at the top level of components
- Use dynamic `import()` statements only

## File Structure

```
src/
├── lib/
│   ├── env.js                    # Environment variable handling
│   └── shopify.js                # Shopify client (lazy-loadable)
├── hooks/
│   └── useShopifyCheckout.js     # Reusable checkout hook
├── context/
│   └── CartContext.jsx           # Cart with lazy Shopify integration
└── components/
    └── ShopifyCheckoutButton.jsx # Smart checkout button
```

## Performance Notes

✅ **Good:**
- Shopify loaded only on checkout click
- Dynamic imports keep initial bundle small
- Fallback to /checkout if Shopify fails

❌ **Bad (Don't do this):**
```javascript
// DON'T import at top level of components
import { shopifyClient } from '../lib/shopify';  // ❌ Causes slow load

// DO use dynamic import
const { shopifyClient } = await import('../lib/shopify');  // ✅ Fast
```
