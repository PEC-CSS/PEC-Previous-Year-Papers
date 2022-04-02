const { db } = require('../config/firebase-config')
const courseInfo = require('./courseInfo');

const run = async() => {
    for(var i in courseInfo.info) {
        let cc = courseInfo.info[i]['CourseCode'];
        let cn = courseInfo.info[i]['CourseName'];
        let d = courseInfo.info[i]['Department'];
        
        let dept =  await db.collection('departments')
                                .where("name", "==", d)
                                .get()

        if(!dept) dept = await db.collection('departments')
                                .where("name", "==", "OTHERS")
                                .get()

        let department
        dept.forEach(d => {
            department = d.data().name
        })

        let course = {
            courseName: cn,
            courseCode: cc,
            isVerified: true,
            department: department,
            uploadedBy: 'shivamraina.be18cse@pec.edu.in'
        };

        var doc = db.collection('courses').doc()
        await doc.set(course)
    }
}

run()