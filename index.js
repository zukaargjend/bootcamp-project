const express = require('express');
require('dotenv').config();
const dbConnection = require('./lib/dbConfig');
const authRoute = require('./routes/auth.route');
const usersRoute = require('./routes/users.route');
const hotelsRoute = require('./routes/hotels.route');
const roomsRoute = require('./routes/rooms.route');
const bodyParser = require('body-parser');

const app = express();

dbConnection.connect();

app.use(express.json());


app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/hotels', hotelsRoute);
app.use('/api/rooms', roomsRoute);


app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || 'Something went wrong!';
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});




const port = process.env.PORT || 1717;
app.listen(port, () => {
    console.log(`listening on port ${port}...`);
})