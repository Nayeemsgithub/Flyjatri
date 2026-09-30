const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');
const { 
  helmetMiddleware, 
  apiLimiter, 
  sanitizeMiddleware 
} = require('./middleware/security');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect Database (MongoDB with auto-fallback)
connectDB();

// 1. Enterprise Security Headers (Helmet)
app.use(helmetMiddleware);

// 2. CORS Policy
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173', 'https://flyjatribd.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// 3. Body Parsers with payload limits (Anti-Memory Exhaustion)
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));

// 4. Data Sanitization against NoSQL query injection
app.use(sanitizeMiddleware);

// 5. Global API Rate Limiter
app.use('/api', apiLimiter);

// Import Routes
const authRoutes = require('./routes/authRoutes');
const flightRoutes = require('./routes/flightRoutes');
const tourRoutes = require('./routes/tourRoutes');
const hotelRoutes = require('./routes/hotelRoutes');
const visaRoutes = require('./routes/visaRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const seedData = require('./seed/data');

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api', flightRoutes);
app.use('/api/tours', tourRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/visa', visaRoutes);
app.use('/api/bookings', bookingRoutes);

// Offers endpoint
app.get('/api/offers', (req, res) => {
  res.json({ success: true, count: seedData.offers.length, data: seedData.offers });
});

// Root Health & Security Audit Directory
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    system: 'FlyJatri Enterprise MERN Travel API',
    securitySuite: {
      helmetHeaders: 'active',
      rateLimiting: 'active (auth/api/booking)',
      noSqlSanitization: 'active',
      passwordHashing: 'bcrypt (salt 10)',
      jwtProtection: 'active (7d)'
    },
    timestamp: new Date().toISOString()
  });
});

const path = require('path');
const fs = require('fs');

// Serve Frontend Static Assets if client/dist exists (For Full-Stack single-service hosting on Render)
const clientDistPath = path.join(__dirname, '../client/dist');
if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next();
    }
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
}

// 6. Centralized Error Handling Middleware (Zero stack-trace leakage)
app.use((err, req, res, next) => {
  console.error('Unhandled API Error:', err.message);
  res.status(err.status || 500).json({
    success: false,
    message: process.env.NODE_ENV === 'production' 
      ? 'An internal security or server error occurred.' 
      : err.message
  });
});

app.listen(PORT, () => {
  console.log(`🛡️ FlyJatri Enterprise API Server with Security Suite running on port ${PORT}`);
});
