'use client';

import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useProductsStore, useCartStore } from '@/store';
import { ProductGrid } from '@/components/products';
import { SearchBar, FilterPanel } from '@/components/features';

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const { products, loading, filters, fetchProducts, setFilters } = useProductsStore();
  const { addItem } = useCartStore();

  useEffect(() => {
    const search = searchParams.get('search');
    if (search) {
      setFilters({ search });
    }
    fetchProducts();
  }, [searchParams, setFilters, fetchProducts]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-2">Sample Catalog</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Browse thousands of royalty-free hip-hop samples
        </p>
      </div>

      {/* Search */}
      <SearchBar
        onSearch={(query) => {
          setFilters({ search: query });
        }}
      />

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <FilterPanel
            onFilterChange={setFilters}
            onReset={() => {
              fetchProducts();
            }}
          />
        </div>

        {/* Products */}
        <div className="lg:col-span-3">
          <ProductGrid
            products={products}
            loading={loading}
            onAddToCart={(product) => {
              addItem(product, 1);
            }}
          />
        </div>
      </div>
    </div>
  );
}
