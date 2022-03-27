const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');
const mongoose = require('mongoose');
const cors = require('cors');

const login = require('./routes/user/login');
const register = require('./routes/user/register');
const course = require('./routes/course/course');
const department = require('./routes/department/department');

const app = express();

const db = config.get('mongoURI')

mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Connected to Database'))
    .catch(err => console.log(err));

if(!config.get('jwtPrivateKey')) {
    console.log('FATAL ERROR: jwtPrivateKey is not defined');
    process.exit(1);    
}

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/api/user/login', login);
app.use('/api/user/register', register);
app.use('/api/course', course);
app.use('/api/department', department);

app.listen(5000, () => console.log('Server started at port: 5000'));