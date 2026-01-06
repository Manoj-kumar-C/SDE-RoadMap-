// api/middleware/errorHandler.js

/**
 * Custom error class for API errors
 */
class ApiError extends Error {
    constructor(statusCode, message, isOperational = true) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';

        Error.captureStackTrace(this, this.constructor);
    }
}

/**
 * Not Found Error Handler
 * Catches requests to undefined routes
 */
const notFoundHandler = (req, res, next) => {
    const error = new ApiError(404, `Route ${req.originalUrl} not found`);
    next(error);
};

/**
 * Global Error Handler Middleware
 * Catches all errors and returns appropriate response
 */
const globalErrorHandler = (err, req, res, next) => {
    // Set default values
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    // Log error for debugging (in development or for monitoring)
    const timestamp = new Date().toISOString();
    console.error(`[${timestamp}] ERROR:`, {
        statusCode: err.statusCode,
        message: err.message,
        url: req.originalUrl,
        method: req.method,
        ip: req.ip,
        // Only log stack in development
        ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
    });

    // Development response (includes stack trace)
    if (process.env.NODE_ENV !== 'production') {
        return res.status(err.statusCode).json({
            status: err.status,
            error: err.message,
            stack: err.stack,
            timestamp,
        });
    }

    // Production response (safe, no sensitive info)
    // For operational errors (expected errors), send message
    if (err.isOperational) {
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
            timestamp,
        });
    }

    // For programming or unknown errors, send generic message
    return res.status(500).json({
        status: 'error',
        message: 'Something went wrong. Please try again later.',
        timestamp,
    });
};

/**
 * Async handler wrapper to catch errors in async route handlers
 * @param {Function} fn - Async function to wrap
 * @returns {Function} - Express middleware function
 */
const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};

module.exports = {
    ApiError,
    notFoundHandler,
    globalErrorHandler,
    asyncHandler,
};
