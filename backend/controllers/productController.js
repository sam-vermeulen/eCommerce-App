const Product = require('../models/product')
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');

// Get product by id - GET /api/products/:id
exports.getProductById = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler('Product not found'), 404);
    }

    res.status(200).json({
        success: true,
        product
    });
});

// Get all products - GET /api/products?keyword=apple
exports.getProducts = catchAsyncErrors(async (req, res, next) => {

    const itemsPerPage = 4;
    const productCount = await Product.countDocuments();

    const apiFeatures = new APIFeatures(Product.find(), req.query)
            .search()
            .filter()
            .pagination(itemsPerPage);

    const products = await apiFeatures.query;

    res.status(200).json({
        success: true,
        count: products.length,
        productCount,
        products
    });
});

// Create new product - POST /api/admin/products
exports.newProduct = catchAsyncErrors(async (req, res, next) => {

    req.body.user = req.user.id;

    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    });
});


// Update product - PUT /api/admin/products/:id
exports.updateProductById = catchAsyncErrors(async (req, res, next) => {

    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler('Product not found'), 404);
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        product
    });
})

// Delete product - DELETE /api/admin/products/:id
exports.deleteProductById = catchAsyncErrors(async (req, res, next) => {
    
    let product = await Product.findById(req.params.id);
    
    if (!product) {
        return next(new ErrorHandler('Product not found'), 404);
    }

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true,
        message: 'Product is deleted'
    });
});