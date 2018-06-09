const initialState = {};

export const OPEN_POSITION = 'terminal/OPEN_POSITION';
export const OPEN_POSITION_SUCCESS = 'terminal/OPEN_POSITION_SUCCESS';
export const TEST_SUBSCRIBE = 'terminal/TEST_SUBSCRIBE';
export const LOG_TEST = 'terminal/LOG_TEST';

export const terminal = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_POSITION_SUCCESS:
      return state;
    default:
      return state;
  }
}

export const openingPosition = (userData) => {
  return {
    type: OPEN_POSITION,
    payload: {
      socket: {
        type: 'emit',
        message: 'TEST',
        payload: {
          "endpoint": {
            "method": "ACCOUNT_INFO",
            "payload": {
              "name": "binance",
              "method": "TEST",
              "symbol": "VIABTC",
              "side": "BUY",
              "type": "TEST",
              "quantity": 1,
              "price": 0.0000102,
              "timeInForce": "TEST",
              "newClientOrderId": "TEST",
              "stopPrice": 123,
              "newOrderRespType": "TEST",
              "icebergQty": 123,
              "recvWindow": 123,
              "limit": 123,
              "orderId": 123,
              "interval": "TEST",
              "startTime": 123,
              "endTime": 123,
              "fromId": "TEST"
            }
          }
        }
      }
    }
  };
}

export const testSubscribe = () => {
  return {
    type: TEST_SUBSCRIBE,
    payload: {
      socket: {
        type: 'subscribe',
        message: 'TEST',
        actionType: LOG_TEST
      }
    }
  }
}
