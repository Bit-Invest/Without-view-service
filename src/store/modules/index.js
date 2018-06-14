import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { registration } from './registration';
import { user } from './user';
import { terminal } from './terminal';
import { common } from './common';
import { marketplace } from './marketplace';

export default combineReducers({
  router: routerReducer,
  common,
  registration,
  user,
  terminal,
  marketplace
});
