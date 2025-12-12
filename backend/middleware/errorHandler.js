/**
 * Custom Error Class for Application Errors
 */
export class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true; // Mark as operational error (expected errors)

        Error.captureStackTrace(this, this.constructor);
    }
}

/**
 * Centralized Error Handling Middleware
 * Catches all errors and sends consistent error responses
 */
export const errorHandler = (err, req, res, next) => {
    let { statusCode, message } = err;

    // Default to 500 if statusCode not set
    statusCode = statusCode || 500;

    // Log error for debugging
    if (statusCode === 500) {
        console.error('❌ Internal Server Error:', err);
    } else {
        console.warn(`⚠️  ${statusCode} Error:`, message);
    }

    // Send error response
    res.status(statusCode).json({
        success: false,
        message: statusCode === 500 ? 'Internal server error' : message,
        ...(process.env.NODE_ENV === 'development' && {
            stack: err.stack,
            error: err.message
        })
    });
};

/**
 * Async Handler Wrapper
 * Wraps async route handlers to catch errors and pass to error middleware
 */
export const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};

/**
 * 404 Not Found Handler
 * Catches requests to undefined routes
 */
export const notFound = (req, res, next) => {
    const error = new AppError(`Route ${req.originalUrl} not found`, 404);
    next(error);
};
