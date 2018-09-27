const mongoose = require('mongoose');
const eventSchema = new mongoose.Schema({
    //expire_at: {type: Date, default: Date.now, expires: 60},
    creatorID: String,
    location: String,
    startTime: String,
    status: String,
    participantsID: [String],
    name: String
})

const event = mongoose.model('event',eventSchema);

module.exports = event;