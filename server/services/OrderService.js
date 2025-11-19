import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Order Service - Handles order management
 * Using JSON file storage for simplicity. Replace with actual database in production.
 */
export class OrderService {
  constructor() {
    this.ordersFile = path.join(__dirname, '../data/orders.json');
    this.ensureDataDirectory();
  }

  async ensureDataDirectory() {
    const dataDir = path.join(__dirname, '../data');
    try {
      await fs.access(dataDir);
    } catch {
      await fs.mkdir(dataDir, { recursive: true });
    }

    try {
      await fs.access(this.ordersFile);
    } catch {
      await fs.writeFile(this.ordersFile, JSON.stringify([], null, 2));
    }
  }

  async readOrders() {
    try {
      const data = await fs.readFile(this.ordersFile, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading orders:', error);
      return [];
    }
  }

  async writeOrders(orders) {
    try {
      await fs.writeFile(this.ordersFile, JSON.stringify(orders, null, 2));
    } catch (error) {
      console.error('Error writing orders:', error);
      throw new Error('Failed to save orders');
    }
  }

  generateOrderId() {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000);
    return `ORD-${timestamp}-${random}`;
  }

  async createOrder(orderData) {
    const orders = await this.readOrders();

    const order = {
      id: this.generateOrderId(),
      orderNumber: orders.length + 1,
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
        status: 'pending',
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
      status: 'pending',
      notes: orderData.notes || '',
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
