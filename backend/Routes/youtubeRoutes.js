import express from 'express';
import { getYoutubeTrends, refreshYoutubeTrends, getYoutubeCategories, refreshYoutubeCategoires } from '../controllers/youtubeController.js';
import { validateTrendQuery, validateCategoryQuery } from '../middleware/validator.js';
import { dataLimiter, refreshLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// GET routes with validation and rate limiting
router.get('/trends', dataLimiter, validateTrendQuery, getYoutubeTrends);
router.get('/categories', dataLimiter, validateCategoryQuery, getYoutubeCategories);

// Refresh routes with stricter rate limiting
router.get('/trends/refresh', refreshLimiter, validateTrendQuery, refreshYoutubeTrends);
router.get('/categories/refresh', refreshLimiter, validateCategoryQuery, refreshYoutubeCategoires);

export default router;