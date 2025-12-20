/**
 * Category Domain Types
 */

export interface Category {
    // Identity
    id: string;             // Required
    name: string;           // Required

    // Metadata
    regionCode?: string;    // Optional
    fetchedAt?: Date;       // Optional

    // Stats (optional frontend calculations)
    trendingCount?: number;
    isHot?: boolean;
    totalViews?: number;
}

export interface CategoryQueryParams {
    regionCode?: string;
}
