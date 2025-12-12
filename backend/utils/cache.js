/**
 * Cache Utilities
 * Provides reusable caching validation and invalidation functionality
 */

/**
 * Retrieves cached data and checks if it's expired
 * @param {Object} Model - Mongoose model to query
 * @param {Object} query - Query parameters for finding cached data
 * @param {number} [ttlHours=1] - Time-to-live in hours
 * @returns {Promise<Object>} Object with data and expired status
 */
export async function getCachedData(Model, query, ttlHours = 1) {
    const cached = await Model.find(query).sort({ fetchedAt: -1 });

    if (cached.length === 0) {
        return { data: null, expired: true };
    }

    const hoursSinceFetched = (new Date() - cached[0].fetchedAt) / (1000 * 60 * 60);
    const expired = hoursSinceFetched >= ttlHours;

    return { data: cached, expired };
}

/**
 * Invalidates (deletes) cached data matching the query
 * @param {Object} Model - Mongoose model to delete from
 * @param {Object} query - Query parameters for finding data to delete
 * @returns {Promise<Object>} Mongoose deleteMany result
 */
export async function invalidateCache(Model, query) {
    return await Model.deleteMany(query);
}
