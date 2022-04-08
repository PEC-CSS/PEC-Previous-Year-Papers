import React, { useState, useEffect, useContext } from "react";
import classes from './FileUpload.module.css';
import { Button } from '@mui/material';
import axios from "axios";
import { UserContext } from '../../providers/UserProvider';
import Dropdown from "./Dropdown/Dropdown";

export default function FileUpload() {
  const {user, token} = useContext(UserContext);

  const paperTypes = ['Mid-Sem', 'End-Sem', 'Assignment', 'Other'];
  const paperSemesters = [1,2,3,4,5,6,7,8];
  const paperProgrammes = ["B.Tech", "M.Tech", "Ph.D"];

  const [showUploadForm, setShowUploadForm] = useState(false);

  const [depts, setDepts] = useState([]);
  const [department, setDepartment] = useState('');
  const [courses, setCourses] = useState([]);
  const [courseCode, setCourseCode] = useState('');
  const [courseCodeDesc, setCourseCodeDesc] = useState('');
  const [courseName, setCourseName] = useState('');
  const [paperType, setPaperType] = useState(paperTypes[0]);
  const [paperYear, setPaperYear] = useState(new Date().getFullYear());
  const [paperSemester, setPaperSemester] = useState(paperSemesters[0]);
  const [paperProgramme, setPaperProgramme] = useState(paperProgrammes[0]);

  useEffect(() => {
    async function getDepts() {
      const res = await axios.get('/api/department');
      setDepts(res.data);
      setDepartment(res.data[0].name)
    }

    getDepts();
  }, [])

  useEffect(() => {
    async function getDeptCourses(departmentId) {
      const res = await axios.get(`/api/course/department/${departmentId}`);
      res.data.push({_id: 'Enter Manually', courseName: 'Enter Manually', courseCode: 'Enter Manually'})
      setCourses(res.data);
      setCourseCode(res.data[0].courseCode);
      setCourseName(res.data[0].courseName);
    }

    if(department) {
      const dept = depts.find(el => el.name === department);
      getDeptCourses(dept._id);
    }
  }, [department])

  const [selectedFile, setselectedFile] = useState();
  
  const handleDepartment = (event) => {
    event.preventDefault();
    setDepartment(event.target.value);
  }

  const handleCourseCode = (event) => {
    event.preventDefault();
    setCourseCode(event.target.value);

    if(event.target.value === 'Enter Manually') {
      setCourseName('');
    }
    else {
      const c = courses.filter(e => e.courseCode === event.target.value);
      setCourseName(c[0].courseName);
    }
  }

  const handleCourseCodeDesc = (event) => {
    event.preventDefault();
    setCourseCodeDesc(event.target.value);
  }

  const handleCourseName = (event) => {
    event.preventDefault();
    setCourseName(event.target.value);
  }

  const handlePaperType = (event) => {
    event.preventDefault();
    setPaperType(event.target.value);
  }

  const handlePaperYear = (event) => {
    event.preventDefault();
    setPaperYear(event.target.value);
  }

  const handlePaperSemester = (event) => {
    event.preventDefault();
    setPaperSemester(event.target.value);
  }

  const handlePaperProgramme = (event) => {
    event.preventDefault();
    setPaperProgramme(event.target.value);
  }

  const changeFileHandler = (event) => {
    setselectedFile(event.target.files[0])
  }

  const handleFileSubmission = async () => {

    const body = {
      courseName: courseName,
      courseCode: courseCode === 'Enter Manually' ? courseCodeDesc : courseCode,
      paperYear: paperYear,
      paperSemester: paperSemester,
      paperType: paperType,
      paperProgramme: paperProgramme,
    }
    
    try {
      let res = await axios.post('/api/paper', body, {headers: {'x-auth-token': 'Bearer '+token}});
      const formdata = new FormData();
      formdata.append('files', selectedFile);
      formdata.append('id', res.data._id);
      res = await axios.post('/api/paper/upload', formdata, {headers: {'x-auth-token': 'Bearer '+token}});
      console.log(res);
    }
    catch(ex) {
      console.log(ex);
    }
  }
  
  return (
    <div>
      <div className={classes["newFile"]}>
        <Button onClick={() => setShowUploadForm(!showUploadForm)} className={classes['signedinButton']} variant="contained">
          Upload File
        </Button>
        {showUploadForm && (
          <>
            <div className={classes["popup"]}>
              <div className={classes["popupOptions"]}>
                <Dropdown
                  onChange={handleDepartment}
                  options={depts}
                  value={department}
                  label="Department"
                />
                <Dropdown
                  onChange={handleCourseCode}
                  onDescChange={handleCourseCodeDesc}
                  options={courses}
                  value={courseCode}
                  courseCodeDesc={courseCodeDesc}
                  courseCode={courseCode}
                  label="Course Code"
                />
                <Dropdown
                  onChange={handleCourseName}
                  options={courses}
                  value={courseName}
                  courseCode={courseCode}
                  label="Course Name"
                />
                <Dropdown
                  onChange={handlePaperType}
                  options={paperTypes}
                  value={paperType}
                  label="Paper Type"
                />
                <Dropdown
                  onChange={handlePaperYear}
                  options={null}
                  value={paperYear}
                  label="Paper Year"
                />
                <Dropdown
                  onChange={handlePaperSemester}
                  options={paperSemesters}
                  value={paperSemester}
                  label="Paper Semester"
                />
                <Dropdown
                  onChange={handlePaperProgramme}
                  options={paperProgrammes}
                  value={paperProgramme}
                  label="Paper Programme"
                />
                <div className={classes['fileUpload']}>
                  <div className={classes['fileLabel']}>
                    <label>Upload Paper <br /> (Please upload a single pdf file of only this paper)</label>
                  </div>
                  <div className={classes['fileUploader']}>
                    <input label="please upload the file here" type="file" name="file" onChange={changeFileHandler} />
                    <Button variant="contained" color="error" style={{marginTop: '40px'}} onClick={handleFileSubmission}>Upload</Button>
                  </div>
                </div>
              </div>
            </div>
            <div onClick={() => setShowUploadForm(!showUploadForm)} className={classes['overlay']}></div>
          </>
        )}
      </div>
    </div>

  );
}

