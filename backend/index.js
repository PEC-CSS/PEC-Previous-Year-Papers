const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');
const mongoose = require('mongoose');
const cors = require('cors');

const auth = require('./routes/user/auth');
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

app.use('/api/user', auth);
app.use('/api/course', course);
app.use('/api/department', department);
app.use('/api/paper', paper);

app.listen(5000, () => console.log('Server started at port: 5000'));