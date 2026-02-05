import { Request, Response, NextFunction } from 'express';
import { body, param, query, validationResult } from 'express-validator';
import logger from '../utils/logger';

export const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.warn('❌ Validation errors', { errors: errors.array() });
    res.status(400).json({
      error: 'Validation failed',
      details: errors.array(),
    });
    return;
  }
  next();
};

// Auth validators
export const validateRegister = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Invalid email format'),
  body('name')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .matches(/[A-Z]/)
    .withMessage('Password must contain at least one uppercase letter')
    .matches(/[0-9]/)
    .withMessage('Password must contain at least one number'),
];

export const validateLogin = [
  body('email').isEmail().normalizeEmail().withMessage('Invalid email'),
  body('password').notEmpty().withMessage('Password is required'),
];

// Product validators
export const validateCreateProduct = [
  body('title')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Title must be at least 3 characters'),
  body('description')
    .trim()
    .isLength({ min: 10 })
    .withMessage('Description must be at least 10 characters'),
  body('price')
    .isFloat({ min: 0.99, max: 10000 })
    .withMessage('Price must be between $0.99 and $10,000'),
  body('category')
    .isIn(['trap', 'boom-bap', 'conscious', 'drill', 'cloud-rap', 'other'])
    .withMessage('Invalid category'),
  body('bpm').isInt({ min: 60, max: 180 }).withMessage('BPM must be between 60 and 180'),
  body('key')
    .isIn(['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'])
    .withMessage('Invalid key'),
  body('s3Keys.original').notEmpty().withMessage('Original S3 key is required'),
  body('s3Keys.preview').notEmpty().withMessage('Preview S3 key is required'),
  body('preview').isURL().withMessage('Invalid preview URL'),
];

// Pagination validators
export const validatePagination = [
  query('page').optional().isInt({ min: 1 }).toInt().withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).toInt().withMessage('Limit must be between 1 and 100'),
];

// Search validators
export const validateSearch = [
  query('q').optional().trim().isLength({ min: 1 }).withMessage('Search query is required'),
];

// Filter validators
export const validateFilter = [
  query('category').optional().isIn(['trap', 'boom-bap', 'conscious', 'drill', 'cloud-rap', 'other']).withMessage('Invalid category'),
  query('minPrice').optional().isFloat({ min: 0 }).toFloat().withMessage('Invalid min price'),
  query('maxPrice').optional().isFloat({ min: 0 }).toFloat().withMessage('Invalid max price'),
  query('bpm').optional().isInt({ min: 60, max: 180 }).toInt().withMessage('Invalid BPM'),
];

// Cart validators
export const validateAddToCart = [
  body('productId').notEmpty().withMessage('Product ID is required'),
  body('quantity').optional().isInt({ min: 1 }).toInt().withMessage('Quantity must be at least 1'),
];

// ID validators
export const validateId = [
  param('id').isMongoId().withMessage('Invalid ID'),
];
