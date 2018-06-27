import { LocalStorage, Utils } from '@common/Utils';
import * as uniqid from 'uniqid';

export const CHECK_JWT = 'common/CHECK_JWT';
export const SHOW_POP_UP = 'common/SHOW_POP_UP';
export const HIDE_POP_UP = 'common/HIDE_POP_UP';
export const NETWORK_ERROR = 'common/NETWORK_ERROR';
export const ADD_ALERT = 'common/ADD_ALERT';
export const REMOVE_ALERT = 'common/REMOVE_ALERT';
export const GET_PAIRS = 'common/GET_PAIRS';
export const GET_PAIRS_SUCCESS = 'common/GET_PAIRS_SUCCESS';

const initialState = {
  currentPopUp: null,
  popUpData: null,
  alerts: {}
};

export const common = (state = initialState, action) => {
  switch (action.type) {
    case HIDE_POP_UP:
      return {
        ...state,
        currentPopUp: null,
        popUpData: null
      };
    case SHOW_POP_UP:
      return {
        ...state,
        currentPopUp: action.payload.popUp,
        popUpData: action.payload.data
      };
    case ADD_ALERT:
      const id = uniqid();
      return {
        ...state,
        alerts: {
          ...state.alerts,
          [id]: {
            ...action.payload,
            id
          }
        }
      };
    case REMOVE_ALERT:
      return {
        ...state,
        alerts: Utils.allExclude(action.payload, state.alerts)
      };
    case GET_PAIRS_SUCCESS:
      console.log(action.payload);
      return state;
    default:
      return state;
  }
}

export const checkJWT = () => {
  return {
    type: CHECK_JWT,
    payload: {
      request: {
        url: '/auth/checkjwt',
        method: 'GET',
        headers: {
          Authorization: LocalStorage.getItem('token')
        }
      }
    }
  }
}

export const showPopUp = (popUp, data) => {
  return {
    type: SHOW_POP_UP,
    payload: {
      popUp,
      data
    }
  };
}

export const hidePopUp = () => {
  return {
    type: HIDE_POP_UP
  };
}

export const networkError = () => {
  return {
    type: NETWORK_ERROR
  };
}

export const addAlert = (alertProps) => {
  return {
    type: ADD_ALERT,
    payload: alertProps
  };
}

export const removeAlert = (alertId) => {
  return {
    type: REMOVE_ALERT,
    payload: alertId
  };
}

export const getPairs = (stock) => {
  return {
    type: GET_PAIRS,
    payload: {
      request: {
        url: `/api/exchangeInfo`,
        method: 'GET'
      }
    }
  }
}
