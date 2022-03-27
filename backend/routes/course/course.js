const express = require('express');
const router = express.Router();
const Joi = require('joi');

const auth = require("../../middleware/auth");
const admin = require("../../middleware/admin");
const Subject = require("../../models/course");
const Constants = require('../../utils/constants');

const schema = Joi.object({
    name: Joi.string().min(Constants.SUBJECT_MIN_LENGTH).max(Constants.SUBJECT_MAX_LENGTH).required(),
    subjectCode: Joi.string().length(Constants.SUBJECTCODE_LENGTH).required(),
});

validateSubjectInput = (loginData) => schema.validate(loginData);

router.get('/', async(req, res) => {
    res.send(await Subject.find());
});

router.post('/', auth, async(req, res) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
});

module.exports = router;