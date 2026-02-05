import { Router } from 'express';
import {
  register,
  login,
  verifyToken,
} from '../controllers/auth.controller';
import {
  validateRegister,
  validateLogin,
  handleValidationErrors,
} from '../middleware/validation';
import { authenticate } from '../middleware/auth';

const router = Router();

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post('/register', validateRegister, handleValidationErrors, register);

/**
 * @route   POST /api/auth/login
 * @desc    Login user
 * @access  Public
 */
router.post('/login', validateLogin, handleValidationErrors, login);

/**
 * @route   GET /api/auth/verify
 * @desc    Verify token
 * @access  Private
 */
router.get('/verify', authenticate, verifyToken);

export default router;
