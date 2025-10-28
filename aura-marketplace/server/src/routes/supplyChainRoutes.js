const express = require('express');
const router = express.Router();
const supplyChainController = require('../controllers/supplyChainController');
const { authenticateToken } = require('../middleware/authMiddleware');

// Shipment management
router.post('/shipments', authenticateToken, supplyChainController.createShipment);
router.get('/shipments/:id', authenticateToken, supplyChainController.getShipmentById);
router.put('/shipments/:id/status', authenticateToken, supplyChainController.updateShipmentStatus);
router.get('/shipments', authenticateToken, supplyChainController.getAllShipments);

// Tracking
router.get('/tracking/:shipmentId', authenticateToken, supplyChainController.getTrackingInfo);

// AI logistics optimization
router.post('/optimize', authenticateToken, supplyChainController.optimizeLogistics);

// Inventory management
router.get('/inventory', authenticateToken, supplyChainController.getInventoryStatus);
router.post('/inventory/restock', authenticateToken, supplyChainController.requestRestock);

module.exports = router;