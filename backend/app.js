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


app.use('/api/youtube', youtubeRoutes);


export default app;
