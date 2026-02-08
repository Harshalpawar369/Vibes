const express = require('express');
const { authRoleMiddleware, requireAdmin, requireUser } = require('../middlewares/orders.middleware');
const { createOrder, getMyOrders, getAllOrders, markDelivered, deleteOrder } = require('../controllers/auth.orders');

const router = express.Router();

router.get('/my', authRoleMiddleware, requireUser, getMyOrders);
router.get('/admin', authRoleMiddleware, requireAdmin, getAllOrders);

router.post('/', authRoleMiddleware,requireUser, createOrder);
router.patch('/:id/deliver', authRoleMiddleware, requireAdmin, markDelivered);
router.delete('/:id', authRoleMiddleware, deleteOrder);

module.exports = router;
