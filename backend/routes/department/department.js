const express = require('express');
const Joi = require('joi');
const router = express.Router();

const { Department } = require('../../models/department');
const Constants = require('../../utils/constants');
const auth = require("../../middleware/auth");
const admin = require("../../middleware/admin");

const schema = Joi.object({
    name: Joi.string().min(Constants.DEPT_MIN_LENGTH).max(Constants.DEPT_MAX_LENGTH).required(),
});

validateDeptInput = (data) => schema.validate(data);

router.get('/', async(req, res) => {
    try {
        res.send(await Department.find({}));
    }
    catch(ex) {
        res.send(ex.message);
    }
});

router.get('/:id', async(req, res) => {
    try {
        res.send(await Department.findOne({_id: req.params.id}));
    }
    catch(ex) {
        res.send(ex.message);
    }
});

router.post('/', auth, admin, async(req, res) => {
    const { error } = validateDeptInput(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    try {
        let dept = await Department.findOne({
            name: req.body.name,
        });

        if(dept) return res.status(400).send("Department already exists!");

        dept = new Department({name: req.body.name});
        await dept.save();

        res.send(dept);
    }
    catch(ex) {
        res.send(ex.message);
    }
});

router.delete('/:id', auth, admin, async(req, res) => {

    try {
        let dept = await Department.findOne({
            _id: req.params.id,
        });

        if(!dept) return res.status(400).send("Department doesn't exist!");

        await Department.deleteOne({ _id: req.params.id });

        res.send(dept);
    }
    catch(ex) {
        res.send(ex.message);
    }
});

router.put('/:id', auth, admin, async(req, res) => {
    const { error } = validateDeptInput(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    try {
        let dept = await Department.findOne({
            _id: req.params.id,
        });

        if(!dept) return res.status(400).send("Department doesn't exist!");

        await Department.findOneAndUpdate({ _id: req.params.id }, {name: req.body.name});

        res.send(dept);
    }
    catch(ex) {
        res.send(ex.message);
    }
});

module.exports = router;