/**
 * API Contract Types
 */

import type { Trend } from './trends';
import type { Category } from './categories';

export interface ApiError {
    field: string;
    message: string;
    value?: unknown;
}

export interface ApiResponse<T> {
    success: boolean;
    message?: string;
    data?: T;
    errors?: ApiError[];
}

export interface PaginatedResponse<T> extends ApiResponse<T> {
    // Cache metadata
    cached?: boolean;
    refreshed?: boolean;
    forced?: boolean;

    // Pagination metadata
    page?: number;
    limit?: number;
    count?: number;
    totalPages?: number;
}

// Specific response types
export interface TrendResponse extends PaginatedResponse<Trend[]> { }

export interface CategoryResponse extends ApiResponse<Category[]> {
    cached?: boolean;
    refreshed?: boolean;
    forced?: boolean;
    count?: number;
}
