import { Request, Response } from 'express';
import { authService } from '../services/auth.service';
import { asyncHandler, AppError } from '../middleware/errorHandler';

export const register = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { email, name, password } = req.body;

  if (!email || !name || !password) {
    throw new AppError(400, 'Email, name, and password are required');
  }

  const result = await authService.register({ email, name, password });

  res.status(201).json({
    success: true,
    data: result,
    message: 'User registered successfully',
  });
});

export const login = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError(400, 'Email and password are required');
  }

  const result = await authService.login({ email, password });

  res.status(200).json({
    success: true,
    data: result,
    message: 'Login successful',
  });
});

export const verifyToken = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new AppError(400, 'No token provided');
    }

    const decoded = await authService.verifyToken(token);

    res.status(200).json({
      success: true,
      data: decoded,
      message: 'Token is valid',
    });
  }
);
