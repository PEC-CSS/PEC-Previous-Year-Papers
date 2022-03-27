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
                return v>=1953 && v<new Date().getFullYear();
            }
        },
    },
    programme: {
        type: String,
        default: "B.Tech",
        trim: true,
        enum: ["B.Tech", "M.Tech", "Ph.D"],
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        required: true,
    },
    uploadDate: {
        type: Date,
        default: Date.now,
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    attachments: {
        type: [mongoose.Schema.Types.ObjectId],
        validate: {
            validator : function(v) {
                return v && v.length >0;
            }
        },
        required: true,
    },
});

const Paper = mongoose.model('Paper', paperSchema);

module.exports.Paper = Paper;
module.exports.paperSchema = paperSchema;