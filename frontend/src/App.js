import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './components/Home/Home';
import DeptRedirect from './components/Home/HomeContent/DeptRedirect';
import HomeContent from './components/Home/HomeContent/HomeContent';
import CourseRedirect from './components/Home/HomeContent/CourseRedirect';
import HomeNavbar from './components/Home/HomeNavbar/HomeNavbar';
import UserProvider from './providers/UserProvider';

function App() {

  return (
    <UserProvider>
      <BrowserRouter>
        <HomeNavbar />
        <Routes>
          <Route path='/' element={<HomeContent />} />
          <Route path='/DeptRe' element={<DeptRedirect />} />
          <Route path='/DeptRe/Course' element={<CourseRedirect />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
