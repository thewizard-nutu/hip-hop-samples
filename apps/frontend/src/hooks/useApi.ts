'use client';

import { useEffect, useState, useCallback } from 'react';
import { AxiosError } from 'axios';
import ApiClient from '@/lib/api-client';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: AxiosError | null;
}

export const useApi = <T = any,>(url: string, options: { skip?: boolean } = {}) => {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: !options.skip,
    error: null,
  });

  const refetch = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const response = await ApiClient.get<T>(url);
      setState({ data: response.data, loading: false, error: null });
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error as AxiosError,
      });
    }
  }, [url]);

  useEffect(() => {
    if (options.skip) return;
    refetch();
  }, [url, options.skip, refetch]);

  return { ...state, refetch };
};

export default useApi;
