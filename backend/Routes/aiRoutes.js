import express from 'express';
import * as aiController from '../controllers/aiController.js';

const router = express.Router();

// AI Chat endpoint
router.post('/chat', aiController.chat);

// Get data summary for AI context
router.get('/summary', aiController.getDataSummary);

export default router;
