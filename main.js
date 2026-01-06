const express = require('express');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const morgan = require('morgan');

// Import security middleware
const { rateLimiter, sanitizeBody, validateIdParam } = require('./api/middleware/securityMiddleware');
const { notFoundHandler, globalErrorHandler } = require('./api/middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// ===========================================
// SECURITY MIDDLEWARE
// ===========================================

// Helmet - Set security HTTP headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "https://sde-roadmap-alpha.vercel.app"],
    },
  },
  crossOriginEmbedderPolicy: false, // Allow embedding for images/PDFs
  crossOriginResourcePolicy: { policy: "cross-origin" }, // Allow cross-origin resource sharing
}));

// Rate Limiting - Protect against DDoS and brute-force attacks
app.use(rateLimiter);

// Request Logging - Morgan
app.use(morgan('combined'));

// ===========================================
// CORS CONFIGURATION
// ===========================================

const allowedOrigins = [
  'https://sde-roadmap-alpha.vercel.app',
  'http://localhost:3000',
  'http://localhost:3001',
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
  optionsSuccessStatus: 200,
  maxAge: 86400, // Cache preflight requests for 24 hours
}));

// ===========================================
// BODY PARSING WITH LIMITS
// ===========================================

// Limit JSON body size to prevent large payload attacks
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Sanitize request body to prevent XSS
app.use(sanitizeBody);

// ===========================================
// STATIC FILES
// ===========================================

app.use('/pdf', express.static(path.join(__dirname, 'pdf')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/notes', express.static(path.join(__dirname, 'notes')));

// ===========================================
// ROUTES
// ===========================================

// Import Routes
const roadmapRoutes = require('./api/routes/roadmapRoutes');
const videoRoutes = require('./api/routes/videoRoutes');
const questionRoutes = require('./api/routes/questionRoutes');
const notesRoutes = require('./api/routes/notesRoutes');

// Use Routes
app.use('/api/roadmap', roadmapRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/notes', notesRoutes);

// Root Route
app.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'SDE Roadmap API is running!',
    version: '1.0.0',
    documentation: '/api',
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
  });
});

// ===========================================
// ERROR HANDLING
// ===========================================

// Handle 404 - Route not found
app.use(notFoundHandler);

// Global error handler
app.use(globalErrorHandler);

// ===========================================
// START SERVER
// ===========================================

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`🔒 Security features enabled: Helmet, Rate Limiting, CORS, XSS Protection`);
  });
}

module.exports = app; // Export the app for Vercel

