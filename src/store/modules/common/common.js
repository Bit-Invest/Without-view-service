import { LocalStorage } from '@common/Utils';

export const CHECK_JWT = 'common/CHECK_JWT';
export const SHOW_POP_UP = 'common/SHOW_POP_UP';
export const HIDE_POP_UP = 'common/HIDE_POP_UP';
export const NETWORK_ERROR = 'common/NETWORK_ERROR';
export const ADD_ALERT = 'common/ADD_ALERT';
export const REMOVE_ALERT = 'common/REMOVE_ALERT';

const initialState = {
  currentPopUp: null,
  popUpData: null,
  alerts: []
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
    case ADD_ALERT: {
      let alerts = state.alerts;
      alerts.push(action.payload);
      return {
        ...state,
        alerts
      };
    }
    case REMOVE_ALERT:
      let alerts = state.alerts;
      alerts.splice(
        alerts.findIndex(
          alert => {return alert.id === action.payload}
        ),
        1
      );
      return {
        ...state,
        alerts
      };
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
