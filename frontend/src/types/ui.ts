/**
 * UI-Specific Types
 */

export interface LoadingState {
    isLoading: boolean;
    isValidating: boolean;
    error: string | null;
}

export interface FilterState {
    keyword: string;
    categoryId: string;
    regionCode: string;
}

export type SortOption = 'views' | 'likes' | 'comments' | 'recent';

export interface UIError {
    message: string;
    code?: 'NETWORK' | 'RATE_LIMIT' | 'SERVER' | 'TIMEOUT' | 'UNKNOWN';
    retryable: boolean;
}
