import React from 'react';
import { Component } from 'react';
import '../assets/stylesheets/Header.css';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { HelpOutline} from '@material-ui/icons';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import GDLogo from "../assets/images/GD.svg";


const Header = () => {
        return(
            <div>
                <div className='header'>
                    <div className='header__logo'>
                        <img src={GDLogo} alt='' />
                        <span>Drive</span>
                    </div>
                    <div className='header__searchContainer'>
                        
                        <div className='header__searchBar'>
                            <SearchIcon />
                            <input type='text' placeholder='Search in drive' />
                            <ExpandMoreIcon />
                        </div>
                    </div>
                    <div className='header__icons'>
                        <span>
                            <HelpOutline />
                            <SettingsOutlinedIcon />
                        </span>
                        <AppsOutlinedIcon />
                        User
                    </div>
                </div>
            </div>
        )
}

export default Header;
