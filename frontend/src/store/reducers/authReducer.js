import * as actionTypes from '../actions/actionTypes';
import isEmpty from 'is-empty';

const initialState = {
  isAuthenticated: false,
  isAdmin: false,
  user: {},
  loading: false
};

const reducer = (state = initialState, action) =>{
  switch(action.type) {
    case actionTypes.USER_LOADING:
      return {
        ...state,
        loading: true
      };
    case actionTypes.SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.user),
        isAdmin: action.user ? action.user.isAdmin:null,
        user: action.user
      }
    default:
      return state
  }
};

export default reducer;