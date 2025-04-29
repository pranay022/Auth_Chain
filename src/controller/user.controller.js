const catchAysnc = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');
const { userService } = require('../services');
const { APISuccessMsg } = require('../config/messages');
const { status } = require('http-status');

const adminApproval = catchAysnc(async (req, res) => {
    const response = await userService.adminApproval(req);
    if (!response) {
        throw new ApiError(status.NOT_FOUND, 'Admin not found');
    }
    delete response.password;
    res.status(status.OK ).send({
        message: APISuccessMsg,
        data: response,
    });
});

const userApproval = catchAysnc( async (req, res) => {
    const response = await userService.userApproval(req);
    if(!response){
        throw new ApiError(status.NOT_FOUND, 'User not found');
    }
    delete response.password;
    res.status(status.OK).send({
        message: APISuccessMsg,
        data: response
    })
})

const getAllUsers = catchAysnc ( async (req, res ) => {
    const response = await userService.getAllUsers();
    if(!response){
        throw new ApiError(status.NOT_FOUND, 'Users not found');
    }
    res.status(status.OK).send({
        message: APISuccessMsg,
        data: response
    })
})

const getAlladmins = catchAysnc ( async (req, res ) => {
    const response = await userService.getAlladmins();
    console.log('ddd');
    
    if(!response){
        throw new ApiError(status.NOT_FOUND, 'Admins not found');
    }
    res.status(status.OK).send({
        message: APISuccessMsg,
        data: response
    })
})

module.exports = {
    adminApproval,
    userApproval,
    getAllUsers,
    getAlladmins,
};