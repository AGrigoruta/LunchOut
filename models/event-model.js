const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    Date: { type:Date, default: Date.now},
    creatorID: String,
    location: String,
    startTime: String,
    status: String,
    participantsID: [String],
    name: String
})

const event = mongoose.model('event',eventSchema);

module.exports = event;