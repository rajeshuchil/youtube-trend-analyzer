import rateLimit from 'express-rate-limit';

/**
 * General API rate limiter
 * Limits all API requests to prevent abuse
 */
export const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: {
        success: false,
        message: 'Too many requests from this IP, please try again later.',
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

/**
 * Strict rate limiter for refresh endpoints
 * These endpoints trigger external API calls and should be limited more strictly
 */
export const refreshLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 10, // Limit each IP to 10 refresh requests per hour
    message: {
        success: false,
        message: 'Too many refresh requests. Please wait before refreshing again.',
    },
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: false, // Count all requests, even successful ones
});

/**
 * Moderate rate limiter for standard data fetching
 * Less strict than refresh, but still prevents abuse
 */
export const dataLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 30, // Limit each IP to 30 requests per 5 minutes
    message: {
        success: false,
        message: 'Too many requests. Please slow down.',
    },
    standardHeaders: true,
    legacyHeaders: false,
});
