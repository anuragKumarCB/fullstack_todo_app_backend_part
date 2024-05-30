import mongoose from "mongoose";
import { DB_NAME } from "../enum.js";

export const connectDB = () => {
    mongoose.
        connect(`${process.env.MONGODB_URI}${DB_NAME}`)
        .then((c) => {
            console.log(`MongoDB connected successfully ${c.connection.host}`);
        })
        .catch((error) => {
            console.log(`MongoDB connection error`, error);
        })
}