const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const User = mongoose.model('User');

passport.use(new GoogleStrategy({
        clientID: process.env.CHAT_APP_GOOGLE_CLIENT_ID,
        clientSecret: process.env.CHAT_APP_GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:8080/auth/google/chatApp",
        userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
    },
    function (accessToken, refreshToken, profile, cb) {
        User.findOrCreate({username: profile.emails[0].value, googleId: profile.id}, {
            displayName: profile.displayName,
            name: profile.name,
            photos: profile.photos
        }, function (err, user) {
            return cb(err, user);
        });
    }
));