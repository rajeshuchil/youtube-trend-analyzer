/**
 * Trend Transformation Utilities
 * Centralizes logic for normalizing and transforming trend data from YouTube API
 */

/**
 * Normalizes a single trend object with consistent structure
 * @param {Object} trend - Raw trend object from YouTube API
 * @param {Object} options - Transformation options
 * @param {string} options.regionCode - Region code (e.g., 'US', 'IN')
 * @param {string} [options.keyword] - Search keyword (optional)
 * @param {string} [options.categoryId] - Category ID (optional)
 * @returns {Object|null} Normalized trend object or null if invalid
 */
export function normalizeTrend(trend, options = {}) {
  if (!trend || typeof trend !== 'object') {
    console.error('Invalid trend object:', trend);
    return null;
  }
  
  const { regionCode, keyword, categoryId } = options;
  
  return {
    ...trend,
    regionCode,
    ...(keyword && { keyword }),
    ...(categoryId && { category: categoryId }),
    fetchedAt: new Date(),
    views: trend.metrics?.views || trend.views || trend.statistics?.viewCount || trend.viewCount || 0
  };
}

/**
 * Normalizes an array of trends
 * @param {Array} trends - Array of raw trend objects
 * @param {Object} options - Transformation options (same as normalizeTrend)
 * @returns {Array} Array of normalized trends (invalid entries filtered out)
 */
export function normalizeTrends(trends, options = {}) {
  if (!Array.isArray(trends)) {
    console.error('Trends is not an array:', trends);
    return [];
  }
  
  return trends
    .map(trend => normalizeTrend(trend, options))
    .filter(Boolean); // Remove null entries
}
