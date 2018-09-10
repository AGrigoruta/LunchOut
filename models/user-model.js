const mongoose = require('mongoose')
    ,Schema = mongoose.Schema
    ,userSchema = new Schema({
    
        google:{

            username: String,
            googleId: String,
            email: String,
            thumbnail: String
        },

        facebook:{
            id:String,
            token:String,
            name:String,
            email:String,
            photo:String
        }
    })
    ,User = mongoose.model('user', userSchema);

module.exports = User;