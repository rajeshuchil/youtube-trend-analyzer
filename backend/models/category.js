import mongoose, { mongo } from "mongoose";

const categorySchema = new mongoose.Schema({
    id: String,
    title: String,
    regionCode: String,
    fetchedAt: {type: Date, default: Date.now},
});

// Indexes for faster queries
categorySchema.index({ regionCode: 1, fetchedAt: -1 }); // Main query pattern

const Category = mongoose.model('Category',categorySchema);

export default Category;
