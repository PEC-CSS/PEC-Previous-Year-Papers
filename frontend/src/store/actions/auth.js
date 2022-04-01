import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import jwt_decode from "jwt-decode";
import * as actionTypes from './actionTypes';

export const setCurrentUser = decoded => {
    return {
      type: actionTypes.SET_CURRENT_USER,
      user: decoded
    };
};

export const fail = (err) => {
    return {
      type: actionTypes.GET_ERRORS,
      payload: err
    };
}

export const setUserLoading = () => {
    return {
      type: actionTypes.USER_LOADING
    };
};

export const logoutUser = () =>{
    return dispatch => {
      localStorage.removeItem("jwtToken");
      setAuthToken(false);
      dispatch(setCurrentUser({}));
    }
};

export const registerUser = (userData, history) => {
    return async (dispatch) => {
      try {
        await axios.post("/user/register", userData);
        alert('Register Success');
        history.push('/login');
      }
      catch(ex) {
        alert(ex.response.data);
        dispatch(fail(ex.response.data));
      }
    }
};

export const loginUser = (userData) => {
    return async (dispatch) => {
      try {
        const res = await axios.post("/user/login", userData);
        const {token} = res.data;
        localStorage.setItem("jwtToken", token);
        setAuthToken(token);
        const decoded = jwt_decode(token);
        dispatch(setCurrentUser(decoded));
      }
      catch(ex) {
        dispatch(fail(ex.response.data));
      }
    }
};