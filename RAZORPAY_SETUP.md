# Razorpay Payment Integration Setup Guide

## Overview

This guide will help you set up the complete Razorpay payment integration for Calyco Paints. The checkout system now uses Razorpay instead of Shopify for payment processing.

---

## Architecture

The system consists of two parts:

1. **Frontend (React/Vite)** - Customer-facing checkout UI
2. **Backend (Node.js/Express)** - Order management and payment verification

```
┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│   Customer  │────────▶│   Frontend  │────────▶│   Backend   │
│   Browser   │         │   (Vite)    │         │  (Express)  │
└─────────────┘         └─────────────┘         └─────────────┘
                              │                        │
                              │                        │
                              ▼                        ▼
                        ┌─────────────┐         ┌─────────────┐
                        │  Razorpay   │◀────────│  Razorpay   │
                        │   Checkout  │         │     API     │
                        └─────────────┘         └─────────────┘
```

---

## Prerequisites

1. **Razorpay Account** - Sign up at [https://razorpay.com](https://razorpay.com)
2. **Node.js** - Version 18+ installed
3. **npm** - Package manager

---

## Part 1: Razorpay Setup

### 1. Create Razorpay Account

1. Go to [https://razorpay.com](https://razorpay.com)
2. Sign up for a new account
3. Complete KYC verification (required for live payments)

### 2. Get API Keys

1. Log in to Razorpay Dashboard
2. Navigate to **Settings** → **API Keys**
3. Click **Generate Test Keys** (for development)
4. Copy both:
   - **Key ID** (starts with `rzp_test_`)
   - **Key Secret** (keep this secure!)

> ⚠️ **Security Note**: Never commit your Key Secret to version control!

---

## Part 2: Backend Setup

### 1. Install Backend Dependencies

```bash
cd server
npm install
```

This installs:
- `express` - Web framework
- `razorpay` - Razorpay SDK
- `cors` - Cross-origin requests
- `dotenv` - Environment variables

### 2. Configure Backend Environment

Create `server/.env` file:

```bash
cp server/.env.example server/.env
```

Edit `server/.env`:

```env
# Server Configuration
PORT=3001
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# Razorpay Configuration
RAZORPAY_KEY_ID=rzp_test_YOUR_KEY_ID_HERE
RAZORPAY_KEY_SECRET=YOUR_KEY_SECRET_HERE
```

Replace:
- `YOUR_KEY_ID_HERE` with your Razorpay Key ID
- `YOUR_KEY_SECRET_HERE` with your Razorpay Key Secret

### 3. Start Backend Server

```bash
cd server
npm run dev
```

The server should start on `http://localhost:3001`

You should see:
```
✅ Calyco API Server running on port 3001
📍 Environment: development
```

---

## Part 3: Frontend Setup

### 1. Install Frontend Dependencies

```bash
cd ..  # Back to project root
npm install
```

### 2. Configure Frontend Environment

Create `.env` file in project root:

```bash
cp .env.example .env
```

Edit `.env`:

```env
# Razorpay Configuration (Frontend)
VITE_RAZORPAY_ID=rzp_test_YOUR_KEY_ID_HERE

# Backend API URL
VITE_API_URL=http://localhost:3001
```

Replace `YOUR_KEY_ID_HERE` with your Razorpay Key ID (same as backend)

> ⚠️ **Important**: Only use the Key ID in frontend, never the Key Secret!

### 3. Start Frontend Development Server

```bash
npm run dev
```

The frontend should start on `http://localhost:5173`

---

## Part 4: Testing the Checkout Flow

### 1. Add Products to Cart

1. Navigate to any product page
2. Select size, finish, and color
3. Click "Add to Cart"
4. Verify item appears in cart

### 2. Proceed to Checkout

1. Click cart icon → "Checkout"
2. Fill in customer details:
   - Email
   - Name
   - Address
   - Phone number

### 3. Complete Payment

1. Click "Pay Now"
2. Razorpay payment modal should appear
3. Use test card details:
   - **Card Number**: `4111 1111 1111 1111`
   - **Expiry**: Any future date
   - **CVV**: Any 3 digits
   - **Name**: Any name

4. Complete payment
5. Order should be created in `server/data/orders.json`

---

## Part 5: Verification

### Check Order Creation

1. Open `server/data/orders.json`
2. You should see your order with:
   - Customer details
   - Items
   - Payment status
   - Razorpay payment ID

Example:
```json
{
  "id": "ORD-1234567890-1234",
  "customer": {
    "email": "customer@example.com",
    "firstName": "John",
    "lastName": "Doe"
  },
  "payment": {
    "status": "paid",
    "razorpayPaymentId": "pay_XXXXXXXX",
    "amount": 1200
  },
  "status": "paid"
}
```

---

## Production Deployment

### 1. Switch to Live Mode

1. In Razorpay Dashboard, activate live mode
2. Generate **Live API Keys**
3. Update environment variables with live keys

### 2. Update Backend `.env`

```env
NODE_ENV=production
RAZORPAY_KEY_ID=rzp_live_YOUR_LIVE_KEY_ID
RAZORPAY_KEY_SECRET=YOUR_LIVE_KEY_SECRET
CLIENT_URL=https://yourdomain.com
```

### 3. Update Frontend `.env`

```env
VITE_RAZORPAY_ID=rzp_live_YOUR_LIVE_KEY_ID
VITE_API_URL=https://api.yourdomain.com
```

### 4. Deploy Backend

Deploy `server/` directory to your hosting platform:
- **Heroku**
- **DigitalOcean App Platform**
- **AWS EC2**
- **Render**
- **Railway**

Make sure to:
- Set environment variables in hosting platform
- Expose port 3001 (or configured PORT)
- Enable CORS for your frontend domain

### 5. Database Migration (Recommended for Production)

The current setup uses JSON file storage. For production, migrate to a real database:

**Recommended Options:**
- **MongoDB** - Document database (easiest migration)
- **PostgreSQL** - Relational database
- **MySQL** - Relational database

**Migration Steps:**
1. Create database
2. Update `OrderService.js` to use database connection
3. Replace JSON file operations with database queries

---

## API Endpoints

### Payment Endpoints

#### Create Razorpay Order
```http
POST /api/payments/create-order
Content-Type: application/json

{
  "amount": 1200,
  "currency": "INR",
  "receipt": "ORD-123",
  "notes": {
    "customer_name": "John Doe"
  }
}
```

#### Verify Payment
```http
POST /api/payments/verify
Content-Type: application/json

{
  "razorpay_order_id": "order_XXX",
  "razorpay_payment_id": "pay_XXX",
  "razorpay_signature": "signature_XXX"
}
```

### Order Endpoints

#### Create Order
```http
POST /api/orders
Content-Type: application/json

{
  "items": [...],
  "customer": {...},
  "total": 1200
}
```

#### Get Order
```http
GET /api/orders/:orderId
```

#### Update Order
```http
PATCH /api/orders/:orderId
Content-Type: application/json

{
  "status": "paid",
  "payment": {...}
}
```

---

## Troubleshooting

### Backend not starting

**Error**: `Cannot find module`
```bash
cd server
rm -rf node_modules package-lock.json
npm install
```

**Error**: `Port already in use`
```bash
# Kill process on port 3001
lsof -ti:3001 | xargs kill -9  # Mac/Linux
netstat -ano | findstr :3001  # Windows (find PID, then taskkill)
```

### Frontend cannot connect to backend

1. Check backend is running: `http://localhost:3001/health`
2. Verify `VITE_API_URL` in `.env`
3. Check browser console for CORS errors
4. Ensure backend `CLIENT_URL` matches frontend URL

### Razorpay payment fails

1. **Check Key ID**: Ensure it's correct in both frontend and backend
2. **Test Mode**: Use test card numbers only in test mode
3. **Check Console**: Look for Razorpay errors in browser console
4. **Verify Signature**: Backend verification might be failing

### Order not created

1. Check `server/data/orders.json` exists
2. Verify backend logs for errors
3. Check file permissions on `server/data/` directory

---

## Security Best Practices

1. ✅ **Never expose Key Secret** - Keep it server-side only
2. ✅ **Always verify payments** - Use backend signature verification
3. ✅ **Use HTTPS in production** - Secure all API communications
4. ✅ **Validate all inputs** - Sanitize customer data
5. ✅ **Rate limiting** - Add rate limiting to prevent abuse
6. ✅ **Logging** - Log all payment attempts for auditing

---

## Next Steps

1. **Email Notifications**: Send order confirmations via email
2. **Order Management Dashboard**: Build admin panel to view orders
3. **Inventory Management**: Track product stock
4. **Shipping Integration**: Integrate with shipping providers
5. **Analytics**: Track conversion rates and revenue

---

## Support

- **Razorpay Documentation**: https://razorpay.com/docs/
- **Razorpay Support**: https://razorpay.com/support/
- **Calyco Issues**: Contact your development team

---

## Summary

You've successfully migrated from Shopify to Razorpay! Your checkout now:

✅ Uses Razorpay for payment processing
✅ Stores orders in your own database
✅ Provides full control over checkout experience
✅ Reduces transaction fees
✅ Supports Indian payment methods

Happy selling! 🎨
