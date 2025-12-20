import axios from "axios";
import type { TrendQueryParams, CategoryQueryParams, TrendResponse, CategoryResponse } from "../types";

/**
 * WHY: We create a configured Axios instance to:
 * 1. Set baseURL based on environment (dev vs production)
 * 2. Handle CORS with proper credentials
 * 3. Add request/response interceptors for error handling
 */
const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
    withCredentials: true,
    timeout: 30000, // 30 second timeout
    headers: {
        'Content-Type': 'application/json',
    }
});

/**
 * WHY: Filter empty/undefined params to avoid sending "?categoryId=&keyword="
 * Backend validators may reject empty strings even though they're marked optional
 */
const cleanParams = <T extends object>(
    params?: T
): Partial<T> | undefined => {
    if (!params) return undefined;

    const cleaned = Object.entries(params).reduce((acc, [key, value]) => {
        // Only include defined, non-empty values
        if (value !== undefined && value !== null && value !== '') {
            acc[key as keyof T] = value as T[keyof T];
        }
        return acc;
    }, {} as Partial<T>);

    return Object.keys(cleaned).length > 0 ? cleaned : undefined;
};

/**
 * WHY: Add response interceptor to handle common errors
 */
API.interceptors.response.use(
    response => response,
    error => {
        if (error.code === 'ERR_NETWORK') {
            console.error('Network error: Unable to connect to backend');
        } else if (error.response?.status === 429) {
            console.error('Rate limit exceeded. Please wait before making more requests.');
        }
        return Promise.reject(error);
    }
);

export const getTrends = (params?: TrendQueryParams) =>
    API.get<TrendResponse>("/youtube/trends", { params: cleanParams(params) });

export const refreshTrends = (params?: TrendQueryParams) =>
    API.get<TrendResponse>("/youtube/trends/refresh", { params: cleanParams(params) });

export const getCategories = (params?: CategoryQueryParams) =>
    API.get<CategoryResponse>("/youtube/categories", { params: cleanParams(params) });

export const refreshCategories = (params?: CategoryQueryParams) =>
    API.get<CategoryResponse>("/youtube/categories/refresh", { params: cleanParams(params) });
