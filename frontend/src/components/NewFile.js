import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import '../assets/stylesheets/NewFile.css';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import UploadFileIcon from '@mui/icons-material/UploadFile';

export default function NewFile(){
  const [newfile, setNewFile] = useState(false);

  const toggleNewFile = () => {
    setNewFile(!newfile);
  };
  return (
    <div>
      <div className="newFile">
        <div className="newFile__container" onClick={toggleNewFile}>
          <AddIcon/>  
          <p>
            New
          </p>
        </div>
        {newfile &&(
          <>
          <div className="popup">
            
              <ul>
                <li><UploadFileIcon />File upload</li>
                <li><DriveFolderUploadIcon />Folder upload</li>
                <li><ExpandMoreIcon />More</li>
              </ul>
          </div>
          <div onClick={toggleNewFile} className='overlay'></div>
          </>
        )}
      </div>
    </div>

  );
}


