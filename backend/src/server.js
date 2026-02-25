require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  const server = app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
  });

  // Handle unhandled promise rejections gracefully
  process.on('unhandledRejection', (err) => {
    console.error('❌ Unhandled Rejection:', err.message);
    server.close(() => process.exit(1));
  });

  // Handle SIGTERM for clean Docker shutdown
  process.on('SIGTERM', () => {
    console.log('👋 SIGTERM received. Shutting down gracefully...');
    server.close(() => process.exit(0));
  });
};

startServer();
