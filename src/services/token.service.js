const config = require('../config/config');
const { generateToken, generateExpires } = require('../utils/auth');


async function generateAuthTokens({ userId, roleId}) {
    const refreshTokenExpires = generateExpires(
        config.jwt.refreshExpirationDays * 24
    );

    const refreshToken = generateToken({ userId }, refreshTokenExpires);

    const accessTokenExpires = generateExpires(
        config.jwt.accessExpirationMinutes / 60
    );

    const accessToken =  generateToken({ userId, roleId }, accessTokenExpires);

    return {
        refresh: {
            token: refreshToken,
            expires: refreshTokenExpires,
        },
        access: {
            token: accessToken,
            expires: accessTokenExpires
        }
    }
}

module.exports = {
    generateAuthTokens
}