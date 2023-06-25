const express = require('express');
const router = express.Router();
const { Hotel } = require('../models/hotels.model');
const { createError } = require('../lib/errors');
const { getUsers, createUser, updateUser, deleteUser, getUser } = require('../controllers/users.controller');


router.get('/', getUsers);

router.post('/', createUser);

router.put('/:id', updateUser);

router.delete('/:id', deleteUser);

router.get('/:id', getUser);



module.exports = router;