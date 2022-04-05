import React from 'react';

import HomeNavbar from './HomeNavbar/HomeNavbar';
import HomeContent from './HomeContent/HomeContent';

const Home = props => (
  <React.Fragment>
      <HomeNavbar />
      <div style={{ display: "flex" }}>
        <HomeContent />
      </div>
  </React.Fragment>
);

export default Home;