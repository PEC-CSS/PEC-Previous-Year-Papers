import React from 'react';
import FolderIcon from '@mui/icons-material/Folder';
import classes from './FolderItem.module.css';

export default function FolderItem({ folderName }) {
    return (
        <div className={classes['folderItems']}>
            <div className={classes['folderItem']}>
                <FolderIcon />
                <div className={classes['folderName']}>
                    {folderName}
                </div>
            </div>
        </div>
    )
}