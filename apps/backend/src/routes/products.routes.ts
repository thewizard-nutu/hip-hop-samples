import { Router } from 'express';
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  searchProducts,
} from '../controllers/products.controller';
import {
  validateCreateProduct,
  validatePagination,
  validateSearch,
  validateFilter,
  validateId,
  handleValidationErrors,
} from '../middleware/validation';

const router = Router();

/**
 * @route   GET /api/products/search
 * @desc    Search products
 * @access  Public
 */
router.get(
  '/search',
  validateSearch,
  handleValidationErrors,
  searchProducts
);

/**
 * @route   POST /api/products
 * @desc    Create a new product
 * @access  Private (Admin)
 */
router.post(
  '/',
  validateCreateProduct,
  handleValidationErrors,
  createProduct
);

/**
 * @route   GET /api/products
 * @desc    Get all products with filters and pagination
 * @access  Public
 */
router.get(
  '/',
  validatePagination,
  validateFilter,
  handleValidationErrors,
  getAllProducts
);

/**
 * @route   GET /api/products/:id
 * @desc    Get product by ID
 * @access  Public
 */
router.get(
  '/:id',
  validateId,
  handleValidationErrors,
  getProductById
);

/**
 * @route   PUT /api/products/:id
 * @desc    Update product by ID
 * @access  Private (Admin)
 */
router.put(
  '/:id',
  validateId,
  handleValidationErrors,
  updateProduct
);

/**
 * @route   DELETE /api/products/:id
 * @desc    Delete product by ID
 * @access  Private (Admin)
 */
router.delete(
  '/:id',
  validateId,
  handleValidationErrors,
  deleteProduct
);

export default router;
