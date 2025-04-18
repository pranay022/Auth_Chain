const catchAysnc = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');
const { userServices } = require('../services');
const { APISuccessMsg } = require('../config/messages');
const { status } = require('http-status');

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

const adminApproval = catchAysnc(async (req, res) => {
    const response = await userServices.adminApproval(req);
    if (!response) {
        throw new ApiError(status.NOT_FOUND, 'Admin not found');
    }
    res.status(status.OK ).send({
        message: APISuccessMsg,
        data: response,
    });
});

const userApproval = catchAysnc( async (req, res) => {
    const response = await userServices.userApproval(req);
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
    userLogin,
    adminApproval,
    userApproval,
};