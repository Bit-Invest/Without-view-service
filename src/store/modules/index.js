import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { counter } from './counter';
import { registration } from './registration';

export default combineReducers({
  router: routerReducer,
  counter,
  registration
});
