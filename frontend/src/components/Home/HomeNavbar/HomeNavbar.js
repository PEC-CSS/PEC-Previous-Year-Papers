import React, { useEffect, useState } from 'react';
import classes from './HomeNavbar.module.css';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Login from '../../Login/Login.js';
import useDebounce from './useDebounce';

const HomeNavbar = () => {
    const [queryVal, setqueryVal] = useState("");
    const [showOptions, setshowOptions] = useState(false);
    const [options, setoptions] = useState(["kuch nahi hai bhai idhar", "popo", "asa", "sas"]);
    const debounced = useDebounce(queryVal)
    useEffect(() => {
        /*
        api call to be made
        */
        console.log(debounced)
    }, [debounced])

    return (
        <div>
            <div className={classes['header']}>
                <div className={classes['header__logo']}>
                    <span>PEC PAPERS</span>
                </div>
                <div className={classes['header__searchContainer']}>
                    <div className={classes['header__searchBar']}>
                        <SearchIcon />
                        <input
                            type='text'
                            onClick={() => setshowOptions(!showOptions)}
                            onChange={e => setqueryVal(e.target.value)}
                            placeholder='Search in papers'
                        />

                        <ExpandMoreIcon />
                    </div>
                    <ul className={classes['searchOptions']}>
                        {showOptions && options.map((e) => {
                            return (
                                <li key={e}>
                                    {e}
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div className={classes['header__icons']}>
                    <Login />
                </div>
            </div>
            {showOptions && (
                <div onClick={() => setshowOptions(!showOptions)} className={classes['overlay']}>
                </div>
            )}
        </div>
    )
}

export default HomeNavbar;