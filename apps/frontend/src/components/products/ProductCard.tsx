import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { Card, Badge, Button } from '@/components/ui';
import { formatCurrency, formatNumber } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  onAddToCart?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <Link href={`/products/${product.id}`}>
      <Card variant="elevated" className="h-full hover:shadow-xl transition-shadow cursor-pointer">
        <div className="space-y-3">
          {/* Image */}
          <div className="relative w-full h-40 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
            <Image
              src={product.imageUrl || '/placeholder.jpg'}
              alt={product.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>

          {/* Content */}
          <div>
            <h3 className="font-semibold text-base line-clamp-2">{product.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{product.artist}</p>
          </div>

          {/* Details */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="primary" size="sm">
              {product.genre}
            </Badge>
            <Badge variant="secondary" size="sm">
              {product.bpm} BPM
            </Badge>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-lg font-bold text-brand-primary">
              {formatCurrency(product.price)}
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              ⬇️ {formatNumber(product.downloads)}
            </span>
          </div>

          {/* Action */}
          {onAddToCart && (
            <Button
              variant="primary"
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                onAddToCart();
              }}
              className="w-full"
            >
              Add to Cart
            </Button>
          )}
        </div>
      </Card>
    </Link>
  );
};

export default ProductCard;
