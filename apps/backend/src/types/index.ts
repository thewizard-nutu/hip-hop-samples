import { Request } from 'express';

export interface IUser {
  email: string;
  name: string;
  password: string;
  downloadedProducts: string[];
  stripeCustomerId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IProduct {
  title: string;
  description: string;
  price: number;
  category: string;
  bpm: number;
  key: string;
  s3Keys: {
    original: string;
    preview: string;
  };
  preview: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICart {
  userId: string;
  items: {
    productId: string;
    quantity: number;
  }[];
  totalPrice: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IOrder {
  userId: string;
  productIds: string[];
  totalPrice: number;
  stripePaymentId?: string;
  downloadUrls: { productId: string; url: string }[];
  status: 'pending' | 'completed' | 'failed';
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IDownload {
  orderId: string;
  userId: string;
  productId: string;
  downloadedAt: Date;
  expiresAt: Date;
  url?: string;
}

export interface AuthRequest extends Request {
  userId?: string;
  userEmail?: string;
}

export interface DecodedToken {
  userId: string;
  userEmail: string;
  iat: number;
  exp: number;
}

export interface StripeCheckoutSession {
  sessionId: string;
  clientSecret: string;
  publishableKey: string;
}

export interface S3SignedUrl {
  url: string;
  expiresIn: number;
}
