import {createStore, applyMiddleware, compose} from 'redux';
import {routerMiddleware} from 'react-router-redux';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import rootReducer from './modules';
import { socketMiddleware } from './middlewares';
import io from 'socket.io-client';
import { networkError } from './modules/common';

export const history = createHistory();

const client = axios.create({
  baseURL: 'http://37.139.25.90:8080',
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
});

const socket = io('http://37.139.25.90:8080');
// const socket = io('http://37.139.25.90:8080');
socket.on('disconnect', () => {
  console.log('DISCONNECT');
})

const axiosMiddlewareConfig = {
  onError: (info) => {
    const errorInfo = {
      error: info.error,
      meta: {
        previousAction: info.action
      },
      type: `${info.action.type}_FAIL`
    };
    errorInfo.error.message === 'Network Error' ?
      info.dispatch(networkError()) :
      info.dispatch(errorInfo);
    return Promise.reject(errorInfo);
  }
};

const initialState = {};
const enhancers = [];
const middleware = [
  thunk,
  routerMiddleware(history),
  axiosMiddleware(client, axiosMiddlewareConfig),
  socketMiddleware(socket)
];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

export const store = createStore(rootReducer, initialState, composedEnhancers);
