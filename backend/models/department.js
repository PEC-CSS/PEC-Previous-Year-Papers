const mongoose = require('mongoose');
const Constants = require('../utils/constants');

const departmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: Constants.DEPT_MIN_LENGTH,
        maxlength: Constants.DEPT_MAX_LENGTH,
    }
});

const Department = mongoose.model('Department', departmentSchema);

module.exports.Department = Department;
module.exports.departmentSchema = departmentSchema;