/**
 * API Request and Response Types
 */

// ===== Trend Types =====
export interface Trend {
    topicId?: string;
    title: string;
    category?: string;
    url?: string;
    metrics?: {
        views?: number;
        likes?: number;
        comments?: number;
    };
    timestamp?: string;
    regionCode?: string;
    keyword?: string;
    fetchedAt?: Date;
    views?: number;
}

// ===== Category Types =====
export interface Category {
    id: string;
    name: string;
    regionCode?: string;
    fetchedAt?: Date;
    trendingCount?: number;
    isHot?: boolean;
    totalViews?: number;
}

// ===== API Query Parameters =====
export interface TrendQueryParams {
    regionCode?: string;
    categoryId?: string;
    keyword?: string;
    page?: number;
    limit?: number;
    sortBy?: 'views' | 'likes' | 'comments';
    maxResults?: number;
}

export interface CategoryQueryParams {
    regionCode?: string;
}

// ===== API Response Types =====
export interface ApiResponse<T> {
    success: boolean;
    message?: string;
    data?: T;
    errors?: Array<{
        field: string;
        message: string;
        value?: unknown;
    }>;
}

export interface PaginatedResponse<T> extends ApiResponse<T> {
    cached?: boolean;
    refreshed?: boolean;
    forced?: boolean;
    page?: number;
    limit?: number;
    count?: number;
}

export interface TrendResponse extends PaginatedResponse<Trend[]> { }
export interface CategoryResponse extends ApiResponse<Category[]> {
    cached?: boolean;
    refreshed?: boolean;
    forced?: boolean;
    count?: number;
}