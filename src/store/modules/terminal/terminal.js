import { LocalStorage } from '@common/Utils';

export const PLACE_LIMIT_ORDER = 'terminal/PLACE_LIMIT_ORDER';
export const TRADE_HISTORY_SUCCESS = 'terminal/TRADE_HISTORY_SUCCESS';
export const TRADE_HISTORY = 'terminal/TRADE_HISTORY';

const initialState = {
  historyList: null
};

export const terminal = (state = initialState, action) => {
  switch (action.type) {
    case TRADE_HISTORY_SUCCESS:
      console.log(action);
      return {
        ...state,
        historyList: action.payload.data
      };
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

export const tradeHistory = (userData) => {
  return {
    type: TRADE_HISTORY,
    payload: {
      request: {
        method: 'POST',
        url: '/api/user/tradeshistory',
        data: userData,
        headers: {
          Authorization: LocalStorage.getItem('token')
        }
      }
    }
  };
}
