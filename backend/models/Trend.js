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

const Trend = mongoose.model('Trend', trendSchema);

export default Trend;