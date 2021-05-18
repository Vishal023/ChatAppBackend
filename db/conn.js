const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/chatWebApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(r => {
    console.log("Connected Successfully to the DB");
}).catch(err => {
    console.err("Error connecting to DB");
});