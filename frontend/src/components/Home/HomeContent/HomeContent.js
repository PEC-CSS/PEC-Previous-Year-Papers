import axios from 'axios';
import React, { useEffect, useState } from 'react';
import classes from './HomeContent.module.css';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';

import FolderIcon from '@mui/icons-material/Folder';



export default function HomeContent() {
    const navigate = useNavigate();

    const [department, setDepartment] = useState([]);
    const [loader, setloader] = useState("100%");

    useEffect(() => {
        /*
        async function fetchPaper() {
            try {
                const res = await axios.get('https://pec-papers-backend.herokuapp.com/api/paper');
                setPapers(res.data);
            }
            catch (ex) {
                console.log(ex);
            }
        }
        */
        async function fetchDepartments() {
            try {
                const res = await axios.get('https://pec-papers-backend.herokuapp.com/api/department');
                setDepartment(res.data);
            }
            catch (ex) {
                console.log(ex);
            }
            setloader("0%")
        }
        fetchDepartments()
    }, [])



    const handleClick = (prop) => {
        navigate("/Courses", { state: { id: prop._id } })
    }


    return (
        <div>
            <Box width={loader}>
                <LinearProgress />
            </Box>

            <div className={classes['Folders']}>
                {department.map(temp => {
                    return (
                        <div key={temp.name} onClick={() => { handleClick(temp) }} className={classes['Folder']}>
                            <FolderIcon className={classes["FolderIcon"]} />
                            {temp.name}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

