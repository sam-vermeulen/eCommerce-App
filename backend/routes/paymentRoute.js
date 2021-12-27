const express = require('express');
const router = express.Router();

const { processPayment, getStripeAPI } = require('../controllers/paymentController');
const { isUserAuthenticated } = require('../middlewares/auth');

router.route('/payment/process').post(isUserAuthenticated, processPayment);
router.route('/stripe').get(isUserAuthenticated, getStripeAPI);

module.exports = router;
