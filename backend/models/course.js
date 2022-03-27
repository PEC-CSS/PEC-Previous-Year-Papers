const mongoose = require('mongoose');
const Constants = require('../utils/constants');

const courseSchema = new mongoose.Schema({
    courseName: {
        type: String,
        required: true,
        trim: true,
        minlength: Constants.SUBJECT_MIN_LENGTH,
        maxlength: Constants.SUBJECT_MAX_LENGTH,
    },
    courseCode: {
        type: String,
        require: true,
        unique: true,
        length: Constants.SUBJECTCODE_LENGTH,
    },
    uploadDate: {
        type: Date,
        default: Date.now,
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
});

const Course = mongoose.model('Course', courseSchema);

module.exports.Course = Course;
module.exports.courseSchema = courseSchema;
