# Quick Start Guide - Razorpay Checkout

Get your Razorpay checkout running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- Razorpay account (sign up at https://razorpay.com)
- Your Razorpay API keys

---

## Step 1: Get Razorpay Keys (2 minutes)

1. Log in to [Razorpay Dashboard](https://dashboard.razorpay.com)
2. Go to **Settings** → **API Keys**
3. Click **Generate Test Keys**
4. Copy:
   - **Key ID** (e.g., `rzp_test_xxxxx`)
   - **Key Secret** (keep secure!)

---

## Step 2: Setup Backend (2 minutes)

### Install & Configure

```bash
# Install backend dependencies
cd server
npm install

# Create environment file
cp .env.example .env
```

### Edit `server/.env`

```env
PORT=3001
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# Paste your Razorpay keys here
RAZORPAY_KEY_ID=rzp_test_YOUR_KEY_ID
RAZORPAY_KEY_SECRET=YOUR_KEY_SECRET
```

### Start Backend

```bash
npm run dev
```

✅ You should see: `✅ Calyco API Server running on port 3001`

---

## Step 3: Setup Frontend (1 minute)

### Open new terminal and configure

```bash
# Install frontend dependencies (if not done)
npm install

# Create environment file
cp .env.example .env
```

### Edit `.env` (root directory)

```env
# Paste your Razorpay Key ID (same as backend)
VITE_RAZORPAY_ID=rzp_test_YOUR_KEY_ID

# Backend API URL
VITE_API_URL=http://localhost:3001
```

### Start Frontend

```bash
npm run dev
```

✅ You should see: `Local: http://localhost:5173`

---

## Step 4: Test Payment (1 minute)

1. **Open browser**: http://localhost:5173
2. **Add product to cart**
3. **Go to checkout**: Fill in details
4. **Click "Pay Now"**
5. **Use test card**:
   - Card: `4111 1111 1111 1111`
   - Expiry: `12/25`
   - CVV: `123`
6. **Complete payment**

✅ Order should be created in `server/data/orders.json`

---

## Troubleshooting

### "Cannot connect to backend"
- Check backend is running on port 3001
- Visit http://localhost:3001/health (should return `{"status":"ok"}`)

### "Razorpay not configured"
- Check `VITE_RAZORPAY_ID` in `.env`
- Make sure it starts with `rzp_test_` or `rzp_live_`

### "Payment verification failed"
- Check `RAZORPAY_KEY_SECRET` in `server/.env`
- Restart backend server after changing `.env`

---

## Next Steps

- ✅ Test different payment methods
- ✅ Check orders in `server/data/orders.json`
- ✅ Read [RAZORPAY_SETUP.md](RAZORPAY_SETUP.md) for detailed docs
- ✅ Switch to live keys for production

---

## File Structure

```
calyco-github/
├── server/                    # Backend API
│   ├── .env                   # Backend config (create this)
│   ├── index.js               # Server entry point
│   ├── routes/                # API routes
│   │   ├── paymentRoutes.js  # Razorpay endpoints
│   │   └── orderRoutes.js    # Order management
│   └── services/              # Business logic
│       └── OrderService.js   # Order storage
├── src/                       # Frontend
│   ├── pages/
│   │   └── Checkout.jsx      # Checkout page
│   ├── components/
│   │   └── RazorpayPayment.jsx  # Payment widget
│   ├── services/
│   │   └── paymentService.js    # API client
│   └── context/
│       └── CartContext.jsx      # Cart management
├── .env                       # Frontend config (create this)
└── package.json               # Frontend dependencies
```

---

## Summary

**What you did:**
1. ✅ Got Razorpay API keys
2. ✅ Configured backend with keys
3. ✅ Configured frontend with Key ID
4. ✅ Started both servers
5. ✅ Tested payment flow

**You're ready to accept payments! 🎉**

For production deployment, see [RAZORPAY_SETUP.md](RAZORPAY_SETUP.md)
