const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');
const mongoose = require('mongoose');
const cors = require('cors');

const login = require('./routes/user/login');
const register = require('./routes/user/register');
const course = require('./routes/course/course');
const department = require('./routes/department/department');
const paper = require('./routes/paper/paper');

const app = express();

if(!config.get('jwtPrivateKey')) {
    console.log('FATAL ERROR: jwtPrivateKey is not defined');
    process.exit(1);    
}

if(!config.get('mongoURI')) {
    console.log('FATAL ERROR: mongoURI is not defined');
    process.exit(1);    
}

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const mongoURI = config.get('mongoURI');

mongoose.connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Connected to Database'))
    .catch(err => console.log(err));

app.use('/user/login', login);
app.use('/user/register', register);
app.use('/course', course);
app.use('/department', department);
app.use('/paper', paper);

app.listen(5000, () => console.log('Server started at port: 5000'));