const Joi = require('joi')

const { db } = require('../config/firebase-config')
const Department = require('../models/department')
const Constants = require('../utils/constants')

const schema = Joi.object({
    name: Joi.string().min(Constants.DEPT_MIN_LENGTH).max(Constants.DEPT_MAX_LENGTH).required(),
})

validateDeptInput = (data) => schema.validate(data)

const addDepartment = async (req, res, next) => {

    const { error } = validateDeptInput(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    try {
        const admin =  await db.collection('admins')
                                .where("name", "==", req.user.name)
                                .where("email", "==", req.user.email)
                                .get()

        if(admin.empty) {
            return res.status(401).send('Unauthorised Access')
        }

        const data = req.body

        var doc = db.collection('departments').doc()
        await doc.set(data)
        return res.send(doc.id)
    }
    catch (error) {
        res.status(400).send(error.message)
    }
}

const getAllDepartments = async (req, res, next) => {
    try {
        const departments = db.collection('departments')
        const data = await departments.get()

        const departmentsArray = []
        
        if(data.empty) {
            res.status(404).send('No course record found')
        }
        else {
            data.forEach(doc => {
                const department = new Department(
                    doc.id,
                    doc.data().name,
                )
                departmentsArray.push(department)
            })
            res.send(departmentsArray)
        }
    }
    catch (error) {
        res.status(400).send(error.message)
    }
}

const getDepartment = async (req, res, next) => {
    try {
        const id = req.params.id
        const department = db.collection('departments').doc(id)
        const data = await department.get()

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

const updateDepartment = async (req, res, next) => {
    const { error } = validateDeptInput(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    try {
        const id = req.params.id

        const department = await db.collection('departments').doc(id)
        const deptData = await department.get()

        if(!deptData.exists) {
            res.status(404).send('Course with the given ID not found')
        }

        const admin =  await db.collection('admins')
                                .where("name", "==", req.user.name)
                                .where("email", "==", req.user.email)
                                .get()
        
        if(admin.empty) {
            return res.status(401).send('Unauthorised Access')
        }

        await department.update(req.body)
        res.send('Department record updated successfuly')  

    } catch (error) {
        res.status(400).send(error.message)
    }
}

const deleteDepartment = async (req, res, next) => {
    try {
        const id = req.params.id

        const department = db.collection('departments').doc(id)
        const deptData = await department.get()

        if(!deptData.exists) {
            res.status(404).send('Course with the given ID not found')
        }

        const admin =  await db.collection('admins')
                                .where("name", "==", req.user.name)
                                .where("email", "==", req.user.email)
                                .get()

        if(admin.empty) {
            return res.status(401).send('Unauthorised Access')
        }

        await department.delete()
        res.send('Record deleted successfuly')
    } catch (error) {
        res.status(400).send(error.message)
    }
}

module.exports = {
    addDepartment,
    getAllDepartments,
    getDepartment,
    updateDepartment,
    deleteDepartment,
}