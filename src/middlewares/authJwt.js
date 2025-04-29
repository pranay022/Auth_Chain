const db = require("../db/models");
const jwt = require('jsonwebtoken');
const config = require('../config/config');

const authenticateJWT = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({messgae: 'No token provided' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, config.jwt.secret);
        const user = await db.users.findOne({
            where: {id: decoded.userId},
            include: [{
                model: db.roles,
                as: 'role',
                attributes: ['id', 'role_type']
            }],
            raw: true,
        })
        if(!user) return res.status(403).json({ message: 'User not found'})
        req.user = user;
        next();
    } catch (error) {
        return res.status(403).json({message: 'Invalid token'})
    }
}

module.exports = authenticateJWT;