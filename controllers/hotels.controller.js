const { Hotel } = require('../models/hotels.model');
const { createError } = require('../lib/errors');
const Room = require('../models/rooms.model');

const getHotels = async (req, res, next) => {
    try {
        const minPrice = req.query.minPrice;
        const maxPrice = req.query.maxPrice;

        const filter = {
            featured: req.query.featured,
            price: { $gte: minPrice, $lte: maxPrice }
        };
        const limit = +req.query.limit;
        const hotels = await Hotel.find(filter).limit(limit);
        res.status(200)
        res.json(hotels)
    } catch (err) {
        next(err)
    }
}

const createHotel = async (req, res, next) => {
    const newHotel = new Hotel(req.body);

    try {
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel);
    } catch (error) {
        next(error);
    }
}

const updateHotel = async (req, res, next) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        if (!updatedHotel) {
            return res.status(404).send('The Hotel with given ID is not found!');
        }
        res.status(200).json(updatedHotel);
    } catch (error) {
        next(error);
    }
}

const deleteHotel = async (req, res, next) => {
    try {
        const deletedHotel = await Hotel.findByIdAndDelete(req.params.id);

        if (!deletedHotel) {
            return res.status(404).send('The hotel with given ID is not found!');
        }
        res.status(200).json('Hotel Has been deleted');
    } catch (error) {
        next(error);
    }
}

const getHotel = async (req, res, next) => {

    try {
        const getHotel = await Hotel.findById(req.params.id);
        if (!getHotel) {
            return res.status(404).send('The hotel with given ID is not found!');
        }
        res.status(200).send(getHotel);
    } catch (error) {
        next(error);
    }
}

const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(",");
    try {
        const list = await Promise.all(cities.map(city => {
            return Hotel.countDocuments({ city: city });
        }));
        res.status(200).json(list);
    } catch (error) {
        next(error);
    }
}

const countByType = async (req, res, next) => {
    try {
        const hotelCount = await Hotel.countDocuments({ type: 'hotel' });
        const apartmentCount = await Hotel.countDocuments({ type: 'apartment' });
        const resortCount = await Hotel.countDocuments({ type: 'resort' });
        const vilaCount = await Hotel.countDocuments({ type: 'villa' });
        const cabinCount = await Hotel.countDocuments({ type: 'cabin' });

        res.status(200).json([
            { type: 'hotels', count: hotelCount },
            { type: 'apartments', count: apartmentCount },
            { type: 'resorts', count: resortCount },
            { type: 'villas', count: vilaCount },
            { type: 'cabins', count: cabinCount },
        ]);
    } catch (error) {
        next(error)
    }
}

const getHotelRooms = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        const list = await Promise.all(hotel.rooms.map((room) => {
            return Room.findById(room);
        }));
        res.status(200).json(list);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getHotels,
    createHotel,
    updateHotel,
    deleteHotel,
    getHotel,
    countByCity,
    countByType,
    getHotelRooms
}
