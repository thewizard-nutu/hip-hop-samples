'use client';

import React from 'react';
import { CartItem as CartItemType } from '@/types';
import { Card, Button } from '@/components/ui';
import { formatCurrency } from '@/lib/utils';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity?: (quantity: number) => void;
  onRemove?: () => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onUpdateQuantity, onRemove }) => {
  return (
    <Card className="flex items-center gap-4">
      {/* Image */}
      <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-lg flex-shrink-0 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.product.imageUrl || '/placeholder.jpg'}
          alt={item.product.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold truncate">{item.product.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">{item.product.artist}</p>
        <p className="text-lg font-bold text-brand-primary mt-1">
          {formatCurrency(item.product.price)}
        </p>
      </div>

      {/* Quantity */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onUpdateQuantity?.(item.quantity - 1)}
          disabled={item.quantity <= 1}
        >
          −
        </Button>
        <span className="w-8 text-center font-semibold">{item.quantity}</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onUpdateQuantity?.(item.quantity + 1)}
        >
          +
        </Button>
      </div>

      {/* Total */}
      <div className="text-right flex-shrink-0">
        <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
        <p className="text-lg font-bold">{formatCurrency(item.product.price * item.quantity)}</p>
      </div>

      {/* Remove */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onRemove}
        className="text-red-500 hover:text-red-700"
      >
        ✕
      </Button>
    </Card>
  );
};

export default CartItem;
