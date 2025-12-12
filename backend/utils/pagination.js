/**
 * Pagination Utilities
 * Provides reusable pagination and sorting functionality
 */

/**
 * Paginates and sorts an array of items
 * @param {Array} items - Array of items to paginate
 * @param {Object} options - Pagination options
 * @param {number} [options.page=1] - Page number (1-indexed)
 * @param {number} [options.limit=10] - Items per page
 * @param {string} [options.sortBy='views'] - Field to sort by
 * @returns {Object} Pagination result with items and metadata
 */
export function paginateAndSort(items, { page = 1, limit = 10, sortBy = 'views' } = {}) {
    // Sort the items array in descending order based on the sortBy field
    const sorted = items.sort((a, b) => {
        const aValue = a.metrics?.[sortBy] || a[sortBy] || 0;
        const bValue = b.metrics?.[sortBy] || b[sortBy] || 0;
        return bValue - aValue;
    });

    // Parse and validate pagination parameters
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const startIndex = (pageNum - 1) * limitNum;

    // Extract paginated subset
    const paginatedItems = sorted.slice(startIndex, startIndex + limitNum);

    return {
        items: paginatedItems,
        page: pageNum,
        limit: limitNum,
        total: items.length,
        totalPages: Math.ceil(items.length / limitNum),
        hasNext: startIndex + limitNum < items.length,
        hasPrev: pageNum > 1
    };
}
