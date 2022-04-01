import React from 'react';
import '../assets/stylesheets/Header.css';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { HelpOutline } from '@material-ui/icons';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Login from './Login.js';


const Header = () => {
    return (
        <div>
            <div className='header'>
                <div className='header__logo'>
                    <span>PEC PAPERS</span>
                </div>
                <div className='header__searchContainer'>

                    <div className='header__searchBar'>
                        <SearchIcon />
                        <input type='text' placeholder='Search in papers' />
                        <ExpandMoreIcon />
                    </div>
                </div>
                <div className='header__icons'>
                    <span>
                        <HelpOutline />
                        <SettingsOutlinedIcon />
                    </span>
                    <Login />
                </div>
            </div>
        </div>
    )
}

export default Header;
