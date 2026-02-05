import { renderHook, act } from '@testing-library/react';
import useCartStore from '../cartStore';
import { Product } from '@/types';

const mockProduct: Product = {
  id: '1',
  title: 'Test Sample',
  description: 'Test',
  price: 29.99,
  audioUrl: '/test.mp3',
  imageUrl: '/test.jpg',
  artist: 'Test Artist',
  bpm: 95,
  genre: 'Trap',
  tags: ['test'],
  downloads: 100,
  createdAt: new Date().toISOString(),
};

describe('Cart Store', () => {
  beforeEach(() => {
    localStorage.clear();
    useCartStore.setState({ items: [] });
  });

  it('initializes with empty cart', () => {
    const { result } = renderHook(() => useCartStore());
    expect(result.current.items).toEqual([]);
  });

  it('adds item to cart', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.addItem(mockProduct, 1);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].product.id).toBe('1');
  });

  it('removes item from cart', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.addItem(mockProduct, 1);
      result.current.removeItem('1');
    });

    expect(result.current.items).toHaveLength(0);
  });

  it('updates item quantity', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.addItem(mockProduct, 1);
      result.current.updateQuantity('1', 3);
    });

    expect(result.current.items[0].quantity).toBe(3);
  });

  it('calculates total price', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.addItem(mockProduct, 2);
    });

    const total = result.current.getTotalPrice();
    expect(total).toBe(mockProduct.price * 2);
  });

  it('clears cart', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.addItem(mockProduct, 1);
      result.current.clearCart();
    });

    expect(result.current.items).toHaveLength(0);
  });
});
