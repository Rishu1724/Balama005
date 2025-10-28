const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { authenticateToken, isSeller, isBuyer } = require('../middleware/authMiddleware');

// Public routes
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.get('/search/:query', productController.searchProducts);

// Seller routes (protected)
router.post('/', authenticateToken, isSeller, productController.createProduct);
router.put('/:id', authenticateToken, isSeller, productController.updateProduct);
router.delete('/:id', authenticateToken, isSeller, productController.deleteProduct);

// AI-powered routes
router.post('/ai-price-suggestion', productController.getAIPriceSuggestion);
router.post('/ai-description', productController.generateAIDescription);

module.exports = router;