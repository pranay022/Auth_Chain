const jwt = require('jsonwebtoken');
const bycrypt = require('bcrypt');
const config = require('../config/config');


function generateToken(date, expiresMs, secret = config.jwt.secret) {
    const token = jwt.sign(
        {
            exp: Math.floor(expiresMs / 1000), ...data
        },
    );
    return token;
}

function generateExpires(hours) {
    const ms = Math.floor(Data.now() + hours * 60 * 60 * 1000);
    return ms;
}



module.exports = {
    generateToken,
    generateExpires,

}