import { Response } from 'express';
import { Order } from '../models/Order';
import { Cart } from '../models/Cart';
import { Download } from '../models/Download';
import { stripeService } from '../services/stripe.service';
import { s3Service } from '../services/s3.service';
import { asyncHandler, AppError } from '../middleware/errorHandler';
import { AuthRequest } from '../types';
import logger from '../utils/logger';

export const createCheckout = asyncHandler(
  async (req: AuthRequest, res: Response): Promise<void> => {
    const userId = req.userId;
    const { successUrl, cancelUrl } = req.body;

    if (!userId) {
      throw new AppError(401, 'User not authenticated');
    }

    if (!successUrl || !cancelUrl) {
      throw new AppError(400, 'successUrl and cancelUrl are required');
    }

    // Get cart
    const cart = await Cart.findOne({ userId }).populate('items.productId');

    if (!cart || cart.items.length === 0) {
      throw new AppError(400, 'Cart is empty');
    }

    const productIds = cart.items.map((item) => {
      const productId = item.productId;
      return typeof productId === 'string' ? productId : (productId as any)._id.toString();
    });
    const totalPrice = cart.totalPrice;

    // Create order
    const order = new Order({
      userId,
      productIds,
      totalPrice,
      status: 'pending',
      downloadUrls: [],
    });

    await order.save();

    // Create Stripe checkout session
    const { sessionId } = await stripeService.createCheckoutSession({
      userId,
      productIds,
      totalPrice,
      successUrl,
      cancelUrl,
    });

    // Link order to Stripe payment
    order.stripePaymentId = sessionId;
    await order.save();

    logger.info('✅ Checkout session created', { orderId: order._id, sessionId });

    res.status(201).json({
      success: true,
      data: { sessionId, orderId: order._id },
      message: 'Checkout session created',
    });
  }
);

export const getOrders = asyncHandler(
  async (req: AuthRequest, res: Response): Promise<void> => {
    const userId = req.userId;

    if (!userId) {
      throw new AppError(401, 'User not authenticated');
    }

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const orders = await Order.find({ userId })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate('productIds');

    const total = await Order.countDocuments({ userId });

    res.status(200).json({
      success: true,
      data: orders,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
      message: 'Orders fetched successfully',
    });
  }
);

export const getOrderById = asyncHandler(
  async (req: AuthRequest, res: Response): Promise<void> => {
    const { id } = req.params;
    const userId = req.userId;

    if (!userId) {
      throw new AppError(401, 'User not authenticated');
    }

    const order = await Order.findOne({ _id: id, userId }).populate('productIds');

    if (!order) {
      throw new AppError(404, 'Order not found');
    }

    res.status(200).json({
      success: true,
      data: order,
      message: 'Order fetched successfully',
    });
  }
);

export const getDownloads = asyncHandler(
  async (req: AuthRequest, res: Response): Promise<void> => {
    const { orderId } = req.params;
    const userId = req.userId;

    if (!userId) {
      throw new AppError(401, 'User not authenticated');
    }

    // Verify order belongs to user
    const order = await Order.findOne({ _id: orderId, userId });

    if (!order) {
      throw new AppError(404, 'Order not found');
    }

    if (order.status !== 'completed') {
      throw new AppError(400, 'Order has not been paid yet');
    }

    // Get all products in the order and generate signed URLs
    const downloadUrls = [];

    for (const productId of order.productIds) {
      // Check if download already exists
      let download = await Download.findOne({
        orderId,
        productId,
        userId,
      });

      if (!download || new Date() > download.expiresAt) {
        // Generate new signed URL (24 hours expiry)
        const { Product } = await import('../models/Product');
        const product = await Product.findById(productId);
        if (!product) continue;

        const signedUrl = await s3Service.generateSignedUrl(
          product.s3Keys.original,
          86400 // 24 hours
        );

        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + 24);

        // Save or update download record
        if (download) {
          (download as any).url = signedUrl;
          download.expiresAt = expiresAt;
          await download.save();
        } else {
          download = new Download({
            orderId,
            userId,
            productId,
            downloadedAt: new Date(),
            expiresAt,
            url: signedUrl,
          });
          await download.save();
        }
      }

      downloadUrls.push({
        productId: productId.toString(),
        url: (download as any)?.url,
        expiresAt: download?.expiresAt,
      });
    }

    logger.info('✅ Download URLs generated', { orderId, count: downloadUrls.length });

    res.status(200).json({
      success: true,
      data: downloadUrls,
      message: 'Download URLs generated successfully',
    });
  }
);
