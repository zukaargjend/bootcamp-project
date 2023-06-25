const { createError } = require('../lib/errors');
const Room = require('../models/rooms.model');
const { Hotel } = require('../models/hotels.model');
const { findByIdAndDelete, find, findOne } = require('../models/users.model');

const getAllRooms = async(req, res, next) => {
    try {
        const Rooms = await Room.find(req.body);
        if(!Rooms){
            return res.status(404).send('The Room with given ID did not found!');
        }
        res.status(200).json(Rooms);
    } catch (error) {
        next(error);
    }
}

const createRoom = async(req, res, next) => {
    const hotelId = req.params.hotelId;
    const newRoom = new Room(req.body);

    try{
        const savedRoom = await newRoom.save();
        try {
            await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: savedRoom._id }});
            res.status(200).json(savedRoom);
        } catch (error) {
            next(error);
        }

    }catch(error){
        next(error);
    }

}

const updateRoom = async(req, res, next) => {
    try{
        const updatedRoom = await Room.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updatedRoom)
    }catch(error){
        next(error);
    }
}

const deleteRoom = async(req, res, next) => {
    const hotelId = req.params.hotelId;
    try {
        await Room.findByIdAndDelete(req.params.id);
        try {
            await Hotel.findByIdAndUpdate(hotelId, { $pull: { rooms: req.params.id }});
            res.status(200).json('Room has been removed!');
        } catch (error) {
            next(error);
        }
    } catch (error) {
        next(error);
    }
}

const getRoom = async(req, res, next) => {
    try {
        const room = await findOne(req.params.id);
        if(!room){
            return res.status(404).send('The Room with given ID did not found!');
        }
        res.status(200).json(room);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllRooms,
    createRoom,
    updateRoom,
    deleteRoom,
    getRoom
}