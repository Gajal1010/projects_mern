const mongoose = require('mongoose');

userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    salt: String,
    token: String,
    wishlistFR: Array,
    wishlistEN: Array,
    langue: Array

});

userModel = new mongoose.model('users', userSchema);

module.exports = userModel;