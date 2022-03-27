import React from 'react';
import FolderIcon from '@mui/icons-material/Folder';
import '../assets/stylesheets/FolderItems.css';

export default function FolderItems({ folderName }) {
    return (
        <div className='folderItems'>
            <div className='folderItem'>
                <FolderIcon />
                <div className='folderName'>
                    {folderName}
                </div>
            </div>
        </div>
    )
}
