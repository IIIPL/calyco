import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Order Service - Handles order management
 * Using in-memory storage for Vercel compatibility (serverless has read-only filesystem)
 * TODO: Replace with actual database in production (MongoDB/PostgreSQL/Supabase)
 */
export class OrderService {
  constructor() {
    // Use in-memory storage for Vercel serverless compatibility
    if (!OrderService.orders) {
      OrderService.orders = [];
    }
    this.ordersFile = path.join(__dirname, '../data/orders.json');

    // Try to load existing orders on first init (for local dev only)
    if (OrderService.orders.length === 0) {
      this.loadExistingOrders();
    }
  }

  async loadExistingOrders() {
    try {
      const data = await fs.readFile(this.ordersFile, 'utf-8');
      OrderService.orders = JSON.parse(data);
      console.log(`Loaded ${OrderService.orders.length} existing orders from file`);
    } catch (error) {
      // File doesn't exist or can't be read (normal for Vercel), start fresh
      OrderService.orders = [];
      console.log('Starting with empty order list (file not found or on serverless)');
    }
  }

  async ensureDataDirectory() {
    // Not needed for in-memory storage, but keep for local dev
    const dataDir = path.join(__dirname, '../data');
    try {
      await fs.access(dataDir);
    } catch {
      try {
        await fs.mkdir(dataDir, { recursive: true });
      } catch (err) {
        // Ignore errors on serverless (read-only filesystem)
      }
    }
  }

  async readOrders() {
    return OrderService.orders;
  }

  async writeOrders(orders) {
    OrderService.orders = orders;

    // Try to persist to file for local dev (will fail silently on Vercel)
    try {
      await this.ensureDataDirectory();
      await fs.writeFile(this.ordersFile, JSON.stringify(orders, null, 2));
      console.log('Orders saved to file (local dev mode)');
    } catch (error) {
      // Ignore file write errors on serverless
      console.log('File write skipped (running on serverless platform)');
    }
  }

  generateOrderId() {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000);
    return `ORD-${timestamp}-${random}`;
  }

  async createOrder(orderData) {
    const orders = await this.readOrders();
    const status = orderData.status || 'pending';
    const paymentStatus = orderData.paymentStatus || (status === 'paid' ? 'paid' : 'pending');
    const orderNumber = orders.length + 1;
    const invoiceNumber = `INV-${new Date().getFullYear()}-${String(orderNumber).padStart(5, '0')}`;
    const invoiceDate = new Date().toISOString();

    const order = {
      id: this.generateOrderId(),
      orderNumber,
      invoice: {
        number: invoiceNumber,
        date: invoiceDate
      },
      items: orderData.items,
      customer: {
        email: orderData.customer.email,
        firstName: orderData.customer.firstName,
        lastName: orderData.customer.lastName,
        phone: orderData.customer.phone,
        address: {
          street: orderData.customer.address,
          apartment: orderData.customer.apartment || '',
          city: orderData.customer.city,
          postcode: orderData.customer.postcode,
          country: orderData.customer.country || 'India'
        }
      },
      payment: {
        status: paymentStatus,
        method: 'razorpay',
        razorpayOrderId: orderData.razorpayOrderId || null,
        razorpayPaymentId: orderData.razorpayPaymentId || null,
        amount: orderData.total,
        currency: orderData.currency || 'INR'
      },
      pricing: {
        subtotal: orderData.subtotal,
        tax: orderData.tax || 0,
        shipping: orderData.shipping || 0,
        discount: orderData.discount || 0,
        total: orderData.total
      },
      status,
      notes: orderData.notes || '',
      notifications: {
        orderConfirmationSent: false,
        orderConfirmationSentAt: null
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    orders.push(order);
    await this.writeOrders(orders);

    return order;
  }

  async getOrder(orderId) {
    const orders = await this.readOrders();
    return orders.find(order => order.id === orderId);
  }

  async updateOrder(orderId, updates) {
    const orders = await this.readOrders();
    const index = orders.findIndex(order => order.id === orderId);

    if (index === -1) {
      return null;
    }

    orders[index] = {
      ...orders[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    await this.writeOrders(orders);
    return orders[index];
  }

  async getOrders(options = {}) {
    const { page = 1, limit = 10, status } = options;
    let orders = await this.readOrders();

    // Filter by status if provided
    if (status) {
      orders = orders.filter(order => order.status === status);
    }

    // Sort by creation date (newest first)
    orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedOrders = orders.slice(startIndex, endIndex);

    return {
      orders: paginatedOrders,
      pagination: {
        total: orders.length,
        page,
        limit,
        totalPages: Math.ceil(orders.length / limit)
      }
    };
  }

  async deleteOrder(orderId) {
    const orders = await this.readOrders();
    const filteredOrders = orders.filter(order => order.id !== orderId);

    if (filteredOrders.length === orders.length) {
      return null; // Order not found
    }

    await this.writeOrders(filteredOrders);
    return true;
  }
}
