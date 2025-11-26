# Order Management & Shipping Integration Guide

## 📦 Where Orders Are Stored Currently

### Current Setup (Temporary - In-Memory Storage)

**Orders are stored in server memory** on the backend API (`calyco-api.vercel.app`).

**Location**: `server/services/OrderService.js` - using `OrderService.orders` static array

⚠️ **IMPORTANT LIMITATIONS**:
- Orders are **lost** when the server restarts or goes idle
- **Not suitable for production** - this is a temporary solution
- Orders disappear after Vercel serverless function cold-starts (typically after 5-15 minutes of inactivity)

---

## 🔔 How to Get Notified When Orders Come In

### Current Situation
**You DON'T get notified automatically right now!**

Orders are only stored in memory. To check orders, you'd need to:
1. Check backend logs in Vercel dashboard
2. Build an admin dashboard (doesn't exist yet)

### Recommended Solutions

#### Option 1: Email Notifications (Easiest - Recommended First)

**Add email notifications to your backend:**

```javascript
// Install nodemailer
npm install nodemailer

// In server/index.js or orderRoutes.js
import nodemailer from 'nodemailer';

const sendOrderEmail = async (orderData) => {
  const transporter = nodemailer.createTransporter({
    service: 'gmail', // or your email provider
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-app-password' // Use App Password, not regular password
    }
  });

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: 'your-business-email@gmail.com', // Where you want to receive orders
    subject: `New Order #${orderData.orderNumber} - ₹${orderData.pricing.total}`,
    html: `
      <h2>New Order Received!</h2>
      <p><strong>Order ID:</strong> ${orderData.id}</p>
      <p><strong>Customer:</strong> ${orderData.customer.firstName} ${orderData.customer.lastName}</p>
      <p><strong>Email:</strong> ${orderData.customer.email}</p>
      <p><strong>Phone:</strong> ${orderData.customer.phone}</p>
      <p><strong>Total Amount:</strong> ₹${orderData.pricing.total}</p>

      <h3>Shipping Address:</h3>
      <p>${orderData.customer.address.street}<br>
      ${orderData.customer.address.city}, ${orderData.customer.address.postcode}<br>
      ${orderData.customer.address.country}</p>

      <h3>Items:</h3>
      <ul>
        ${orderData.items.map(item => `
          <li>${item.name} - ${item.quantity}x - ₹${item.price}</li>
        `).join('')}
      </ul>
    `
  };

  await transporter.sendMail(mailOptions);
};

// Call this in your order creation endpoint
await sendOrderEmail(order);
```

**Setup Steps**:
1. Enable 2FA on your Gmail account
2. Generate App Password: https://myaccount.google.com/apppasswords
3. Add to Vercel backend environment variables:
   - `EMAIL_USER=your-email@gmail.com`
   - `EMAIL_PASS=your-app-password`

#### Option 2: WhatsApp Notifications (Popular in India)

**Use Twilio WhatsApp API:**

```javascript
// Install twilio
npm install twilio

import twilio from 'twilio';

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const sendWhatsAppNotification = async (orderData) => {
  await client.messages.create({
    from: 'whatsapp:+14155238886', // Twilio sandbox number
    to: 'whatsapp:+919876543210', // Your WhatsApp number
    body: `🛍️ New Order!\n\nOrder #${orderData.orderNumber}\nCustomer: ${orderData.customer.firstName}\nAmount: ₹${orderData.pricing.total}\nPhone: ${orderData.customer.phone}`
  });
};
```

#### Option 3: Webhook to Third-Party Services

Send orders to services like:
- **Zapier** - Can forward to Slack, Email, Google Sheets, etc.
- **Make (Integromat)** - Similar to Zapier
- **n8n** - Self-hosted automation

---

## 💾 Permanent Database Solutions (REQUIRED for Production)

You **MUST** migrate to a real database before going live. Here are your options:

### Option 1: MongoDB Atlas (Recommended - Easiest)

**Why MongoDB?**
- Free tier available
- Easy setup (5 minutes)
- NoSQL (flexible schema)
- Excellent for e-commerce

**Setup Steps:**

1. **Create MongoDB Atlas Account**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up (free)
   - Create a free cluster (M0 Sandbox)

2. **Get Connection String**
   - Click "Connect" → "Drivers"
   - Copy connection string: `mongodb+srv://username:password@cluster.mongodb.net/calyco`

3. **Update Backend Code**

```javascript
// Install mongodb driver
npm install mongodb

// Create server/services/MongoOrderService.js
import { MongoClient } from 'mongodb';

export class MongoOrderService {
  constructor() {
    this.client = new MongoClient(process.env.MONGODB_URI);
    this.dbName = 'calyco';
  }

  async connect() {
    if (!this.db) {
      await this.client.connect();
      this.db = this.client.db(this.dbName);
      this.orders = this.db.collection('orders');
    }
  }

  async createOrder(orderData) {
    await this.connect();
    const order = {
      ...orderData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    const result = await this.orders.insertOne(order);
    return { ...order, _id: result.insertedId };
  }

  async getOrder(orderId) {
    await this.connect();
    return await this.orders.findOne({ id: orderId });
  }

  async updateOrder(orderId, updates) {
    await this.connect();
    await this.orders.updateOne(
      { id: orderId },
      { $set: { ...updates, updatedAt: new Date() } }
    );
    return await this.getOrder(orderId);
  }

  async getOrders(options = {}) {
    await this.connect();
    const { page = 1, limit = 10, status } = options;

    const filter = status ? { status } : {};
    const orders = await this.orders
      .find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    const total = await this.orders.countDocuments(filter);

    return {
      orders,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    };
  }
}
```

4. **Add to Vercel Environment Variables**
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/calyco
   ```

5. **Replace OrderService in routes**
   ```javascript
   import { MongoOrderService } from '../services/MongoOrderService.js';
   const orderService = new MongoOrderService();
   ```

### Option 2: Supabase (PostgreSQL - Great Alternative)

**Why Supabase?**
- PostgreSQL (SQL database)
- Free tier
- Built-in authentication
- Real-time subscriptions
- Auto-generated REST API

**Setup:**
1. Go to https://supabase.com
2. Create project
3. Create `orders` table in SQL editor
4. Use Supabase client library

### Option 3: Planetscale (MySQL - Serverless)

- Serverless MySQL
- Free tier
- Great performance
- Prisma integration

---

## 🚚 Shipping Platform Integration

### Option 1: Shiprocket (Most Popular in India)

**Features:**
- 17+ courier partners
- Automated tracking
- COD available
- Weight reconciliation

**Integration Steps:**

1. **Sign up**: https://www.shiprocket.in/
2. **Get API credentials**
3. **Install in backend**:

```javascript
// Install axios
npm install axios

// Create server/services/ShiprocketService.js
import axios from 'axios';

export class ShiprocketService {
  constructor() {
    this.baseURL = 'https://apiv2.shiprocket.in/v1/external';
    this.email = process.env.SHIPROCKET_EMAIL;
    this.password = process.env.SHIPROCKET_PASSWORD;
    this.token = null;
  }

  async login() {
    const response = await axios.post(`${this.baseURL}/auth/login`, {
      email: this.email,
      password: this.password
    });
    this.token = response.data.token;
    return this.token;
  }

  async createOrder(orderData) {
    if (!this.token) await this.login();

    const shiprocketOrder = {
      order_id: orderData.id,
      order_date: orderData.createdAt,
      pickup_location: "Primary", // Your warehouse name in Shiprocket
      billing_customer_name: orderData.customer.firstName,
      billing_last_name: orderData.customer.lastName,
      billing_address: orderData.customer.address.street,
      billing_city: orderData.customer.address.city,
      billing_pincode: orderData.customer.address.postcode,
      billing_state: "Maharashtra", // Determine from pincode
      billing_country: "India",
      billing_email: orderData.customer.email,
      billing_phone: orderData.customer.phone,
      shipping_is_billing: true,
      order_items: orderData.items.map(item => ({
        name: item.name,
        sku: item.id,
        units: item.quantity,
        selling_price: item.price,
        discount: 0
      })),
      payment_method: "Prepaid",
      sub_total: orderData.pricing.subtotal,
      length: 10, // Package dimensions
      breadth: 10,
      height: 10,
      weight: 1.0 // Weight in kg
    };

    const response = await axios.post(
      `${this.baseURL}/orders/create/adhoc`,
      shiprocketOrder,
      {
        headers: { 'Authorization': `Bearer ${this.token}` }
      }
    );

    return response.data;
  }

  async trackShipment(awbCode) {
    if (!this.token) await this.login();

    const response = await axios.get(
      `${this.baseURL}/courier/track/awb/${awbCode}`,
      {
        headers: { 'Authorization': `Bearer ${this.token}` }
      }
    );

    return response.data;
  }

  async getShippingRates(pickup_postcode, delivery_postcode, weight, cod = 0) {
    if (!this.token) await this.login();

    const response = await axios.get(
      `${this.baseURL}/courier/serviceability`,
      {
        params: {
          pickup_postcode,
          delivery_postcode,
          weight,
          cod
        },
        headers: { 'Authorization': `Bearer ${this.token}` }
      }
    );

    return response.data.data.available_courier_companies;
  }
}
```

4. **Add to Vercel Environment Variables**:
   ```
   SHIPROCKET_EMAIL=your-email@example.com
   SHIPROCKET_PASSWORD=your-password
   ```

5. **Use in order creation**:
```javascript
import { ShiprocketService } from '../services/ShiprocketService.js';

const shiprocket = new ShiprocketService();

// After order is paid
const shipment = await shiprocket.createOrder(order);
await orderService.updateOrder(order.id, {
  shipment: {
    awb: shipment.awb_code,
    courier: shipment.courier_name,
    trackingUrl: `https://shiprocket.co/tracking/${shipment.awb_code}`
  }
});
```

### Option 2: Delhivery

**Similar to Shiprocket**:
- API documentation: https://www.delhivery.com/developer-api
- Follow similar pattern as Shiprocket

### Option 3: Nimbus Post

**Features:**
- Hyperlocal delivery
- Same-day delivery
- API documentation: https://nimbuspost.com/api-documentation

**Integration** (similar pattern):
```javascript
export class NimbusService {
  constructor() {
    this.baseURL = 'https://api.nimbuspost.com/v1';
    this.apiKey = process.env.NIMBUS_API_KEY;
  }

  // Similar methods as Shiprocket
}
```

---

## 📊 Admin Dashboard (Recommended Next Step)

Build a simple admin panel to view orders:

**Quick Solution - Use Retool or Budibase:**
1. Connect to your MongoDB/database
2. Drag-and-drop interface
3. View/manage orders without coding

**Or Build Custom:**
- Create `/admin` route
- Password protect it
- Show orders table with filters
- Allow status updates

---

## 🎯 Recommended Implementation Order

1. **Immediate (This Week)**:
   - ✅ Fix shipping method selection (Done!)
   - ✅ Add payment icons (Done!)
   - ⬜ Add email notifications for orders
   - ⬜ Migrate to MongoDB Atlas

2. **Next Week**:
   - ⬜ Build simple admin dashboard
   - ⬜ Integrate Shiprocket API
   - ⬜ Add order tracking page for customers

3. **Future**:
   - ⬜ SMS notifications
   - ⬜ WhatsApp order updates
   - ⬜ Automated invoicing
   - ⬜ Inventory management

---

## 📝 Summary

| Question | Answer |
|----------|--------|
| **Where are orders stored?** | Currently: In-memory (temporary). **Need to migrate to MongoDB/PostgreSQL** |
| **How do I get notified?** | Currently: No notifications. **Add email via Nodemailer** (15 min setup) |
| **How to connect shipping?** | Use **Shiprocket API** (most popular) - see integration code above |
| **What's the priority?** | 1. MongoDB, 2. Email notifications, 3. Shiprocket integration |

**Next Action**: Would you like me to implement MongoDB integration or email notifications first?
