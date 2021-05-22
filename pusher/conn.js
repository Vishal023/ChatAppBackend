const Pusher = require("pusher");

const pusher = new Pusher({
    appId: process.env.CHAT_APP_PUSHER_APP_ID,
    key: process.env.CHAT_APP_PUSHER_KEY,
    secret: process.env.CHAT_APP_PUSHER_SECRET,
    cluster: process.env.CHAT_APP_PUSHER_CLUSTER,
    useTLS: true,
});

module.exports = {pusher};

