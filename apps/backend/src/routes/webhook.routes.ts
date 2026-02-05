import { Router, Request, Response, raw } from 'express';
import { stripeService } from '../services/stripe.service';
import { Order } from '../models/Order';
import { Cart } from '../models/Cart';
import { asyncHandler } from '../middleware/errorHandler';
import logger from '../utils/logger';

const router = Router();

/**
 * @route   POST /api/webhook/stripe
 * @desc    Handle Stripe webhook events
 * @access  Public (but signature verified)
 */
router.post(
  '/stripe',
  raw({ type: 'application/json' }),
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const signature = req.headers['stripe-signature'] as string;

    try {
      const event = await stripeService.constructWebhookEvent(
        req.body as Buffer,
        signature
      );

      logger.info('✅ Webhook event received', { type: event.type });

      // Handle different event types
      switch (event.type) {
        case 'checkout.session.completed': {
          const session = event.data.object as any;

          // Update order status to completed
          const order = await Order.findOne({
            stripePaymentId: session.id,
          });

          if (order) {
            order.status = 'completed';
            await order.save();

            // Clear user's cart
            await Cart.updateOne(
              { userId: order.userId },
              { items: [], totalPrice: 0 }
            );

            logger.info('✅ Order completed via webhook', { orderId: order._id });
          }

          break;
        }

        case 'charge.failed': {
          const charge = event.data.object as any;
          logger.warn('⚠️ Charge failed', {
            chargeId: charge.id,
            failureCode: charge.failure_code,
          });

          // Update order status to failed
          const order = await Order.findOne({
            stripePaymentId: charge.payment_intent,
          });

          if (order) {
            order.status = 'failed';
            await order.save();
            logger.info('✅ Order marked as failed', { orderId: order._id });
          }

          break;
        }

        case 'charge.refunded': {
          const charge = event.data.object as any;
          logger.info('ℹ️ Charge refunded', { chargeId: charge.id });
          break;
        }

        default:
          logger.debug('ℹ️ Unhandled webhook event', { type: event.type });
      }

      res.status(200).json({ received: true });
    } catch (error) {
      logger.error('❌ Webhook processing failed', { error });
      res.status(400).json({ error: 'Webhook failed' });
    }
  })
);

export default router;
