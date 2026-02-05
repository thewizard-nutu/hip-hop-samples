'use client';

import React from 'react';
import Link from 'next/link';
import { useAuthStore, useCartStore } from '@/store';
import { Button } from '@/components/ui';

const Header: React.FC = () => {
  const { user, logout } = useAuthStore();
  const { getTotalItems } = useCartStore();
  const cartCount = getTotalItems();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">🎧</span>
          </div>
          <span className="text-xl font-bold text-gray-900 dark:text-white">HipSamples</span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/products" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
            Products
          </Link>
          {user && (
            <Link href="/dashboard" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              Dashboard
            </Link>
          )}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <Link href="/cart" className="relative">
            <Button variant="ghost" size="md">
              🛒 Cart
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Button>
          </Link>

          {user ? (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400 hidden sm:inline">{user.name}</span>
              <Button
                variant="secondary"
                size="md"
                onClick={logout}
              >
                Logout
              </Button>
            </div>
          ) : (
            <Link href="/auth/login">
              <Button variant="secondary" size="md">
                Login
              </Button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
