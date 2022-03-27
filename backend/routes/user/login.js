const express = require('express');
const router = express.Router();
const Joi = require('joi');
const bcrypt = require('bcrypt');

const { User } = require('../../models/user');
const Constants = require('../../utils/constants');

const schema = Joi.object({
    identifier: Joi.string().min(Constants.IDENTIFIER_MIN_LENGTH).max(Constants.IDENTIFIER_MAX_LENGTH).required(),
    password: Joi.string().min(Constants.PASSWORD_MIN_LENGTH).max(Constants.PASSWORD_MAX_LENGTH).required(),
});

validateLoginInput = (loginData) => schema.validate(loginData);

router.post('/', async(req, res) => {
    const { error } = validateLoginInput(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    try {
        const user = await User.findOne({
            $or: [
                {
                    email: req.body.identifier,
                },
                {
                    username: req.body.identifier
                }
            ]
        });

        if(!user) return res.status(400).send('Invalid Email or Username');

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword) return res.status(400).send('Invalid Password');

        const token = user.generateAuthToken();
        return res.json({success: true, token: token});
    }
    catch(err) {
        res.send(err);
    }
});

module.exports = router;