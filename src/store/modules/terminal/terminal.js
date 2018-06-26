import { LocalStorage } from '@common/Utils';

export const PLACE_LIMIT_ORDER = 'terminal/PLACE_LIMIT_ORDER';
export const TRADE_HISTORY_SUCCESS = 'terminal/TRADE_HISTORY_SUCCESS';
export const TRADE_HISTORY = 'terminal/TRADE_HISTORY';
export const ORDER_BOOK = 'terminal/ORDER_BOOK';
export const ORDER_BOOK_SUCCESS = 'terminal/ORDER_BOOK_SUCCESS';

const initialState = {
  historyList: [],
  orderBook: {
    asks: [],
    bids: []
  }
};

export const terminal = (state = initialState, action) => {
  switch (action.type) {
    case TRADE_HISTORY_SUCCESS:
      return {
        ...state,
        historyList: action.payload.data
      };
    case ORDER_BOOK_SUCCESS:
      return {
        ...state,
        orderBook: action.payload.data
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

export const orderBook = (data) => {
  return {
    type: ORDER_BOOK,
    payload: {
      request: {
        method: 'POST',
        url: '/api/user/orderbook',
        data: data,
        headers: {
          Authorization: LocalStorage.getItem('token')
        }
      }
    }
  }
}
