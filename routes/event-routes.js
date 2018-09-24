var express = require('express');
var router = express.Router();
var event = require('../models/event-model.js');
var user = require('../models/user-model.js');
// var request = require('request');
var http = require('http')
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

            // let's send the notification
            // Build the post string from an object
            var post_data = querystring.stringify({
                "message": {
                    "token": "AAAAb65H_5Q:APA91bExIUrDvUirUuiXQx4lhXodNVvMVz9L35XcFNqCidr4ayXWWSxxlc94LsAxBYlXZNuuvZgUwWt9k9--OOQ25oWudRs_31yTRphUc7-ZjJ3fw0cyL1rJdUQQm9zPPqAjRwY0oAwy",
                    "notification": {
                        "body": "New event added!",
                        "title": "Let's go eat",
                    }
                }
            });

            // An object of options to indicate where to post to
            var post_options = {
                host: 'https://fcm.googleapis.com',
                path: '/v1/projects/lunh-out-b5ae1/messages:send',
                //path:'/overview?project=lunch-out'
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'AIzaSyB7-vmIJ5Sa-dvt3Tqr8F9wWEbBrOsmSr0'
                }
            };



            var post_data = querystring.stringify({
                "message": {
                    "token": "AAAAb65H_5Q:APA91bExIUrDvUirUuiXQx4lhXodNVvMVz9L35XcFNqCidr4ayXWWSxxlc94LsAxBYlXZNuuvZgUwWt9k9--OOQ25oWudRs_31yTRphUc7-ZjJ3fw0cyL1rJdUQQm9zPPqAjRwY0oAwy",
                    "notification": {
                        "body": "New event added!",
                        "title": "Let's go eat",
                    },
                    "webpush": {
                        "headers": {
                          "Urgency": "high"
                        },
                        "notification": {
                          "body": "This is a message from FCM to web",
                          "requireInteraction": "true",
                          "badge": "/badge-icon.png"
                        }
                }
            }});

            // An object of options to indicate where to post to
            var post_options = {
                host: 'https://fcm.googleapis.com',
                path: '/v1/projects/lunh-out-b5ae1/messages:send',
                //path:'/overview?project=lunch-out'
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'AIzaSyB7-vmIJ5Sa-dvt3Tqr8F9wWEbBrOsmSr0'
                }
            };

            // Set up the request
            var post_req = http.request(post_options, function (res) {
                console.log(res);
            });

            // post the data
            post_req.write(post_data);
            post_req.end();

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

module.exports = router;

