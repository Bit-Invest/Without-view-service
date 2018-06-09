import { LocalStorage } from '@common/Utils';

export const CHECK_JWT = 'common/CHECK_JWT';
export const SHOW_POP_UP = 'common/SHOW_POP_UP';
export const HIDE_POP_UP = 'common/HIDE_POP_UP';

const initialState = {
  currentPopUp: null
};

export const common = (state = initialState, action) => {
  switch (action.type) {
    case (HIDE_POP_UP):
      return Object.assign({}, state, {currentPopUp: null});
    case (SHOW_POP_UP):
      return Object.assign({}, state, {currentPopUp: action.payload.popUp});
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
