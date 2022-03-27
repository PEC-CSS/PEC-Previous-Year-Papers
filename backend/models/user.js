const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const config = require('config');

const Constants = require('../utils/constants');

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: Constants.NAME_MIN_LENGTH,
      maxlength: Constants.NAME_MAX_LENGTH,
    },
    username: {
      type: String,
      required: true,
      trime: true,
      minlength: Constants.USERNAME_MIN_LENGTH,
      maxlength: Constants.USERNAME_MAX_LENGTH,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      minlength: Constants.EMAIL_MIN_LENGTH,
      maxlength: Constants.EMAIL_MAX_LENGTH,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: function(passwordInput) {
            return passwordInput.match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/);
        }
      },
      minlength: Constants.PASSWORD_MIN_LENGTH,
      maxlength: Constants.PASSWORD_MAX_LENGTH,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    registerDate: {
        type: Date,
        default: Date.now,
    },
});

userSchema.methods.generateAuthToken = function () {
    return jwt.sign({name: this.name, email: this.email, username: this.username}, config.get('jwtPrivateKey'));
};

const User = mongoose.model('User', userSchema);

module.exports.User = User;
module.exports.userSchema = userSchema;