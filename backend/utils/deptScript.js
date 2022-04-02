const { db } = require('../config/firebase-config')
const deptNames = require('./deptNames')

const run = async() => {
    for(key in deptNames) {
        var doc = db.collection('departments').doc()
        await doc.set({"name":deptNames[key]})
    }
}

run()