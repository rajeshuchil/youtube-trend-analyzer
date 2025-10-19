import express from 'express';
import {getYoutubeTrends, refreshYoutubeTrends, getYoutubeCategories, refreshYoutubeCategoires} from '../controllers/youtubeController.js'

const router = express.Router();

router.get('/trends',getYoutubeTrends);
router.get('/categories', getYoutubeCategories);

router.get('/trends/refresh',refreshYoutubeTrends);
router.get('/categories/refresh',refreshYoutubeCategoires);

export default router;