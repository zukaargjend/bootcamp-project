const { check, validationResult } = require('express-validator');
const responder = require('../lib/baseResponse');

const emailValidator = check('email', 'Email is not valid').notEmpty.isEmail();

const registerCheck = [
    emailValidator,
    check('username', 'Username can not be empty!').notEmpty(),
    check('password', 'Password is not enough strong').isStrongPassword(),
];

module.exports ={
    registerCheck,
    loginCheck: [
        emailValidator,
        check('password', 'Password is not enoguh strong').notEmpty()
    ],
    validate: (req, res, next) => {
        const errors = validationResult(req)
        if(errors.isEmpty()){
            return next();
        } 
        res.json(responder.fail(errors));
    }
} 