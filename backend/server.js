import app from "./app.js";
import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const PORT = process.env.PORT || 5000;
let server;
const startServer = async() => {
    try{
        await connectDB();
        server = app.listen(PORT, ()=> {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    }catch(err) {
        console.error("failed to connect to mongoDb", err.message);
        process.exit(1);
    }
};

const gracefulShutdown = async (signal) => {
    console.log(`\nReceived ${signal} Shutting down gracefully`);

    if(server){
        server.close( async()=>{
            console.log("Http server closed");
            try{
                await mongoose.connection.close();
                console.log("Mongodb connection closed");
                process.exit(0);
            }catch(err){
                console.log("failed to close mongoDB connection");
                process.exit(1);
            }
        });
    }else{
        process.exit(0);
    }
};

process.on("SIGTERM", ()=> gracefulShutdown("SIGTERM"));
process.on("SIGINT", ()=> gracefulShutdown("SIGINT"));

process.on("uncaughtException",(err)=> {
    console.error("Uncaught Exception:", err);
    process.exit(1);
});

process.on("unhandledRejection", (reason , promise)=> {
    console.error("Unhandled Rejection at :", promise, "reason:",reason);
    process.exit(1);
});

startServer();

