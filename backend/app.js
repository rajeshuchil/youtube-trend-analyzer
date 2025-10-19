import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import youtubeRoutes from './Routes/youtubeRoutes.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(cors({
  origin: [
    'http://localhost:5173',                    // Local development
    'https://youtube-trend-analyzer-frontend.vercel.app'  // Vercel production
  ]
}));

app.use('/api/youtube', youtubeRoutes);



export default app;
