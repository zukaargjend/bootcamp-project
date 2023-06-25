const bcrypt = require('bcrypt');
const User = require('../models/users.model');
const { createError } = require('../lib/errors');
const jwt = require('jsonwebtoken');

const register = async(req, res, next) => {
    try {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })
        const salt = await bcrypt.genSalt(parseInt(process.env.HASH_SALT));
        const hashedPassword = await bcrypt.hash(newUser.password, salt);
        newUser.password = hashedPassword;
        await newUser.save();

        const token = newUser.generateAuthToken();
        res.header('x-auth-token', token).status(200).send(newUser);
    } catch (error) {
        next(error);
    }
}

const login = async(req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if(!user){
            return next(createError(404, 'User not found!'));
        }

        const checkPassword = await bcrypt.compare(req.body.password, user.password);
        if(!checkPassword){
            return next(createError(400, 'Invalid username or password!'));
        }

        const { password, isAdmin, ...otherDetails } = user._doc;
        // res.status(200).send({ ...otherDetails });

        const token = user.generateAuthToken();
        res.header('x-auth-token', token).status(200).send(otherDetails);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    register,
    login
}