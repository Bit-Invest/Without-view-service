export const RESET_PASSWORD = 'registration/RESET_PASSWORD';
export const RESET_PASSWORD_FAILED = 'registration/RESET_PASSWORD_FAIL';
export const RESET_PASSWORD_SUCCESS = 'registration/RESET_PASSWORD_SUCCESS';
export const SIGN_UP = 'registration/SIGN_UP';
export const SIGN_UP_SUCCESS = 'registration/SIGN_UP_SUCCESS';
export const SIGN_UP_FAILED = 'registration/SIGN_UP_FAIL';
export const SIGN_IN = 'registration/SIGN_IN';
export const SIGN_IN_SUCCESS = 'registration/SIGN_IN_SUCCESS';
export const SIGN_IN_FAILED = 'registration/SIGN_IN_FAIL';
export const RESET_ERROR = 'registration/RESET_ERROR';

const initialState = {};

export const registration = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
}

export const resetError = () => {
  return {
    type: RESET_ERROR
  };
}

export const signInAction = (userData) => {
  return {
    type: SIGN_IN,
    payload: {
      request: {
        method: 'POST',
        url: '/auth/signin',
        data: userData
      }
    }
  };
}

export const signUpAction = (userData) => {
  return {
    type: SIGN_UP,
    payload: {
      request: {
        method: 'POST',
        url: '/auth/signup',
        data: userData
      }
    }
  };
}

export const resetPassword = (data) => {
  return {
    type: RESET_PASSWORD,
    payload: {
      request: {
        method: 'POST',
        url: '/auth/resetpassword',
        data: data
      }
    }
  };
}