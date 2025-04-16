const catchAysnc = require('../util/catchAsync');
const ApiError = require('../util/ApiError');
const { userService , authService, tokenService } = require('../services');
const { APISuccessMsg } = require('../config/messages');

const registerUser = catchAysnc( async (req, res) => {
    const user = await userService.registerUser(req);
    const tokens = await tokenService.genarateAuthTokens({
        userId: user.id,
        roleId: user.role_id,
    })
    delete user.password;
    res.status(httpStatus.CREATED).send({
        message: APISuccessMsg,
        data: { user, tokens },
    });
})

const registerAdmin = catchAysnc( async (req, res) => {
    const user = await userService.registerAdmin(req);
    const tokens = await tokenService.genarateAuthTokens({
        userId: user.id,
        roleId: user.role_id,
    })
    delete user.password;
    res.status(httpStatus.CREATED).send({
        message: APISuccessMsg,
        data: { user, tokens },
    });
})

const login = catchAysnc( async (req, res) => {
    const user = await authService.loginUserWithEmailAndPassword(req);
    const tokens = await tokenService.genarateAuthTokens({
        userId : user.id,
        roleId : user.role_id,
    });
    res.status(httpStatus.OK).send({
        message: APISuccessMsg,
        data: { user, tokens}
    })
})


module.exports = {
    registerUser,
    registerAdmin,
    login
}