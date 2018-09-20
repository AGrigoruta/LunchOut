var express = require('express');
var router = express.Router();
var event = require('../models/event-model.js');
var user = require('../models/user-model.js');

router.route('/event')

.get(function(req,res){
    console.log("Doin Get");
    event.find(function (err, events){
        console.log("Stuff ongoing");
        if(err){
            return res.send(err);
        }
        res.json(events);
    })
})
      
.post(function(req,res){
    console.log("Doin Post");
            var events = new event(req.body);
            console.log(events);
            
            events.save(function(err, events){
    
                if(err){
                    return res.send(err);
                }

            return res.send(events);
            });

        });

router.route('/event/:id')

        .get(function(req,res){
            console.log("Doin Get x2");
            event.findOne({_id : req.params.id}, function (err,events){
                if(err){
                    return res.send(err);
                }
                res.json(events);
            });
        })

        .delete(function(req,res){
            console.log("Doin Delete x2");
            event.remove({_id: req.params.id}, function(err,events){
                if(err){
                    return res.send(err);
                }
                res.json("Succes in deleting object with id: " + req.params.id );
            })
        })

        .put(function(req,res){
            console.log("Doin Put x2");
            var conditions = {_id : req.params.id};

            event.update(conditions, req.body)
            .then(doc => {
                if(!doc){return res.status(404).end();}
                return res.status(200).json(doc);
            })
            .catch(err => next(err));
        })

router.route('/user/:id')

        .get(function(req,res){
            console.log("Doin Get x3");
            user.findOne({authId : req.params.id}, function (err,users){
                if(err){
                    return res.send(err);
                }
                res.json(users);
            });
        })

module.exports = router;

