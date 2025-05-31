// Express Rate Limit
import { rateLimit } from "express-rate-limit";

// Rate Limiter
export const GeneralRateLimiter = rateLimit({
    limit:100,
    windowMs:15*60*1000,
    standardHeaders: 'draft-8',
	legacyHeaders: false,
})