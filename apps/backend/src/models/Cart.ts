import mongoose, { Document, Schema } from 'mongoose';
import { ICart } from '../types';

interface ICartDocument extends Document, ICart {}

const cartSchema = new Schema<ICartDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId as any,
      ref: 'User',
      required: [true, 'User ID is required'],
      unique: true,
      index: true,
    },
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId as any,
          ref: 'Product',
          required: [true, 'Product ID is required'],
        },
        quantity: {
          type: Number,
          required: [true, 'Quantity is required'],
          min: [1, 'Quantity must be at least 1'],
          default: 1,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
      min: [0, 'Total price cannot be negative'],
    },
  },
  { timestamps: true }
);

// Indexes
cartSchema.index({ userId: 1 });
cartSchema.index({ createdAt: -1 });

export const Cart = mongoose.model<ICartDocument>('Cart', cartSchema);
