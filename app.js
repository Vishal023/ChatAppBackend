require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");const findOrCreate = require("mongoose-findorcreate");
const {User} = require('./models/Users');
const userRouter = require('./routes/api/user_api');
const messageRouter = require("./routes/api/messages_api");

const PORT = process.env.PORT || 8080;

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors({origin: "http://localhost:3000", methods: "GET,POST", credentials: true,}));
app.use(session({secret: process.env.CHAT_APP_SECRET, resave: false, saveUninitialized: false}));

app.use(passport.initialize());
app.use(passport.session());

require("./db/conn");

require("./config/passport");

app.get("/", (req, res) => {
    res.send("Hello");
});

app.get("/auth/google", passport.authenticate("google", {scope: ["profile", "email"]}));

app.get("/auth/google/chatApp", passport.authenticate("google",
    {
        successRedirect: 'http://localhost:3000/',
        failureRedirect: 'http://localhost:3000/login'
    })
);

app.use(userRouter);
app.use(messageRouter);

app.listen(PORT, () => {
    console.log("Started at " + PORT);
});