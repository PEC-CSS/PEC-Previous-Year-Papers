const mongoose = require('mongoose');
const { Department } = require('../models/department');
const { Course } = require('../models/course');
const courseInfo = require('./courseInfo');

mongoose.connect('mongodb://localhost/pec-previous-year-papers', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {console.log('Connected to Database'); run();})
    .catch(err => console.log(err));

const run = async() => {
    for(var i in courseInfo.info) {
        console.log(i)
        let cc = courseInfo.info[i]['CourseCode'];
        let cn = courseInfo.info[i]['CourseName'];
        let d = courseInfo.info[i]['Department'];
        
        let dept = await Department.findOne({name: d});

        if(!dept) dept = await Department.findOne({name: "Others"})
        console.log(dept)
        let course = new Course({
            courseName: cn,
            courseCode: cc,
            uploadedBy: mongoose.Types.ObjectId('62403504cde0f5b260a295d9'),
            isVerified: true,
            department: dept._id,
        });

        // console.log(course)

        await course.save();
    }
}