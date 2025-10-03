# ⚠️ IMPORTANT: Environment Variables Not Loading?

## The Problem
Environment variables in `.env` are only loaded when the dev server **starts**. If you add them while the server is running, they won't be available.

## ✅ Solution: Restart Your Dev Server

### Step 1: Stop the current server
Press `Ctrl + C` in the terminal where `npm run dev` is running

### Step 2: Start the server again
```bash
npm run dev
```

### Step 3: Verify environment variables loaded
Open browser console and look for:
```
[CALYCO] Shopify env → domain: calycopaints.myshopify.com token set: true
```

If you see `domain: ` (empty) or `token set: false`, the env vars are NOT loaded.

## 🔍 Check Environment Variables

### In Browser Console:
```javascript
// This should show your domain
console.log(import.meta.env.VITE_SHOPIFY_STOREFRONT_DOMAIN)

// This should show your token
console.log(import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN)
```

## 📋 Current .env Setup

Your `.env` file should have:
```bash
# Shopify Storefront API (using VITE_ prefix for Vite)
VITE_SHOPIFY_STOREFRONT_DOMAIN=calycopaints.myshopify.com
VITE_SHOPIFY_STOREFRONT_TOKEN=78f2d102a709a99eeeb63ede0784c998

# Shopify Storefront API (REACT_APP_ prefix for backwards compatibility)
REACT_APP_SHOPIFY_STOREFRONT_DOMAIN=calycopaints.myshopify.com
REACT_APP_SHOPIFY_STOREFRONT_TOKEN=78f2d102a709a99eeeb63ede0784c998
```

## 🚨 Common Issues

### Issue 1: "domain: " (empty string)
**Cause:** Environment variables not loaded
**Fix:** Restart dev server (`Ctrl+C` then `npm run dev`)

### Issue 2: "SHOPIFY_READY: false"
**Cause:** Domain or token is missing
**Fix:** Check `.env` file has both domain and token, then restart server

### Issue 3: Still redirects to /checkout
**Cause:** Shopify client can't initialize
**Fix:**
1. Check browser console for `[CALYCO]` logs
2. Look for errors
3. Verify env vars loaded

## 📝 Quick Test

After restarting server:

1. **Open browser console** (F12)
2. **Run this:**
   ```javascript
   console.log('Domain:', import.meta.env.VITE_SHOPIFY_STOREFRONT_DOMAIN);
   console.log('Token:', import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN ? 'SET' : 'NOT SET');
   ```
3. **You should see:**
   ```
   Domain: calycopaints.myshopify.com
   Token: SET
   ```

If you see `undefined` or `NOT SET`, the server didn't pick up the env vars.

## ✅ Expected Flow (After Restart)

1. Start server: `npm run dev`
2. See in terminal/console: `[CALYCO] Shopify env → domain: calycopaints.myshopify.com token set: true`
3. Add Nova to cart
4. Click checkout
5. See Shopify checkout logs in console
6. Redirect to Shopify

## 🆘 Still Not Working?

Run this in browser console when on the site:
```javascript
// Check what env vars are available
console.log('All VITE env vars:', import.meta.env);

// Check Shopify specifically
const checkShopify = async () => {
  const { SHOPIFY_READY } = await import('./src/lib/env.js');
  console.log('SHOPIFY_READY:', SHOPIFY_READY);
};
checkShopify();
```

Send me the output!
