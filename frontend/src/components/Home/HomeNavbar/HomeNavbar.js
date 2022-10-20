import React from 'react';
import classes from './HomeNavbar.module.css';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Login from '../../Login/Login.js';
import { Link } from "react-router-dom";

const HomeNavbar = () => {
    return (
        <div>
            <div className={classes['header']}>
                <div className={classes['header__logo']}>
                    <Link to={"/"}>
                        <span>PEC PAPERS</span>
                    </Link>
                </div>
                <div className={classes['header__searchContainer']}>
                    <div className={classes['header__searchBar']}>
                        <SearchIcon />
                        <input type='text' placeholder='Search in papers' />
                        <ExpandMoreIcon />
                    </div>
                </div>
                <div className={classes['header__icons']}>
                    <Login />
                </div>
            </div >
        </div >
    )
}

export default HomeNavbar;