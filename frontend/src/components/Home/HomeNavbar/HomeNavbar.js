import React from 'react';
import classes from './HomeNavbar.module.css';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Login from '../../Login/Login.js';
import { Button } from '@mui/material';
import {Link} from "react-router-dom";

const HomeNavbar = () => {
    return (
        <div>
            <div className={classes['header']}>
                <div className={classes['header__logo']}>
                    <span>PEC PAPERS</span>
                </div>
                <div className={classes['header__searchContainer']}>
                    <div className={classes['header__searchBar']}>
                        <SearchIcon />
                        <input type='text' placeholder='Search in papers' />
                        <ExpandMoreIcon />
                    </div>
                </div>
                <div className={classes['header__icons']}>
                <Link style={{textDecoration: 'none'}} to="/home"> <Button className='signinButton ' style={{ backgroundColor: "red", marginRight:"10px"}} variant="contained" >
                    Home
                </Button></Link>
                    <Login />
                </div>
            </div>
        </div>
    )
}

export default HomeNavbar;