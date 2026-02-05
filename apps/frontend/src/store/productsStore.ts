import { create } from 'zustand';
import { Product, PaginatedResponse } from '@/types';
import ApiClient from '@/lib/api-client';

interface ProductsStore {
  products: Product[];
  featured: Product[];
  loading: boolean;
  error: string | null;
  
  filters: {
    genre: string[];
    minPrice: number;
    maxPrice: number;
    bpm: number[];
    search: string;
  };
  
  pagination: {
    page: number;
    pageSize: number;
    total: number;
  };

  fetchProducts: () => Promise<void>;
  fetchFeatured: () => Promise<void>;
  setFilters: (filters: Partial<ProductsStore['filters']>) => void;
  setPage: (page: number) => void;
  resetFilters: () => void;
}

const useProductsStore = create<ProductsStore>((set, get) => ({
  products: [],
  featured: [],
  loading: false,
  error: null,
  
  filters: {
    genre: [],
    minPrice: 0,
    maxPrice: 1000,
    bpm: [],
    search: '',
  },
  
  pagination: {
    page: 1,
    pageSize: 12,
    total: 0,
  },

  fetchProducts: async () => {
    const { filters, pagination } = get();
    set({ loading: true, error: null });

    try {
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        pageSize: pagination.pageSize.toString(),
        ...(filters.search && { search: filters.search }),
        ...(filters.genre.length > 0 && { genre: filters.genre.join(',') }),
        ...(filters.minPrice > 0 && { minPrice: filters.minPrice.toString() }),
        ...(filters.maxPrice < 1000 && { maxPrice: filters.maxPrice.toString() }),
      });

      const response = await ApiClient.get<PaginatedResponse<Product>>(
        `/products?${params}`
      );

      set({
        products: response.data.items,
        pagination: {
          page: response.data.page,
          pageSize: response.data.pageSize,
          total: response.data.total,
        },
        loading: false,
      });
    } catch (error: any) {
      set({ error: 'Failed to fetch products', loading: false });
    }
  },

  fetchFeatured: async () => {
    set({ loading: true, error: null });

    try {
      const response = await ApiClient.get<{ items: Product[] }>(
        '/products/featured?limit=6'
      );
      set({ featured: response.data.items, loading: false });
    } catch (error: any) {
      set({ error: 'Failed to fetch featured products', loading: false });
    }
  },

  setFilters: (newFilters: Partial<ProductsStore['filters']>) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
      pagination: { ...state.pagination, page: 1 },
    }));
  },

  setPage: (page: number) => {
    set((state) => ({
      pagination: { ...state.pagination, page },
    }));
  },

  resetFilters: () => {
    set({
      filters: {
        genre: [],
        minPrice: 0,
        maxPrice: 1000,
        bpm: [],
        search: '',
      },
      pagination: {
        page: 1,
        pageSize: 12,
        total: 0,
      },
    });
  },
}));

export default useProductsStore;
