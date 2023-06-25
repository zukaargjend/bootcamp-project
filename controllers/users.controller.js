const User = require('../models/users.model');
const { createError } = require('../lib/errors');

const getUsers = async (req, res, next) => {
    const failed = true;

    if(failed){
        return next(createError(401, 'You are not authenticated'))
    }

    try {
        const getUsers = await User.find(req.body);
        if(!getUsers){
            return res.status(404).send('The hotel with given ID is not found!');
        }
        res.status(200).json(getUsers);
    } catch (error) {
        next(error);
    }
}

const createUser = async (req, res, next) => {
    const newUser = new User(req.body);

    try {
        const savedUser = await newUser.save()
        res.status(200).json(savedUser);
    } catch (error) {
        next(error);
    }
}

const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        if (!updatedUser) {
            return res.status(404).send('The Hotel with given ID is not found!');
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const deletedUser = await Hotel.findByIdAndDelete(req.params.id)
        if (!deletedUser) {
            return res.status(404).send('The hotel with given ID is not found!');
        }
        res.status(200).json('Hotel Has been deleted');
    } catch (error) {
        next(error);
    }
}

const getUser = async (req, res, next) => {

    try {
        const getUser = await User.findById(req.params.id);
        if (!getUser) {
            return res.status(404).send('The hotel with given ID is not found!');
        }
        res.status(200).send(getUser);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    getUser
};
