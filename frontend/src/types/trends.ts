/**
 * Trend Domain Types
 */

export interface TrendMetrics {
    views: number;          // Required (API always provides)
    likes?: number;         // Optional
    comments?: number;      // Optional
}

export interface Trend {
    // Identity
    topicId: string;        // Required
    title: string;          // Required
    url: string;            // Required

    // Classification
    category: string;       // Required (with fallback "General")
    regionCode?: string;    // Optional
    keyword?: string;       // Optional

    // Metrics
    metrics: TrendMetrics;  // Required

    // Metadata
    timestamp?: string;     // Optional
    fetchedAt?: Date;       // Optional
}

export interface TrendQueryParams {
    regionCode?: string;
    categoryId?: string;
    keyword?: string;
    page?: number;
    limit?: number;
    sortBy?: 'views' | 'likes' | 'comments';
    maxResults?: number;
}
