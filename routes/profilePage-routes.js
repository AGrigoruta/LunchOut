var express = require('express');
var router = express.Router();
var event = require('../models/event-model.js');
var user = require('../models/user-model.js');

router.route('/:id')
    .get(function(req,res){
    event.find({creatorID: req.params.id},function(err,events){
        if(err) {
            return res.send(err);
        }
        res.json(events);
    });
    // res.send("Merge!");
    });

router.route('/user/:id')
    .get(function(req,res){
    user.find({authId: req.params.id},function(err,users){
        if(err) {
            return res.send(err);
        }
        res.json(users);
    });
    });
module.exports = router;