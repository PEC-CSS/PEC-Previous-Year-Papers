const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const course = require('./routes/course/course');
const department = require('./routes/department/department');
const paper = require('./routes/paper/paper');

const app = express();

const db = process.env.mongoURI;

mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Connected to Database'))
    .catch(err => console.log(err));

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('HELLO WORLD')
})

app.use('/api/course', course);
app.use('/api/department', department);
app.use('/api/paper', paper);

app.listen(5000, () => console.log('Server started at port: 5000'));