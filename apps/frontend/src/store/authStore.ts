import { create } from 'zustand';
import { User, AuthResponse } from '@/types';
import ApiClient from '@/lib/api-client';

interface AuthStore {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
  loadUser: () => Promise<void>;
  isAuthenticated: () => boolean;
}

const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  token: typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null,
  loading: false,
  error: null,

  login: async (email: string, password: string) => {
    set({ loading: true, error: null });
    try {
      const response = await ApiClient.post<AuthResponse>('/auth/login', { email, password });
      const { user, token } = response.data;
      
      localStorage.setItem('auth_token', token);
      set({ user, token, loading: false });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      set({ error: errorMessage, loading: false });
      throw error;
    }
  },

  register: async (email: string, password: string, name: string) => {
    set({ loading: true, error: null });
    try {
      const response = await ApiClient.post<AuthResponse>('/auth/register', {
        email,
        password,
        name,
      });
      const { user, token } = response.data;
      
      localStorage.setItem('auth_token', token);
      set({ user, token, loading: false });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Registration failed';
      set({ error: errorMessage, loading: false });
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('auth_token');
    set({ user: null, token: null });
  },

  setUser: (user: User | null) => {
    set({ user });
  },

  loadUser: async () => {
    const { token } = get();
    if (!token) return;

    try {
      const response = await ApiClient.get<User>('/auth/me');
      set({ user: response.data });
    } catch (error) {
      set({ user: null, token: null });
      localStorage.removeItem('auth_token');
    }
  },

  isAuthenticated: () => {
    const { token } = get();
    return !!token;
  },
}));

export default useAuthStore;
