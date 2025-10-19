import mongoose, { mongo } from "mongoose";

const categorySchema = new mongoose.Schema({
    id: String,
    title: String,
    regionCode: String,
    fetchedAt: {type: Date, default: Date.now},
});

const Category = mongoose.model('Category',categorySchema);

export default Category;
