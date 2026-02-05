import { Router } from 'express';
import {
  createCheckout,
  getOrders,
  getOrderById,
  getDownloads,
} from '../controllers/orders.controller';
import {
  validateId,
  validatePagination,
  handleValidationErrors,
} from '../middleware/validation';
import { authenticate } from '../middleware/auth';

const router = Router();

// All order routes require authentication
router.use(authenticate);

/**
 * @route   POST /api/orders/checkout
 * @desc    Create checkout session for cart items
 * @access  Private
 */
router.post('/checkout', createCheckout);

/**
 * @route   GET /api/orders
 * @desc    Get all user orders with pagination
 * @access  Private
 */
router.get(
  '/',
  validatePagination,
  handleValidationErrors,
  getOrders
);

/**
 * @route   GET /api/orders/:id
 * @desc    Get order by ID
 * @access  Private
 */
router.get(
  '/:id',
  validateId,
  handleValidationErrors,
  getOrderById
);

/**
 * @route   GET /api/orders/:orderId/downloads
 * @desc    Get download URLs for order (24h signed URLs from S3)
 * @access  Private
 */
router.get(
  '/:orderId/downloads',
  validateId,
  handleValidationErrors,
  getDownloads
);

export default router;
