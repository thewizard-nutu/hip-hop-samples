import mongoose, { Document, Schema } from 'mongoose';
import { IOrder } from '../types';

interface IOrderDocument extends Document, IOrder {}

const orderSchema = new Schema<IOrderDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId as any,
      ref: 'User',
      required: [true, 'User ID is required'],
      index: true,
    },
    productIds: [
      {
        type: Schema.Types.ObjectId as any,
        ref: 'Product',
        required: true,
      },
    ],
    totalPrice: {
      type: Number,
      required: [true, 'Total price is required'],
      min: [0.99, 'Total price must be at least $0.99'],
    },
    stripePaymentId: {
      type: String,
      sparse: true,
      index: true,
    },
    downloadUrls: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending',
      index: true,
    },
  },
  { timestamps: true }
);

// Indexes
orderSchema.index({ userId: 1, createdAt: -1 });
orderSchema.index({ status: 1 });
orderSchema.index({ stripePaymentId: 1 });

export const Order = mongoose.model<IOrderDocument>('Order', orderSchema);
