const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
},
{
    timestamps: true
})

UserSchema.methods.generateAuthToken = function(){
    const session = { id: this._id, isAdmin: this.isAdmin }
    const token = jwt.sign(session, process.env.JWT_BOOKING_KEY);
    return token;
}

const User = mongoose.model('User', UserSchema);
module.exports = User;