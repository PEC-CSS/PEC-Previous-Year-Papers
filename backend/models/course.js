const mongoose = require('mongoose');
const Constants = require('../utils/constants');

const courseSchema = new mongoose.Schema({
    courseName: {
        type: String,
        required: true,
        trim: true,
        uppercase: true,
        minlength: Constants.COURSE_MIN_LENGTH,
        maxlength: Constants.COURSE_MAX_LENGTH,
    },
    courseCode: {
        type: String,
        require: true,
        trim: true,
        unique: true,
        uppercase: true,
        validate: {
            validator: function(code) {
                if (code.match(/[A-Z]{3}\d{3}/)) return true;
                else if (code.match(/[A-Z]{2}\d{4}/)) return true;
                return false;
            }
        }
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        required: true,
    },
    uploadDate: {
        type: Date,
        default: Date.now,
    },
    uploadedBy: {
        type: String,
        trim: true,
        lowercase: true,
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
