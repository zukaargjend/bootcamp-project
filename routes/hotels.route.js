const express = require('express');
const router = express.Router();
const { Hotel } = require('../models/hotels.model');
const { createError } = require('../lib/errors');
const { createHotel, updateHotel, deleteHotel, getHotel, getHotels, countByCity, countByType } = require('../controllers/hotels.controller');
const { authorization, verifyAdmin} = require('../middleware/authorization.middleware');


router.post('/',  createHotel);

router.put('/:id',  updateHotel);

router.delete('/:id',  deleteHotel);

router.get('/find/:id', getHotel);

router.get('/', getHotels);
router.get('/countByCity', countByCity);
router.get('/countByType', countByType);

// router.get('/', authenticate, getHotels);

// router.post('/', [authenticate, authorization, verifyAdmin], createHotel);

// router.put('/:id', [authenticate, authorization, verifyAdmin], updateHotel);

// router.delete('/:id', [authenticate, authorization, verifyAdmin], deleteHotel);

// router.get('/:id', authenticate, getHotel);



module.exports = router;