import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import youtubeRoutes from './Routes/youtubeRoutes.js';
import { requestLogger } from './config/logger.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';
import { apiLimiter } from './middleware/rateLimiter.js';

dotenv.config();
const app = express();

// Request logging
app.use(requestLogger);

// Middleware
app.use(express.json());
app.use(cors({
  origin: [
    'http://localhost:5173',                    // Local development
    'https://youtube-trend-analyzer-frontend.vercel.app'  // Vercel production
  ],
  credentials: true
}));

// Global rate limiter for all API routes
app.use('/api', apiLimiter);

// Routes
app.use('/api/youtube', youtubeRoutes);

// 404 handler - must be after all routes
app.use(notFound);

// Error handler - must be last
app.use(errorHandler);

export default app;
