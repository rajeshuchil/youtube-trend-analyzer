import mongoose from "mongoose";

const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("mongodb connected");
    }catch(err) {
        console.error('Mongodb connection error',err.message);
        process.exit(1);
    }
};
export default connectDB;
