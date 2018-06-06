import { LocalStorage } from '@common/Utils';

const initialState = {};

export const OPEN_POSITION = 'terminal/OPEN_POSITION';

export const openingPosition = (userData) => {
  return {
    type: OPEN_POSITION,
    payload: {
      request: {
        method: 'POST',
        url: '/',
        data: userData,
        headers: {
          Authorization: LocalStorage.getItem('token')
        }
      }
    }
  };
}

export const terminal = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
}
