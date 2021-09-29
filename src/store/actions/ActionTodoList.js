import {
  TODO_LIST,
  TODO_LIST_SUCCESS,
  TODO_LIST_FAIL,
  SET_CURRENT_ITEMS,
  CREATE_TODO,
  CREATE_TODO_SUCCESS,
  CREATE_TODO_FAIL,
  CONCAT_ITEMS,
} from './actionTypes';
import {BASE_URL} from '../../utils/ConstantClass';
export const _todoSuccess = response => {
  return dispatch => {
    dispatch({
      type: TODO_LIST_SUCCESS,
      response: response,
    });
  };
};

export const _setCurrentItems = items => {
  return dispatch => {
    dispatch({
      type: SET_CURRENT_ITEMS,
      items: items,
    });
  };
};

export const _concatItems = items => {
  return dispatch => {
    dispatch({
      type: CONCAT_ITEMS,
      items: items,
    });
  };
};

export const _todoListUser = token => {
  return dispatch => {
    fetch(BASE_URL + 'items', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      //   body: JSON.stringify({...payload}),
    })
      .then(response => response.json())
      .then(responseJson => {
        dispatch(_todoSuccess(responseJson));
      })
      .catch(error => {
        dispatch(_todoFail(error));
      })
      .done();
  };
};

export const _todoFail = error => {
  return dispatch => {
    dispatch({
      type: TODO_LIST_FAIL,
      error: error,
    });
  };
};

//// Create

export const _createTodo = (payload, token) => {
  return dispatch => {
    fetch(BASE_URL + 'item', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({...payload}),
    })
      .then(response => response.json())
      .then(responseJson => {
        dispatch(_createSuccess(responseJson));
      })
      .catch(error => {
        dispatch(_createFail(error));
      })
      .done();
  };
};

export const _createFail = error => {
  return dispatch => {
    dispatch({
      type: CREATE_TODO_FAIL,
      error: error,
    });
  };
};

export const _createSuccess = response => {
  return dispatch => {
    dispatch({
      type: CREATE_TODO_SUCCESS,
      response: response,
    });
  };
};
