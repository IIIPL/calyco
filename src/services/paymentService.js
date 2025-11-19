// Payment service for Razorpay integration
export class PaymentService {
  constructor() {
    this.razorpayId = import.meta.env.VITE_RAZORPAY_ID;
    this.apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';

    // Validate configuration
    if (!this.razorpayId || this.razorpayId === 'your_razorpay_key_id_here') {
      console.warn('Razorpay Key ID not configured. Please add VITE_RAZORPAY_ID to your .env file.');
    }
  }

  /**
   * Create Razorpay order via backend API
   */
  async createOrder(amount, currency = 'INR', receipt = null, notes = {}) {
    try {
      const response = await fetch(`${this.apiUrl}/api/payments/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          currency,
          receipt,
          notes
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create order');
      }

      const data = await response.json();
      return data.order;
    } catch (error) {
      console.error('Error creating order:', error);
      throw new Error('Failed to create order');
    }
  }

  /**
   * Verify payment signature via backend API
   */
  async verifyPayment(paymentData) {
    try {
      const response = await fetch(`${this.apiUrl}/api/payments/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Payment verification failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Error verifying payment:', error);
      throw new Error('Failed to verify payment');
    }
  }

  /**
   * Create order in database
   */
  async createOrderRecord(orderData) {
    try {
      const response = await fetch(`${this.apiUrl}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create order record');
      }

      const data = await response.json();
      return data.order;
    } catch (error) {
      console.error('Error creating order record:', error);
      throw new Error('Failed to create order record');
    }
  }

  /**
   * Update order status
   */
  async updateOrderStatus(orderId, status, paymentDetails = {}) {
    try {
      const response = await fetch(`${this.apiUrl}/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status,
          payment: paymentDetails
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update order');
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating order:', error);
      throw new Error('Failed to update order');
    }
  }

  /**
   * Get order by ID
   */
  async getOrder(orderId) {
    try {
      const response = await fetch(`${this.apiUrl}/api/orders/${orderId}`);

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch order');
      }

      const data = await response.json();
      return data.order;
    } catch (error) {
      console.error('Error fetching order:', error);
      throw new Error('Failed to fetch order');
    }
  }
}

export const paymentService = new PaymentService();
