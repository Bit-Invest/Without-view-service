const initialState = {};

export const OPEN_POSITION = 'terminal/OPEN_POSITION';
export const OPEN_POSITION_SUCCESS = 'terminal/OPEN_POSITION_SUCCESS';
export const TEST_SUBSCRIBE = 'terminal/TEST_SUBSCRIBE';
export const LOG_TEST = 'terminal/LOG_TEST';

export const terminal = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
}
