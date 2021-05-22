const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    id_sender: String,
    id_receiver: String,
    body: String,
}, {timestamps: true});

const messageStore = new mongoose.Schema({
    conversationId: String,
    messages: [messageSchema]
});

const Message = new mongoose.model("Message", messageStore);

module.exports = {Message: Message};
