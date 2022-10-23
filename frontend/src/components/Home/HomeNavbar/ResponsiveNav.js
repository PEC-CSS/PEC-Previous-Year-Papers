import React, { useState } from "react";
import "./ResoponsiveNav.css";
import { Link } from "react-router-dom";

const ResponsiveNav = () => {
  const [showMediaIcons, setShowMediaIcons] = useState(false);
  return (
    <>
      <nav className="main-nav">
        {/* 1st logo part  */}
        <div className="logo">
          <h2>
            <span>P</span>EC
            <span>P</span>APERS
          </h2>
        </div>

        {/* 2nd menu part  */}
        <div
          className={
            showMediaIcons ? "menu-link mobile-menu-link" : "menu-link"
          }>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">about</Link>
            </li>
            <li>
              <Link to="/service">services</Link>
            </li>
            <li>
              <Link to="/contact">contact</Link>
            </li>
          </ul>
        </div>

        {/* 3rd social media links */}
       
          

          {/* hamburget menu start  */}
          <div className="hamburger-menu">
            <a href="#" onClick={() => setShowMediaIcons(!showMediaIcons)}>
            <FontAwesomeIcon icon="fa-solid fa-bars" />
            </a>
          
        </div>
      </nav>

    
    </>
  );
};

export default ResponsiveNav;