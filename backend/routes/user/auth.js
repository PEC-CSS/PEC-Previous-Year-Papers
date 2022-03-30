const express = require('express');
const router = express.Router();
let Joi = require('joi');
const bcrypt = require('bcrypt');
const config = require('config');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client('clientId'); // change it

const { User } = require('../../models/user');
const Constants = require('../../utils/constants');

const loginSchema = Joi.object({
    email: Joi.string().min(Constants.EMAIL_MIN_LENGTH).max(Constants.EMAIL_MAX_LENGTH).required(),
    password: Joi.string().min(Constants.PASSWORD_MIN_LENGTH).max(Constants.PASSWORD_MAX_LENGTH).required(),
});

validateLoginInput = (loginData) => loginSchema.validate(loginData);

const registerShema = Joi.object({
    name: Joi.string().min(Constants.NAME_MIN_LENGTH).max(Constants.NAME_MAX_LENGTH).required(),
    email: Joi.string().min(Constants.EMAIL_MIN_LENGTH).max(Constants.EMAIL_MAX_LENGTH).email().required(),
    password: Joi.string().min(Constants.PASSWORD_MIN_LENGTH).max(Constants.PASSWORD_MAX_LENGTH).required(),
    confirmPassword: Joi.string().required().valid(Joi.ref('password')),
});

validateRegisterInput = (registerData) => registerShema.validate(registerData);

router.post('/login', async(req, res) => {
    const { error } = validateLoginInput(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    try {
        const user = await User.findOne({email: req.body.identifier});

        if(!user) return res.status(400).send('Invalid Email');

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword) return res.status(400).send('Invalid Password');

        const token = user.generateAuthToken();
        return res.json({success: true, token: token});
    }
    catch(ex) {
        res.send(ex.message);
    }
});

router.post('/googlelogin', async(req, res) => {
    const { tokenId } = req.body;

    try {
        const res = await client.verifyIdToken({idToken: tokenId, audience: 'clientId'});
        const { email_verified, name, email } = res.payload;

        if(email_verified) {
            const user = await User.findOne({email: email});
            if(user) {
                const token = user.generateAuthToken();
                return res.json({success: true, token: token});
            }
            else {
                let password = email+config.get('jwtPrivateKey');

                user = new User({
                    name: name,
                    email: email,
                    password: password,
                });
        
                const salt = await bcrypt.genSalt(SALT_VALUE);
                user.password = await bcrypt.hash(user.password, salt);
        
                await user.save();
                
                const token = user.generateAuthToken();
                return res.json({success: true, token: token});
            }
        }
    }
    catch(ex) {
        res.send(ex.message);
    }
});

router.post('/register', async(req, res) => {
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
            password: req.body.password,
        });

        const salt = await bcrypt.genSalt(SALT_VALUE);
        user.password = await bcrypt.hash(user.password, salt);

        await user.save();

        const token = user.generateAuthToken();
        return res.json({success: true, token: token});
    }
    catch(ex) {
        res.send(ex.message);
    }
});

module.exports = router;