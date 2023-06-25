const mongoose = require('mongoose');

module.exports = {
    connect: () => {
        mongoose.connect(process.env.DB_CONNECTION)
        .then(() => console.log('Connected to Database'))
        .catch(() => console.log('Failed to connect to Database'))
    } 
}