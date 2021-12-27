const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// process payments - POST /api/payment/process
exports.processPayment = catchAsyncErrors (async (req, res, next) => {
    
    const paymentIntent = await stripe.paymentIntents.create({ 
        amount: req.body.amount,
        currency: 'cad',
        metadata: { integration_check: 'accept_a_payment' }
    });

    res.status(200).json({
        success: true,
        client_secret: paymentIntent.client_secret
    });
});

// get stripe api - GET /api/stripe
exports.getStripeAPI = catchAsyncErrors (async (req, res, next) => {
    res.status(200).json({
        stripeApiKey: process.env.STRIPE_API_KEY
    });
});