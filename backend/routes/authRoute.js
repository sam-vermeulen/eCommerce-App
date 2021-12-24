const express = require('express');
const router = express.Router();

const { registerUser, loginUser, 
        logoutUser, forgotPassword, 
        resetPassword, getUserProfile, 
        changePassword, updateProfile,
        allUsers, getUserById,
        updateProfileById, deleteProfileById } = require('../controllers/authController');

const { isUserAuthenticated, authorizeRoles } = require('../middlewares/auth');

router.route('/register').post(registerUser);
router.route('/login').get(loginUser);

router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);

router.route('/logout').get(logoutUser);

router.route('/myprofile').get(isUserAuthenticated, getUserProfile);
router.route('/myprofile/update').put(isUserAuthenticated, updateProfile);
router.route('/password/update').put(isUserAuthenticated, changePassword);

router.route('/admin/users').get(isUserAuthenticated, authorizeRoles('admin'), allUsers);
router.route('/admin/users/:id')
    .get(isUserAuthenticated, authorizeRoles('admin'), getUserById)
    .delete(isUserAuthenticated, authorizeRoles('admin'), deleteProfileById);
router.route('/admin/users/update/:id').get(isUserAuthenticated, authorizeRoles('admin'), updateProfileById);

module.exports = router;