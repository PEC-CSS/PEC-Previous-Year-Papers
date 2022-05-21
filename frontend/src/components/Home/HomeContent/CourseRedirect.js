import React from 'react';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import classes from './HomeContent.module.css';
import LinearProgress from '@mui/material/LinearProgress';
import { Box } from '@mui/material';

function CourseRedirect() {
    const location = useLocation();
    const [loader, setloader] = useState("100%");
    console.log(location)
    useEffect(() => {
        async function fetchPaper() {
            try {
                const res = await axios.get('https://pec-papers-backend.herokuapp.com/api/paper');
                console.log(res.data)
            }
            catch (ex) {
                console.log(ex);
            }
        }
    }, [])
    return (
        <div>
            <Box width={loader}>
                <LinearProgress />
            </Box>
            <div>
                404 page not found
            </div>
        </div>
    )
}

export default CourseRedirect