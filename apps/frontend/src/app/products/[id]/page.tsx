'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useCartStore } from '@/store';
import { ProductDetail } from '@/components/products';
import { Product } from '@/types';
import ApiClient from '@/lib/api-client';
import { Skeleton } from '@/components/ui';

export default function ProductDetailPage() {
  const params = useParams();
  const { addItem } = useCartStore();
  const productId = params.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await ApiClient.get<Product>(`/products/${productId}`);
        setProduct(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      if (!product) return;
      try {
        const response = await ApiClient.get<{ items: Product[] }>(
          `/products?genre=${product.genre}&limit=3`
        );
        setRelatedProducts(response.data.items.filter((p) => p.id !== product.id).slice(0, 3));
      } catch (err) {
        // Silent fail for related products
      }
    };

    if (product) {
      fetchRelatedProducts();
    }
  }, [product]);

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="space-y-4">
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-4 w-1/4" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Skeleton className="aspect-square rounded-lg" />
          <div className="space-y-4">
            <Skeleton className="h-48" />
            <Skeleton className="h-48" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="text-gray-600 dark:text-gray-400">{error || 'The product you are looking for does not exist.'}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <ProductDetail
        product={product}
        onAddToCart={() => {
          addItem(product, 1);
          // Show success toast
        }}
      />

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-gray-200 dark:border-gray-800 pt-8">
          <h2 className="text-2xl font-bold mb-6">Related Samples</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedProducts.map((relatedProduct) => (
              <div
                key={relatedProduct.id}
                className="h-48 bg-gray-200 dark:bg-gray-800 rounded-lg cursor-pointer hover:shadow-lg transition-shadow"
              >
                <img
                  src={relatedProduct.imageUrl || '/placeholder.jpg'}
                  alt={relatedProduct.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
