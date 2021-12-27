const Order = require('../models/order');
const Product = require('../models/product');

const ErrorHandler = require('../utils/errorHandler');
const getAsyncErrors = require('../middlewares/catchAsyncErrors');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

// Create new order - POST /api/orders/new
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
    const { 
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo
    } = req.body;

    const order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(),
        user: req.user._id
    });

    if (!order) {
        return next(new ErrorHandler(`Failed to create order`, 400));
    }

    res.status(200).json({
        success: true,
        order
    });
});

// Get single order - GET /api/order/:id
exports.getOrderById = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    
    if (!order) {
        return next(new ErrorHandler(`No order found with id: ${req.params.id}`, 404));
    }

    res.status(200).json(order);
});

// Get logged in user orders - GET /api/orders/me
exports.getUserOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find({ user: req.user.id });
    res.status(200).json(orders);
});

// Get all orders - GET api/admin/orders/all
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.find();

    let totalAmount = 0;
    order.forEach((order) => {
        totalAmount += order.totalPrice;
    });

    res.status(200).json({
        success: true,
        totalPrice: totalAmount,
        order
    });
});

// Process orders - GET api/admin/order/:id
exports.processOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler(`No order found with id: ${req.params.id}`, 404));
    }

    if (order.orderStatus === 'Delivered') {
        return next(new ErrorHandler('You have already delivered this order', 400));
    }

    order.orderItems.forEach(async (item) => {
        console.log('product id ' + item.product);
        await updateStock(item.product, item.quantity);
    });

    order.orderStatus = req.body.status, 
    order.deliveredAt = Date.now();

    await order.save();

    res.status(200).json({
        success: true
    });
});

// Delete orders - DELETE api/admin/order/:id
exports.deleteOrderById = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler(`No order found with id: ${req.params.id}`, 404));
    }

    await Order.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true
    });
});

async function updateStock(id, quantity) {
    const product = await Product.findById(id);
    product.stock = product.stock - quantity;
    await product.save({ validateBeforeSave: false });
}