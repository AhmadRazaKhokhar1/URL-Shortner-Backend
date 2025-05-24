// Bull Queue
import Queue from "bull";

// Dotenv
import { configDotenv } from "dotenv";
configDotenv();

// Config
const redisConfig = {
  redis: {
    port: Number(process.env.REDIS_PORT) || 6379,
    host: process.env.REDIS_HOST || '127.0.0.1', 
  },
} 

// Workers
export const otpEmailQueue = new Queue("otpEmailQueue",  'redis://redis:6379');
