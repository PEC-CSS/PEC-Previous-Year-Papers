import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Courses from './components/Home/HomeContent/Courses';
import HomeContent from './components/Home/HomeContent/HomeContent';
import Papers from './components/Home/HomeContent/Papers';
import HomeNavbar from './components/Home/HomeNavbar/HomeNavbar';
import UserProvider from './providers/UserProvider';

function App() {

  return (
    <UserProvider>
      <BrowserRouter>
        <HomeNavbar />
        <Routes>
          <Route path='/' element={<HomeContent />} />
          <Route path='/Courses' element={<Courses />} />
          <Route path='/Courses/Papers' element={<Papers />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
