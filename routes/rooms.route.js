const express = require('express');
const { getAllRooms, createRoom, updateRoom, deleteRoom, getRoom } = require('../controllers/rooms.controller');
const { authorization, verifyAdmin } = require('../middleware/authorization.middleware');
const router = express.Router();


router.get('/', getAllRooms);
router.post('/:hotelId', createRoom);
router.put('/:id', [authorization, verifyAdmin], updateRoom);
router.delete('/:id/:hotelId', [authorization, verifyAdmin], deleteRoom);
router.get('/:id', [authorization, verifyAdmin], getRoom);

module.exports = router;