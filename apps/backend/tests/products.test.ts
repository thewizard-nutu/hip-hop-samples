import { getAllProducts, getProductById, createProduct } from '../src/controllers/products.controller';
import { Product } from '../src/models/Product';
import { Request, Response, NextFunction } from 'express';

jest.mock('../src/models/Product');

const waitForAsync = () => new Promise(resolve => setImmediate(resolve));

describe('Products Controller', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: jest.Mock;

  const mockProduct = {
    _id: 'product123',
    title: 'Hip-Hop Beat Pack',
    description: 'Amazing hip-hop beats for production',
    price: 9.99,
    category: 'trap',
    bpm: 95,
    key: 'C',
    s3Keys: {
      original: 's3://bucket/original.wav',
      preview: 's3://bucket/preview.mp3',
    },
    preview: 'https://example.com/preview.mp3',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    mockRequest = {
      body: {},
      params: {},
      query: {},
    };

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    mockNext = jest.fn();
  });

  describe('GET /api/products', () => {
    it('should get all products with pagination', async () => {
      const mockProducts = [mockProduct];
      const mockTotal = 1;

      mockRequest.query = { page: '1', limit: '10' };
      (Product.find as jest.Mock).mockReturnValue({
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        sort: jest.fn().mockReturnThis(),
        lean: jest.fn().mockResolvedValue(mockProducts),
      });
      (Product.countDocuments as jest.Mock).mockResolvedValue(mockTotal);

      getAllProducts(mockRequest as Request, mockResponse as Response, mockNext as NextFunction);
      await waitForAsync();

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          data: mockProducts,
        })
      );
    });

    it('should filter products by category', async () => {
      const mockProducts = [mockProduct];

      mockRequest.query = { category: 'trap', page: '1', limit: '10' };
      (Product.find as jest.Mock).mockReturnValue({
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        sort: jest.fn().mockReturnThis(),
        lean: jest.fn().mockResolvedValue(mockProducts),
      });
      (Product.countDocuments as jest.Mock).mockResolvedValue(1);

      getAllProducts(mockRequest as Request, mockResponse as Response, mockNext as NextFunction);
      await waitForAsync();

      expect(mockResponse.status).toHaveBeenCalledWith(200);
    });

    it('should filter products by price range', async () => {
      mockRequest.query = {
        minPrice: '5',
        maxPrice: '15',
        page: '1',
        limit: '10',
      };
      (Product.find as jest.Mock).mockReturnValue({
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        sort: jest.fn().mockReturnThis(),
        lean: jest.fn().mockResolvedValue([mockProduct]),
      });
      (Product.countDocuments as jest.Mock).mockResolvedValue(1);

      getAllProducts(mockRequest as Request, mockResponse as Response, mockNext as NextFunction);
      await waitForAsync();

      expect(mockResponse.status).toHaveBeenCalledWith(200);
    });

    it('should handle search query', async () => {
      mockRequest.query = { q: 'hip-hop', page: '1', limit: '10' };
      (Product.find as jest.Mock).mockReturnValue({
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        sort: jest.fn().mockReturnThis(),
        lean: jest.fn().mockResolvedValue([mockProduct]),
      });
      (Product.countDocuments as jest.Mock).mockResolvedValue(1);

      getAllProducts(mockRequest as Request, mockResponse as Response, mockNext as NextFunction);
      await waitForAsync();

      expect(mockResponse.status).toHaveBeenCalledWith(200);
    });
  });

  describe('GET /api/products/:id', () => {
    it('should get product by ID', async () => {
      mockRequest.params = { id: 'product123' };
      (Product.findById as jest.Mock).mockResolvedValue(mockProduct);

      getProductById(mockRequest as Request, mockResponse as Response, mockNext as NextFunction);
      await waitForAsync();

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          data: mockProduct,
        })
      );
    });

    it('should return 404 if product not found', async () => {
      mockRequest.params = { id: 'nonexistent' };
      (Product.findById as jest.Mock).mockResolvedValue(null);

      getProductById(mockRequest as Request, mockResponse as Response, mockNext as NextFunction);
      await waitForAsync();

      expect(mockResponse.status).toHaveBeenCalledWith(404);
    });
  });

  describe('POST /api/products', () => {
    it('should create a new product', async () => {
      mockRequest.body = mockProduct;
      (Product.prototype.save as jest.Mock).mockResolvedValue(mockProduct);

      createProduct(mockRequest as Request, mockResponse as Response, mockNext as NextFunction);
      await waitForAsync();

      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
        })
      );
    });
  });
});
