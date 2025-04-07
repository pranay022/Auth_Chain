const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller')


router  
    .route('/register')
    .post(
        userController.registerUser,
    )

router
    .route('/login')
    .get(
        userController.userLogin,
    )

module.exports = router