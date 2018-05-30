import { STATUS } from './status';
import { LocalStorage } from '@common/Utils';

export const ADD_EXCHANGE = 'user/ADD_EXCHANGE';

const initialState = {
  personalInfo: {
    name: null,
    surname: null,
    role: null
  },
  status: STATUS.UNLOGGED_IN,
  burses: [],
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
    default:
      return state;
  }
}
