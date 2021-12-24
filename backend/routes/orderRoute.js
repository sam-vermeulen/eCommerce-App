const express = require('express');
const router = express.Router();

const { newOrder, getOrderById, 
        getUserOrders, getAllOrders, 
        processOrder, deleteOrderById} = require('../controllers/orderController');
const { isUserAuthenticated, authorizeRoles } = require('../middlewares/auth');

router.route('/order/new').post(isUserAuthenticated, newOrder);
router.route('/orders/me').get(isUserAuthenticated, getUserOrders);

router.route('/admin/order/:id').get(isUserAuthenticated, authorizeRoles('admin'), getOrderById);
router.route('/admin/orders/all').get(isUserAuthenticated, authorizeRoles('admin'), getAllOrders);
router.route('/admin/order/:id')
        .put(isUserAuthenticated, authorizeRoles('admin'), processOrder)
        .delete(isUserAuthenticated, authorizeRoles('admin'), deleteOrderById);

module.exports = router;
