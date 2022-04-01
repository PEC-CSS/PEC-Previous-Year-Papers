import React from 'react';
import classes from './Home.module.css';

import HomeNavbar from './HomeNavbar/HomeNavbar';


const home = props => (
  <div className={classes.Body}>
    <HomeNavbar />
  </div>
);

export default home;