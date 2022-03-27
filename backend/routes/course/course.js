const express = require('express');
const router = express.Router();
const Joi = require('joi');

const auth = require("../../middleware/auth");
const { Course } = require("../../models/course");
const { Department } = require("../../models/department");
const Constants = require('../../utils/constants');

const schema = Joi.object({
    courseName: Joi.string().min(Constants.COURSE_MIN_LENGTH).max(Constants.COURSE_MAX_LENGTH).required(),
    courseCode: Joi.string().length(Constants.COURSECODE_LENGTH).required(),
    department: Joi.string().min(Constants.DEPT_MIN_LENGTH).max(Constants.DEPT_MAX_LENGTH).required(),
});

validateCourseInput = (data) => schema.validate(data);

router.get('/', async(req, res) => {
    res.send(await Course.find({}));
});

router.post('/', auth, async(req, res) => {
    const { error } = validateCourseInput(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    try {
        let course = await Course.findOne({
            $or: [
                {
                    courseName: req.body.courseName,
                },
                {
                    courseCode: req.body.courseCode,
                }
            ]
        });
    
        if(course) return res.status(400).send("Course already exists.");

        let dept = await Department.find({name: req.body.department});

        if(!dept) dept = await Department.find({name: "Others"})

        course = new Course({
            courseName: req.body.courseName,
            courseCode: req.body.courseCode,
            uploadedBy: req.user._id,
            isVerified: req.user.isAdmin,
            department: dept._id,
        });

        await course.save();
        // await course.populate('uploadedBy').execPopulate();

        res.send(course);
    }
    catch(ex) {
        res.send(ex.message);
    }
});

router.delete('/:id', auth, async(req, res) => {
    const id = req.params.id; 
    if (! id.match(/^[0-9a-fA-F]{24}$/)) return res.status(404).send("The id is invalid!");

    try{
        let course = await Course.findById(id); 
        if(!course) return res.status(404).send("The Course with the given id is not found!");

        const userid = req.user._id;
        if(!req.user.isAdmin && (userid.toString() !== course.uploadedBy.toString() || course.isVerified !== false)) 
            return res.status(403).send('Access Denied');

        await Course.deleteOne({_id: id });
        res.send(course);
    }
    catch(ex) {
        res.send(ex.message);
    }
});

router.put('/:id', auth, async(req, res) => {
    const id = req.params.id; 
    if (! id.match(/^[0-9a-fA-F]{24}$/)) return res.status(404).send("The id is invalid!");

    try{
        let course = await Course.findById(id); 
        if(!course) return res.status(404).send("The Course with the given id is not found!");

        const userid = req.user._id;
        if(!req.user.isAdmin && (userid.toString() !== course.uploadedBy.toString() || course.isVerified !== false)) 
            return res.status(403).send('Access Denied');

        if(req.body.courseName) {
            if(req.body.courseName.trim().length > Constants.COURSE_MAX_LENGTH)
                return res.status(404).send("Course Name should be less than 256 characters");
 
            if(req.body.courseName.trim().length < Constants.COURSE_MIN_LENGTH)
                return res.status(404).send("Course Name should be atleast 10 characters");

            course.set({ courseName: req.body.courseName, runValidators: true });
        }

        if(req.body.courseCode) {
            if(req.body.courseCode.trim().length != Constants.COURSECODE_LENGTH)
                return res.status(404).send("Course Code should be of length 6: 3 Uppercase characters followed by 3 digits");

            course.set({ courseCode: req.body.courseCode, runValidators: true });
        }

        if(req.body.verify && req.user.isAdmin) {
            course.set({ isVerified: req.body.verify });
        }

        if(req.body.department) {
            let dept = await Department.find({name: req.body.department});

            if(!dept) return res.status(404).send("No such dept. exists!")

            course.set({ department: dept._id })
        }

        await course.save();
        res.send(course);
    }
    catch(ex) {
        res.send(ex.message);
    }
});

module.exports = router;