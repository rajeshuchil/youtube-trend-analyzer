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
- CSS3 with modern animations

### Backend

- Node.js with Express
- MongoDB with Mongoose
- YouTube Data API v3
- RESTful API design

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

cd backend
npm install

Create a `.env` file in the `backend` directory with the following variables:

```YOUTUBE_API_KEY=your_youtube_api_key
MONGODB_URI=your_mongodb_uri

Start the backend server:
   npm run dev

3. **Setup Frontend**

cd ../frontend
npm install
npm run dev

Frontend will run on: http://localhost:5173
```
