'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/store';
import { Card, Button, Skeleton } from '@/components/ui';
import { Order } from '@/types';
import ApiClient from '@/lib/api-client';
import { formatCurrency, formatDate } from '@/lib/utils';

interface UserStats {
  totalPurchases: number;
  totalSpent: number;
  totalDownloads: number;
}

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, loadUser } = useAuthStore();
  const [stats, setStats] = useState<UserStats | null>(null);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        // Load user info
        await loadUser();

        // Fetch user stats
        const statsResponse = await ApiClient.get<UserStats>('/users/stats');
        setStats(statsResponse.data);

        // Fetch recent orders
        const ordersResponse = await ApiClient.get<{ items: Order[] }>('/orders?limit=5');
        setRecentOrders(ordersResponse.data.items);
      } catch (error) {
        console.error('Failed to load user data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated()) {
      fetchUserData();
    }
  }, [isAuthenticated, loadUser]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Welcome, {user?.name || 'User'}!</h1>
        <p className="text-gray-600 dark:text-gray-400">Here&apos;s your account overview</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <div className="space-y-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Purchases</p>
            {loading ? (
              <Skeleton className="h-8 w-12" />
            ) : (
              <p className="text-3xl font-bold">{stats?.totalPurchases || 0}</p>
            )}
          </div>
        </Card>
        <Card>
          <div className="space-y-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Spent</p>
            {loading ? (
              <Skeleton className="h-8 w-24" />
            ) : (
              <p className="text-3xl font-bold">{formatCurrency(stats?.totalSpent || 0)}</p>
            )}
          </div>
        </Card>
        <Card>
          <div className="space-y-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Downloads</p>
            {loading ? (
              <Skeleton className="h-8 w-12" />
            ) : (
              <p className="text-3xl font-bold">{stats?.totalDownloads || 0}</p>
            )}
          </div>
        </Card>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link href="/dashboard/orders">
          <Card variant="elevated" className="cursor-pointer hover:shadow-lg transition-shadow">
            <div className="space-y-2">
              <div className="text-2xl">📦</div>
              <h3 className="font-semibold">My Orders</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">View your purchase history</p>
            </div>
          </Card>
        </Link>

        <Link href="/dashboard/downloads">
          <Card variant="elevated" className="cursor-pointer hover:shadow-lg transition-shadow">
            <div className="space-y-2">
              <div className="text-2xl">⬇️</div>
              <h3 className="font-semibold">My Downloads</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Re-download your samples</p>
            </div>
          </Card>
        </Link>
      </div>

      {/* Recent Orders */}
      <Card>
        <div className="space-y-4">
          <h2 className="text-lg font-bold">Recent Orders</h2>
          {loading ? (
            <div className="space-y-2">
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
            </div>
          ) : recentOrders.length > 0 ? (
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <Link key={order.id} href={`/dashboard/orders/${order.id}`}>
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <div>
                      <p className="font-semibold">Order #{order.id.slice(0, 8)}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{formatDate(order.createdAt)}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{formatCurrency(order.total)}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{order.status}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-600 dark:text-gray-400">
              No orders yet. <Link href="/products" className="text-brand-primary hover:underline">Browse samples</Link>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
