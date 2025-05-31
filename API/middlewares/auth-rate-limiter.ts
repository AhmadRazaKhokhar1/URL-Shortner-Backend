// Express Rate Limit
import { rateLimit } from "express-rate-limit";

// Rate Limiter
export const AuthRateLimiter = rateLimit({
    limit:10,
    windowMs:15*60*1000,
    standardHeaders: 'draft-8',
	legacyHeaders: false,
})