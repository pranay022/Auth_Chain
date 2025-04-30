const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller')
const authJwt = require('../middlewares/authJwt')
const { checkAdminOrSuperAdmin, checkSuperAdmin, checkAdmin, checkGuest } = require('../middlewares/authMiddleware');
const multer = require('multer');
const upload = multer();

router  
    .route('/admin_approval')
    .post(
        authJwt,
        checkSuperAdmin, 
        userController.adminApproval,
    );

router
    .route('/user_approval')
    .post(
        authJwt,
        checkAdmin, 
        userController.userApproval,
    );

router 
    .route('/all_users')
    .get(
        authJwt,
        checkAdminOrSuperAdmin,
        userController.getAllUsers,
    );

router 
    .route('/all_admins')
    .get(
        authJwt,
        checkSuperAdmin,
        userController.getAlladmins,
    );

router 
    .route('/update_guest')
    .post(
        upload.single('profile_img'),
        authJwt,
        checkGuest,
        userController.updateGuest,
    );

module.exports = router;