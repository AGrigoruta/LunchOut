var express = require('express');
var router = express.Router();
var event = require('../models/event-model.js');
var user = require('../models/user-model.js');
var notification = require('../models/notification-model.js');
var http = require('http');
var https = require('https');

var {google} = require('googleapis');
var PROJECT_ID = 'lunch-out';
var HOST = 'fcm.googleapis.com';
var PATH = '/v1/projects/' + PROJECT_ID + '/messages:send';
var MESSAGING_SCOPE = 'https://www.googleapis.com/auth/firebase.messaging';
var SCOPES = [MESSAGING_SCOPE];


router.route('/event')

    .get(function (req, res) {
        event.find(function (err, events) {
            if (err) {
                return res.send(err);
            }
            res.json(events);
        })
    })

    .post(function (req, res) {
        var events = new event(req.body);
        console.log(events);

        events.save(function (err, events) {

            if (err) {
                return res.send(err);
            }

            return res.send(events);
        });

    });

router.route('/event/:id')

    .get(function (req, res) {
        event.findOne({ _id: req.params.id }, function (err, events) {
            if (err) {
                return res.send(err);
            }
            res.json(events);
        });
    })

    .delete(function (req, res) {
        event.remove({ _id: req.params.id }, function (err, events) {
            if (err) {
                return res.send(err);
            }
            res.json("Succes in deleting object with id: " + req.params.id);
        })
    })

    .put(function (req, res) {
        var conditions = { _id: req.params.id };

        event.update(conditions, req.body)
            .then(doc => {
                if (!doc) { return res.status(404).end(); }
                return res.status(200).json(doc);
            })
            .catch(err => next(err));
    })

router.route('/user/:id')

    .get(function (req, res) {
        user.findOne({ authId: req.params.id }, function (err, users) {
            if (err) {
                return res.send(err);
            }
            res.json(users);
        });
    })

router.route('/notification')
    .post(function (req, res) {
        console.log("This is the body: ", req.body);
        sendNotif(req.body);
        saveNotification(req.body,res);
        res.status(200);
    });

function getAccessToken() {
    return new Promise(function (resolve, reject) {
        var key = require('./../lunch-out-firebase-adminsdk-nnu70-0a83cebffe');
        var jwtClient = new google.auth.JWT(
            key.client_email,
            null,
            key.private_key,
            SCOPES,
            null
        );
        jwtClient.authorize(function (err, tokens) {
            if (err) {
                reject(err);
                return;
            }
            resolve(tokens.access_token);
        });
    });
}
// [END retrieve_access_token]

/**
 * Send HTTP request to FCM with given message.
 *
 * @param {JSON} fcmMessage will make up the body of the request.
 */
function sendFcmMessage(fcmMessage) {
    getAccessToken().then(function (accessToken) {
        var options = {
            hostname: HOST,
            path: PATH,
            method: 'POST',
            // [START use_access_token]
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
            // [END use_access_token]
        };

        var request = https.request(options, function (resp) {
            resp.setEncoding('utf8');
            resp.on('data', function (data) {
                console.log('Message sent to Firebase for delivery, response:');
                console.log(data);
            });
        });

        request.on('error', function (err) {
            console.log('Unable to send message to Firebase');
            console.log(err);
        });

        request.write(JSON.stringify(fcmMessage));
        request.end();
    });
}

function sendNotif(payload) {
    sendFcmMessage(payload);

}
function saveNotification(payload,res) {
    var notifi = new notification;
    console.log(payload);
    notifi.token = payload.message.token;
    notifi.title = payload.message.notification.title;
    notifi.body = payload.message.notification.body;
    //notifi.date=payload.message.notification.date;
    console.log(notifi);

    console.log(notifi);
    notifi.save(function (err, notifi) {

        if (err) {
            return res.send(err);
        }

        return res.send(notifi);
    });    
}
module.exports = router;
