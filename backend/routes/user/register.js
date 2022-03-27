const express = require('express');
const router = express.Router();
let Joi = require('joi');
Joi = Joi.extend(require('joi-phone-number'));
const bcrypt = require('bcrypt');

const { User } = require('../../models/user');
const Constants = require('../../utils/constants');

const SALT_VALUE = 10;

const schema = Joi.object({
    name: Joi.string().min(Constants.NAME_MIN_LENGTH).max(Constants.NAME_MAX_LENGTH).required(),
    email: Joi.string().min(Constants.EMAIL_MIN_LENGTH).max(Constants.EMAIL_MAX_LENGTH).email().required(),
    username: Joi.string().min(Constants.USERNAME_MIN_LENGTH).max(Constants.USERNAME_MAX_LENGTH).required(),
    password: Joi.string().min(Constants.PASSWORD_MIN_LENGTH).max(Constants.PASSWORD_MAX_LENGTH).required(),
    confirmPassword: Joi.string().required().valid(Joi.ref('password')),
    phoneNumber: Joi.string().phoneNumber(),
});

validateRegisterInput = (registerData) => schema.validate(registerData);

router.post('/', async(req, res) => {
    const { error } = validateRegisterInput(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    try {
        let user = await User.findOne({email: req.body.email});
        if(user) return res.status(400).send('Email already exists');

        user = await User.findOne({username: req.body.username});
        if(user) return res.status(400).send('Username already exists');

        user = new User({
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            phoneNumber: req.body.phoneNumber,
        });

        const salt = await bcrypt.genSalt(SALT_VALUE);
        user.password = await bcrypt.hash(user.password, salt);

        await user.save();

        res.send({name: user.name, email:user.email});
    }
    catch(ex) {
        res.send(ex.message);
    }
});

module.exports = router;