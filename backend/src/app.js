const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const errorHandler = require('./middleware/errorHandler');

const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// Request logging
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// CORS configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  })
);

// Body parsing
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Server is running', env: process.env.NODE_ENV });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/admin', adminRoutes);

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

// Centralized error handler (must be last)
app.use(errorHandler);

module.exports = app;
