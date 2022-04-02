class Course {
    constructor(id, courseCode, courseName, department, uploadDate, uploadedBy, isVerified) {
        this.id = id;
        this.courseCode = courseCode;
        this.courseName = courseName;
        this.department = department;
        this.uploadDate = uploadDate;
        this.uploadedBy = uploadedBy;
        this.isVerified = isVerified;
    }
}

module.exports = Course