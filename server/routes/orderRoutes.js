import express from 'express';
import { OrderService } from '../services/OrderService.js';
import { sendOrderConfirmationEmail } from '../services/emailService.js';

const router = express.Router();
const orderService = new OrderService();

/**
 * Create a new order
 * POST /api/orders
 */
router.post('/', async (req, res) => {
  try {
    const orderData = req.body;

    // Validate required fields
    const requiredFields = ['items', 'customer', 'total'];
    const missingFields = requiredFields.filter(field => !orderData[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        error: 'Missing required fields',
        fields: missingFields
      });
    }

    // Validate items
    if (!Array.isArray(orderData.items) || orderData.items.length === 0) {
      return res.status(400).json({
        error: 'Order must contain at least one item'
      });
    }

    // Create order
    const order = await orderService.createOrder(orderData);

    let emailStatus = null;
    const isPaid = order.status === 'paid' || order?.payment?.status === 'paid';

    if (isPaid && !order?.notifications?.orderConfirmationSent) {
      try {
        const emailResult = await sendOrderConfirmationEmail(order);
        if (!emailResult?.skipped) {
          const updated = await orderService.updateOrder(order.id, {
            notifications: {
              ...(order.notifications || {}),
              orderConfirmationSent: true,
              orderConfirmationSentAt: new Date().toISOString()
            }
          });
          emailStatus = { sent: true, messageId: emailResult.messageId };
          return res.status(201).json({
            success: true,
            order: updated,
            emailStatus
          });
        }
        emailStatus = { sent: false, skipped: true, reason: emailResult?.reason || 'not_sent' };
      } catch (emailError) {
        console.error('Order confirmation email failed:', emailError);
        emailStatus = { sent: false, error: emailError.message };
      }
    }

    res.status(201).json({
      success: true,
      order,
      emailStatus
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({
      error: 'Failed to create order',
      message: error.message
    });
  }
});

/**
 * Get order by ID
 * GET /api/orders/:orderId
 */
router.get('/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await orderService.getOrder(orderId);

    if (!order) {
      return res.status(404).json({
        error: 'Order not found'
      });
    }

    res.json({
      success: true,
      order
    });
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({
      error: 'Failed to fetch order',
      message: error.message
    });
  }
});

/**
 * Update order status
 * PATCH /api/orders/:orderId
 */
router.patch('/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    const updates = req.body;

    const order = await orderService.updateOrder(orderId, updates);

    if (!order) {
      return res.status(404).json({
        error: 'Order not found'
      });
    }

    let emailStatus = null;
    const isPaid = order.status === 'paid' || order?.payment?.status === 'paid';
    const alreadySent = order?.notifications?.orderConfirmationSent;

    if (isPaid && !alreadySent) {
      try {
        const emailResult = await sendOrderConfirmationEmail(order);
        if (!emailResult?.skipped) {
          const updated = await orderService.updateOrder(orderId, {
            notifications: {
              ...(order.notifications || {}),
              orderConfirmationSent: true,
              orderConfirmationSentAt: new Date().toISOString()
            }
          });
          emailStatus = { sent: true, messageId: emailResult.messageId };
          return res.json({
            success: true,
            order: updated,
            emailStatus
          });
        }
        emailStatus = { sent: false, skipped: true, reason: emailResult?.reason || 'not_sent' };
      } catch (emailError) {
        console.error('Order confirmation email failed:', emailError);
        emailStatus = { sent: false, error: emailError.message };
      }
    }

    res.json({
      success: true,
      order,
      emailStatus
    });
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({
      error: 'Failed to update order',
      message: error.message
    });
  }
});

/**
 * Get all orders (with pagination)
 * GET /api/orders
 */
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      status
    };

    const result = await orderService.getOrders(options);

    res.json({
      success: true,
      ...result
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({
      error: 'Failed to fetch orders',
      message: error.message
    });
  }
});

export default router;
