const catchAysnc = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');
const { userService , authService, tokenService } = require('../services');
const { APISuccessMsg } = require('../config/messages');
const { status } = require('http-status');

const registerUser = catchAysnc( async (req, res) => {
    const user = await userService.registerUser(req);
    const tokens = await tokenService.generateAuthTokens({
        userId: user.id,
        roleId: user.role_id,
    })
    delete user.password;
    res.status(status.CREATED).send({
        message: APISuccessMsg,
        data: { user, tokens },
    });
})

const registerAdmin = catchAysnc( async (req, res) => {
    const user = await userService.registerAdmin(req);
    const tokens = await tokenService.generateAuthTokens({
        userId: user.id,
        roleId: user.role_id,
    })
    delete user.password;
    res.status(status.CREATED).send({
        message: APISuccessMsg,
        data: { user, tokens },
    });
})

const login = catchAysnc( async (req, res) => {
    const user = await authService.loginUserWithEmailAndPassword(req);
    const tokens = await tokenService.generateAuthTokens({
        userId : user.id,
        roleId : user.role_id,
    });
    res.status(status.OK).send({
        message: APISuccessMsg,
        data: { user, tokens}
    })
})


module.exports = {
    registerUser,
    registerAdmin,
    login
}