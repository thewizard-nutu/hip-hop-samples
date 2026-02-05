import React from 'react';
import { Card, Button } from '@/components/ui';
import { formatCurrency } from '@/lib/utils';

interface CartSummaryProps {
  subtotal: number;
  tax?: number;
  shipping?: number;
  onCheckout?: () => void;
  isLoading?: boolean;
}

const CartSummary: React.FC<CartSummaryProps> = ({
  subtotal,
  tax = 0,
  shipping = 0,
  onCheckout,
  isLoading = false,
}) => {
  const total = subtotal + tax + shipping;

  return (
    <Card variant="elevated">
      <div className="space-y-3">
        <h3 className="text-lg font-bold">Order Summary</h3>

        <div className="space-y-2 border-t border-b border-gray-200 dark:border-gray-700 py-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
            <span className="font-semibold">{formatCurrency(subtotal)}</span>
          </div>

          {tax > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Tax</span>
              <span className="font-semibold">{formatCurrency(tax)}</span>
            </div>
          )}

          {shipping > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Shipping</span>
              <span className="font-semibold">{formatCurrency(shipping)}</span>
            </div>
          )}
        </div>

        <div className="flex justify-between text-lg">
          <span className="font-bold">Total</span>
          <span className="font-bold text-brand-primary">{formatCurrency(total)}</span>
        </div>

        <Button
          variant="primary"
          size="lg"
          onClick={onCheckout}
          isLoading={isLoading}
          className="w-full"
        >
          Proceed to Checkout
        </Button>
      </div>
    </Card>
  );
};

export default CartSummary;
