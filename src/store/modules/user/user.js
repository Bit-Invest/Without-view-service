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
export const USER_LOG_OUT = 'user/USER_LOG_OUT';
export const SUBSCRIBE_ON_TRADER = 'user/SUBSCRIBE_ON_TRADER';
export const SUBSCRIBE_ON_TRADER_SUCCESS = 'user/SUBSCRIBE_ON_TRADER_SUCCESS';
export const GET_SUBSCRIBED_PRODUCTS = 'user/GET_SUBSCRIBED_PRODUCTS';
export const GET_SUBSCRIBED_PRODUCTS_SUCCESS =
  'user/GET_SUBSCRIBED_PRODUCTS_SUCCESS';
export const API_KEY_SUBSCRIBE_SUCCESS = 'user/API_KEY_SUBSCRIBE_SUCCESS';
export const UNSUBSCRIBE_TRADER = 'user/UNSUBSCRIBE_TRADER';
export const UNSUBSCRIBE_TRADER_SUCCESS = 'user/UNSUBSCRIBE_TRADER_SUCCESS';
export const GET_MY_PRODUCTS = 'user/GET_MY_PRODUCTS';
export const GET_MY_PRODUCTS_SUCCESS = 'user/GET_MY_PRODUCTS_SUCCESS';
export const BALANCE = 'user/BALANCE';
export const BALANCE_SUCCESS = 'user/BALANCE_SUCCESS';
export const GET_MY_INVESTORS = 'user/GET_MY_INVESTORS';
export const GET_MY_INVESTORS_SUCCESS = 'user/GET_MY_INVESTORS_SUCCESS';
export const SEND_KYC  = 'user/SEND_KYC'
export const SEND_KYC_SUCCESS  = 'user/SEND_KYC_SUCCESS'

const initialState = {
  personalInfo: null,
  status: STATUS.UNLOGGED_IN,
  burses: [],
  products: [],
  investors: [],
  myProducts: []
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
    case USER_LOG_OUT:
      return {
        ...state,
        status: STATUS.UNLOGGED_IN
      };
    case GET_SUBSCRIBED_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload.data.products
      };
    case API_KEY_SUBSCRIBE_SUCCESS:
      return {
        ...state,
        burses: state.burses.map(burse => {
          let result = burse;
          if (burse.stock === action.payload.nameStock) {
            result.status = action.payload.status;
          }
          return result;
        })
      };
    case GET_MY_PRODUCTS_SUCCESS:
      return {
        ...state,
        myProducts: action.payload.data
      };
    case GET_MY_INVESTORS_SUCCESS:
      return {
        ...state,
        investors: action.payload.data
      };
    case SEND_KYC_SUCCESS:
      return state
    case BALANCE_SUCCESS:
      return state;
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

export const sendKYC = (jwtToken) => {
  return {
    type: SEND_KYC,
    payload: {
      request: {
        url: `/api/user/checkkyc?token=${jwtToken}`,
        method: 'GET',
        headers: {
          Authorization: LocalStorage.getItem('token')
        }
      }
    }
  }
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

export const userLogOut = () => {
  return {
    type: USER_LOG_OUT
  };
}

export const subscribeOnTrader = (data) => {
  return {
    type: SUBSCRIBE_ON_TRADER,
    payload: {
      request: {
        method: 'POST',
        url: '/api/user/subscribe',
        data: data,
        headers: {
          Authorization: LocalStorage.getItem('token')
        }
      }
    }
  };
}

export const unsubscribeTrader = (data) => {
  return {
    type: UNSUBSCRIBE_TRADER,
    payload: {
      request: {
        method: 'POST',
        url: '/api/user/unsubscribe',
        data: data,
        headers: {
          Authorization: LocalStorage.getItem('token')
        }
      }
    }
  }
}

export const getSubscribedProducts = () => {
  return {
    type: GET_SUBSCRIBED_PRODUCTS,
    payload: {
      request: {
        method: 'GET',
        url: '/api/user/issubscribe',
        headers: {
          Authorization: LocalStorage.getItem('token')
        }
      }
    }
  };
}

export const balance = (productId) => {
  return {
    type: BALANCE,
    payload: {
      request: {
        method: 'GET',
        url: `/api/user/balance?product=${productId}`,
        headers: {
          Authorization: LocalStorage.getItem('token')
        }
      }
    }
  }
}

export const getMyProducts = () => {
  return {
    type: GET_MY_PRODUCTS,
    payload: {
      request: {
        method: 'GET',
        url: '/api/user/getmyproducts',
        headers: {
          Authorization: LocalStorage.getItem('token')
        }
      }
    }
  }
}

export const getMyInvestors = () => {
  return {
    type: GET_MY_INVESTORS,
    payload: {
      request: {
        method: 'GET',
        url: '/api/user/myinvestors',
        headers: {
          Authorization: LocalStorage.getItem('token')
        }
      }
    }
  };
}
