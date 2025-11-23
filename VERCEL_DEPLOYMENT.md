# Vercel Deployment Guide

## Overview

Your frontend is deployed on Vercel. Here's how to configure it to work with the new Razorpay checkout system.

---

## Vercel Environment Variables

### Current Setup (Update These in Vercel Dashboard)

Go to: **Vercel Dashboard** → **Your Project** → **Settings** → **Environment Variables**

### Required Variables

```env
# Razorpay Configuration
VITE_RAZORPAY_ID=rzp_live_RDuFvuUpRHpLsF

# Backend API URL
VITE_API_URL=https://your-backend-api-url.com
```

### Variables to Remove

These Shopify variables are no longer needed:
- ❌ `VITE_SHOPIFY_STOREFRONT_DOMAIN`
- ❌ `VITE_SHOPIFY_STOREFRONT_TOKEN`
- ❌ `REACT_APP_SHOPIFY_STOREFRONT_DOMAIN`
- ❌ `REACT_APP_SHOPIFY_STOREFRONT_TOKEN`

---

## Deployment Architecture

```
┌──────────────┐         ┌──────────────┐         ┌──────────────┐
│   Vercel     │────────▶│   Backend    │────────▶│  Razorpay    │
│  (Frontend)  │         │  API Server  │         │     API      │
└──────────────┘         └──────────────┘         └──────────────┘
      │                        │
      │                        │
      ▼                        ▼
 Static Site            Order Storage
                        (Database)
```

---

## Step-by-Step Deployment

### 1. Deploy Backend First

You need to deploy your backend API server before the frontend can work.

**Recommended Platforms:**

#### Option A: Railway (Easiest)
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Initialize project
cd server
railway init

# Add environment variables in Railway dashboard
# Deploy
railway up
```

**Railway Environment Variables:**
```env
PORT=3001
NODE_ENV=production
CLIENT_URL=https://your-vercel-app.vercel.app

RAZORPAY_KEY_ID=rzp_live_RDuFvuUpRHpLsF
RAZORPAY_KEY_SECRET=sAGgD4hEoV5NRDkMulfSYOck
```

**Get your backend URL:** `https://your-app.up.railway.app`

#### Option B: Render
1. Go to [render.com](https://render.com)
2. Create new **Web Service**
3. Connect your GitHub repo
4. Set **Root Directory**: `server`
5. **Build Command**: `npm install`
6. **Start Command**: `npm start`
7. Add environment variables

#### Option C: Heroku
```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
cd server
heroku create calyco-api

# Set environment variables
heroku config:set RAZORPAY_KEY_ID=rzp_live_RDuFvuUpRHpLsF
heroku config:set RAZORPAY_KEY_SECRET=sAGgD4hEoV5NRDkMulfSYOck
heroku config:set NODE_ENV=production
heroku config:set CLIENT_URL=https://your-vercel-app.vercel.app

# Deploy
git push heroku main
```

**Get your backend URL:** `https://calyco-api.herokuapp.com`

---

### 2. Update Vercel Environment Variables

Once backend is deployed:

1. Go to **Vercel Dashboard**
2. Select your project
3. Go to **Settings** → **Environment Variables**

**Add/Update these variables:**

| Variable | Value | Environment |
|----------|-------|-------------|
| `VITE_RAZORPAY_ID` | `rzp_live_RDuFvuUpRHpLsF` | Production |
| `VITE_API_URL` | `https://your-backend-url.com` | Production |

**Example:**
```env
VITE_RAZORPAY_ID=rzp_live_RDuFvuUpRHpLsF
VITE_API_URL=https://calyco-api.up.railway.app
```

---

### 3. Redeploy Frontend on Vercel

After updating environment variables:

```bash
# Trigger new deployment
git commit --allow-empty -m "Update environment variables"
git push
```

Or manually trigger in Vercel Dashboard:
1. Go to **Deployments**
2. Click **Redeploy** on latest deployment
3. Check **"Use existing Build Cache"** = NO

---

## Backend Deployment Checklist

### Before Deploying Backend

- [ ] Backend code is in `server/` directory
- [ ] `server/package.json` exists
- [ ] All dependencies installed locally and tested
- [ ] Environment variables ready

### Deployment Configuration

**Required Files:**

1. **`server/package.json`** - Must have:
   ```json
   {
     "type": "module",
     "scripts": {
       "start": "node index.js",
       "dev": "node --watch index.js"
     }
   }
   ```

2. **Environment Variables** (on hosting platform):
   - `RAZORPAY_KEY_ID`
   - `RAZORPAY_KEY_SECRET`
   - `NODE_ENV=production`
   - `CLIENT_URL` (your Vercel URL)
   - `PORT` (optional, usually auto-assigned)

### After Deployment

- [ ] Backend URL is accessible
- [ ] Test health endpoint: `curl https://your-backend.com/health`
- [ ] Update Vercel `VITE_API_URL` with backend URL
- [ ] Redeploy Vercel frontend
- [ ] Test checkout flow on production

---

## CORS Configuration

Your backend needs to allow requests from Vercel. This is already configured in `server/index.js`:

```javascript
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
```

**Make sure `CLIENT_URL` is set correctly** on your backend hosting platform:
```env
CLIENT_URL=https://your-vercel-app.vercel.app
```

---

## Database Migration (Recommended for Production)

The current setup uses JSON file storage, which won't work well in serverless/stateless environments.

### Option 1: MongoDB Atlas (Recommended)

1. **Sign up**: [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. **Create free cluster**
3. **Get connection string**
4. **Update `OrderService.js`**:

```javascript
import { MongoClient } from 'mongodb';

export class OrderService {
  constructor() {
    this.client = new MongoClient(process.env.MONGODB_URI);
    this.db = this.client.db('calyco');
    this.orders = this.db.collection('orders');
  }

  async createOrder(orderData) {
    const order = {
      ...orderData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    const result = await this.orders.insertOne(order);
    return { ...order, _id: result.insertedId };
  }

  async getOrder(orderId) {
    return await this.orders.findOne({ id: orderId });
  }

  // ... other methods
}
```

5. **Add dependency**:
   ```bash
   cd server
   npm install mongodb
   ```

6. **Add environment variable**:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/calyco
   ```

---

## Production Checklist

### Security
- [ ] HTTPS enabled on backend
- [ ] HTTPS enabled on frontend (Vercel does this automatically)
- [ ] Environment variables secured
- [ ] CORS properly configured
- [ ] Rate limiting enabled (recommended)

### Testing
- [ ] Test order creation
- [ ] Test payment with real card (small amount)
- [ ] Verify order stored in database
- [ ] Test payment verification
- [ ] Check Razorpay dashboard for payment

### Monitoring
- [ ] Set up error tracking (Sentry, LogRocket)
- [ ] Set up uptime monitoring (UptimeRobot)
- [ ] Configure logging service
- [ ] Set up alerts for payment failures

---

## Quick Reference

### Current Environment Variables

**Local Development:**
```env
# Frontend (.env)
VITE_RAZORPAY_ID=rzp_live_RDuFvuUpRHpLsF
VITE_API_URL=http://localhost:3001

# Backend (server/.env)
RAZORPAY_KEY_ID=rzp_live_RDuFvuUpRHpLsF
RAZORPAY_KEY_SECRET=sAGgD4hEoV5NRDkMulfSYOck
PORT=3001
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

**Production:**
```env
# Vercel (Frontend)
VITE_RAZORPAY_ID=rzp_live_RDuFvuUpRHpLsF
VITE_API_URL=https://your-backend-url.com

# Backend Hosting (Railway/Render/Heroku)
RAZORPAY_KEY_ID=rzp_live_RDuFvuUpRHpLsF
RAZORPAY_KEY_SECRET=sAGgD4hEoV5NRDkMulfSYOck
NODE_ENV=production
CLIENT_URL=https://your-vercel-app.vercel.app
```

---

## Troubleshooting

### "Cannot connect to backend"
- Check `VITE_API_URL` in Vercel
- Verify backend is deployed and running
- Check backend health: `curl https://your-backend.com/health`
- Check CORS configuration

### "Payment verification failed"
- Check `RAZORPAY_KEY_SECRET` on backend
- Verify signature generation matches Razorpay docs
- Check backend logs for errors

### "Orders not persisting"
- If using JSON storage, it won't work on some platforms
- Migrate to database (MongoDB/PostgreSQL)
- Check file permissions

---

## Cost Estimate

### Current Setup
- **Vercel**: Free tier (sufficient for most sites)
- **Backend**: $0-5/month (Railway/Render free tier)
- **Razorpay**: 2% per transaction
- **Database**: Free tier (MongoDB Atlas)

### Total Monthly Cost
- **Development**: $0
- **Production (low traffic)**: $0-5/month
- **Production (high traffic)**: $5-20/month

---

## Support & Resources

- **Vercel Docs**: https://vercel.com/docs
- **Railway Docs**: https://docs.railway.app
- **Render Docs**: https://render.com/docs
- **Razorpay Docs**: https://razorpay.com/docs

---

## Summary

1. ✅ Deploy backend to Railway/Render/Heroku
2. ✅ Get backend URL
3. ✅ Update `VITE_API_URL` in Vercel
4. ✅ Redeploy frontend on Vercel
5. ✅ Test checkout flow
6. ✅ Monitor for errors

**You're ready to go live!** 🚀
