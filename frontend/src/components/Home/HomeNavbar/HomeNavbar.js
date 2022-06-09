import React, { useEffect, useState } from 'react';
import classes from './HomeNavbar.module.css';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import Login from '../../Login/Login.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const HomeNavbar = () => {
    const navigate = useNavigate()
    const [showOptions, setshowOptions] = useState(false);
    const [list, setList] = useState({});
    const [options, setOptions] = useState([])
    useEffect(() => {
        async function fetchCoursesQuery() {
            try {
                const res = await axios.get(`https://pec-papers-backend.herokuapp.com/api/course/search/courseName`);
                setList(res.data)
            }
            catch (ex) {
                console.log(ex);
            }

        }
        fetchCoursesQuery()
        handleChange("")
    }, [])

    const handleChange = (prop) => {
        let arr = Object.keys(list)
        if (!prop.length) {
            setOptions(arr)
        } else {
            let temp = []
            arr.forEach((element) => {
                if (element.includes(prop.toUpperCase())) {
                    temp.push(element)
                }
            })
            setOptions(temp)
        }
    }
    const handleOptionSelect = (prop) => {
        document.querySelector("input").value = prop
        setshowOptions(false)
        navigate("/Courses/Papers", { state: { course: { _id: list[prop] } } })
    }



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
                            onChange={e => handleChange(e.target.value)}
                            placeholder="Search in Papers"
                            autoFocus="on"
                            autoComplete='on'
                        />

                        <FilterListIcon />
                    </div>
                    <div className={classes['header__searchOptionsContainer']}>
                        {showOptions &&
                            < ul className={classes['header__searchOptions']}>
                                {options.map((prop) => (
                                    <li key={prop} onClick={() => handleOptionSelect(prop)}>
                                        {prop}
                                    </li>
                                )
                                )}
                            </ul>
                        }
                    </div>
                </div>
                <div className={classes['header__icons']}>
                    <Login />
                </div>
            </div>
            {
                showOptions && (
                    <div onClick={() => setshowOptions(!showOptions)} className={classes['overlay']}>
                    </div>
                )
            }
        </div >
    )
}

export default HomeNavbar;