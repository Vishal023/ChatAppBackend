const mongoose = require("mongoose");
const router = require("express").Router();
const passport = require("passport");
const {User} = require('../../models/Users');


router.get('/user/isLogged', (req, res) => {
    if (req.user) res.json({user: req.user});
    else res.sendStatus(400);
});

router.get("/user/find/:name", (req, res) => {
    const query = req.params.name;
    const regex = new RegExp(["^", query].join(""), "i");
    User.find({username: regex}, (err, users) => {
        if (!err) res.json({users: users});
        else res.sendStatus(400);
    })
});

router.post("/user/sendRequest", (req, res) => {
    if (req.isAuthenticated()) {
        const {id} = req.body;
        if (req.isAuthenticated()) {
            User.findById({_id: id}, (err, user) => {
                const {_id} = req.user;
                if (!err) {
                    user.newRequest(_id, (status) => {
                        if (status === "failure") {
                            res.status(400).json({
                                status: "User already exists"
                            });
                        } else {
                            res.status(200).json({
                                status: "Request Sent"
                            });
                        }
                    });
                } else {
                    res.sendStatus(400);
                }
            })
        }
    }
});

router.post("/user/fetchRequests", (req, res) => {
    if (req.isAuthenticated()) {
        const {requests} = req.body;
        User.find({_id: {$in: requests}}, (err, docs) => {
            if (!err) res.json({users: docs});
            else res.status(400);
        })
    }
})

router.post("/user/respondRequest", (req, res) => {
    if (req.isAuthenticated()) {
        const {id, type} = req.body;
        if (type === 1) {
            User.findById({_id: id}, (err, user) => {
                let isAnyError = true;
                if (!err) {
                    user.addFriend(req.user._id, (status) => {
                        if (status === "failure") {
                            res.status(400).json({
                                status: "Already Friends"
                            });
                        }
                    });
                } else {
                    res.sendStatus(400);
                }
            });
            User.findById({_id: req.user._id}, (err, user) => {
                if (!err) {
                    user.addFriend(id, (status) => {
                        if (status === "failure") {
                            res.status(400).json({
                                status: "Already Friends"
                            });
                        }
                    });
                } else res.sendStatus(400);
            });
        } else {
            User.findById({_id: req.user._id}, (err, user) => {
                if (!err) user.removeRequest(id);
                else res.sendStatus(400);
            })
        }
    }
})

router.post("/user/fetch/friends", (req, res) => {
    if (req.isAuthenticated()) {
        const {friends} = req.body;
        User.find({_id: {$in: friends}}, (err, users) => {
            if (!err) res.json({users: users});
            else res.sendStatus(400);
        })
    }
})

router.get("/user/logout", (req, res) => {
    req.logout();
    res.status(200).json({
        auth: false
    });
})

module.exports = router;

