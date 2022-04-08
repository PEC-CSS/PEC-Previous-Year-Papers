const mongoose = require('mongoose');

const Constants = require('../utils/constants');

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: Constants.NAME_MIN_LENGTH,
      maxlength: Constants.NAME_MAX_LENGTH,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      minlength: Constants.EMAIL_MIN_LENGTH,
      maxlength: Constants.EMAIL_MAX_LENGTH,
      unique: true,
    }
});

const User = mongoose.model('User', userSchema);

module.exports.User = User;
module.exports.userSchema = userSchema;