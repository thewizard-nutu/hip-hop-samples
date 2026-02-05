'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore, useAuthStore } from '@/store';
import { Card, Button, Input, Toast } from '@/components/ui';
import { CartSummary } from '@/components/cart';
import ApiClient from '@/lib/api-client';

interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const { user, isAuthenticated } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState<CheckoutFormData>({
    firstName: '',
    lastName: '',
    email: user?.email || '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
  });

  // Redirect if not authenticated or cart is empty
  React.useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/auth/login');
    }
    if (items.length === 0) {
      router.push('/cart');
    }
  }, [isAuthenticated, items.length, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Validate form fields
      if (!formData.firstName || !formData.lastName || !formData.address || !formData.city) {
        throw new Error('Please fill in all required fields');
      }

      // Create payment intent on backend
      const orderData = {
        items: items.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
          price: item.product.price,
        })),
        shippingAddress: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country,
        },
        paymentMethod: {
          type: 'card',
          cardNumber: formData.cardNumber.replace(/\s/g, ''),
          expiry: formData.expiry,
          cvc: formData.cvc,
        },
      };

      const response = await ApiClient.post('/orders', orderData);
      const { orderId } = response.data;

      setSuccess(true);
      clearCart();

      // Redirect to order confirmation
      setTimeout(() => {
        router.push(`/dashboard/orders/${orderId}`);
      }, 1500);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Payment failed. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const total = getTotalPrice();
  const tax = total * 0.08;
  const subtotal = total;

  if (success) {
    return (
      <div className="text-center py-12">
        <h1 className="text-3xl font-bold mb-4">Payment Successful! ✨</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Your order has been placed. Redirecting to order details...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Checkout</h1>

      {error && (
        <Toast
          message={error}
          type="error"
          onClose={() => setError(null)}
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Checkout Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Shipping */}
          <Card>
            <div className="space-y-4">
              <h2 className="text-lg font-bold">Shipping Address</h2>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  name="firstName"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  label="Last Name"
                  name="lastName"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <Input
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                disabled
              />
              <Input
                label="Street Address"
                name="address"
                placeholder="123 Main St"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="City"
                  name="city"
                  placeholder="New York"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  label="State"
                  name="state"
                  placeholder="NY"
                  value={formData.state}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="ZIP Code"
                  name="zipCode"
                  placeholder="10001"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                />
                <Input
                  label="Country"
                  name="country"
                  placeholder="United States"
                  value={formData.country}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </Card>

          {/* Payment */}
          <Card>
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-lg font-bold">Payment Method</h2>
              
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" name="payment" defaultChecked disabled className="w-4 h-4" />
                  <span>Credit/Debit Card (Stripe)</span>
                </label>
              </div>

              <Input
                label="Card Number"
                name="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={formData.cardNumber}
                onChange={handleInputChange}
                required
              />
              
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Expiry Date (MM/YY)"
                  name="expiry"
                  placeholder="12/25"
                  value={formData.expiry}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  label="CVC"
                  name="cvc"
                  placeholder="123"
                  value={formData.cvc}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <p className="text-xs text-gray-500 dark:text-gray-400">
                Test card: 4242 4242 4242 4242 | Any expiry date | Any CVC
              </p>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={loading}
                disabled={loading}
                className="w-full"
              >
                Complete Purchase
              </Button>
            </form>
          </Card>
        </div>

        {/* Summary */}
        <div>
          <CartSummary
            subtotal={subtotal}
            tax={tax}
          />
        </div>
      </div>
    </div>
  );
}
