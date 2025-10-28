const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Buyer routes
router.post('/login/buyer', authController.buyerLogin);
router.post('/register/buyer', authController.buyerRegister);

// Seller routes
router.post('/login/seller', authController.sellerLogin);
router.post('/register/seller', authController.sellerRegister);

// Admin routes
router.post('/login/admin', authController.adminLogin);

// Google OAuth routes
router.post('/google', authController.googleAuth);

// Password reset routes
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

module.exports = router;