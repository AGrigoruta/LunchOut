const mongoose = require('mongoose')
    ,Schema = mongoose.Schema
    ,userSchema = new Schema({
        username: String,
        googleId: String,
        email: String,
        thumbnail: String
    })
    ,User = mongoose.model('user', userSchema);

module.exports = User;