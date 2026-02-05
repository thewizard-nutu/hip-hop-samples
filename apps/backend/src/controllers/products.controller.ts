import { Request, Response } from 'express';
import { Product } from '../models/Product';
import { asyncHandler, AppError } from '../middleware/errorHandler';
import { IProduct } from '../types';

export const createProduct = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const productData: IProduct = req.body;

    const product = new Product(productData);
    await product.save();

    res.status(201).json({
      success: true,
      data: product,
      message: 'Product created successfully',
    });
  }
);

export const getAllProducts = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    // Build filter
    const filter: any = {};

    if (req.query.category) {
      filter.category = req.query.category;
    }

    if (req.query.minPrice || req.query.maxPrice) {
      filter.price = {};
      if (req.query.minPrice) {
        filter.price.$gte = parseFloat(req.query.minPrice as string);
      }
      if (req.query.maxPrice) {
        filter.price.$lte = parseFloat(req.query.maxPrice as string);
      }
    }

    if (req.query.bpm) {
      filter.bpm = parseInt(req.query.bpm as string);
    }

    if (req.query.key) {
      filter.key = req.query.key;
    }

    // Search
    if (req.query.q) {
      filter.$text = { $search: req.query.q };
    }

    const products = await Product.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .lean();

    const total = await Product.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: products,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
      message: 'Products fetched successfully',
    });
  }
);

export const getProductById = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      throw new AppError(404, 'Product not found');
    }

    res.status(200).json({
      success: true,
      data: product,
      message: 'Product fetched successfully',
    });
  }
);

export const updateProduct = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const updateData = req.body;

    const product = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      throw new AppError(404, 'Product not found');
    }

    res.status(200).json({
      success: true,
      data: product,
      message: 'Product updated successfully',
    });
  }
);

export const deleteProduct = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      throw new AppError(404, 'Product not found');
    }

    res.status(200).json({
      success: true,
      data: product,
      message: 'Product deleted successfully',
    });
  }
);

export const searchProducts = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { q } = req.query;

    if (!q) {
      throw new AppError(400, 'Search query is required');
    }

    const products = await Product.find(
      { $text: { $search: q as string } },
      { score: { $meta: 'textScore' } }
    )
      .sort({ score: { $meta: 'textScore' } })
      .limit(20)
      .lean();

    res.status(200).json({
      success: true,
      data: products,
      message: 'Search results fetched successfully',
    });
  }
);
