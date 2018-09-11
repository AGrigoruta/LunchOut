const mongoose = require('mongoose')
    ,Schema = mongoose.Schema
    ,userSchema = new Schema({
            username: String,
            authId: String,
            email: String,
            thumbnail: String,
            loggedWith: String,
            token:String,
    })
    ,User = mongoose.model('user', userSchema);

module.exports = User;