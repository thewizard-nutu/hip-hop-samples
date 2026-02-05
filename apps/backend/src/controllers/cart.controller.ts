import { Response } from 'express';
import { Cart } from '../models/Cart';
import { Product } from '../models/Product';
import { asyncHandler, AppError } from '../middleware/errorHandler';
import { AuthRequest } from '../types';
import logger from '../utils/logger';

export const addToCart = asyncHandler(
  async (req: AuthRequest, res: Response): Promise<void> => {
    const { productId, quantity = 1 } = req.body;
    const userId = req.userId;

    if (!userId) {
      throw new AppError(401, 'User not authenticated');
    }

    // Verify product exists and get price
    const product = await Product.findById(productId);
    if (!product) {
      throw new AppError(404, 'Product not found');
    }

    // Find or create cart
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        items: [],
        totalPrice: 0,
      });
    }

    // Check if product already in cart
    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        productId,
        quantity,
      });
    }

    // Recalculate total price
    let totalPrice = 0;
    for (const item of cart.items) {
      const itemProduct = await Product.findById(item.productId);
      if (itemProduct) {
        totalPrice += itemProduct.price * item.quantity;
      }
    }
    cart.totalPrice = Math.round(totalPrice * 100) / 100;

    await cart.save();
    await cart.populate('items.productId');

    logger.info('✅ Product added to cart', { userId, productId });

    res.status(200).json({
      success: true,
      data: cart,
      message: 'Product added to cart',
    });
  }
);

export const getCart = asyncHandler(
  async (req: AuthRequest, res: Response): Promise<void> => {
    const userId = req.userId;

    if (!userId) {
      throw new AppError(401, 'User not authenticated');
    }

    const cart = await Cart.findOne({ userId }).populate('items.productId');

    if (!cart) {
      res.status(200).json({
        success: true,
        data: {
          userId,
          items: [],
          totalPrice: 0,
        },
        message: 'Cart is empty',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: cart,
      message: 'Cart fetched successfully',
    });
  }
);

export const updateCartItem = asyncHandler(
  async (req: AuthRequest, res: Response): Promise<void> => {
    const { productId } = req.params;
    const { quantity } = req.body;
    const userId = req.userId;

    if (!userId) {
      throw new AppError(401, 'User not authenticated');
    }

    if (quantity <= 0) {
      throw new AppError(400, 'Quantity must be greater than 0');
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      throw new AppError(404, 'Cart not found');
    }

    const item = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (!item) {
      throw new AppError(404, 'Product not found in cart');
    }

    item.quantity = quantity;

    // Recalculate total price
    let totalPrice = 0;
    for (const cartItem of cart.items) {
      const product = await Product.findById(cartItem.productId);
      if (product) {
        totalPrice += product.price * cartItem.quantity;
      }
    }
    cart.totalPrice = Math.round(totalPrice * 100) / 100;

    await cart.save();
    await cart.populate('items.productId');

    logger.info('✅ Cart item updated', { userId, productId });

    res.status(200).json({
      success: true,
      data: cart,
      message: 'Cart item updated successfully',
    });
  }
);

export const removeFromCart = asyncHandler(
  async (req: AuthRequest, res: Response): Promise<void> => {
    const { productId } = req.params;
    const userId = req.userId;

    if (!userId) {
      throw new AppError(401, 'User not authenticated');
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      throw new AppError(404, 'Cart not found');
    }

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    // Recalculate total price
    let totalPrice = 0;
    for (const item of cart.items) {
      const product = await Product.findById(item.productId);
      if (product) {
        totalPrice += product.price * item.quantity;
      }
    }
    cart.totalPrice = Math.round(totalPrice * 100) / 100;

    await cart.save();
    await cart.populate('items.productId');

    logger.info('✅ Product removed from cart', { userId, productId });

    res.status(200).json({
      success: true,
      data: cart,
      message: 'Product removed from cart',
    });
  }
);

export const clearCart = asyncHandler(
  async (req: AuthRequest, res: Response): Promise<void> => {
    const userId = req.userId;

    if (!userId) {
      throw new AppError(401, 'User not authenticated');
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      throw new AppError(404, 'Cart not found');
    }

    cart.items = [];
    cart.totalPrice = 0;

    await cart.save();

    logger.info('✅ Cart cleared', { userId });

    res.status(200).json({
      success: true,
      data: cart,
      message: 'Cart cleared successfully',
    });
  }
);
