import {
  TODO_LIST,
  TODO_LIST_FAIL,
  TODO_LIST_SUCCESS,
  SET_CURRENT_ITEMS,
  CREATE_TODO_SUCCESS,
  CREATE_TODO_FAIL,
  CONCAT_ITEMS,
} from '../actions/actionTypes';

const initialState = {
  response: undefined,
  items: undefined,
  createTodoResponse: undefined,
};

const TodoListReducer = (state = initialState, action) => {
  switch (action.type) {
    case TODO_LIST_SUCCESS:
      return {
        ...state,
        response: action.response,
      };
    case TODO_LIST_FAIL:
      return {
        ...state,
        response: action.error,
      };
    case SET_CURRENT_ITEMS:
      return {
        ...state,
        items: action.items,
      };
    case CONCAT_ITEMS:
      return {
        ...state,
        items: [...state.items, ...action.items],
      };
    case CREATE_TODO_SUCCESS:
      return {
        ...state,
        createTodoResponse: action.response,
      };
    case CREATE_TODO_FAIL:
      return {
        ...state,
        createTodoResponse: action.error,
      };

    default:
      return state;
  }
};

export default TodoListReducer;
