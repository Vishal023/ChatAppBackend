const mongoose = require("mongoose");
const router = require("express").Router();
const {Messages} = require("../../models/Messages");


router.route("/messages/:conversationId")
    .get((req, res) => {})
    .post((req, res) => {})


module.exports = router;