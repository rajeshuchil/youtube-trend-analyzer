# 📈 YouTube Trend Analyzer

A full-stack web application for analyzing YouTube trending videos across different regions and categories.

![App Screenshot](screenshot.png)

## 🚀 Features

- **Real-time Trends**: Get up-to-date trending videos from YouTube API
- **Global Insights**: Track trends across 8+ countries and regions
- **Smart Filtering**: Filter by categories, search keywords, and regions
- **Interactive UI**: Modern, responsive design with smooth animations
- **Caching**: Optimized API calls with intelligent caching
- **Analytics**: Visual insights and trending statistics

## 🛠️ Tech Stack

### Frontend

- React 18 with TypeScript
- Vite for build tooling
- React Router for navigation
- Framer Motion for animations
- CSS3 with modern design system
- Axios for API calls

### Backend

- Node.js with Express
- MongoDB with Mongoose
- YouTube Data API v3
- RESTful API design
- CORS security
- Rate limiting
- Winston logging

## 📦 Installation

### Prerequisites

- Node.js 18+
- MongoDB
- YouTube Data API key

### Quick Start

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/youtube-trend-analyzer.git
cd youtube-trend-analyzer
```

2. **Setup Backend**

```bash
cd backend
npm install

# Create .env file
cp .env.example .env
# Edit .env and add your credentials:
# MONGODB_URI=your_mongodb_connection_string
# YOUTUBE_API_KEY=your_youtube_api_key
# FRONTEND_URL=http://localhost:5174

# Start the backend server
npm run dev
```

3. **Setup Frontend**

```bash
cd ../frontend
npm install

# .env.local is already configured for development
# It uses Vite proxy to avoid CORS issues

# Start the frontend
npm run dev
```

4. **Access the Application**

- Frontend: http://localhost:5174
- Backend API: http://localhost:5000/api
- Health Check: http://localhost:5000/health

### ✅ Verify Installation

Run the CORS integration test:

```bash
# Make sure backend is running first
./test-cors.sh
```

## 🔧 CORS Configuration

This application uses a **secure CORS configuration** to prevent unauthorized access while supporting multiple environments.

**Quick Reference:**

- ✅ Environment-based origin allowlist (no wildcards)
- ✅ Vite dev proxy for seamless local development
- ✅ Proper error handling and logging
- ✅ Clean query parameter handling
- ✅ Production-ready for Render + Vercel

**Documentation:**

- [QUICK_START.md](./QUICK_START.md) - Get started in 5 minutes
- [CORS_SETUP.md](./CORS_SETUP.md) - Complete CORS documentation
- [SUMMARY.md](./SUMMARY.md) - Code changes and explanations

**Troubleshooting CORS:**

```bash
# Issue: CORS errors in browser console
# Solution:
1. Verify backend is running: curl http://localhost:5000/health
2. Check .env.local uses proxy: VITE_API_URL=/api
3. Restart both servers
4. Run integration test: ./test-cors.sh
```
