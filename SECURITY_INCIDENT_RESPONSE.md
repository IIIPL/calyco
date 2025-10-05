# 🚨 SECURITY INCIDENT - SHOPIFY TOKEN EXPOSED

## ⚠️ STATUS: PARTIALLY RESOLVED

**Date:** October 4th, 2025
**Incident:** Shopify Storefront Access Token exposed in public GitHub repository
**Severity:** HIGH
**Token Exposed:** `78f2d102a709a99eeeb63ede0784c998`

---

## ✅ COMPLETED STEPS:

1. ✅ Removed `.env` from git tracking
2. ✅ Committed removal to repository
3. ✅ Pushed changes to GitHub

---

## 🔴 CRITICAL STEPS YOU MUST DO NOW:

### **Step 1: Revoke the Exposed Token (URGENT!)**

The old token is still active and can be used by anyone who saw it!

**How to revoke:**

1. Go to **Shopify Admin Panel**
2. Navigate to: **Settings** → **Apps and sales channels**
3. Click **Develop apps** (or "App development")
4. Find your Storefront API app
5. Click **API credentials** tab
6. Find **Storefront API access token**
7. Click **Revoke** or **Delete** on the old token
8. Click **Create new Storefront API access token**
9. **Copy the new token** (you'll only see it once!)

### **Step 2: Update Your Local .env File**

Create a new `.env` file (it's now ignored by git):

```bash
# Copy from .env.example
cp .env.example .env

# Edit .env and add your NEW token:
nano .env  # or use your editor
```

Your `.env` should have:
```bash
VITE_SHOPIFY_STOREFRONT_DOMAIN=calycopaints.myshopify.com
VITE_SHOPIFY_STOREFRONT_TOKEN=YOUR_NEW_TOKEN_HERE

REACT_APP_SHOPIFY_STOREFRONT_DOMAIN=calycopaints.myshopify.com
REACT_APP_SHOPIFY_STOREFRONT_TOKEN=YOUR_NEW_TOKEN_HERE
```

### **Step 3: Update Production Environment Variables**

If deployed to Vercel/Netlify/etc:

**Vercel:**
1. Go to project settings
2. Environment Variables
3. Edit `VITE_SHOPIFY_STOREFRONT_TOKEN`
4. Replace with NEW token
5. Redeploy

**Netlify:**
1. Site settings → Environment variables
2. Edit `VITE_SHOPIFY_STOREFRONT_TOKEN`
3. Replace with NEW token
4. Trigger new deploy

### **Step 4: Restart Your Dev Server**

```bash
# Stop current server (Ctrl+C)
# Start again to load new token
npm run dev
```

### **Step 5: Verify New Token Works**

1. Add Nova to cart
2. Click checkout
3. Check console for:
   ```
   [CALYCO] Shopify env → domain: calycopaints.myshopify.com token set: true
   ```
4. Should redirect to Shopify checkout ✅

---

## 🔒 SECURITY BEST PRACTICES (PREVENT THIS IN FUTURE):

### ✅ DO:
- ✅ Keep `.env` in `.gitignore` (already done)
- ✅ Use `.env.example` for documentation (already done)
- ✅ Rotate tokens regularly (every 3-6 months)
- ✅ Use different tokens for dev/staging/production
- ✅ Store production secrets in hosting platform only

### ❌ DON'T:
- ❌ Never commit `.env` to git
- ❌ Never share tokens in Slack/email/screenshots
- ❌ Never hardcode tokens in source code
- ❌ Never use production tokens in development

---

## 📋 INCIDENT TIMELINE:

1. **October 4th, 09:29 UTC** - Token committed to public repo
2. **October 4th, ~09:30 UTC** - GitGuardian detected exposure
3. **October 4th, ~14:53 IST** - `.env` removed from git
4. **Pending** - Token revocation in Shopify
5. **Pending** - New token generation
6. **Pending** - Production environment update

---

## 🎯 VERIFICATION CHECKLIST:

After completing all steps, verify:

- [ ] Old token revoked in Shopify Admin
- [ ] New token generated and copied
- [ ] Local `.env` updated with new token
- [ ] Production environment variables updated
- [ ] Dev server restarted
- [ ] Checkout flow tested and working
- [ ] GitGuardian alert marked as resolved

---

## 📞 SUPPORT:

**If you need help:**
- Shopify Support: https://help.shopify.com/
- GitGuardian: Mark incident as resolved after token rotation

---

## 🔐 TOKEN SECURITY LEVELS:

**Storefront API Token:**
- ✅ Can read products, collections, checkout
- ✅ Can create checkout sessions
- ❌ Cannot access customer data
- ❌ Cannot access admin functions
- ⚠️ **Risk:** Someone could create fake checkouts, but cannot steal customer data

**Impact of exposure:**
- 🟡 Medium risk - Limited access scope
- 🟢 No customer data at risk
- 🟢 No payment data at risk
- 🟡 Could create spam checkouts
- 🔴 Should still be rotated immediately

---

## ✅ AFTER COMPLETING ALL STEPS:

Delete this file or move it to a `security/incidents/` folder for records.

**Status will be RESOLVED when:**
1. ✅ Old token revoked
2. ✅ New token deployed
3. ✅ Checkout tested and working
4. ✅ GitGuardian alert closed

---

**Generated:** October 4th, 2025
**Last Updated:** October 4th, 2025
