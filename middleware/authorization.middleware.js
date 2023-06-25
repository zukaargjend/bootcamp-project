const jwt = require('jsonwebtoken');
const { createError } = require('../lib/errors');

function authorization(req, res, next) {
    const token = req.header('x-auth-token');
    if(!token){
        return next(createError(401, 'Access denied'));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_BOOKING_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        return next(createError(400, 'Invalid token!'));
    }
}

function verifyAdmin(req, res, next){
    if(!req.user.isAdmin){
        return next(createError(403, 'Access denied and forbbiden!'));
    }
    next();
}

module.exports = {
    authorization,
    verifyAdmin
}