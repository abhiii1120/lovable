import mongoose from 'mongoose';
import { env } from './env';
import logger from './logger';

export async function connectDatabase() {
    if(mongoose.connection.readyState === 1){
        return mongoose
    }

    try {
        await mongoose.connect(env.MONGODB_URI);
        logger.info("successfully connected to database");
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown MongoDB connection error";
        throw new Error(`MongoDB connection failed: ${message}`);
    }
}