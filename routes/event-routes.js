var express = require('express');
var router = express.Router();
var event = require('../models/event-model.js');

router.route('/event')
      
.post(function(req,res){
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
            event.findOne({_id : req.params.id}, function (err,events){
                if(err){
                    return res.send(err);
                }
                res.json(events);
            });
        })

        .delete(function(req,res){
            event.remove({_id: req.params.id}, function(err,events){
                if(err){
                    return res.send(err);
                }
                res.json("Succes in deleting object with id: " + req.params.id );
            })
        })

        .put(function(req,res){
            var events = new event(req.body);

            event.update({_id:req.params.id},events, function(err, item){
                if(err){
                    return res.send(err);
                }
                res.json(item);
            })
        })
module.exports = router;
