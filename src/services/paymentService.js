// Payment service for Razorpay integration
export class PaymentService {
  constructor() {
    this.razorpayId = import.meta.env.VITE_RAZORPAY_ID;
    this.razorpaySecret = import.meta.env.VITE_RAZORPAY_SECRET;
    this.paymentLink = import.meta.env.VITE_RAZORPAY_PAYMENT_LINK;
    
    // Validate configuration
    if (!this.razorpayId || this.razorpayId === 'your_razorpay_key_id_here') {
      console.warn('Razorpay Key ID not configured. Please add VITE_RAZORPAY_ID to your .env file.');
    }
  }

  // Create order on your backend (you'll need to implement this)
  async createOrder(amount, currency = 'INR', receipt = null) {
    try {
      // For now, we'll use a simple approach
      // In production, you should create orders on your backend
      const orderData = {
        amount: amount * 100, // Convert to paise
        currency: currency,
        receipt: receipt || `receipt_${Date.now()}`,
      };

      // If you have a backend API, make the request here
      // const response = await fetch('/api/create-order', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(orderData),
      // });
      // return await response.json();

      // For now, return a mock order ID
      return {
        id: `order_${Date.now()}`,
        amount: orderData.amount,
        currency: orderData.currency,
        receipt: orderData.receipt,
      };
    } catch (error) {
      console.error('Error creating order:', error);
      throw new Error('Failed to create order');
    }
  }

  // Verify payment signature (you'll need to implement this on your backend)
  async verifyPayment(paymentData) {
    try {
      // In production, you should verify the payment signature on your backend
      // const response = await fetch('/api/verify-payment', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(paymentData),
      // });
      // return await response.json();

      // For now, return success
      return { success: true, verified: true };
    } catch (error) {
      console.error('Error verifying payment:', error);
      throw new Error('Failed to verify payment');
    }
  }

  // Get payment link for direct payment
  getPaymentLink(amount, customerDetails) {
    const params = new URLSearchParams({
      amount: amount * 100, // Convert to paise
      currency: 'INR',
      name: `${customerDetails.firstName} ${customerDetails.lastName}`,
      email: customerDetails.email,
      contact: customerDetails.phone,
      description: 'Paint Purchase from Calyco',
    });

    return `${this.paymentLink}?${params.toString()}`;
  }
}

export const paymentService = new PaymentService();
