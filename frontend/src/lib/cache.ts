/**
 * Client-Side Cache Manager
 * Implements stale-while-revalidate pattern with localStorage
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  key: string;
}

interface CacheOptions {
  ttl?: number; // Time to live in milliseconds
  staleWhileRevalidate?: number; // Time to serve stale data while revalidating
}

const DEFAULT_TTL = 5 * 60 * 1000; // 5 minutes
const DEFAULT_SWR = 30 * 60 * 1000; // 30 minutes

class CacheManager {
  private prefix = 'yt_trends_';

  /**
   * Generate cache key from params
   */
  private generateKey(endpoint: string, params?: Record<string, unknown>): string {
    const paramString = params ? JSON.stringify(params) : '';
    return `${this.prefix}${endpoint}_${paramString}`;
  }

  /**
   * Get data from cache
   * Returns { data, isStale, expired }
   */
  get<T>(
    endpoint: string,
    params?: Record<string, unknown>,
    options: CacheOptions = {}
  ): { data: T | null; isStale: boolean; expired: boolean } {
    const { ttl = DEFAULT_TTL, staleWhileRevalidate = DEFAULT_SWR } = options;
    const key = this.generateKey(endpoint, params);

    try {
      const cached = localStorage.getItem(key);
      if (!cached) {
        return { data: null, isStale: false, expired: true };
      }

      const entry: CacheEntry<T> = JSON.parse(cached);
      const age = Date.now() - entry.timestamp;

      const expired = age > staleWhileRevalidate;
      const isStale = age > ttl && age <= staleWhileRevalidate;

      return {
        data: entry.data,
        isStale,
        expired,
      };
    } catch (error) {
      console.error('Cache read error:', error);
      return { data: null, isStale: false, expired: true };
    }
  }

  /**
   * Set data in cache
   */
  set<T>(endpoint: string, params: Record<string, unknown> | undefined, data: T): void {
    const key = this.generateKey(endpoint, params);

    try {
      const entry: CacheEntry<T> = {
        data,
        timestamp: Date.now(),
        key,
      };
      localStorage.setItem(key, JSON.stringify(entry));
    } catch (error) {
      console.error('Cache write error:', error);
      // If localStorage is full, clear old entries
      this.pruneOldEntries();
    }
  }

  /**
   * Remove specific cache entry
   */
  remove(endpoint: string, params?: Record<string, unknown>): void {
    const key = this.generateKey(endpoint, params);
    localStorage.removeItem(key);
  }

  /**
   * Clear all cache entries for this app
   */
  clear(): void {
    const keys = Object.keys(localStorage);
    keys.forEach((key) => {
      if (key.startsWith(this.prefix)) {
        localStorage.removeItem(key);
      }
    });
  }

  /**
   * Remove old cache entries (older than 24 hours)
   */
  private pruneOldEntries(): void {
    const maxAge = 24 * 60 * 60 * 1000; // 24 hours
    const keys = Object.keys(localStorage);

    keys.forEach((key) => {
      if (key.startsWith(this.prefix)) {
        try {
          const entry = JSON.parse(localStorage.getItem(key) || '');
          const age = Date.now() - entry.timestamp;

          if (age > maxAge) {
            localStorage.removeItem(key);
          }
        } catch {
          // Invalid entry, remove it
          localStorage.removeItem(key);
        }
      }
    });
  }

  /**
   * Get cache statistics
   */
  getStats(): { count: number; size: number } {
    const keys = Object.keys(localStorage);
    const cacheKeys = keys.filter((k) => k.startsWith(this.prefix));
    
    let totalSize = 0;
    cacheKeys.forEach((key) => {
      const item = localStorage.getItem(key);
      if (item) {
        totalSize += item.length;
      }
    });

    return {
      count: cacheKeys.length,
      size: totalSize,
    };
  }
}

export const cache = new CacheManager();
