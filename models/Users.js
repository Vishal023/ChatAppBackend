const mongoose = require("mongoose");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");


const userSchema = new mongoose.Schema({
    googleId: String,
    displayName: String,
    name: JSON,
    photos: Array,
    username: String,
    requests: Array,
    friends: Array,
}, {timestamps: true});

userSchema.methods.hello = function () {
    console.log("hello")
}

userSchema.methods.newRequest = function (_id, cb) {
    const exist = this.requests.find((id) => {
        return id === _id.valueOf().toString()
    });
    if (!exist) {
        this.requests.push(_id.valueOf().toString());
        cb("success");
        return this.save();
    } else {
        cb("failure");
    }
};


userSchema.methods.removeRequest = function (_id, type = 1) {
    this.requests = this.requests.filter((id) => {
        return id !== _id.valueOf().toString();
    });
    if (type === 1) {
        this.save();
    }
};

userSchema.methods.addFriend = function (_id, cb) {
    this.removeRequest(_id, 0);
    const exist = this.friends.find((id) => {
        return id === _id.valueOf().toString()
    });
    if (!exist) {
        this.friends.push(_id.valueOf().toString());
        cb("success");
        return this.save();
    } else {
        cb("failure");
    }
};


userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

/*
* It should be Users at left
* */
const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

module.exports = {User: User}