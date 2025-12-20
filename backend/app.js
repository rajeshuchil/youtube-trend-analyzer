import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import youtubeRoutes from './Routes/youtubeRoutes.js';
import { requestLogger } from './config/logger.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';
import { apiLimiter } from './middleware/rateLimiter.js';

dotenv.config();
const app = express();

// CORS Configuration
// WHY: Need to allow requests from multiple origins (local dev + production)
// - localhost:5173 and 5174 for Vite dev server
// - Vercel production URL
// - Environment variable for custom deployments
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:3000',
  'https://youtube-trend-analyzer-frontend.vercel.app',
  process.env.FRONTEND_URL,
  process.env.ALLOWED_ORIGIN
].filter(Boolean); // Remove undefined values

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.warn(`CORS blocked request from origin: ${origin}`);
      callback(new Error(`Origin ${origin} not allowed by CORS`));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  maxAge: 86400 // 24 hours - cache preflight requests
};

// Request logging
app.use(requestLogger);

// Middleware
app.use(express.json());
app.use(cors(corsOptions));

// Health check endpoint (no rate limiting)
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Global rate limiter for all API routes
app.use('/api', apiLimiter);

// Routes
app.use('/api/youtube', youtubeRoutes);

// 404 handler - must be after all routes
app.use(notFound);

// Error handler - must be last
app.use(errorHandler);

export default app;
