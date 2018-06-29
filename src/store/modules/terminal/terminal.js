import { LocalStorage } from '@common/Utils';

export const PLACE_LIMIT_ORDER = 'terminal/PLACE_LIMIT_ORDER';
export const TRADE_HISTORY_SUCCESS = 'terminal/TRADE_HISTORY_SUCCESS';
export const TRADE_HISTORY = 'terminal/TRADE_HISTORY';
export const ORDER_BOOK = 'terminal/ORDER_BOOK';
export const ORDER_BOOK_SUCCESS = 'terminal/ORDER_BOOK_SUCCESS';
export const MARKET_DATA = 'terminal/MARKET_DATA';
export const MARKET_DATA_SUCCESS = 'terminal/MARKET_DATA_SUCCESS';
export const OPEN_ORDERS = 'terminal/OPEN_ORDERS';
export const OPEN_ORDERS_SUCCESS = 'terminal/OPEN_ORDERS_SUCCESS';
export const GET_PAIRS = 'terminal/GET_PAIRS';
export const GET_PAIRS_SUCCESS = 'terminal/GET_PAIRS_SUCCESS';

const initialState = {
  historyList: [],
  orderBook: {
    asks: [],
    bids: []
  },
  openOrders: [],
  currentPair: {
    symbol: "ETHBTC",
    baseAsset: "ETH",
    baseAssetPrecision: "8",
    quoteAsset: "BTC",
    quotePrecision: 8
  },
  pairs: []
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
    case OPEN_ORDERS_SUCCESS:
      return {
        ...state,
        openOrders: action.payload.data
      };
    case GET_PAIRS_SUCCESS:
      return {
        ...state,
        pairs: action.payload.data
      };
    case MARKET_DATA_SUCCESS:
      return state;
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

export const marketData = () => {
  return {
    type: MARKET_DATA,
    payload: {
      request: {
        url: '/api/user/marketdata',
        method: 'POST',
        data: {
          "eventTime": {
            "gte": 1530014465507,
            "lt": 1530111628510
          },
          "symbol": "ETHBTC",
          "nameStock": "binance"
        },
        headers: {
          Authorization: LocalStorage.getItem('token')
        }
      }
    }
  }
}

export const openOrders = (data) => {
  return {
    type: OPEN_ORDERS,
    payload: {
      request: {
        url: '/api/user/openorders',
        method: 'POST',
        data: data,
        headers: {
          Authorization: LocalStorage.getItem('token')
        }
      }
    }
  }
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
