import {REGISTER_USER, REGISTER_SUCCESS, REGISTER_FAIL} from './actionTypes';
import {BASE_URL} from '../../utils/ConstantClass';

export const _registerSuccess = response => {
  return dispatch => {
    dispatch({
      type: REGISTER_SUCCESS,
      response: response,
    });
  };
};

export const _registerUser = payload => {
  return dispatch => {
    fetch(BASE_URL + 'register', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({...payload}),
    })
      .then(response => response.json())
      .then(responseJson => {
        dispatch(_registerSuccess(responseJson));
      })
      .catch(error => {
        dispatch(_registerFail(error));
      })
      .done();
  };
};

export const _registerFail = error => {
  return dispatch => {
    dispatch({
      type: REGISTER_FAIL,
      error: error,
    });
  };
};
