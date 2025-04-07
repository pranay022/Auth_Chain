const {status} = require("http-status");

const catchAysnc = require('../util/catchAsync');
const ApiError = require('../util/ApiError');
const { userServices } = require('../services');
const { APISuccessMsg } = require('../config/messages');

const registerUser = catchAysnc(async (req, res) => {
    const response = await userServices.registerUser(req);
    if (!response) {
        throw new ApiError(status.NOT_FOUND);
    }
    res.status(status.OK ).send({
        message: APISuccessMsg,
        data: response,
    });
});

const userLogin = catchAysnc( async (req, res) => {
    const response = await userServices.userLogin(req);
    if(!response){
        throw new ApiError(status.NOT_FOUND, 'User not found');
    }
    res.status(status.OK).send({
        message: APISuccessMsg,
        data: response
    })
})

module.exports = {
    registerUser,
    userLogin
};