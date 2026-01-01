import { useEffect, useRef, useCallback, useState } from 'react';
import { cache } from '../lib/cache';

interface UseCachedDataOptions<T> {
  // Function to fetch fresh data
  fetcher: () => Promise<T>;
  // Cache key components
  endpoint: string;
  params?: Record<string, unknown>;
  // Cache options
  ttl?: number; // Fresh data lifetime (ms)
  staleWhileRevalidate?: number; // Stale data lifetime (ms)
  // Behavior options
  revalidateOnMount?: boolean; // Fetch fresh data on mount even if cached
  revalidateOnFocus?: boolean; // Fetch fresh data when window gains focus
  dedupingInterval?: number; // Prevent duplicate requests within this interval
}

interface UseCachedDataResult<T> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
  isValidating: boolean; // True when fetching in background
  mutate: (data?: T) => void; // Manually update cache
  refresh: () => Promise<void>; // Force refresh
}

/**
 * Custom hook for data fetching with stale-while-revalidate caching
 * Inspired by SWR pattern but simplified for this use case
 */
export function useCachedData<T>(
  options: UseCachedDataOptions<T>
): UseCachedDataResult<T> {
  const {
    fetcher,
    endpoint,
    params,
    ttl,
    staleWhileRevalidate,
    revalidateOnMount = true,
    revalidateOnFocus = false,
    dedupingInterval = 2000,
  } = options;

  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isValidating, setIsValidating] = useState(false);

  const lastFetchTime = useRef<number>(0);
  const isMounted = useRef(true);
  const revalidateOnMountRef = useRef(revalidateOnMount);

  // Update ref when prop changes
  useEffect(() => {
    revalidateOnMountRef.current = revalidateOnMount;
  }, [revalidateOnMount]);

  /**
   * Fetch fresh data from API
   */
  const fetchData = useCallback(
    async (isInitialLoad = false) => {
      // Prevent duplicate requests within deduping interval
      const now = Date.now();
      if (now - lastFetchTime.current < dedupingInterval) {
        return;
      }

      lastFetchTime.current = now;

      try {
        if (isInitialLoad) {
          setIsLoading(true);
        } else {
          setIsValidating(true);
        }

        const freshData = await fetcher();

        if (!isMounted.current) return undefined;

        setData(freshData);
        setError(null);

        // Cache the fresh data
        cache.set(endpoint, params, freshData);
      } catch (err) {
        if (!isMounted.current) return;

        const error = err instanceof Error ? err : new Error('Failed to fetch data');
        setError(error);
        console.error(`Error fetching ${endpoint}:`, error);
      } finally {
        if (isMounted.current) {
          setIsLoading(false);
          setIsValidating(false);
        }
      }
    },
    [fetcher, endpoint, params, dedupingInterval]
  );

  /**
   * Load data from cache or fetch fresh
   */
  const loadData = useCallback(async () => {
    console.log(`[useCachedData] Loading data for ${endpoint}`, params);

    // Try to get from cache first
    const cached = cache.get<T>(endpoint, params, { ttl, staleWhileRevalidate });

    console.log(`[useCachedData] Cache result for ${endpoint}:`, {
      hasData: !!cached.data,
      isStale: cached.isStale,
      expired: cached.expired
    });

    if (cached.data && !cached.expired) {
      // We have usable cached data
      setData(cached.data);
      setIsLoading(false);

      // If data is stale, revalidate in background (use ref to avoid dependency)
      if (cached.isStale && revalidateOnMountRef.current) {
        console.log(`[useCachedData] Revalidating stale data for ${endpoint}`);
        fetchData(false);
      }
    } else {
      // No cache or expired, fetch fresh data
      console.log(`[useCachedData] Fetching fresh data for ${endpoint}`);
      await fetchData(true);
    }
  }, [endpoint, params, ttl, staleWhileRevalidate, fetchData]);

  /**
   * Manually update cache with new data
   */
  const mutate = useCallback(
    (newData?: T) => {
      if (newData) {
        setData(newData);
        cache.set(endpoint, params, newData);
      }
    },
    [endpoint, params]
  );

  /**
   * Force refresh data
   */
  const refresh = useCallback(async () => {
    await fetchData(false);
  }, [fetchData]);

  /**
   * Handle window focus events
   */
  useEffect(() => {
    if (!revalidateOnFocus) return;

    const handleFocus = () => {
      // Only revalidate if it's been more than deduping interval
      if (Date.now() - lastFetchTime.current > dedupingInterval) {
        fetchData(false);
      }
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [revalidateOnFocus, dedupingInterval, fetchData]);

  /**
   * Load data on mount
   */
  useEffect(() => {
    isMounted.current = true;
    loadData();

    return () => {
      isMounted.current = false;
    };
  }, [loadData]);

  return {
    data,
    error,
    isLoading,
    isValidating,
    mutate,
    refresh,
  };
}
