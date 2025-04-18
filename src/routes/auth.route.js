const express = require('express');
const router = express.Router();
const authController = require('../controller/auth.controller')
const validate = require('../middlewares/validate')
const authValidate = require('../validation/auth.validation')

router
    .route('/register/users')
    .post(
        // validate(authValidate.register),
        authController.registerUser
    );

router
    .route('/register/admin')
    .post(
        // validate(authValidate.register),
        authController.registerAdmin
    );

router  
    .route('/login')
    .post(
        validate(authValidate.login),
        authController.login
    );





module.exports = router;