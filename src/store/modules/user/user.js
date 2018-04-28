import { STATUS } from './status';
import { push } from 'react-router-redux';

export const USER_LOGGED_IN = 'user/USER_LOGGED_IN';
export const USER_KYC_APPROVED = 'user/KYC_APPROVED';
export const USER_SIGN_OUT = 'user/SIGN_OUT';

const initialState = {
  status: STATUS.UNLOGGED_IN
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGGED_IN:
      return {
        ...state,
        status: STATUS.LOGGED_IN
      };
    case USER_KYC_APPROVED:
      return {
        ...state,
        status: STATUS.KYC_APPROVED
      };
    default:
      return state;
  }
}

export const USER_LOG_IN = () => {
  return dispatch => {
    dispatch({type: USER_LOGGED_IN});
    dispatch(push('/profile'));
  }
}

export const APPROVE_KYC = () => {
  return dispatch => {
    dispatch({type: USER_KYC_APPROVED});
  }
}
