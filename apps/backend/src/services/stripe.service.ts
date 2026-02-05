import Stripe from 'stripe';
import { Order } from '../models/Order';
import { User } from '../models/User';
import { AppError } from '../middleware/errorHandler';
import logger from '../utils/logger';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
  apiVersion: '2023-08-16' as any,
  typescript: true,
});

interface CheckoutPayload {
  userId: string;
  productIds: string[];
  totalPrice: number;
  successUrl: string;
  cancelUrl: string;
}

export const stripeService = {
  async createCheckoutSession(payload: CheckoutPayload): Promise<{ sessionId: string }> {
    try {
      const user = await User.findById(payload.userId);
      if (!user) {
        throw new AppError(404, 'User not found');
      }

      // Get or create Stripe customer
      let stripeCustomerId = user.stripeCustomerId;
      if (!stripeCustomerId) {
        const customer = await stripe.customers.create({
          email: user.email,
          name: user.name,
        });
        stripeCustomerId = customer.id;
        user.stripeCustomerId = stripeCustomerId;
        await user.save();
      }

      // Create checkout session
      const session = await stripe.checkout.sessions.create({
        customer: stripeCustomerId,
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: `Hip-Hop Samples (${payload.productIds.length} items)`,
                description: 'Hip-hop beats and samples',
              },
              unit_amount: Math.round(payload.totalPrice * 100), // Convert to cents
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: payload.successUrl,
        cancel_url: payload.cancelUrl,
        metadata: {
          userId: payload.userId,
          productIds: payload.productIds.join(','),
        },
      });

      logger.info('✅ Stripe checkout session created', {
        sessionId: session.id,
        userId: payload.userId,
      });

      return { sessionId: session.id };
    } catch (error) {
      if (error instanceof AppError) throw error;
      logger.error('❌ Stripe checkout session creation failed', { error });
      throw new AppError(500, 'Checkout failed');
    }
  },

  async handlePaymentSuccess(sessionId: string): Promise<void> {
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId);

      if (!session.metadata?.userId || !session.metadata?.productIds) {
        throw new AppError(400, 'Invalid session metadata');
      }

      // Update order status
      const order = await Order.findOne({
        stripePaymentId: session.payment_intent,
      });

      if (order) {
        order.status = 'completed';
        await order.save();
        logger.info('✅ Order marked as completed', { orderId: order._id });
      }
    } catch (error) {
      if (error instanceof AppError) throw error;
      logger.error('❌ Payment success handling failed', { error });
      throw new AppError(500, 'Payment processing failed');
    }
  },

  async handleWebhook(event: Stripe.Event): Promise<void> {
    try {
      switch (event.type) {
        case 'checkout.session.completed':
          const session = event.data.object as Stripe.Checkout.Session;
          await this.handlePaymentSuccess(session.id);
          break;

        case 'charge.failed':
          logger.warn('⚠️ Charge failed', { event });
          break;

        default:
          logger.debug('ℹ️ Unhandled webhook event', { type: event.type });
      }
    } catch (error) {
      logger.error('❌ Webhook handling failed', { error });
      throw error;
    }
  },

  async constructWebhookEvent(
    body: Buffer,
    signature: string
  ): Promise<Stripe.Event> {
    try {
      const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || 'whsec_placeholder';
      const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
      return event;
    } catch (error) {
      logger.error('❌ Webhook signature verification failed', { error });
      throw new AppError(400, 'Invalid webhook signature');
    }
  },
};
