const express = require('express');
const router = express.Router();
const Joi = require('joi');
const mongoose = require('mongoose');
const multer = require('multer');
const {GridFsStorage} = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const path = require('path')
const crypto = require('crypto');
const mongodb = require('mongodb');

const auth = require("../../middleware/auth");
const { Paper } = require("../../models/paper");
const { Course } = require("../../models/course");
const { Admin } = require("../../models/admin");
const { Department } = require("../../models/department");

const Constants = require('../../utils/constants');

const schema = Joi.object({
    department: Joi.string().min(Constants.DEPT_MIN_LENGTH).max(Constants.DEPT_MAX_LENGTH).required(),
    courseName: Joi.string().min(Constants.COURSE_MIN_LENGTH).max(Constants.COURSE_MAX_LENGTH).required(),
    courseCode: Joi.string().length(Constants.COURSECODE_LENGTH).required(),
    paperYear: Joi.number().integer().required(),
    paperSemester: Joi.number().integer().min(1).max(8).required(),
    paperType: Joi.string().valid("Mid-Sem", "End-Sem", "Assignment", "Other").required(),
    paperProgramme: Joi.string().valid("B.Tech", "M.Tech", "Ph.D").required(),
});

const validate = (data) => schema.validate(data);

const conn = mongoose.connection;

let gfs;

conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

// Create storage engine
const storage = new GridFsStorage({
    url: process.env.mongoURI,
    options: {useUnifiedTopology: true, useNewUrlParser: true},
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads'
          };
          resolve(fileInfo);
        });
      });
    }
});

upload = multer({ storage: storage, fileFilter: (req, file, cb) => {
    if (file.mimetype.split("/")[1] === "pdf") {
      cb(null, true);
    } 
    else {
      cb(new Error("Not a PDF File!!"), false);
    }
  }
});

router.post('/', auth, async(req, res) => {
    req.body.paperSemester = parseInt(req.body.paperSemester);
    req.body.paperYear = parseInt(req.body.paperYear);

    const { error } = validate(req.body);
    if(error) {
        console.log(error.details[0].message)
        return res.status(400).send(error.details[0].message);
    }

    try {
        let course = await Course.findOne({
            courseName: req.body.courseName,
            courseCode: req.body.courseCode,
        });

        if(!course) {
            // only executed when coursecode is typed manually
            // if that coursecode exists then tell user that it exists
            course = await Course.findOne({courseCode: req.body.courseCode});
            if(course) return res.send(`Course Exists with courseCode: ${course.courseCode} and name: ${course.courseName}`)
            
            const user = await Admin.findOne({name: req.user.name, email: req.user.email});
            const dept = await Department.findOne({name: req.body.department});

            course = new Course({
                courseName: req.body.courseName,
                courseCode: req.body.courseCode,
                department: dept._id,
                uploadedBy: req.user.email,
                isVerified: user ? true : false,
            })
            
            await course.save();
        }

        let paper = await Paper.findOne({
            course: course._id,
            paperYear: req.body.paperYear,
            paperSemester: req.body.paperSemester,
            paperType: req.body.paperType,
        });

        if(paper) {
            if(paper.paperType == "Mid-Sem" || paper.paperType == "End-Sem") {
                return res.status(400).send('Paper already exists!!');
            }
        }

        paper = new Paper({
            course: course._id,
            paperType: req.body.paperType,
            paperSemester: req.body.paperSemester,
            paperYear: req.body.paperYear,
            programme: req.body.paperProgramme,
            uploadedBy: req.user.email,
        });

        await paper.save();
        res.send(paper);
    }
    catch(ex) {
        res.status(400).send(ex.message);
    }
});

router.post('/upload', auth, upload.array('files'), async(req, res) => {
    try {
        await Paper.updateOne({_id: req.body.id}, {$set: {attachments: req.files.map(el => el.id)}});
        res.send(await Paper.findOne({_id: req.body.id}));
    }
    catch(ex) {
        res.status(400).send(ex.message);
    }
});

router.delete('/:id', auth, async(req, res) => {
    try{
        const paper = await Paper.findOne({_id: req.params.id});
        if(!paper) return res.status(400).send("No paper found");
        
        const attachments = paper.attachments;

        // TODO: should use transactions using FAWN
        await paper.deleteOne({_id: req.params.id});
        
        const bucket = new mongodb.GridFSBucket(conn.db, { bucketName: 'uploads' });
        
        // TODO: should use some better way than this
        for (var id in attachments) {
            await bucket.delete(attachments[id]);
        }

        res.send(paper);
    }
    catch(ex) {
        res.send(ex);
    }
});

router.get('/', async(req, res) => {
    try {
        res.send(await Paper.find({}).populate({path: 'course', populate: {path: 'department'}}).exec());
    }
    catch(ex) {
        res.send(ex);
    }
});

router.get('/course/:id', async(req, res) => {
    try {
        res.send(await Paper.find({course: req.params.id}).populate({path: 'course', populate: {path: 'department'}}).exec());
    }
    catch(ex) {
        res.send(ex);
    }
});

router.get('/:dept/:yr/:sem', async(req, res) => {
    try {
        res.send(await Paper.find({}).populate({path: 'course', populate: {path: 'department'}}).exec());
    }
    catch(ex) {
        res.send(ex);
    }
});

router.get('/file/download/:id', async(req, res) => {
    try {
        const bucket = new mongodb.GridFSBucket(conn.db, { bucketName: 'uploads' });
        const downstream = bucket.openDownloadStream(mongoose.Types.ObjectId(req.params.id))
        downstream.pipe(res);
    }
    catch(ex) {
        res.send(ex);
    }
});

module.exports = router;