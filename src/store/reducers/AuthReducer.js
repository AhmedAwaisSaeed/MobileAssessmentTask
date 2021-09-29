import {LOGIN_FAIL, LOGIN_SUCCESS, SET_TOKEN} from '../actions/actionTypes';

const initialState = {
  response: undefined,
  token: undefined,
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        response: action.response,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        response: action.error,
      };
    case SET_TOKEN:
      return {
        ...state,
        token: action.token,
      };

    default:
      return state;
  }
};

export default AuthReducer;
