import mongoose from "mongoose";

const trendSchema = new mongoose.Schema({
    platform: {type:String , required: true},
    topicId: String,
    title: String,
    url: String,
    metrics: {
        views: Number,
        likes: Number,
        comments: Number,
        retweets: Number,
    },
    category: String,
    regionCode : {type: String, default: 'US'},
    keyword: String,
    fetchedAt: {type: Date, default: Date.now},
    timestamp: {type: Date, default: Date.now},
});

// Indexes for faster queries
trendSchema.index({ regionCode: 1, fetchedAt: -1 }); // Most common query
trendSchema.index({ category: 1, regionCode: 1 }); // Category filtering
trendSchema.index({ keyword: 1, regionCode: 1 }); // Keyword search
trendSchema.index({ fetchedAt: -1 }); // Cache expiry checks

const Trend = mongoose.model('Trend', trendSchema);

export default Trend;