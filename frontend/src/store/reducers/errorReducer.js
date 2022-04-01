import * as actionTypes from "../actions/actionTypes";

const initialState = {
  err: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ERRORS:
      return {
        ...state,
        err: action.payload
      }
    default:
      return state;
  }
};

export default reducer;
