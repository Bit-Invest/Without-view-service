import { STATUS } from './status';
import { LocalStorage } from '@common/Utils';

export const GET_PERSONAL_INFO = 'user/GET_PERSONAL_INFO';
export const GET_PERSONAL_INFO_SUCCESS = 'user/GET_PERSONAL_INFO_SUCCESS';
export const GET_PERSONAL_INFO_FAIL = 'user/GET_PERSONAL_INFO_FAIL';
export const ADD_EXCHANGE = 'user/ADD_EXCHANGE';
export const USER_LOGIN = 'user/USER_LOGIN';
export const GET_KEYS = 'user/GET_KEYS';
export const GET_KEYS_SUCCESS = 'user/GET_KEYS_SUCCESS';

const initialState = {
  personalInfo: null,
  status: STATUS.UNLOGGED_IN,
  burses: null,
  products: []
};

export const addExchange = (userData) => {
  return {
    type: ADD_EXCHANGE,
    payload: {
      request: {
        method: 'POST',
        url: '/api/user/addkey',
        data: userData,
        headers: {
          Authorization: LocalStorage.getItem('token')
        }
      }
    }
  };
}

export const user = (state = initialState, action) => {
  switch (action.type) {
    case GET_PERSONAL_INFO_SUCCESS:
      return Object.assign(
        {},
        state,
        {personalInfo: action.payload.data}
      );
    case USER_LOGIN:
      return Object.assign(
        {},
        state,
        {status: STATUS.LOGGED_IN}
      );
    case GET_KEYS_SUCCESS:
      return Object.assign(
        {},
        state,
        {burses: action.payload.data.keys}
      );
    default:
      return state;
  }
}

export const getPersonalInfo = () => {
  return {
    type: GET_PERSONAL_INFO,
    payload: {
      request: {
        url: '/api/user/getinfo',
        method: 'GET',
        headers: {
          Authorization: LocalStorage.getItem('token')
        }
      }
    }
  };
}

export const getKeys = () => {
  return {
    type: GET_KEYS,
    payload: {
      request: {
        url: '/api/user/getkeys',
        method: 'GET',
        headers: {
          Authorization: LocalStorage.getItem('token')
        }
      }
    }
  }
}

export const userLogIn = () => {
  return {
    type: USER_LOGIN,
  };
}
