import React, { useState } from "react";
import classes from './FileUpload.module.css';
import { Button } from '@mui/material';
import axios from "axios";

export default function FileUpload() {
  const [newfile, setNewFile] = useState(false);
  const toggleNewFile = () => {
    setNewFile(!newfile);
  };
  const [selectedFile, setselectedFile] = useState();
  const baseURL = "";

  const [Department, setDepartment] = useState('click to see options')
  const [Code, setCode] = useState('click to see options')
  const [Name, setName] = useState('click to see options')
  const [Type, setType] = useState('click to see options')
  const [Year, setYear] = useState('click to see options')
  const [Semester, setSemester] = useState('click to see options')
  const [IsDeptSelected, setIsDeptSelected] = useState(false)
  const handleDepartment = (event) => {
    setDepartment(event.target.value);
    if (event.target.value !== 'click to see options') {
      setIsDeptSelected(true)
    } else {
      setIsDeptSelected(false)
    }
  }
  const handleCode = (event) => {
    setCode(event.target.value);
  }
  const handleName = (event) => {
    setName(event.target.value);
  }
  const handleType = (event) => {
    setType(event.target.value);
  }
  const handleYear = (event) => {
    setYear(event.target.value);
  }
  const handleSemester = (event) => {
    setSemester(event.target.value);
  }
  const changeFileHandler = (event) => {
    setselectedFile(event.target.files[0])
  }
  const handleFileSubmission = () => {
    const formdata = new FormData();
    formdata.append('file', selectedFile)
    console.log(formdata)
    axios.post(
      baseURL, formdata
    ).then((response) => {
      console.log(response)
    })
  }
  const options = [
    "click to see options",
    "1212",
    "21212",
    "2121"
  ];
  const Dropdown = ({ label, value, options, onChange, active }) => {
    return (
      <div className={classes["popupOptionSelf"]}>
        {label}
        <select style={{ width: "200px", borderRadius: "10px" }} value={value} onChange={onChange}>

          {active && options.map((option) => {
            return (
              <option key={option} value={option}>{option}</option>
            )
          })}
        </select>
      </div>
    )
  };
  return (
    <div>
      <div className={classes["newFile"]}>
        <Button onClick={toggleNewFile} className={classes['signedinButton']} variant="contained">
          Upload File
        </Button>
        {newfile && (
          <>
            <div className={classes["popup"]}>
              <div className={classes["popupOptions"]}>
                <Dropdown
                  onChange={handleDepartment}
                  options={options}
                  value={Department}
                  label="Department"
                  active={true}
                />
                <Dropdown
                  onChange={handleCode}
                  options={options}
                  value={Code}
                  label="Code"
                  active={IsDeptSelected}
                />
                <Dropdown
                  onChange={handleName}
                  options={options}
                  value={Name}
                  label="Course Name"
                  active={IsDeptSelected}
                />
                <Dropdown
                  onChange={handleType}
                  options={options}
                  value={Type}
                  label="Type"
                  active={IsDeptSelected}
                />
                <Dropdown
                  onChange={handleYear}
                  options={options}
                  value={Year}
                  label="Year"
                  active={IsDeptSelected}
                />
                <Dropdown
                  onChange={handleSemester}
                  options={options}
                  value={Semester}
                  label="Semester"
                  active={IsDeptSelected}
                />

              </div>
              <div className={classes["uploadFile"]}>
                <input label="please upload the file here" type="file" name="file" onChange={changeFileHandler} />
                <div style={{ paddingTop: "25px" }}>

                  <button onClick={handleFileSubmission} >submit</button>
                </div>
              </div>
            </div>
            <div onClick={toggleNewFile} className={classes['overlay']}></div>
          </>
        )}
      </div>
    </div>

  );
}

