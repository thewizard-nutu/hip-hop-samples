import mongoose, { Document, Schema } from 'mongoose';
import { IProduct } from '../types';

interface IProductDocument extends Document, IProduct {}

const productSchema = new Schema<IProductDocument>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      minlength: [3, 'Title must be at least 3 characters'],
      index: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      minlength: [10, 'Description must be at least 10 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0.99, 'Price must be at least $0.99'],
      max: [10000, 'Price cannot exceed $10,000'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['trap', 'boom-bap', 'conscious', 'drill', 'cloud-rap', 'other'],
      index: true,
    },
    bpm: {
      type: Number,
      required: [true, 'BPM is required'],
      min: [60, 'BPM must be at least 60'],
      max: [180, 'BPM cannot exceed 180'],
    },
    key: {
      type: String,
      required: [true, 'Key is required'],
      enum: ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
    },
    s3Keys: {
      original: {
        type: String,
        required: [true, 'Original S3 key is required'],
      },
      preview: {
        type: String,
        required: [true, 'Preview S3 key is required'],
      },
    },
    preview: {
      type: String,
      required: [true, 'Preview URL is required'],
    },
  },
  { timestamps: true }
);

// Indexes for search and filtering
productSchema.index({ title: 'text', description: 'text' });
productSchema.index({ category: 1, price: 1 });
productSchema.index({ bpm: 1 });
productSchema.index({ key: 1 });
productSchema.index({ createdAt: -1 });

export const Product = mongoose.model<IProductDocument>('Product', productSchema);
