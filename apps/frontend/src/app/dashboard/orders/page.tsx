'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store';
import { Card, Badge, Skeleton } from '@/components/ui';
import { Order } from '@/types';
import ApiClient from '@/lib/api-client';
import { formatCurrency, formatDate } from '@/lib/utils';
import Link from 'next/link';

export default function OrdersPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await ApiClient.get<{ items: Order[] }>('/orders');
        setOrders(response.data.items);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated()) {
      fetchOrders();
    }
  }, [isAuthenticated]);

  const getStatusColor = (status: string): 'primary' | 'secondary' | 'success' | 'warning' | 'error' => {
    switch (status) {
      case 'delivered':
        return 'success';
      case 'shipped':
        return 'primary';
      case 'pending':
        return 'warning';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Order History</h1>

      {error && (
        <Card variant="outlined">
          <div className="text-center py-4">
            <p className="text-red-600 dark:text-red-400">{error}</p>
          </div>
        </Card>
      )}

      <div className="space-y-4">
        {loading ? (
          <>
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </>
        ) : orders.length === 0 ? (
          <Card>
            <div className="text-center py-12">
              <div className="text-4xl mb-4">📦</div>
              <h2 className="text-lg font-semibold mb-2">No orders yet</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Start exploring our samples and make your first purchase
              </p>
              <Link href="/products" className="text-brand-primary hover:underline mt-4 inline-block">
                Browse Samples
              </Link>
            </div>
          </Card>
        ) : (
          orders.map((order) => (
            <Link key={order.id} href={`/dashboard/orders/${order.id}`}>
              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">Order #{order.id.slice(0, 8).toUpperCase()}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{formatDate(order.createdAt)}</p>
                    </div>
                    <Badge variant={getStatusColor(order.status)}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-800 pt-3">
                    <div className="flex justify-between items-center">
                      <p className="text-sm">{order.items.length} sample{order.items.length !== 1 ? 's' : ''}</p>
                      <p className="font-semibold">{formatCurrency(order.total)}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
