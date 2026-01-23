import type { Trend } from '@/types';

/**
 * Calculate engagement score from video metrics
 * Formula: (likes * 2 + comments * 3) / views * 10000
 * Higher score = better engagement relative to views
 */
export function calculateEngagementScore(trend: Trend): number {
    const views = trend.metrics?.views || 0;
    const likes = trend.metrics?.likes || 0;
    const comments = trend.metrics?.comments || 0;

    if (views === 0) return 0;

    // Weighted formula: comments are more valuable than likes
    const engagementPoints = (likes * 2) + (comments * 3);
    const score = (engagementPoints / views) * 10000;

    return Math.round(score * 10) / 10; // Round to 1 decimal
}

/**
 * Format large numbers for display (e.g., 1234567 -> "1.2M")
 */
export function formatNumber(num: number): string {
    if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1) + 'B';
    }
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

/**
 * Calculate how long a video has been trending
 */
export function calculateTrendDuration(fetchedAt: Date | string): string {
    const now = new Date();
    const trendDate = new Date(fetchedAt);
    const diffMs = now.getTime() - trendDate.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) {
        return `${diffDays} day${diffDays > 1 ? 's' : ''}`;
    }
    if (diffHours > 0) {
        return `${diffHours} hour${diffHours > 1 ? 's' : ''}`;
    }
    return 'Just now';
}

/**
 * Extract trending topics from video titles
 */
export function extractTrendingTopics(trends: Trend[]): { topic: string; count: number }[] {
    const stopWords = new Set([
        'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
        'of', 'with', 'by', 'from', 'as', 'is', 'was', 'are', 'were', 'be',
        'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will',
        'would', 'should', 'could', 'may', 'might', 'must', 'can', 'this',
        'that', 'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they'
    ]);

    const wordCount = new Map<string, number>();

    trends.forEach(trend => {
        if (!trend.title) return;

        // Extract words, convert to lowercase, remove special characters
        const words = trend.title
            .toLowerCase()
            .replace(/[^\w\s]/g, ' ')
            .split(/\s+/)
            .filter(word => word.length > 3 && !stopWords.has(word));

        words.forEach(word => {
            wordCount.set(word, (wordCount.get(word) || 0) + 1);
        });
    });

    // Convert to array and sort by count
    return Array.from(wordCount.entries())
        .map(([topic, count]) => ({ topic, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10); // Top 10 topics
}

/**
 * Group trends by category with counts
 */
export function groupByCategory(trends: Trend[]): { category: string; count: number; percentage: number }[] {
    const categoryCount = new Map<string, number>();
    const total = trends.length;

    trends.forEach(trend => {
        const category = trend.category || 'General';
        categoryCount.set(category, (categoryCount.get(category) || 0) + 1);
    });

    return Array.from(categoryCount.entries())
        .map(([category, count]) => ({
            category,
            count,
            percentage: Math.round((count / total) * 100)
        }))
        .sort((a, b) => b.count - a.count);
}

/**
 * Get engagement level label based on score
 */
export function getEngagementLevel(score: number): { label: string; color: string } {
    if (score >= 100) return { label: 'Exceptional', color: '#10b981' }; // green
    if (score >= 50) return { label: 'High', color: '#3b82f6' }; // blue
    if (score >= 20) return { label: 'Moderate', color: '#f59e0b' }; // amber
    return { label: 'Low', color: '#6b7280' }; // gray
}
