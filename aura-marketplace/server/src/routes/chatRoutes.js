const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const { authenticateToken } = require('../middleware/authMiddleware');

// Chat rooms
router.post('/rooms', authenticateToken, chatController.createChatRoom);
router.get('/rooms', authenticateToken, chatController.getChatRooms);
router.get('/rooms/:roomId', authenticateToken, chatController.getChatRoomById);

// Messages
router.post('/rooms/:roomId/messages', authenticateToken, chatController.sendMessage);
router.get('/rooms/:roomId/messages', authenticateToken, chatController.getMessages);

// AI negotiation
router.post('/negotiate', authenticateToken, chatController.aiNegotiation);

module.exports = router;