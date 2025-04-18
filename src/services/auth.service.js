const { status } = require('http-status');
const userService = require('./user.service');
const ApiError = require('../utils/ApiError');
const { decryptData, encryptData } = require('../utils/auth');

async function loginUserWithEmailAndPassword(req) {
    const { email, password } = req.body;
    const user = await userService.getUserByEmail(email);
    const isPasswordMatch = await decryptData(password, user.password);
    if(!isPasswordMatch) {
        throw new ApiError(
            status.UNAUTHORIZED,
            'Invalidd email or password'
        );
    }
    delete user.password;
    return user;
}

module.exports = {
    loginUserWithEmailAndPassword
}