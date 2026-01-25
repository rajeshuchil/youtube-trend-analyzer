# Groq AI Integration Setup

## 1. Get Groq API Key

1. Visit [https://console.groq.com](https://console.groq.com)
2. Sign up or log in
3. Go to API Keys section
4. Create a new API key
5. Copy the API key

## 2. Configure Backend

Add your Groq API key to `/backend/.env`:

```env
GROQ_API_KEY=your_groq_api_key_here
```

## 3. Install Dependencies

The Groq SDK has already been installed. If needed:

```bash
cd backend
npm install groq-sdk
```

## 4. How It Works

### Backend (`/backend/controllers/aiController.js`)

- Fetches real YouTube trending data from MongoDB
- Sends the data as context to Groq AI (Llama 3.3 70B model)
- Groq analyzes the actual data and responds to user questions

### Frontend (`/frontend/src/components/Dashboard/AIChat.tsx`)

- User asks questions in the chat
- Sends request to `/api/ai/chat` endpoint
- Displays AI-generated responses based on real data

## 5. Features

- **Real Data Analysis**: AI uses actual YouTube trending data
- **Context-Aware**: Knows about views, likes, comments, categories
- **Smart Responses**: Can answer complex questions like:
  - "What's the most viewed video?"
  - "Show me gaming trends"
  - "Compare top 5 videos by engagement"
  - "What category is most popular?"
  - "Show me average statistics"

## 6. API Endpoints

### POST `/api/ai/chat`

Send a message to AI assistant

**Request:**

```json
{
  "message": "What's the most viewed video?",
  "regionCode": "US"
}
```

**Response:**

```json
{
  "response": "🏆 The most viewed trending video is...",
  "dataContext": {
    "videosAnalyzed": 50,
    "regionCode": "US"
  }
}
```

### GET `/api/ai/summary`

Get trending data summary

**Query params:** `?regionCode=US`

**Response:**

```json
{
  "totalVideos": 50,
  "totalViews": 1500000000,
  "totalLikes": 50000000,
  "totalComments": 2000000,
  "topVideo": {...},
  "regionCode": "US"
}
```

## 7. Model Information

- **Model**: Llama 3.3 70B Versatile
- **Max Tokens**: 1024
- **Temperature**: 0.7
- **Provider**: Groq (ultra-fast inference)

## 8. Troubleshooting

If you see errors:

1. Check if Groq API key is set in `.env`
2. Verify backend server is running
3. Check browser console for detailed errors
4. Ensure MongoDB has trending data

## 9. Testing

1. Start backend: `cd backend && npm run dev`
2. Start frontend: `cd frontend && npm run dev`
3. Navigate to dashboard
4. Click AI Assistant button
5. Ask: "What's the most viewed video?"
6. The AI will analyze real data and respond!
