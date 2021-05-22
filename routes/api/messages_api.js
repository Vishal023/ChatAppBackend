const mongoose = require("mongoose");
const passport = require("passport");
const router = require("express").Router();
const {Message} = require("../../models/Messages");
const {pusher} = require("../../pusher/conn");


router.route("/messages/:conversationId")
    .get((req, res) => {
        Message.find({conversationId: req.params.conversationId}, (err, messages) => {
            if (!err) {
                res.send(messages);
            } else {
                res.send(err);
            }
        })
    })
    .post((req, res) => {
        if (req.isAuthenticated()){
            const newMessage = req.body;
            Message.update({conversationId: req.params.conversationId}, {$push: {messages: newMessage}}, {upsert: true}, (err, doc) => {
                if (!err) {
                    pusher.trigger('post-events_' + req.params.conversationId,'postAction',{newMessage},req.body.socketId);
                    res.status(200).json({status: true});
                } else {
                    res.status(400).json({status: false});
                }
            })
        }else {
            console.log(req.isAuthenticated())
        }
    })


module.exports = router;