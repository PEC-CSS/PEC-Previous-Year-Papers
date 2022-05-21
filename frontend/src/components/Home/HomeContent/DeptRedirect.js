import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import classes from './HomeContent.module.css';
import FolderIcon from '@mui/icons-material/Folder';
import LinearProgress from '@mui/material/LinearProgress';
import { Box } from '@mui/material';


function DeptRedirect() {
    const [courses, setcourses] = useState([])
    const [loader, setloader] = useState("100%")
    const selectedDept = useLocation().state.dept;
    const navigate = useNavigate();
    useEffect(() => {
        async function fetchCourses() {
            try {
                const res = await axios.get(`https://pec-papers-backend.herokuapp.com/api/course/department/${ids[`${selectedDept}`]}`);
                setcourses(res.data);
            }
            catch (ex) {
                console.log(ex);
            }
            setloader("0%")

        }
        fetchCourses()
    }, [])

    const ids = {
        "CIVIL ENGINEERING": '624479a6c873fe807014075e',
        "ELECTRICAL ENGINEERING": '624479a6c873fe8070140764',
        "COMPUTER SCIENCE & ENGINEERING": '624479a6c873fe8070140759',
        "AEROSPACE ENGINEERING": '624479a6c873fe807014075c',
        "PRODUCTION & INDUSTRIAL ENGINEERING": '624479a6c873fe8070140760',
        "ELECTRONICS & COMMUNICATION ENGINEERING": '624479a6c873fe8070140762',
        "MECHANICAL ENGINEERING": '624479a6c873fe8070140766',
        "APPLIED SCIENCES": '624479a6c873fe807014076a',
        "OTHERS": '624479a6c873fe807014076c',
        "METALLURGICAL AND MATERIALS ENGINEERING": '624479a6c873fe8070140768',

    }

    const handleClick = (course) => {
        navigate('/DeptRe/Course', { state: { course } })
    }


    return (
        <div>
            <Box width={loader}>
                <LinearProgress />
            </Box>
            <div className={classes['Folders']}>
                {courses.map(course => {
                    return (

                        <div onClick={() => handleClick(course.courseName)} className={classes['Folder']}>
                            <FolderIcon className={classes["FolderIcon"]} />
                            {course.courseName}
                        </div>

                    )
                })}
            </div>


        </div >
    )
}

export default DeptRedirect;