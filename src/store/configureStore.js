import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RegisterReducer from './reducers/RegisterReducer';
import AuthReducer from './reducers/AuthReducer';
import TodoListReducer from './reducers/TodoListReducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  AuthReducer: AuthReducer,
  RegisterReducer: RegisterReducer,
  TodoListReducer: TodoListReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['RegisterReducer', 'AuthReducer'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, compose(applyMiddleware(thunk)));
const persistor = persistStore(store);
export const configureStore = () => {
  return {store, persistor};
};

export const resetStore = async () => {
  await persistor.purge();
  await persistor.flush();
};
