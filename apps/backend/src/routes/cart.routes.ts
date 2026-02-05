import { Router } from 'express';
import {
  addToCart,
  getCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from '../controllers/cart.controller';
import {
  validateAddToCart,
  validateId,
  handleValidationErrors,
} from '../middleware/validation';
import { authenticate } from '../middleware/auth';

const router = Router();

// All cart routes require authentication
router.use(authenticate);

/**
 * @route   POST /api/cart
 * @desc    Add product to cart
 * @access  Private
 */
router.post(
  '/',
  validateAddToCart,
  handleValidationErrors,
  addToCart
);

/**
 * @route   GET /api/cart
 * @desc    Get user cart
 * @access  Private
 */
router.get('/', getCart);

/**
 * @route   PUT /api/cart/:productId
 * @desc    Update cart item quantity
 * @access  Private
 */
router.put(
  '/:productId',
  validateId,
  handleValidationErrors,
  updateCartItem
);

/**
 * @route   DELETE /api/cart/:productId
 * @desc    Remove product from cart
 * @access  Private
 */
router.delete(
  '/:productId',
  validateId,
  handleValidationErrors,
  removeFromCart
);

/**
 * @route   DELETE /api/cart
 * @desc    Clear entire cart
 * @access  Private
 */
router.delete('/', clearCart);

export default router;
