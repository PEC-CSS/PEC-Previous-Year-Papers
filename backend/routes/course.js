const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')

const {
    addCourse,
    getAllCourses,
    getCourse,
    updateCourse,
    deleteCourse
} = require('../controllers/courseController')

router.post('/', auth, addCourse)
router.get('/', getAllCourses)
router.get('/:id', getCourse)
router.put('/:id', auth, updateCourse)
router.delete('/:id', auth, deleteCourse)


module.exports = router