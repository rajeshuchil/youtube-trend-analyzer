import { fetchYoutubeTrends, fetchYoutubeCategories, searchYoutubeKeyword } from "../services/youtubeAPI.js";
import Trend from '../models/Trend.js';
import Category from '../models/category.js';
import { normalizeTrends } from '../utils/trendTransformers.js';
import { paginateAndSort } from '../utils/pagination.js';
import { getCachedData, invalidateCache } from '../utils/cache.js';
import { CACHE_TTL, PAGINATION, DEFAULT_SORT_BY, DEFAULT_REGION } from '../constants.js';
import { asyncHandler, AppError } from '../middleware/errorHandler.js';

export const getYoutubeTrends = asyncHandler(async (req, res) => {
    const {
        regionCode = DEFAULT_REGION,
        categoryId,
        keyword,
        page = PAGINATION.DEFAULT_PAGE,
        limit = PAGINATION.DEFAULT_LIMIT,
        sortBy = DEFAULT_SORT_BY,
        maxResults
    } = req.query;
    const apiKey = process.env.YOUTUBE_API_KEY;

    // Build query for cache lookup
    let query = { regionCode };
    if (categoryId) {
        query.category = categoryId;
    }
    if (keyword) {
        query.keyword = keyword;
    }

    // Check cache
    const { data: cached, expired } = await getCachedData(Trend, query, CACHE_TTL.TRENDS);

    if (cached && !expired) {
        const paginationResult = paginateAndSort(cached, { page, limit, sortBy });
        return res.json({
            success: true,
            cached: true,
            page: paginationResult.page,
            limit: paginationResult.limit,
            count: paginationResult.total,
            data: paginationResult.items
        });
    }

    // Cache expired, invalidate old data
    if (cached) {
        await invalidateCache(Trend, query);
    }

    const resultsToFetch = parseInt(maxResults) || parseInt(limit);

    // Fetch fresh data from YouTube API
    let trends;
    if (keyword) {
        trends = await searchYoutubeKeyword(apiKey, keyword, regionCode, maxResults);
    } else {
        trends = await fetchYoutubeTrends(apiKey, regionCode, maxResults, categoryId);
    }

    // Normalize trends using utility function
    const normalizedTrends = normalizeTrends(trends, { regionCode, keyword, categoryId });

    // Save to database
    if (normalizedTrends.length > 0) {
        await Trend.insertMany(normalizedTrends);
    }

    // Paginate and sort
    const paginationResult = paginateAndSort(normalizedTrends, { page, limit, sortBy });

    return res.json({
        success: true,
        cached: false,
        refreshed: true,
        page: paginationResult.page,
        limit: paginationResult.limit,
        count: paginationResult.total,
        data: paginationResult.items
    });
});

export const refreshYoutubeTrends = asyncHandler(async (req, res) => {
    const {
        regionCode = DEFAULT_REGION,
        maxResults,
        categoryId,
        keyword,
        page = PAGINATION.DEFAULT_PAGE,
        limit = PAGINATION.DEFAULT_LIMIT,
        sortBy = DEFAULT_SORT_BY
    } = req.query;
    const apiKey = process.env.YOUTUBE_API_KEY;

    let query = { regionCode };
    if (categoryId) {
        query.category = categoryId;
    }
    if (keyword) {
        query.keyword = keyword;
    }
    // Force invalidate cache
    await invalidateCache(Trend, query);

    // Fetch fresh data from YouTube API
    let trends;
    if (keyword) {
        trends = await searchYoutubeKeyword(apiKey, keyword, regionCode, maxResults);
    } else {
        trends = await fetchYoutubeTrends(apiKey, regionCode, maxResults, categoryId);
    }

    // Normalize trends using utility function
    const normalizedTrends = normalizeTrends(trends, { regionCode, keyword, categoryId });

    // Save to database
    if (normalizedTrends.length > 0) {
        await Trend.insertMany(normalizedTrends);
    }

    // Paginate and sort
    const paginationResult = paginateAndSort(normalizedTrends, { page, limit, sortBy });

    res.json({
        success: true,
        forced: true,
        page: paginationResult.page,
        limit: paginationResult.limit,
        count: paginationResult.total,
        data: paginationResult.items
    });
});
export const getYoutubeCategories = asyncHandler(async (req, res) => {
    const { regionCode = DEFAULT_REGION } = req.query;
    const apiKey = process.env.YOUTUBE_API_KEY;

    // Check cache
    const { data: cached, expired } = await getCachedData(Category, { regionCode }, CACHE_TTL.CATEGORIES);

    if (cached && !expired) {
        return res.json({ success: true, cached: true, count: cached.length, data: cached });
    }

    // Cache expired, invalidate old data
    if (cached) {
        await invalidateCache(Category, { regionCode });
    }

    // Fetch fresh categories
    const categories = await fetchYoutubeCategories(apiKey, regionCode);

    // Add regionCode and timestamp
    const categoriesWithMetadata = categories.map((c) => ({
        ...c,
        regionCode,
        fetchedAt: new Date()
    }));

    // Save to database
    await Category.insertMany(categoriesWithMetadata);

    res.json({ success: true, cached: false, refreshed: true, count: categories.length, data: categories });
});

export const refreshYoutubeCategoires = asyncHandler(async (req, res) => {
    const { regionCode = DEFAULT_REGION } = req.query;
    const apiKey = process.env.YOUTUBE_API_KEY;

    // Force invalidate cache
    await invalidateCache(Category, { regionCode });

    // Fetch fresh categories
    const categories = await fetchYoutubeCategories(apiKey, regionCode);

    // Add regionCode and timestamp
    const categoriesWithMetadata = categories.map((c) => ({
        ...c,
        regionCode,
        fetchedAt: new Date()
    }));

    // Save to database
    await Category.insertMany(categoriesWithMetadata);

    res.json({ success: true, forced: true, count: categories.length, data: categories });
});
