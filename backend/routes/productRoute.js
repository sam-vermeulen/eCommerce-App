const express = require('express');
const router = express.Router();

const { newProduct, getProducts, getProductById, updateProductById, deleteProductById } = require('../controllers/productController');

const { isUserAuthenticated, authorizeRoles } = require('../middlewares/auth');

router.route('/products').get(getProducts);
router.route('/products/:id').get(getProductById);

router.route('/admin/products/:id')
        .put(isUserAuthenticated, authorizeRoles('admin'), updateProductById)
        .delete(isUserAuthenticated, authorizeRoles('admin'), deleteProductById);
        
router.route('/admin/products').post(isUserAuthenticated, authorizeRoles('admin'), newProduct);

module.exports = router;
