import mongoose, { Document, Schema } from 'mongoose';
import { IDownload } from '../types';

interface IDownloadDocument extends Document, IDownload {}

const downloadSchema = new Schema<IDownloadDocument>(
  {
    orderId: {
      type: Schema.Types.ObjectId as any,
      ref: 'Order',
      required: [true, 'Order ID is required'],
      index: true,
    },
    userId: {
      type: Schema.Types.ObjectId as any,
      ref: 'User',
      required: [true, 'User ID is required'],
      index: true,
    },
    productId: {
      type: Schema.Types.ObjectId as any,
      ref: 'Product',
      required: [true, 'Product ID is required'],
      index: true,
    },
    downloadedAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
    expiresAt: {
      type: Date,
      required: [true, 'Expiry date is required'],
      index: true,
    },
  },
  { timestamps: true }
);

// TTL index - automatically delete expired downloads after expiresAt
downloadSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Compound index for fast lookups
downloadSchema.index({ userId: 1, productId: 1, orderId: 1 });

export const Download = mongoose.model<IDownloadDocument>('Download', downloadSchema);
