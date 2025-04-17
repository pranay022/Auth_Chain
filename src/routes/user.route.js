const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller')


router  
    .route('/admin-approval')
    .post(
        userController.adminApproval,
    )

router
    .route('/user-approval')
    .post(
        userController.userApproval,
    )

module.exports = router 