import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { registration } from './registration';
import { user } from './user';

export default combineReducers({
  router: routerReducer,
  registration,
  user
});
