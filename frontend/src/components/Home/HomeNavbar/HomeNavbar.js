import React, { useEffect, useState } from 'react';
import classes from './HomeNavbar.module.css';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import Login from '../../Login/Login.js';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Autocomplete from '../HomeNavbar/Autocomplete';

const HomeNavbar = () => {
    const navigate = useNavigate()

    const [list, setList] = useState({});

    useEffect(() => {
        async function fetchCoursesQuery() {
            try {
                const res = await axios.get(`https://papers-pec-backend.herokuapp.com/api/course/search/courseName`);
                setList(res.data)
            }
            catch (ex) {
                console.log(ex);
            }

        }
        fetchCoursesQuery()
    }, [])

    const handleOptionSelect = (prop) => {
        document.querySelector("input").value = prop
        navigate("/Courses/Papers", { state: { course: { _id: list[prop] } } })
    }

    return (
        <div>
            <div className={classes['header']}>
                <Link to={"/"} className={classes['header__logo']}>
                    <span>PEC PAPERS</span>
                </Link>
                <div className={classes['header__searchContainer']}>
                    <div className={classes['header__searchBar']}>
                        <SearchIcon />

                        <Autocomplete
                            placeholder="Search in Papers"
                            suggestions={Object.keys(list).reduce((acc, key) => {
                                acc.push(key);
                                return acc;
                            }, [])}
                            onSelect={handleOptionSelect} />
                        <FilterListIcon />
                    </div>
                </div>
                <div className={classes['header__icons']}>
                    <Login />
                </div>
            </div>
        </div >
    )
}

export default HomeNavbar;