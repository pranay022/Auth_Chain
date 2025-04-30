const express = require('express');
const router = express.Router();
const authController = require('../controller/auth.controller')
const validate = require('../middlewares/validate')
const userValidate = require('../validation/user.validation')
const multer = require('multer');
const upload = multer();

router
    .route('/register/users')
    .post(
        upload.single('profile_img'),
        validate(userValidate.register),
        authController.registerUser
    );

router
    .route('/register/admin')
    .post(
        upload.single('profile_img'),
        validate(userValidate.register),
        authController.registerAdmin
    );

router
    .route('/register/guest')
    .post(
        validate(userValidate.registerGuest),
        authController.registerGuest
    );

router  
    .route('/login')
    .post(
        validate(userValidate.login),
        authController.login
    );


 


module.exports = router;