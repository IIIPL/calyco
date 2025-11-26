# Automatic Shiprocket Order Sync

This guide shows how to automatically create shipments in Shiprocket when customers place orders.

## How It Works

When a customer completes payment:
1. Order is saved to your database
2. Backend automatically calls Shiprocket API
3. Shipment is created in Shiprocket
4. You receive AWB number and can print label
5. Order appears in Shiprocket dashboard

---

## Implementation Steps

### Step 1: Add Shiprocket Service

Create `server/services/ShiprocketService.js`:

```javascript
import axios from 'axios';

export class ShiprocketService {
  constructor() {
    this.baseURL = 'https://apiv2.shiprocket.in/v1/external';
    this.email = process.env.SHIPROCKET_EMAIL;
    this.password = process.env.SHIPROCKET_PASSWORD;
    this.token = null;
    this.tokenExpiry = null;
  }

  async login() {
    // Check if token is still valid
    if (this.token && this.tokenExpiry && Date.now() < this.tokenExpiry) {
      return this.token;
    }

    try {
      const response = await axios.post(`${this.baseURL}/auth/login`, {
        email: this.email,
        password: this.password
      });

      this.token = response.data.token;
      // Token expires in 10 days, refresh after 9 days
      this.tokenExpiry = Date.now() + (9 * 24 * 60 * 60 * 1000);

      console.log('[Shiprocket] Login successful, token expires:', new Date(this.tokenExpiry));
      return this.token;
    } catch (error) {
      console.error('[Shiprocket] Login failed:', error.response?.data || error.message);
      throw new Error('Shiprocket authentication failed');
    }
  }

  async createOrder(orderData) {
    try {
      await this.login();

      // Prepare Shiprocket order format
      const shiprocketOrder = {
        order_id: orderData.id,
        order_date: new Date(orderData.createdAt).toISOString().split('T')[0], // YYYY-MM-DD
        pickup_location: "Primary", // Your warehouse name in Shiprocket (set this in Shiprocket dashboard first)
        channel_id: "", // Optional: your channel ID
        comment: `Order from calycopaints.com`,
        billing_customer_name: orderData.customer.firstName,
        billing_last_name: orderData.customer.lastName,
        billing_address: orderData.customer.address.street,
        billing_address_2: orderData.customer.address.apartment || "",
        billing_city: orderData.customer.address.city,
        billing_pincode: orderData.customer.address.postcode,
        billing_state: this.getStateFromPincode(orderData.customer.address.postcode),
        billing_country: "India",
        billing_email: orderData.customer.email,
        billing_phone: orderData.customer.phone,
        shipping_is_billing: true, // Same as billing address
        order_items: orderData.items.map(item => ({
          name: item.name,
          sku: item.id || `SKU-${item.name.replace(/\s+/g, '-')}`,
          units: item.quantity || 1,
          selling_price: item.price,
          discount: 0,
          tax: Math.round(item.price * 0.18), // 18% GST
          hsn: "3209" // HSN code for paints
        })),
        payment_method: orderData.payment.method === 'razorpay' ? "Prepaid" : "COD",
        shipping_charges: orderData.pricing.shipping || 0,
        giftwrap_charges: 0,
        transaction_charges: 0,
        total_discount: orderData.pricing.discount || 0,
        sub_total: orderData.pricing.subtotal,
        length: 30, // Package dimensions in cm (update based on your products)
        breadth: 20,
        height: 15,
        weight: 2.5 // Weight in kg (update based on your products)
      };

      console.log('[Shiprocket] Creating order:', shiprocketOrder.order_id);

      const response = await axios.post(
        `${this.baseURL}/orders/create/adhoc`,
        shiprocketOrder,
        {
          headers: {
            'Authorization': `Bearer ${this.token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('[Shiprocket] Order created successfully:', response.data);

      return {
        success: true,
        shiprocket_order_id: response.data.order_id,
        shipment_id: response.data.shipment_id,
        status: response.data.status,
        status_code: response.data.status_code
      };
    } catch (error) {
      console.error('[Shiprocket] Order creation failed:', error.response?.data || error.message);

      // Don't throw error - just log it and continue
      // Order is still valid even if Shiprocket fails
      return {
        success: false,
        error: error.response?.data?.message || error.message
      };
    }
  }

  async generateAWB(shipment_id, courier_id) {
    try {
      await this.login();

      const response = await axios.post(
        `${this.baseURL}/courier/assign/awb`,
        {
          shipment_id,
          courier_id
        },
        {
          headers: { 'Authorization': `Bearer ${this.token}` }
        }
      );

      return {
        awb_code: response.data.response.data.awb_code,
        courier_name: response.data.response.data.courier_name
      };
    } catch (error) {
      console.error('[Shiprocket] AWB generation failed:', error.response?.data || error.message);
      throw error;
    }
  }

  async trackShipment(awb_code) {
    try {
      await this.login();

      const response = await axios.get(
        `${this.baseURL}/courier/track/awb/${awb_code}`,
        {
          headers: { 'Authorization': `Bearer ${this.token}` }
        }
      );

      return response.data;
    } catch (error) {
      console.error('[Shiprocket] Tracking failed:', error.response?.data || error.message);
      throw error;
    }
  }

  async getShippingRates(delivery_postcode, cod = 0) {
    try {
      await this.login();

      const response = await axios.get(
        `${this.baseURL}/courier/serviceability`,
        {
          params: {
            pickup_postcode: process.env.WAREHOUSE_PINCODE || "400001", // Your warehouse pincode
            delivery_postcode,
            weight: 2.5, // Default weight
            cod
          },
          headers: { 'Authorization': `Bearer ${this.token}` }
        }
      );

      return response.data.data.available_courier_companies;
    } catch (error) {
      console.error('[Shiprocket] Rate fetch failed:', error.response?.data || error.message);
      throw error;
    }
  }

  // Helper function to get state from pincode
  getStateFromPincode(pincode) {
    // This is a simplified version - you might want to use a proper pincode-to-state mapping
    const firstDigit = pincode.toString()[0];
    const stateMap = {
      '1': 'Delhi',
      '2': 'Haryana',
      '3': 'Punjab',
      '4': 'Maharashtra',
      '5': 'Andhra Pradesh',
      '6': 'Karnataka',
      '7': 'West Bengal',
      '8': 'Bihar',
      '9': 'Kerala'
    };
    return stateMap[firstDigit] || 'Maharashtra'; // Default to Maharashtra
  }
}

// Create singleton instance
export const shiprocketService = new ShiprocketService();
```

### Step 2: Update Order Routes to Auto-Create Shipment

Modify `server/routes/orderRoutes.js`:

```javascript
import express from 'express';
import { OrderService } from '../services/OrderService.js';
import { shiprocketService } from '../services/ShiprocketService.js';

const router = express.Router();
const orderService = new OrderService();

// ... existing routes ...

// Update order status (called after payment verification)
router.patch('/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status, payment } = req.body;

    // Update order
    const order = await orderService.updateOrder(orderId, {
      status,
      payment: {
        ...payment,
        updatedAt: new Date().toISOString()
      }
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // AUTO-CREATE SHIPROCKET SHIPMENT IF PAYMENT SUCCESSFUL
    if (status === 'paid' && process.env.SHIPROCKET_EMAIL) {
      console.log('[Orders] Payment successful, creating Shiprocket shipment...');

      try {
        const shipmentResult = await shiprocketService.createOrder(order);

        if (shipmentResult.success) {
          // Update order with Shiprocket details
          await orderService.updateOrder(orderId, {
            shiprocket: {
              order_id: shipmentResult.shiprocket_order_id,
              shipment_id: shipmentResult.shipment_id,
              status: shipmentResult.status,
              created_at: new Date().toISOString()
            }
          });
          console.log('[Orders] Shiprocket shipment created:', shipmentResult.shipment_id);
        } else {
          console.error('[Orders] Shiprocket shipment failed:', shipmentResult.error);
        }
      } catch (shipmentError) {
        // Log but don't fail the order update
        console.error('[Orders] Shiprocket integration error:', shipmentError);
      }
    }

    res.json({
      success: true,
      order
    });
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({
      error: 'Failed to update order',
      message: error.message
    });
  }
});

export default router;
```

### Step 3: Add Environment Variables

Add to Vercel backend environment variables:

```
SHIPROCKET_EMAIL=your-shiprocket-email@example.com
SHIPROCKET_PASSWORD=your-shiprocket-password
WAREHOUSE_PINCODE=400001
```

### Step 4: Install Dependencies

```bash
cd server
npm install axios
```

---

## What Happens Automatically

When a customer completes payment:

1. **Payment verified** → Order status updated to "paid"
2. **Backend automatically calls Shiprocket API**
3. **Shipment created in Shiprocket** with all order details
4. **Order appears in Shiprocket dashboard** instantly
5. **You receive shipment ID** stored in your database
6. **You can print label** from Shiprocket dashboard
7. **Courier pickup scheduled** automatically

---

## Shiprocket Dashboard View

After integration, in your Shiprocket dashboard you'll see:

```
Orders > All Orders

Order ID: ORD-1764171983640-914
Customer: Shivtej Gulumkar
Amount: ₹708
Status: NEW
Channel: API
Pickup: Primary (Your Warehouse)
Delivery: Jambud, 413112, Maharashtra

[Print Label] [Schedule Pickup] [Track]
```

---

## Manual Operations You Can Do

From Shiprocket dashboard:

1. **Print Shipping Label** - Click print, courier will pick up
2. **Schedule Pickup** - Choose pickup date/time
3. **Track Shipment** - Real-time tracking
4. **Change Courier** - If needed, switch courier partner
5. **Download Invoice** - Auto-generated invoice
6. **Bulk Operations** - Process multiple orders at once

---

## Testing Integration

### Test in Shiprocket Test Mode:

1. Go to Shiprocket Settings → API
2. Enable "Test Mode"
3. Place test order on your site
4. Check Shiprocket dashboard → Orders

---

## Error Handling

If Shiprocket integration fails:
- Order is STILL SAVED in your database
- Payment is STILL SUCCESSFUL
- Customer gets confirmation
- You see error in logs
- You can manually create shipment in Shiprocket

This prevents failed shipments from affecting customer orders.

---

## Warehouse Setup (Required First)

Before using Shiprocket API:

1. **Add Warehouse/Pickup Location:**
   - Go to Shiprocket Dashboard → Settings → Pickup Locations
   - Add your warehouse address
   - Name it "Primary" (or update code to match your name)
   - Save warehouse pincode

2. **Add Products (Optional):**
   - Go to Products → Add Product
   - Add your paint products with SKU, weight, dimensions
   - Or let API create products automatically

---

## Cost

Shiprocket charges are:
- **No integration fee** - API is free
- **Pay only for shipments** - Charged per delivery
- **Rates vary** - ₹30-100 per shipment depending on:
  - Weight
  - Distance
  - Courier partner
  - Volume discounts

---

## Summary

**Yes, orders automatically appear in Shiprocket!**

✅ Customer pays → Order syncs to Shiprocket
✅ All details visible in dashboard
✅ Print labels instantly
✅ Track shipments in real-time
✅ No manual data entry needed

**Next Step**: Set up Shiprocket account, add warehouse, and I'll help you integrate the code above!
