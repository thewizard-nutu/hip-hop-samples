import axios, { AxiosInstance, AxiosError } from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';

export class ApiClient {
  private static instance: AxiosInstance;

  private constructor() {}

  static getInstance(): AxiosInstance {
    if (!ApiClient.instance) {
      ApiClient.instance = axios.create({
        baseURL,
        timeout: 10000,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Add token to requests if it exists
      ApiClient.instance.interceptors.request.use((config) => {
        if (typeof window !== 'undefined') {
          const token = localStorage.getItem('auth_token');
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
        return config;
      });

      // Handle errors
      ApiClient.instance.interceptors.response.use(
        (response) => response,
        (error: AxiosError) => {
          if (error.response?.status === 401) {
            // Clear auth and redirect
            if (typeof window !== 'undefined') {
              localStorage.removeItem('auth_token');
              window.location.href = '/auth/login';
            }
          }
          return Promise.reject(error);
        }
      );
    }

    return ApiClient.instance;
  }

  static async get<T = any>(url: string, config = {}) {
    return ApiClient.getInstance().get<T>(url, config);
  }

  static async post<T = any>(url: string, data: any, config = {}) {
    return ApiClient.getInstance().post<T>(url, data, config);
  }

  static async put<T = any>(url: string, data: any, config = {}) {
    return ApiClient.getInstance().put<T>(url, data, config);
  }

  static async patch<T = any>(url: string, data: any, config = {}) {
    return ApiClient.getInstance().patch<T>(url, data, config);
  }

  static async delete<T = any>(url: string, config = {}) {
    return ApiClient.getInstance().delete<T>(url, config);
  }
}

export default ApiClient;
