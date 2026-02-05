'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useProductsStore } from '@/store';
import { Button } from '@/components/ui';
import { ProductGrid } from '@/components/products';

export default function HomePage() {
  const { featured, loading, fetchFeatured } = useProductsStore();

  useEffect(() => {
    fetchFeatured();
  }, [fetchFeatured]);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-2xl overflow-hidden flex items-center justify-center text-white text-center p-6">
        <div className="absolute inset-0 opacity-20 flex items-center justify-center text-8xl">🎵</div>
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-5xl font-bold mb-4">Hip-Hop Samples Marketplace</h1>
          <p className="text-xl text-white/90 mb-6">
            Access thousands of royalty-free hip-hop samples, loops, and beats for your music production
          </p>
          <Link href="/products">
            <Button variant="secondary" size="lg">
              Browse Catalog
            </Button>
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section>
        <div className="mb-8">
          <h2 className="text-3xl font-bold">Featured Samples</h2>
          <p className="text-gray-600 dark:text-gray-400">Trending this week</p>
        </div>

        <ProductGrid
          products={featured}
          loading={loading}
          onAddToCart={(product) => {
            console.log('Add to cart:', product);
          }}
        />
      </section>

      {/* Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-8">
        <div className="text-center">
          <div className="text-4xl font-bold text-brand-primary mb-2">10K+</div>
          <p className="text-gray-600 dark:text-gray-400">Samples Available</p>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-brand-primary mb-2">500+</div>
          <p className="text-gray-600 dark:text-gray-400">Artists & Producers</p>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-brand-primary mb-2">50K+</div>
          <p className="text-gray-600 dark:text-gray-400">Downloads Monthly</p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-8 text-center space-y-4">
        <h2 className="text-2xl font-bold">Ready to Create?</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Join thousands of producers making amazing music with our samples
        </p>
        <div>
          <Link href="/auth/register">
            <Button variant="primary" size="lg">
              Get Started for Free
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
