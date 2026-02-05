import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest, DecodedToken } from '../types';
import logger from '../utils/logger';

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      res.status(401).json({ error: 'No token provided' });
      return;
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'dev-secret-key'
    ) as DecodedToken;

    req.userId = decoded.userId;
    req.userEmail = decoded.userEmail;

    logger.debug('✅ User authenticated', { userId: req.userId });
    next();
  } catch (error) {
    logger.error('❌ Authentication failed', { error });
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};

export const authorize = (_roles?: string[]) => {
  return (req: AuthRequest, _res: Response, next: NextFunction): void => {
    if (!req.userId) {
      _res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    // For now, we don't have roles in the schema, so we skip role checking
    // In a real app, you'd check req.userRole against the _roles array
    next();
  };
};

export const optionalAuth = (
  req: AuthRequest,
  _res: Response,
  next: NextFunction
): void => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (token) {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'dev-secret-key'
      ) as DecodedToken;

      req.userId = decoded.userId;
      req.userEmail = decoded.userEmail;
    }

    next();
  } catch (error) {
    // Silent fail for optional auth
    next();
  }
};
