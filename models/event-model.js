const mongoose = require('mongoose');
const eventSchema = new mongoose.Schema({
    //expire_at: {type: Date, default: Date.now, expires: 60},
    creatorID: String,
    schemaId: String,
    location: String,
    startTime: String,
    participantsNr: Number,
    date: String,
    status: String,
    participantsID: [String]
})

const event = mongoose.model('event',eventSchema);

module.exports = event;