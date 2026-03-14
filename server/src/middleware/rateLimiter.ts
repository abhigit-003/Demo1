import rateLimit from 'express-rate-limit';
import { Request, Response, NextFunction } from 'express';

/**
 * Login Rate Limiter
 * Allows a maximum of 10 login attempts per IP within a 15-minute window.
 * Returns HTTP 429 Too Many Requests when the limit is exceeded.
 * This protects against brute-force and credential-stuffing attacks.
 */
export const loginRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10,                   // Max 10 requests per window per IP
    standardHeaders: true,     // Return rate limit info in `RateLimit-*` headers
    legacyHeaders: false,      // Disable legacy `X-RateLimit-*` headers
    message: {
        status: 429,
        message: 'Too many login attempts from this IP. Please try again after 15 minutes.',
    },
    handler: (req: Request, res: Response, _next: NextFunction) => {
        console.warn(`[RATE LIMIT] Login brute-force blocked — IP: ${req.ip} at ${new Date().toISOString()}`);
        res.status(429).json({
            status: 429,
            message: 'Too many login attempts from this IP. Please try again after 15 minutes.',
        });
    },
});

/**
 * General API Rate Limiter
 * A lighter general limiter for all API routes to prevent API abuse.
 * Allows 200 requests per IP per 15 minutes.
 */
export const apiRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        status: 429,
        message: 'Too many requests from this IP. Please try again shortly.',
    },
});
