import {LOGIN_USER, LOGIN_SUCCESS, LOGIN_FAIL, SET_TOKEN} from './actionTypes';
import {BASE_URL} from '../../utils/ConstantClass';

export const _loginSuccess = response => {
  return dispatch => {
    dispatch({
      type: LOGIN_SUCCESS,
      response: response,
    });
  };
};

export const _setToken = token => {
  return dispatch => {
    dispatch({
      type: SET_TOKEN,
      token: token,
    });
  };
};

export const _loginUser = payload => {
  return dispatch => {
    fetch(BASE_URL + 'login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({...payload}),
    })
      .then(response => response.json())
      .then(responseJson => {
        dispatch(_loginSuccess(responseJson));
      })
      .catch(error => {
        dispatch(_loginFail(error));
      })
      .done();
  };
};

export const _loginFail = error => {
  return dispatch => {
    dispatch({
      type: LOGIN_FAIL,
      error: error,
    });
  };
};
