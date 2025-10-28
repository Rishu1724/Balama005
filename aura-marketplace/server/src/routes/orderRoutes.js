const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { authenticateToken, isBuyer, isSeller } = require('../middleware/authMiddleware');

// Buyer routes
router.post('/', authenticateToken, isBuyer, orderController.createOrder);
router.get('/my-orders', authenticateToken, isBuyer, orderController.getMyOrders);

// Seller routes
router.get('/my-sales', authenticateToken, isSeller, orderController.getMySales);
router.put('/:id/status', authenticateToken, isSeller, orderController.updateOrderStatus);

// Admin routes
router.get('/', authenticateToken, orderController.getAllOrders);
router.get('/:id', authenticateToken, orderController.getOrderById);

module.exports = router;