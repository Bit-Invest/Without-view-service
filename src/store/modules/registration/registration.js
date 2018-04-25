import { signIn, signUp, resetPassword } from './api';

export const SIGN_IN_REQUESTED = 'registration/SIGN_IN_REQUESTED';
export const SIGN_IN_REJECTED = 'registration/SIGN_IN_REJECTED';
export const SIGN_IN_APPROVED = 'registration/SIGN_IN_APPROVED';
export const SIGN_UP_REQUESTED = 'registration/SIGN_UP_REQUESTED';
export const SIGN_UP_REJECTED = 'registration/SIGN_UP_REJECTED';
export const SIGN_UP_APPROVED= 'registration/SIGN_UP_APPROVED';
export const RESET_PASSWORD_REQUESTED = 'registration/RESET_PASSWORD_REQUESTED';
export const RESET_PASSWORD_APPROVED = 'registration/RESET_PASSWORD_APPROVED';
export const RESET_PASSWORD_REJECTED = 'registration/RESET_PASSWORD_REJECTED';

const initialState = {
  isError: false
};

export const registration = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN_APPROVED:
      return {
        ...state,
        isError: false
      };
    case SIGN_UP_APPROVED:
      return {
        ...state,
        isError: false
      };
    case RESET_PASSWORD_APPROVED:
      return {
        ...state,
        isError: false
      };
    case SIGN_IN_REJECTED:
      return {
        ...state,
        isError: true
      };
    case SIGN_UP_REJECTED:
      return {
        ...state,
        isError: true
      };
    case RESET_PASSWORD_REJECTED:
      return {
        ...state,
        isError: true
      };
    default:
      return state;
  }
}

export const SIGN_IN = (userData) => {
  return dispatch => {
    dispatch({
      type: SIGN_IN_REQUESTED,
      userData
    });

    return signIn(userData);
  }
}

export const SIGN_UP = (userData) => {
  return dispatch => {
    dispatch({
      type: SIGN_UP_REQUESTED,
      userData
    });

    return signUp(userData);
  }
}

export const RESET_PASSWORD = (email) => {
  return dispatch => {
    dispatch({
      type: RESET_PASSWORD_REQUESTED,
      email
    });

    return resetPassword(email);
  };
}
