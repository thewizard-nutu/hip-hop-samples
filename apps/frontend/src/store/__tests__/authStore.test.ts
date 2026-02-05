import { renderHook, act } from '@testing-library/react';
import useAuthStore from '../authStore';

// Mock ApiClient
jest.mock('@/lib/api-client', () => ({
  default: {
    post: jest.fn(),
    get: jest.fn(),
  },
}));

describe('Auth Store', () => {
  beforeEach(() => {
    // Clear localStorage
    localStorage.clear();
    // Reset store
    useAuthStore.setState({ user: null, token: null });
  });

  it('initializes with no user', () => {
    const { result } = renderHook(() => useAuthStore());
    expect(result.current.user).toBeNull();
    expect(result.current.token).toBeNull();
  });

  it('checks if user is authenticated', () => {
    const { result } = renderHook(() => useAuthStore());
    
    act(() => {
      result.current.setUser({ id: '1', email: 'test@test.com', name: 'Test', createdAt: '' });
      useAuthStore.setState({ token: 'test-token' });
    });

    expect(result.current.isAuthenticated()).toBe(true);
  });

  it('logs out user', () => {
    const { result } = renderHook(() => useAuthStore());
    
    act(() => {
      result.current.setUser({ id: '1', email: 'test@test.com', name: 'Test', createdAt: '' });
      useAuthStore.setState({ token: 'test-token' });
    });

    act(() => {
      result.current.logout();
    });

    expect(result.current.user).toBeNull();
    expect(result.current.token).toBeNull();
  });
});
