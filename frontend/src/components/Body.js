import React from 'react';
import FolderItems from './FolderItems';
import '../assets/stylesheets/Body.css';

export default function Body() {
    return (
        <div style={{ width: "80%", marginRight: "auto" }} >
            <div className='folderHead'>
                Folders
            </div>
            <div className='folderItemsContainer'>
                <FolderItems folderName={'abcdef'} />
                <FolderItems folderName={'abcdef'} />
                <FolderItems folderName={'abcdef'} />
                <FolderItems folderName={'abcdef'} />
                <FolderItems folderName={'abcdef'} />
                <FolderItems folderName={'abcdef'} />
                <FolderItems folderName={'abcdef'} />
            </div>
        </div>
    )
}
