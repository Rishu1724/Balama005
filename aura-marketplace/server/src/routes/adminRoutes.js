const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authenticateToken, isAdmin } = require('../middleware/authMiddleware');

// User management
router.get('/users', authenticateToken, isAdmin, adminController.getAllUsers);
router.put('/users/:id/status', authenticateToken, isAdmin, adminController.updateUserStatus);
router.delete('/users/:id', authenticateToken, isAdmin, adminController.deleteUser);

// Product management
router.get('/products', authenticateToken, isAdmin, adminController.getAllProducts);
router.delete('/products/:id', authenticateToken, isAdmin, adminController.deleteProduct);

// Order management
router.get('/orders', authenticateToken, isAdmin, adminController.getAllOrders);
router.put('/orders/:id/status', authenticateToken, isAdmin, adminController.updateOrderStatus);

// System metrics
router.get('/metrics', authenticateToken, isAdmin, adminController.getSystemMetrics);

// Fraud detection
router.get('/fraud-reports', authenticateToken, isAdmin, adminController.getFraudReports);
router.post('/fraud-reports/:id/action', authenticateToken, isAdmin, adminController.takeFraudAction);

module.exports = router;