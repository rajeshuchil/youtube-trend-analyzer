import { fetchYoutubeTrends, fetchYoutubeCategories, searchYoutubeKeyword } from "../services/youtubeAPI.js";
import Trend from '../models/Trend.js';
import Category from '../models/category.js';
import { parse } from "dotenv";

export async function getYoutubeTrends(req, res) {
    try {
        const { regionCode = 'US', categoryId, keyword, page=1, limit = 10, sortBy = 'views',maxResults } = req.query;
        const apiKey = process.env.YOUTUBE_API_KEY;

        let query = { regionCode };
        if (categoryId) {
            query.category = categoryId;
        }
        if (keyword) {
            query.keyword = keyword;
        }

        const cached = await Trend.find(query).sort({ fetchedAt: -1 });

        if (cached.length > 0) {
            const hoursSinceFetched = (new Date() - cached[0].fetchedAt) / (1000 * 60 * 60);
            if (hoursSinceFetched < 1) {
                const sorted = cached.sort((a,b) => (b.metrics?.[sortBy] || 0) - (a.metrics?.[sortBy] || 0));
                const startIndex = (page - 1) * limit;
                const paginated = sorted.slice(startIndex, startIndex+ parseInt(limit));
                return res.json({ success: true, cached: true, page: parseInt(page), limit: parseInt(limit), count: cached.length, data: paginated });
            }
            await Trend.deleteMany(query);
        }

        const resultsToFetch = parseInt(maxResults) || parseInt(limit);

        let trends;
        if (keyword) {
            trends = await searchYoutubeKeyword(apiKey, keyword, regionCode, maxResults);
            
            if (!Array.isArray(trends)) {
                console.error('Keyword trends is not an array:', trends);
                trends = [];
            }
            
            trends = trends.map((t, index) => {
                if (!t || typeof t !== 'object') {
                    console.error(`Invalid trend object at index ${index}:`, t);
                    return null;
                }
                
                return {
                    ...t,
                    regionCode,
                    keyword,
                    fetchedAt: new Date(),
                    views: t.metrics?.views || t.views || t.statistics?.viewCount || t.viewCount || 0
                };
            }).filter(Boolean); // Remove null entries
        } else {
            trends = await fetchYoutubeTrends(apiKey, regionCode, maxResults, categoryId);
            
            if (!Array.isArray(trends)) {
                console.error('Trends is not an array:', trends);
                trends = [];
            }
            
            trends = trends.map((t, index) => {
                if (!t || typeof t !== 'object') {
                    console.error(`Invalid trend object at index ${index}:`, t);
                    return null;
                }
                
                return {
                    ...t,
                    regionCode,
                    category: categoryId,
                    fetchedAt: new Date(),
                    views: t.metrics?.views || t.views || t.statistics?.viewCount || t.viewCount || 0
                };
            }) // Remove null entries
        }

        if (trends.length > 0) {
            await Trend.insertMany(trends);
        }

        const sorted = trends.sort((a,b)=> (b.metrics?.[sortBy] || 0) - (a.metrics?.[sortBy] || 0));
        const startIndex = (page - 1);
        const paginated = sorted.slice(startIndex, startIndex+ parseInt(limit));
        return res.json({ success: true, cached: false, refreshed: true, page: parseInt(page), limit: parseInt(limit), count: trends.length, data: paginated});
    } catch (err) {
        console.error('Error in getYoutubeTrends:', err);
        res.status(500).json({ success: false, message: err.message, data: [] });
    }
}

export async function refreshYoutubeTrends(req, res) {
    try {
        const { 
            regionCode = 'US', 
            maxResults, 
            categoryId, 
            keyword,
            page = 1,
            limit = 10,
            sortBy = 'views'
        } = req.query;
        const apiKey = process.env.YOUTUBE_API_KEY;

        let query = { regionCode };
        if (categoryId) {
            query.category = categoryId;
        }
        if (keyword) {
            query.keyword = keyword;
        }
        await Trend.deleteMany(query);

        let trends;
        if (keyword) {
            trends = await searchYoutubeKeyword(apiKey, keyword, regionCode, maxResults);
            
            if (!Array.isArray(trends)) {
                trends = [];
            }
            
            trends = trends.map((t) => {
                if (!t || typeof t !== 'object') {
                    return null;
                }
                
                return {
                    ...t,
                    regionCode,
                    keyword,
                    fetchedAt: new Date(),
                    views: t.metrics?.views || t.views || t.statistics?.viewCount || t.viewCount || 0
                };
            }).filter(Boolean);
        } else {
            trends = await fetchYoutubeTrends(apiKey, regionCode, maxResults, categoryId);
            
            if (!Array.isArray(trends)) {
                trends = [];
            }
            
            trends = trends.map((t) => {
                if (!t || typeof t !== 'object') {
                    return null;
                }
                
                return {
                    ...t,
                    regionCode,
                    category: categoryId,
                    fetchedAt: new Date(),
                    views: t.metrics?.views || t.views || t.statistics?.viewCount || t.viewCount || 0
                };
            }).filter(Boolean);
        }

        if (trends.length > 0) {
            await Trend.insertMany(trends);
        }

        // Sort the trends array in descending order based on the sortBy field
        const sorted = trends.sort((a, b) => {
            const aValue = a.metrics?.[sortBy] || a[sortBy] || 0;
            const bValue = b.metrics?.[sortBy] || b[sortBy] || 0;
            return bValue - aValue;
        });

        // Apply pagination
        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        const startIndex = (pageNum - 1) * limitNum;
        const paginated = sorted.slice(startIndex, startIndex + limitNum);

        res.json({ 
            success: true, 
            forced: true, 
            page: pageNum,
            limit: limitNum,
            count: trends.length,
            data: paginated 
        });
    } catch (err) {
        console.error('Error in refreshYoutubeTrends:', err);
        res.status(500).json({ success: false, message: err.message, data: [] });
    }
}
export async function getYoutubeCategories(req, res) {
    try {
        const { regionCode = 'US' } = req.query
        const apiKey = process.env.YOUTUBE_API_KEY;

        const cached = await Category.find({ regionCode });

        if (cached.length > 0) {
            const hoursSinceFetched = (new Date() - cached[0].fetchedAt) / (1000 * 60 * 60);
            if (hoursSinceFetched < 24) {
                return res.json({ success: true, cached: true, count: cached.length, data: cached });
            }
            await Category.deleteMany({ regionCode });
        }
        const categories = await fetchYoutubeCategories(apiKey, regionCode);

        await Category.insertMany(
            categories.map((c) => (
                { ...c, regionCode, fetchedAt: new Date() }
            ))
        );
        res.json({ success: true, cached: false, refreshed: true, count: categories.length, data: categories });
    } catch (err) {
        console.error(err);
        res.json({ success: false, message: err.message });
    }
}

export async function refreshYoutubeCategoires(req, res) {
    try {
        const { regionCode } = req.query;
        const apiKey = process.env.YOUTUBE_API_KEY;

        await Category.deleteMany({ regionCode });

        const categories = await fetchYoutubeCategories(apiKey, regionCode);

        await Category.insertMany(
            categories.map((c) => (
                { ...c, regionCode, fetchedAt: new Date() }
            ))
        );
        res.json({ success: true, forced: true, count: categories.length, data: categories });
    } catch (err) {
        console.error(err);
        res.json({ success: false, message: err.message });
    }
}
