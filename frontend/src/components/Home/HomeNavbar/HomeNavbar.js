import React from 'react';
import { Link } from 'react-router-dom';
import classes from './HomeNavbar.module.css';

const homeNavbar = props => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-5">
    <div className="container">
      <Link to='/' className="navbar-brand">
        <img width="30" height="30" className="d-inline-block align-top rounded-circle" alt='B'/>OOKGENICS
      </Link>
      <button className={"navbar-toggler "+classes.Special} type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <div className="ml-auto">
          <Link to='/login'>
            <button className={"btn btn-primary mx-2 " +classes.Special}>Login</button>
          </Link>
          <Link to='/register'>
            <button className={"btn btn-success mx-2 " +classes.Special}>Register</button> 
          </Link>
        </div>
      </div>
    </div>
  </nav>
);

export default homeNavbar;