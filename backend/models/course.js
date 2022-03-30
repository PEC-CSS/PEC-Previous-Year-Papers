const mongoose = require('mongoose');
const Constants = require('../utils/constants');

const courseSchema = new mongoose.Schema({
    courseName: {
        type: String,
        required: true,
        trim: true,
        minlength: Constants.COURSE_MIN_LENGTH,
        maxlength: Constants.COURSE_MAX_LENGTH,
    },
    courseCode: {
        type: String,
        require: true,
        unique: true,
        validate: {
            validator: function(code) {
                return code.match(/[A-Z]{2,3}\d{3,4}/);
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
