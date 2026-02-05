import { addToCart, getCart, removeFromCart } from '../src/controllers/cart.controller';
import { Cart } from '../src/models/Cart';
import { Product } from '../src/models/Product';
import { AuthRequest } from '../src/types';
import { Response, NextFunction } from 'express';

jest.mock('../src/models/Cart');
jest.mock('../src/models/Product');

const waitForAsync = () => new Promise(resolve => setImmediate(resolve));

describe('Cart Controller', () => {
  let mockRequest: Partial<AuthRequest>;
  let mockResponse: Partial<Response>;
  let mockNext: jest.Mock;

  beforeEach(() => {
    mockRequest = {
      userId: 'user123',
      body: {},
      params: {},
    };

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    mockNext = jest.fn();
  });

  describe('POST /api/cart', () => {
    it('should add product to cart', async () => {
      const mockProduct = {
        _id: 'product123',
        price: 9.99,
      };

      const mockCart = {
        userId: 'user123',
        items: [{ productId: 'product123', quantity: 1 }],
        totalPrice: 9.99,
        save: jest.fn().mockResolvedValue({
          userId: 'user123',
          items: [{ productId: 'product123', quantity: 1 }],
          totalPrice: 9.99,
          populate: jest.fn().mockReturnThis(),
        }),
        populate: jest.fn().mockReturnThis(),
      };

      mockRequest.body = { productId: 'product123', quantity: 1 };
      (Product.findById as jest.Mock).mockResolvedValue(mockProduct);
      (Cart.findOne as jest.Mock).mockResolvedValue(null);
      (Cart.prototype.save as jest.Mock).mockResolvedValue(mockCart);

      addToCart(mockRequest as AuthRequest, mockResponse as Response, mockNext as NextFunction);
      await waitForAsync();

      expect(mockResponse.status).toHaveBeenCalledWith(200);
    });

    it('should fail if product not found', async () => {
      mockRequest.body = { productId: 'nonexistent' };
      (Product.findById as jest.Mock).mockResolvedValue(null);

      addToCart(mockRequest as AuthRequest, mockResponse as Response, mockNext as NextFunction);
      await waitForAsync();

      expect(mockResponse.status).toHaveBeenCalledWith(404);
    });

    it('should fail if user not authenticated', async () => {
      mockRequest.userId = undefined;
      mockRequest.body = { productId: 'product123' };

      addToCart(mockRequest as AuthRequest, mockResponse as Response, mockNext as NextFunction);
      await waitForAsync();

      expect(mockResponse.status).toHaveBeenCalledWith(401);
    });
  });

  describe('GET /api/cart', () => {
    it('should get user cart', async () => {
      const mockCart = {
        userId: 'user123',
        items: [{ productId: 'product123', quantity: 1 }],
        totalPrice: 9.99,
      };

      (Cart.findOne as jest.Mock).mockReturnValue({
        populate: jest.fn().mockResolvedValue(mockCart),
      });

      getCart(mockRequest as AuthRequest, mockResponse as Response, mockNext as NextFunction);
      await waitForAsync();

      expect(mockResponse.status).toHaveBeenCalledWith(200);
    });

    it('should return empty cart if not found', async () => {
      (Cart.findOne as jest.Mock).mockReturnValue({
        populate: jest.fn().mockResolvedValue(null),
      });

      getCart(mockRequest as AuthRequest, mockResponse as Response, mockNext as NextFunction);
      await waitForAsync();

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          data: expect.objectContaining({
            items: [],
            totalPrice: 0,
          }),
        })
      );
    });
  });

  describe('DELETE /api/cart/:productId', () => {
    it('should remove product from cart', async () => {
      const mockCart = {
        userId: 'user123',
        items: [],
        totalPrice: 0,
        save: jest.fn().mockResolvedValue({
          userId: 'user123',
          items: [],
          totalPrice: 0,
        }),
        populate: jest.fn().mockReturnThis(),
      };

      mockRequest.params = { productId: 'product123' };
      (mockCart.items as any) = [
        { productId: { toString: () => 'product123' }, quantity: 1 },
      ];
      (Cart.findOne as jest.Mock).mockResolvedValue(mockCart);

      removeFromCart(mockRequest as AuthRequest, mockResponse as Response, mockNext as NextFunction);
      await waitForAsync();

      expect(mockResponse.status).toHaveBeenCalledWith(200);
    });
  });
});
