import { STATUS } from './status';
import { LocalStorage, Utils } from '@common/Utils';

export const GET_PERSONAL_INFO = 'user/GET_PERSONAL_INFO';
export const GET_PERSONAL_INFO_SUCCESS = 'user/GET_PERSONAL_INFO_SUCCESS';
export const GET_PERSONAL_INFO_FAIL = 'user/GET_PERSONAL_INFO_FAIL';
export const ADD_EXCHANGE = 'user/ADD_EXCHANGE';
export const USER_LOGIN = 'user/USER_LOGIN';
export const GET_KEYS = 'user/GET_KEYS';
export const GET_KEYS_SUCCESS = 'user/GET_KEYS_SUCCESS';
export const UNAUTHORIZED_SUBSCRIBE = 'user/UNAUTHORIZED_SUBSCRIBE';
export const UNAUTHORIZED = 'user/UNAUTHORIZED';
export const AUTHENTICATE = 'user/AUTHENTICATE';
export const AUTH_PLS = 'user/AUTH_PLS';
export const API_KEY_SUBSCRIBE = 'user/API_KEY_SUBSCRIBE';
export const API_KEY_RESPONSE = 'user/API_KEY_RESPONSE';

const initialState = {
  personalInfo: null,
  status: STATUS.UNLOGGED_IN,
  burses: null,
  products: []
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case GET_PERSONAL_INFO_SUCCESS:
      return {
        ...state,
        personalInfo: action.payload.data
      };
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
    case API_KEY_RESPONSE:
      return {
        ...state,
        burses: Utils.findBurseAndChangeStatus(action.payload, state.burses)
      };
    default:
      return state;
  }
}

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
  };
}

export const authpls = () => {
  return {
    type: AUTH_PLS,
    payload: {
      socket: {
        message: 'authpls',
        type: 'emit'
      }
    }
  }
}

export const apiKeySubscribe = () => {
  return {
    type: API_KEY_SUBSCRIBE,
    payload: {
      socket: {
        message: 'keyChecked',
        type: 'subscribe',
        actionType: API_KEY_RESPONSE
      }
    }
  };
}

export const authenticate = () => {
  return {
    type: AUTHENTICATE,
    payload: {
      socket: {
        message: 'authenticate',
        type: 'emit',
        payload: {
          token: LocalStorage.getItem('token')
        }
      }
    }
  };
}

export const unauthorized = () => {
  return {
    type: UNAUTHORIZED_SUBSCRIBE,
    payload: {
      socket: {
        message: 'unauthorized',
        type: 'subscribe',
        actionType: UNAUTHORIZED
      }
    }
  };
}

export const userLogIn = () => {
  return {
    type: USER_LOGIN,
  };
}
