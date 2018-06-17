import { LocalStorage } from '@common/Utils';

export const PLACE_LIMIT_ORDER = 'terminal/PLACE_LIMIT_ORDER';

const initialState = {};

export const terminal = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
}

export const placeLimitOrder = (orderData) => {
  return {
    type: PLACE_LIMIT_ORDER,
    payload: {
      socket: {
        type: 'emit',
        message: 'ORDER_LIMIT',
        payload: {
          jwt: LocalStorage.getItem('token'),
          endpoint: {
            payload: orderData
          }
        }
      }
    }
  }
}
