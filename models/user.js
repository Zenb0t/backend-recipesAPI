const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    uuid: {
        type: String,
        required: true,
        trim: true,
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        index: true,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        trim: true,
        required: true,
        select: false,
    }
});

const User = mongoose.model("User", UserSchema);
module.exports = User;