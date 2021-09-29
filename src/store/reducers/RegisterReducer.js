import {
  REGISTER_USER,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
} from '../actions/actionTypes';

const initialState = {
  response: undefined,
};

const RegisterReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        response: action.response,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        response: action.error,
      };

    default:
      return state;
  }
};

export default RegisterReducer;
