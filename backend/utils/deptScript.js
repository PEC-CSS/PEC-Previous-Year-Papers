const mongoose = require('mongoose');
const {Department} = require('../models/department')
const deptNames = require('./deptNames')

mongoose.connect('mongodb://localhost/pec-previous-year-papers', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Connected to Database'))
    .catch(err => console.log(err));

const run = async() => {
    for(key in deptNames) {
        console.log(key)
        const dept = new Department({name: deptNames[key]});
        await dept.save();
    }
}

run()