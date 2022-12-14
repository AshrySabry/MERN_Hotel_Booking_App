import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose"

import cookieParser from 'cookie-parser';

import hotelRoute from "./routes/hotels.js";
import authRoute from "./routes/auth.js";
import roomRoute from "./routes/rooms.js";
import userRoute from "./routes/users.js"

const app = express();
dotenv.config()

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO)
        console.log('MongoDB connected!')
    } catch (error){
        throw error
    }
}

mongoose.connection.on("disconnected", () => {
    console.log('Mongodb disconnected');
})

app.use(cookieParser());
app.use(express.json())

app.use('/api/auth', authRoute);
app.use('/api/hotel', hotelRoute);
app.use('/api/users', userRoute);
app.use('/api/rooms', roomRoute);

app.use((err,req,res,next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong";
    res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack

    });
})

app.listen(8800, () => {
    connect();
    console.log('Server 2 connected!')
})