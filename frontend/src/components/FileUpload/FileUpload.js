import React, { useState } from "react";
import { Dropdown, Option } from "./DropDown/DropDown";
import classes from './FileUpload.module.css';
import { Button } from '@mui/material';

export default function FileUpload() {
  const [newfile, setNewFile] = useState(false);
  const [optionValue, setOptionValue] = useState("");
  const handleSelect = (e) => {
    console.log(e.target.value);
    setOptionValue(e.target.value);
  };

  const toggleNewFile = () => {
    setNewFile(!newfile);
  };
  return (
    <div>
      <div className={classes["newFile"]}>
        {/* <div className="newFile__container" onClick={toggleNewFile}>
          <AddIcon/>  
          <p>
            New
          </p>
        </div> */}
        <Button onClick={toggleNewFile} className={classes['signedinButton']} variant="contained">
          Upload File
        </Button>
        {newfile && (
          <>
            <div className={classes["popup"]}>
              <span>
                Department
              </span>
              <Dropdown
                buttonText="Send form"
                onChange={handleSelect}
                action="/"
              >
                <Option selected value="Click to see options" />
                <Option value="Option 1" />
                <Option value="Option 2" />
                <Option value="Option 3" />
              </Dropdown>
            </div>
            <div onClick={toggleNewFile} className={classes['overlay']}></div>
          </>
        )}
      </div>
    </div>

  );
}

