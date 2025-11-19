# Calyco API Server

Backend API for Calyco Paints e-commerce platform with Razorpay payment integration.

## Features

- 💳 Razorpay payment integration
- 📦 Order management
- 🔐 Payment verification
- 💾 JSON-based order storage
- 🚀 Express.js REST API

## Quick Start

```bash
# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your Razorpay keys

# Start development server
npm run dev

# Start production server
npm start
```

## API Endpoints

### Health Check
```http
GET /health
```
Returns server status.

### Payments

#### Create Razorpay Order
```http
POST /api/payments/create-order
Content-Type: application/json

{
  "amount": 1200,
  "currency": "INR",
  "receipt": "receipt_123",
  "notes": {
    "customer_name": "John Doe"
  }
}
```

**Response:**
```json
{
  "success": true,
  "order": {
    "id": "order_XXXXXXX",
    "amount": 120000,
    "currency": "INR"
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

**Response:**
```json
{
  "success": true,
  "verified": true,
  "message": "Payment verified successfully"
}
```

### Orders

#### Create Order
```http
POST /api/orders
Content-Type: application/json

{
  "items": [
    {
      "id": "product_1",
      "name": "Premium Interior Emulsion",
      "price": 600,
      "quantity": 2,
      "selectedSheen": "Low Sheen",
      "selectedSize": "1L"
    }
  ],
  "customer": {
    "email": "customer@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "phone": "+919876543210",
    "address": "123 Main St",
    "city": "Mumbai",
    "postcode": "400001",
    "country": "India"
  },
  "subtotal": 1200,
  "tax": 216,
  "shipping": 0,
  "total": 1416
}
```

**Response:**
```json
{
  "success": true,
  "order": {
    "id": "ORD-1234567890-5678",
    "orderNumber": 1,
    "items": [...],
    "customer": {...},
    "payment": {
      "status": "pending",
      "amount": 1416
    },
    "status": "pending",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### Get Order
```http
GET /api/orders/:orderId
```

**Response:**
```json
{
  "success": true,
  "order": {...}
}
```

#### Update Order
```http
PATCH /api/orders/:orderId
Content-Type: application/json

{
  "status": "paid",
  "payment": {
    "status": "paid",
    "razorpayPaymentId": "pay_XXXXXXX"
  }
}
```

#### List Orders (with pagination)
```http
GET /api/orders?page=1&limit=10&status=paid
```

**Response:**
```json
{
  "success": true,
  "orders": [...],
  "pagination": {
    "total": 50,
    "page": 1,
    "limit": 10,
    "totalPages": 5
  }
}
```

## Environment Variables

```env
# Server Configuration
PORT=3001
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# Razorpay Configuration
RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=xxxxx
```

## Project Structure

```
server/
├── index.js                 # Server entry point
├── routes/
│   ├── paymentRoutes.js    # Payment endpoints
│   └── orderRoutes.js      # Order endpoints
├── services/
│   └── OrderService.js     # Order management logic
├── data/
│   └── orders.json         # Order storage (auto-created)
├── package.json
├── .env                    # Environment config (create this)
└── .env.example            # Environment template
```

## Development

### Running in Development Mode

```bash
npm run dev
```

Uses Node.js `--watch` flag for auto-reload on file changes.

### Production Mode

```bash
npm start
```

## Data Storage

Currently uses JSON file storage in `data/orders.json`.

### Migrating to Database

For production, replace `OrderService.js` with database implementation:

**MongoDB Example:**
```javascript
import { MongoClient } from 'mongodb';

export class OrderService {
  constructor() {
    this.client = new MongoClient(process.env.MONGODB_URI);
    this.db = this.client.db('calyco');
    this.orders = this.db.collection('orders');
  }

  async createOrder(orderData) {
    const result = await this.orders.insertOne(orderData);
    return result.ops[0];
  }

  // ... other methods
}
```

## Security

- ✅ API key verification for Razorpay
- ✅ Payment signature verification
- ✅ CORS configuration
- ✅ Environment variable protection
- ⚠️ Add rate limiting in production
- ⚠️ Add authentication for admin endpoints

## Error Handling

All endpoints return consistent error format:

```json
{
  "error": "Error message",
  "message": "Detailed error description"
}
```

HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Server Error

## Testing

### Test Payment Flow

1. Start server: `npm run dev`
2. Create order: POST to `/api/payments/create-order`
3. Use Razorpay test card in frontend
4. Verify payment: POST to `/api/payments/verify`
5. Check `data/orders.json` for created order

### Razorpay Test Cards

**Successful Payment:**
- Card: `4111 1111 1111 1111`
- Expiry: Any future date
- CVV: Any 3 digits

**Failed Payment:**
- Card: `4000 0000 0000 0002`

## Deployment

### Recommended Platforms

- **Heroku**: Easy deployment, free tier available
- **Railway**: Modern platform, great DX
- **Render**: Free tier, easy setup
- **DigitalOcean App Platform**: $5/month
- **AWS EC2**: Full control, more setup

### Deployment Checklist

- [ ] Set up database (MongoDB, PostgreSQL, etc.)
- [ ] Configure environment variables
- [ ] Enable HTTPS
- [ ] Set up logging service
- [ ] Configure backups
- [ ] Add monitoring (e.g., Sentry)
- [ ] Set up CI/CD pipeline

## License

Proprietary - Calyco Paints

## Support

For issues or questions, contact the development team.
