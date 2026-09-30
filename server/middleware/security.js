const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');

// 1. Helmet Security Headers configuration
const helmetMiddleware = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://fonts.googleapis.com"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https://images.unsplash.com", "https://*.unsplash.com"],
      connectSrc: ["'self'", "http://localhost:5000", "http://localhost:5173", "https://*"]
    }
  },
  crossOriginEmbedderPolicy: false
});

// 2. Strict Rate Limiter for Authentication (Anti-Brute Force)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // Limit each IP to 20 requests per 15 minutes window
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many login/registration attempts from this IP. Please try again after 15 minutes.'
  }
});

// 3. General API Rate Limiter (Anti-DDoS / Scraping Shield)
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300, // Limit each IP to 300 API requests per 15 minutes
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests created from this IP, please try again later.'
  }
});

// 4. Booking Transactions Limiter (Anti-Fraud / Card-Testing Prevention)
const bookingLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 25, // 25 bookings per IP per 10 minutes
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'High transaction frequency detected. Please wait a few minutes before trying again.'
  }
});

// 5. NoSQL Injection Sanitizer
const sanitizeMiddleware = mongoSanitize({
  replaceWith: '_'
});

module.exports = {
  helmetMiddleware,
  authLimiter,
  apiLimiter,
  bookingLimiter,
  sanitizeMiddleware
};
