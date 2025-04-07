const express = require('express');
const router = express.Router();
const authController = require('../controller/authUser.controler')

router  
    .route('/auth')
    .get(
        authController.authUser
    );

module.exports = router;