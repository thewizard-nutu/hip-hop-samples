import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { AppError } from '../middleware/errorHandler';
import logger from '../utils/logger';

interface RegisterPayload {
  email: string;
  name: string;
  password: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  user: {
    _id: string;
    email: string;
    name: string;
  };
}

export const authService = {
  async register(payload: RegisterPayload): Promise<AuthResponse> {
    try {
      // Check if user exists
      const existingUser = await User.findOne({ email: payload.email });
      if (existingUser) {
        throw new AppError(409, 'Email already registered');
      }

      // Create new user
      const user = new User({
        email: payload.email,
        name: payload.name,
        password: payload.password,
        downloadedProducts: [],
      });

      await user.save();

      // Generate JWT token
      const secret = process.env.JWT_SECRET || 'dev-secret-key';
      const token = jwt.sign(
        {
          userId: user._id.toString(),
          userEmail: user.email,
        },
        secret,
        { expiresIn: process.env.JWT_EXPIRE || '7d' } as any
      );

      logger.info('✅ User registered successfully', { email: user.email });

      return {
        token,
        user: {
          _id: user._id.toString(),
          email: user.email,
          name: user.name,
        },
      };
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError(500, 'Registration failed');
    }
  },

  async login(payload: LoginPayload): Promise<AuthResponse> {
    try {
      const user = await User.findOne({ email: payload.email }).select('+password');

      if (!user) {
        throw new AppError(401, 'Invalid credentials');
      }

      const isPasswordMatch = await user.comparePassword(payload.password);

      if (!isPasswordMatch) {
        throw new AppError(401, 'Invalid credentials');
      }

      // Generate JWT token
      const secret = process.env.JWT_SECRET || 'dev-secret-key';
      const token = jwt.sign(
        {
          userId: user._id.toString(),
          userEmail: user.email,
        },
        secret,
        { expiresIn: process.env.JWT_EXPIRE || '7d' } as any
      );

      logger.info('✅ User logged in successfully', { email: user.email });

      return {
        token,
        user: {
          _id: user._id.toString(),
          email: user.email,
          name: user.name,
        },
      };
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError(500, 'Login failed');
    }
  },

  async verifyToken(token: string): Promise<{ userId: string; userEmail: string }> {
    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'dev-secret-key'
      ) as { userId: string; userEmail: string };

      return decoded;
    } catch (error) {
      throw new AppError(401, 'Invalid token');
    }
  },
};
