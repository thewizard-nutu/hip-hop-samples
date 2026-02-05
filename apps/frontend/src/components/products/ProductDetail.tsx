'use client';

import React, { useState } from 'react';
import { Product } from '@/types';
import { Card, Button, Badge } from '@/components/ui';
import { AudioPlayer } from '@/components/features';
import { formatCurrency, formatNumber, formatDate } from '@/lib/utils';

interface ProductDetailProps {
  product: Product;
  onAddToCart?: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
        <p className="text-gray-600 dark:text-gray-400">By {product.artist}</p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Image */}
        <div className="space-y-4">
          <div className="w-full aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
            {/* Using img for static mock, should use Image in production */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.imageUrl || '/placeholder.jpg'}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Audio Player */}
          <AudioPlayer audioUrl={product.audioUrl} title={product.title} />
        </div>

        {/* Right: Info */}
        <div className="space-y-4">
          {/* Price */}
          <Card variant="outlined">
            <div className="space-y-4">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Price</p>
                <p className="text-4xl font-bold text-brand-primary">{formatCurrency(product.price)}</p>
              </div>

              <div className="flex gap-2">
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 px-2 py-2 border rounded-lg dark:bg-gray-800"
                />
                <Button
                  variant="primary"
                  size="lg"
                  onClick={onAddToCart}
                  className="flex-1"
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </Card>

          {/* Details */}
          <Card>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Genre</p>
                <p className="font-semibold">{product.genre}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">BPM</p>
                <p className="font-semibold">{product.bpm}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Downloads</p>
                <p className="font-semibold">{formatNumber(product.downloads)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Published</p>
                <p className="font-semibold">{formatDate(product.createdAt)}</p>
              </div>
            </div>
          </Card>

          {/* Tags */}
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Tags</p>
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <Badge key={tag} variant="secondary" size="sm">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Description */}
          <Card>
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{product.description}</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
