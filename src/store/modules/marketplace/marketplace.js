import { Utils } from '@common/Utils';

export const GET_PRODUCTS = 'marketplace/GET_PRODUCTS';
export const GET_PRODUCTS_SUCCESS = 'marketplace/GET_PRODUCTS_SUCCESS';
export const GET_HISTORY = 'marketplace/GET_HISTORY';
export const GET_HISTORY_SUCCESS = 'marketplace/GET_HISTORY_SUCCESS';

const initialState = {
  "products": [{
    "followersCount": 0,
    "id": "5b86b7ab4ff267004d72d5a4",
    "info": "Lexa product information",
    "name": "Lexa",
    "nameProduct": "Lexa product",
    "stockName": "binance",
    "surname": "SuperAccount"
  }],
  "historyData": {
    "5b86b7ab4ff267004d72d5a4": [{
      "date": 1532939816352,
      "close": 0.0026863733336399995
    }, {
      "date": 1532940169369,
      "close": 0.0026858158840599995
    }, {
      "date": 1532941014319,
      "close": 0.0026892821663899997
    }, {
      "date": 1532941082899,
      "close": 0.0026916759659099997
    }, {
      "date": 1532953984293,
      "close": 0.0026860886021600004
    }, {
      "date": 1532954039021,
      "close": 0.0026862122981600005
    }, {
      "date": 1532954219411,
      "close": 0.0026883055328400006
    }, {
      "date": 1532954350484,
      "close": 0.0026889292348900007
    }, {
      "date": 1532954350484,
      "close": 0.0026894679478900005
    }, {
      "date": 1532954611043,
      "close": 0.0026918703866800004
    }, {
      "date": 1532954836621,
      "close": 0.0026916744050799997
    }, {
      "date": 1532954856867,
      "close": 0.00269212111908
    }, {
      "date": 1532954870377,
      "close": 0.00269272712788
    }, {
      "date": 1532955315018,
      "close": 0.00268988938344
    }, {
      "date": 1532955324795,
      "close": 0.00269071465844
    }, {
      "date": 1533041684290,
      "close": 0.0026366349671999995
    }, {
      "date": 1533041707292,
      "close": 0.00263874833216
    }, {
      "date": 1533049010335,
      "close": 0.0026514954247200003
    }, {
      "date": 1533049045610,
      "close": 0.0026503453315200004
    }, {
      "date": 1533049058943,
      "close": 0.0026504522125200005
    }, {
      "date": 1533052799440,
      "close": 0.0026432422535400003
    }, {
      "date": 1533119243370,
      "close": 0.0026552015880000005
    }, {
      "date": 1533120743228,
      "close": 0.00265743762904
    }, {
      "date": 1533120752301,
      "close": 0.0026569937032400004
    }, {
      "date": 1533120954522,
      "close": 0.00266253638032
    }, {
      "date": 1533120971088,
      "close": 0.0026627657938200003
    }, {
      "date": 1533121210120,
      "close": 0.0026659179475400003
    }, {
      "date": 1533121215365,
      "close": 0.0026662698272400006
    }, {
      "date": 1533123137015,
      "close": 0.0026658821602800003
    }, {
      "date": 1533123142624,
      "close": 0.0026670624654800005
    }, {
      "date": 1533567170224,
      "close": 0.0027832549870800004
    }, {
      "date": 1533567184577,
      "close": 0.0027844865776
    }, {
      "date": 1533567495864,
      "close": 0.0027822490909200004
    }, {
      "date": 1533567507377,
      "close": 0.00278230225852
    }, {
      "date": 1535555500315,
      "close": 0.0019792759456
    }, {
      "date": 1535555510315,
      "close": 0.0019792759456
    }, {
      "date": 1535555520315,
      "close": 0.0019792759456
    }]
  }
}



export const marketplace = (state = initialState, action) => {
  return initialState;
  switch (action.type) {
    case GET_PRODUCTS_SUCCESS:
      const defaultArr = [
        {
          followersCount: 10,
          id: "5bdw1dc6d7272vd4c3b9bc41",
          info: "Lexa product information",
          name: "Lexa",
          nameProduct: "Lexa product",
          stockName: "sberbank",
          surname: "SuperAccount"
        }
      ]
      return {
        ...state,
        products: [...action.payload.data].concat(defaultArr)
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
