'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCartStore, useAuthStore } from '@/store';
import { CartItem, CartSummary } from '@/components/cart';
import { Button } from '@/components/ui';

export default function CartPage() {
  const router = useRouter();
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  const total = getTotalPrice();

  const handleCheckout = () => {
    if (!isAuthenticated()) {
      router.push('/auth/login');
      return;
    }
    router.push('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
        <div className="text-6xl">🛒</div>
        <h1 className="text-3xl font-bold">Your cart is empty</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-md">
          Browse our collection of premium hip-hop samples and add your favorites to the cart
        </p>
        <Link href="/products">
          <Button variant="primary" size="lg">
            Continue Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Shopping Cart</h1>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearCart}
          className="text-red-500 hover:text-red-700"
        >
          Clear Cart
        </Button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Items */}
        <div className="lg:col-span-2 space-y-3">
          {items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onUpdateQuantity={(quantity) => {
                if (quantity > 0) {
                  updateQuantity(item.product.id, quantity);
                }
              }}
              onRemove={() => removeItem(item.product.id)}
            />
          ))}
        </div>

        {/* Summary */}
        <div>
          <CartSummary
            subtotal={total}
            tax={total * 0.08}
            onCheckout={handleCheckout}
          />
        </div>
      </div>
    </div>
  );
}
