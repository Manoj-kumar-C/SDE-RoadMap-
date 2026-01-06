// api/middleware/securityMiddleware.js
const rateLimit = require('express-rate-limit');
const xss = require('xss');

/**
 * Rate limiter configuration
 * Limits each IP to 100 requests per 15 minutes
 */
const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    status: 429,
    error: 'Too many requests',
    message: 'You have exceeded the rate limit. Please try again later.',
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  handler: (req, res, next, options) => {
    res.status(options.statusCode).json(options.message);
  },
});

/**
 * Stricter rate limiter for sensitive endpoints (like POST/PUT/DELETE)
 * Limits each IP to 20 requests per 15 minutes
 */
const strictRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // Limit each IP to 20 requests per windowMs
  message: {
    status: 429,
    error: 'Too many requests',
    message: 'Rate limit exceeded for this action. Please wait before trying again.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * Request logger middleware
 * Logs incoming requests with useful info
 */
const requestLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const { method, url, ip } = req;
  const userAgent = req.get('User-Agent') || 'Unknown';
  
  console.log(`[${timestamp}] ${method} ${url} - IP: ${ip} - UA: ${userAgent}`);
  next();
};

/**
 * Sanitize string input to prevent XSS attacks
 * @param {string} input - The string to sanitize
 * @returns {string} - Sanitized string
 */
const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  return xss(input.trim());
};

/**
 * Middleware to sanitize request body
 * Recursively sanitizes all string values in the request body
 */
const sanitizeBody = (req, res, next) => {
  if (req.body && typeof req.body === 'object') {
    req.body = sanitizeObject(req.body);
  }
  next();
};

/**
 * Recursively sanitize an object
 * @param {object} obj - The object to sanitize
 * @returns {object} - Sanitized object
 */
const sanitizeObject = (obj) => {
  const sanitized = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      if (typeof value === 'string') {
        sanitized[key] = sanitizeInput(value);
      } else if (typeof value === 'object' && value !== null) {
        sanitized[key] = Array.isArray(value) 
          ? value.map(item => typeof item === 'string' ? sanitizeInput(item) : sanitizeObject(item))
          : sanitizeObject(value);
      } else {
        sanitized[key] = value;
      }
    }
  }
  return sanitized;
};

/**
 * Validate that request params are safe integers (for ID params)
 */
const validateIdParam = (req, res, next) => {
  const { id } = req.params;
  if (id !== undefined) {
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId) || parsedId < 0 || parsedId.toString() !== id) {
      return res.status(400).json({
        status: 400,
        error: 'Bad Request',
        message: 'Invalid ID parameter. Must be a positive integer.',
      });
    }
  }
  next();
};

module.exports = {
  rateLimiter,
  strictRateLimiter,
  requestLogger,
  sanitizeInput,
  sanitizeBody,
  sanitizeObject,
  validateIdParam,
};
