/**
 * Type Exports
 * Central export point for all type definitions
 */

// Trend types
export type {
    Trend,
    TrendMetrics,
    TrendQueryParams,
} from './trends';

// Category types
export type {
    Category,
    CategoryQueryParams,
} from './categories';

// API types
export type {
    ApiResponse,
    ApiError,
    PaginatedResponse,
    TrendResponse,
    CategoryResponse,
} from './api';

// UI types
export type {
    LoadingState,
    FilterState,
    SortOption,
    UIError,
} from './ui';
