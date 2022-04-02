const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const course = require('./routes/course')
const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use('/api/course', course)

const port = process.env.PORT || 5000
app.listen(port, () => console.log('App is listening on port ' + port));
