const Joi = require('joi')

const { db } = require('../config/firebase-config')
const Course = require('../models/course')
const Constants = require('../utils/constants')

const schema = Joi.object({
    courseName: Joi.string().min(Constants.COURSE_MIN_LENGTH).max(Constants.COURSE_MAX_LENGTH).required(),
    courseCode: Joi.string().length(Constants.COURSECODE_LENGTH).required(),
    department: Joi.string().min(Constants.DEPT_MIN_LENGTH).max(Constants.DEPT_MAX_LENGTH).required(),
})

validateCourseInput = (data) => schema.validate(data)

const addCourse = async (req, res, next) => {

    const { error } = validateCourseInput(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    try {
        const admin =  await db.collection('admins')
                                .where("name", "==", req.user.name)
                                .where("email", "==", req.user.email)
                                .get()

        const data = req.body
        data.uploadedBy = req.user.email
        data.isVerified = false

        if(!admin.empty) {
            data.isVerified = true
        }

        var doc = db.collection('courses').doc()
        await doc.set(data)
        return res.send(doc.id)

        // var courseRef = db.collection("courses").doc(data.courseCode)

        // const course = await courseRef.get()

        // if (course.exists) {
        //     return res.send(course.data())
        // }

        // const courseRef = db.collection('courses').doc().where("courseName", "==", data.courseName)
        // const course = await courseRef.get()

        // if (course.exists) {
        //     return res.send(course.data())
        // }

        // if(!courseData.empty) {
        //     courseData.forEach(d => {
        //         console.log(d.data())
        //     })
        // }
    }
    catch (error) {
        res.status(400).send(error.message)
    }
}

const getAllCourses = async (req, res, next) => {
    try {
        const courses = db.collection('courses')
        const data = await courses.get()

        const coursesArray = []
        
        if(data.empty) {
            res.status(404).send('No course record found')
        }
        else {
            data.forEach(doc => {
                const course = new Course(
                    doc.id,
                    doc.data().courseName,
                    doc.data().courseCode,
                    doc.data().department,
                    doc.data().uploadDate,
                    doc.data().uploadedBy,
                    doc.data().isVerified,
                )
                coursesArray.push(course)
            })
            res.send(coursesArray)
        }
    }
    catch (error) {
        res.status(400).send(error.message)
    }
}

const getCourse = async (req, res, next) => {
    try {
        const id = req.params.id
        const course = db.collection('courses').doc(id)
        const data = await course.get()

        if(!data.exists) {
            res.status(404).send('Course with the given ID not found')
        }
        else {
            res.send(data.data())
        }
    }
    catch (error) {
        res.status(400).send(error.message)
    }
}

const updateCourse = async (req, res, next) => {
    try {
        const id = req.params.id

        const course = await db.collection('courses').doc(id)
        const courseData = await course.get()

        if(!courseData.exists) {
            res.status(404).send('Course with the given ID not found')
        }

        const admin =  await db.collection('admins')
                                .where("name", "==", req.user.name)
                                .where("email", "==", req.user.email)
                                .get()
        
        const isAdmin = !admin.empty

        if(!isAdmin && (req.user.email !== courseData.data().uploadedBy || courseData.data().isVerified !== false)) 
            return res.status(403).send('Access Denied');

        if(req.body.courseName) {
            if(req.body.courseName.trim().length > Constants.COURSE_MAX_LENGTH)
                return res.status(404).send("Course Name should be less than 256 characters");
 
            if(req.body.courseName.trim().length < Constants.COURSE_MIN_LENGTH)
                return res.status(404).send("Course Name should be atleast 10 characters");
        }

        if(req.body.courseCode) {
            if(req.body.courseCode.trim().length != Constants.COURSECODE_LENGTH)
                return res.status(404).send("Course Code should be of length 6: 3 Uppercase characters followed by 3 digits");
        }

        if(req.body.isVerified && !isAdmin) {
            return res.status(404).send("You are not authorised")
        }

        if(req.body.department) {
            let dept =  await db.collection('departments')
                                .where("name", "==", req.body.department)
                                .get()

            if(!dept) return res.status(404).send("No such dept. exists!")
        }

        await course.update(req.body)
        res.send('Course record updated successfuly')  

    } catch (error) {
        res.status(400).send(error.message)
    }
}

const deleteCourse = async (req, res, next) => {
    try {
        const id = req.params.id

        const course = db.collection('courses').doc(id)
        const courseData = await course.get()

        if(!courseData.exists) {
            res.status(404).send('Course with the given ID not found')
        }

        const admin =  await db.collection('admins')
                                .where("name", "==", req.user.name)
                                .where("email", "==", req.user.email)
                                .get()

        const isAdmin = !admin.empty

        if(!isAdmin && (req.user.email !== courseData.data().uploadedBy || courseData.data().isVerified !== false)) 
            return res.status(403).send('Access Denied');

        await course.delete()
        res.send('Record deleted successfuly')
    } catch (error) {
        res.status(400).send(error.message)
    }
}

module.exports = {
    addCourse,
    getAllCourses,
    getCourse,
    updateCourse,
    deleteCourse
}