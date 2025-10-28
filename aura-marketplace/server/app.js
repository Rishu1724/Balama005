const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'AURA Unified Marketplace API', 
    version: '1.0.0',
    description: 'Backend API for the AI-powered marketplace with autonomous supply chain optimization'
  });
});

// Auth routes
app.use('/api/auth', require('./src/routes/authRoutes'));

// Product routes
app.use('/api/products', require('./src/routes/productRoutes'));

// Order routes
app.use('/api/orders', require('./src/routes/orderRoutes'));

// Chat routes
app.use('/api/chat', require('./src/routes/chatRoutes'));

// ML service routes
app.use('/api/ml', require('./src/routes/mlRoutes'));

// Supply chain routes
app.use('/api/supply-chain', require('./src/routes/supplyChainRoutes'));

// Admin routes
app.use('/api/admin', require('./src/routes/adminRoutes'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: err.message 
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API Documentation: http://localhost:${PORT}/api-docs`);
});

module.exports = app;