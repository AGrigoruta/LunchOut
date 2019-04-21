const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    token: String,
    title: String,
    body: String,
    date: { type:Date, default: Date.now}
})

const notification = mongoose.model('notification',notificationSchema);

module.exports = notification;