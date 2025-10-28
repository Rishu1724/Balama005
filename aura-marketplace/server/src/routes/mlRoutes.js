const express = require('express');
const router = express.Router();
const mlController = require('../controllers/mlController');
const { authenticateToken } = require('../middleware/authMiddleware');

// Price prediction
router.post('/price', authenticateToken, mlController.getPricePrediction);

// Product recommendations
router.post('/recommend', authenticateToken, mlController.getProductRecommendations);

// Fraud detection
router.post('/fraud-detect', authenticateToken, mlController.detectFraud);

// ETA prediction
router.post('/eta', authenticateToken, mlController.getETAPrediction);

// Route optimization
router.post('/optimize-route', authenticateToken, mlController.optimizeRoute);

module.exports = router;