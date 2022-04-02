const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')

const {
    addDepartment,
    getAllDepartments,
    getDepartment,
    updateDepartment,
    deleteDepartment
} = require('../controllers/departmentController')

router.post('/', auth, addDepartment)
router.get('/', getAllDepartments)
router.get('/:id', getDepartment)
router.put('/:id', auth, updateDepartment)
router.delete('/:id', auth, deleteDepartment)


module.exports = router