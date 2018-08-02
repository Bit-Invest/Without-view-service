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
export const SET_CURRENT_PAIR = 'terminal/SET_CURRENT_PAIR';
export const SET_CURRENT_STOCK = 'terminal/SET_CURRENT_STOCK';
export const ORDER_FINISH_SUBSCRIBE = 'terminal/ORDER_FINISH_SUBSCRIBE';
export const ORDER_FINISHED = 'terminal/ORDER_FINISHED';
export const ORDER_ERROR = 'terminal/ORDER_ERROR';
export const SET_CURRENT_CHART_TYPE = 'terminal/SET_CURRENT_CHART_TYPE';

const initialState = {
  historyList: [],
  orderBook: {
    asks: [],
    bids: []
  },
  openOrders: [],
  currentPair: {
    symbol: "XLMETH",
    baseAsset: "XLM",
    baseAssetPrecision: "8",
    quoteAsset: "ETH",
    quotePrecision: 8
  },
  pairs: [],
  currentStock: 'binance',
  currentChartType: 'candle',
  chart: []
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
        openOrders: action.payload.data.error ? [] : action.payload.data
      };
    case GET_PAIRS_SUCCESS:
      return {
        ...state,
        pairs: action.payload.data
      };
    case SET_CURRENT_PAIR:
      return {
        ...state,
        currentPair: action.payload
      };
    case MARKET_DATA_SUCCESS:
      return {
        ...state,
        chart: action.payload.data
      };
    case SET_CURRENT_STOCK:
      return {
        ...state,
        currentStock: action.payload
      };
    case SET_CURRENT_CHART_TYPE:
      return {
        ...state,
        currentChartType: action.payload
      };
    case ORDER_FINISHED:
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
        payload: orderData
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

export const marketData = (data) => {
  return {
    type: MARKET_DATA,
    payload: {
      request: {
        url: '/api/user/marketdata',
        method: 'POST',
        data: data,
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

export const setCurrentPair = (pair) => {
  return {
    type: SET_CURRENT_PAIR,
    payload: pair
  };
}

export const setCurrentStock = (stock) => {
  return {
    type: SET_CURRENT_STOCK,
    payload: stock
  };
}

export const setCurrentChartType = (chartType) => {
  return {
    type: SET_CURRENT_CHART_TYPE,
    payload: chartType
  };
}
