const express = require("express");
const userRoute = require("./user.route");
const router = express.Router();
const authRoute = require('./auth.route')

router.use('/users', userRoute);
router.use('/auth', authRoute)

module.exports = router;
