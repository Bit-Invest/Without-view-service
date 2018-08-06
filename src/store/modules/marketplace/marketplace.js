import { Utils } from '@common/Utils';

export const GET_PRODUCTS = 'marketplace/GET_PRODUCTS';
export const GET_PRODUCTS_SUCCESS = 'marketplace/GET_PRODUCTS_SUCCESS';
export const GET_HISTORY = 'marketplace/GET_HISTORY';
export const GET_HISTORY_SUCCESS = 'marketplace/GET_HISTORY_SUCCESS';

const initialState = {
  products: [],
  historyData: {}
}

export const marketplace = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload.data
      };
    case GET_HISTORY_SUCCESS:
      const history = Utils.parseTradeHistory(action.payload.data.graph[0]);
      return {
        ...state,
        historyData: {
          ...state.historyData,
          [action.payload.data.productId]: history
        }
      };
    default:
      return state;
  }
}

export const getProducts = () => {
  return {
    type: GET_PRODUCTS,
    payload: {
      request: {
        method: 'GET',
        url: '/api/getproducts'
      }
    }
  };
}

export const tradeHistory = (data) => {
  return {
    type: GET_HISTORY,
    payload: {
      request: {
        method: 'POST',
        url: '/api/tradehistorygraph',
        data: data
      }
    }
  }
}
