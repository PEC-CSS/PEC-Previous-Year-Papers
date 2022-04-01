import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser } from './store/actions/auth';
import store from "./store/store";

import Home from './components/Home/Home';

function App() {

  useEffect(() => {
    if (localStorage.jwtToken) {
      const token = localStorage.jwtToken;
      setAuthToken(token);
      const decoded = jwt_decode(token);
      store.dispatch(setCurrentUser(decoded));
    }
  });

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          {/* <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} /> */}
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
