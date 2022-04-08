import axios from 'axios';
import React, { useEffect, useState } from 'react';
import FolderItem from '../../FolderItem/FolderItem.js';
import classes from './HomeContent.module.css';

export default function HomeContent() {

    const [papers, setPapers] = useState([]);

    useEffect(() => {
        async function fetchPaper() {
            try {
                const res = await axios.get('/api/paper');
                setPapers(res.data);
                console.log(res.data)
            }
            catch(ex) {
                console.log(ex);
            }
        }

        // fetchPaper()
    }, [])

    return (
        <div style={{ width: "80%", margin: "auto" }} >
            <div className={classes['folderHeading']}>
                Papers
            </div>
            <div className={classes['folderItemsContainer']}>
                <FolderItem folderName={'abcdef'} />
                <FolderItem folderName={'abcdef'} />
                <FolderItem folderName={'abcdef'} />
                <FolderItem folderName={'abcdef'} />
                <FolderItem folderName={'abcdef'} />
                <FolderItem folderName={'abcdef'} />
                <FolderItem folderName={'abcdef'} />
            </div>
        </div>
    )
}