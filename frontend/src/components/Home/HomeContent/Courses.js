import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import classes from './HomeContent.module.css';
import FolderIcon from '@mui/icons-material/Folder';
import LinearProgress from '@mui/material/LinearProgress';
import { Box } from '@mui/material';


function Courses() {
    const [courses, setcourses] = useState([])
    const [loader, setloader] = useState("100%")
    const selectedDeptId = useLocation().state.id;
    const navigate = useNavigate();
    useEffect(() => {
        async function fetchCourses() {
            try {
                const res = await axios.get(`https://pec-papers-backend.herokuapp.com/api/course/department/${selectedDeptId}`);
                setcourses(res.data.sort((a, b) => {
                    if (a.courseName < b.courseName) {
                        return -1
                    } else if (a.courseName > b.courseName) {
                        return 1
                    } else {
                        return 0
                    }
                }));

            }
            catch (ex) {
                console.log(ex);
            }
            setloader("0%")

        }
        fetchCourses()
    }, [selectedDeptId])

    const handleClick = (course) => {
        navigate('/Courses/Papers', { state: { course } })
    }


    return (
        <div>
            <Box width={loader}>
                <LinearProgress />
            </Box>
            <div className={classes['Folders']}>
                {courses.map(course => {
                    return (

                        <div key={course.courseName} onClick={() => handleClick(course)} className={classes['Folder']}>
                            <FolderIcon className={classes["FolderIcon"]} />
                            {course.courseName}
                        </div>

                    )
                })}
            </div>


        </div >
    )
}

export default Courses;