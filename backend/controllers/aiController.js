import Groq from 'groq-sdk';
import Trend from '../models/Trend.js';

// AI Chat endpoint
export const chat = async (req, res) => {
    try {
        // Initialize Groq inside the function to ensure env vars are loaded
        const groq = new Groq({
            apiKey: process.env.GROQ_API_KEY
        });

        const { message, regionCode = 'US' } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        // Fetch trending data from database
        const trends = await Trend.find({ regionCode })
            .sort({ fetchedAt: -1 })
            .limit(50)
            .lean();

        if (!trends || trends.length === 0) {
            return res.status(404).json({ error: 'No trending data available for this region' });
        }

        // Prepare context data for Groq
        const contextData = {
            totalVideos: trends.length,
            regionCode: regionCode,
            videos: trends.map(trend => ({
                title: trend.title,
                category: trend.category,
                views: trend.metrics.views,
                likes: trend.metrics.likes,
                comments: trend.metrics.comments,
                publishedAt: trend.publishedAt
            }))
        };

        // Calculate statistics
        const totalViews = trends.reduce((sum, t) => sum + t.metrics.views, 0);
        const totalLikes = trends.reduce((sum, t) => sum + t.metrics.likes, 0);
        const totalComments = trends.reduce((sum, t) => sum + t.metrics.comments, 0);

        // Category distribution
        const categoryStats = {};
        trends.forEach(trend => {
            const cat = trend.category || 'Other';
            categoryStats[cat] = (categoryStats[cat] || 0) + 1;
        });

        // Create system prompt with data context
        const systemPrompt = `You are an AI assistant specialized in analyzing YouTube trending data. You have access to real-time trending video data from the ${regionCode} region.

Here is the current trending data you should analyze:
- Total trending videos: ${contextData.totalVideos}
- Total views: ${totalViews.toLocaleString()}
- Total likes: ${totalLikes.toLocaleString()}
- Total comments: ${totalComments.toLocaleString()}
- Category distribution: ${JSON.stringify(categoryStats)}

Top 10 Trending Videos:
${trends.slice(0, 10).map((v, i) => `${i + 1}. "${v.title}"
   - Category: ${v.category}
   - Views: ${v.metrics.views.toLocaleString()}
   - Likes: ${v.metrics.likes.toLocaleString()}
   - Comments: ${v.metrics.comments.toLocaleString()}`).join('\n\n')}

When answering questions:
- Use the actual data provided above
- Give specific numbers, video titles, and statistics
- Be concise and informative
- Format responses with emojis and markdown for better readability
- If asked about specific videos, refer to the titles and data provided
- Calculate percentages, averages, and comparisons when relevant`;

        // Call Groq API
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: 'system',
                    content: systemPrompt
                },
                {
                    role: 'user',
                    content: message
                }
            ],
            model: 'llama-3.3-70b-versatile', // Using Llama 3.3 70B model
            temperature: 0.7,
            max_tokens: 1024,
            top_p: 1,
            stream: false
        });

        const aiResponse = chatCompletion.choices[0]?.message?.content || 'Sorry, I could not generate a response.';

        res.json({
            response: aiResponse,
            dataContext: {
                videosAnalyzed: contextData.totalVideos,
                regionCode: regionCode
            }
        });

    } catch (error) {
        console.error('AI Chat Error:', error);
        res.status(500).json({ 
            error: 'Failed to process AI request',
            message: error.message 
        });
    }
};

// Get trending data summary for AI context
export const getDataSummary = async (req, res) => {
    try {
        const { regionCode = 'US' } = req.query;

        const trends = await Trend.find({ regionCode })
            .sort({ fetchedAt: -1 })
            .limit(50)
            .lean();

        if (!trends || trends.length === 0) {
            return res.status(404).json({ error: 'No data available' });
        }

        const summary = {
            totalVideos: trends.length,
            totalViews: trends.reduce((sum, t) => sum + t.metrics.views, 0),
            totalLikes: trends.reduce((sum, t) => sum + t.metrics.likes, 0),
            totalComments: trends.reduce((sum, t) => sum + t.metrics.comments, 0),
            topVideo: trends[0],
            regionCode
        };

        res.json(summary);
    } catch (error) {
        console.error('Data Summary Error:', error);
        res.status(500).json({ error: 'Failed to fetch data summary' });
    }
};
