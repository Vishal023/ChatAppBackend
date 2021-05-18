const mongoose = require("mongoose");

const messageSchema = {
    id_sender: String,
    id_receiver: String,
    body: String,
    timestamps: true
};

const messageStore = new mongoose.Schema({
    conversationId: String,
    messages: [messageSchema]
});

const Messages = new mongoose.model("Message", messageStore);

module.exports = {Messages: Messages};
