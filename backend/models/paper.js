const mongoose = require('mongoose');

const paperSchema = new mongoose.Schema({
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
    },
    paperType: {
        type: String,
        required: true,
        trim: true,
        enum: ["Mid-Sem", "End-Sem", "Assignment", "Other"],
    },
    paperSemester: {
        type: Number,
        required: true,
        min: 1,
        max: 8,
    }, 
    paperYear: {
        type: Number,
        default: Date.now,
        validate: {
            validator: function(v) {
                return v>=1953 && v<=new Date().getFullYear();
            }
        },
    },
    paperProgramme: {
        type: String,
        default: "B.Tech",
        trim: true,
        enum: ["B.Tech", "M.Tech", "Ph.D"],
    },
    uploadDate: {
        type: Date,
        default: Date.now,
    },
    uploadedBy: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
    },
    attachments: {
        type: [mongoose.Schema.Types.ObjectId]
    },
});

const Paper = mongoose.model('Paper', paperSchema, 'papers');

module.exports.Paper = Paper;
module.exports.paperSchema = paperSchema;