export const RESET_PASSWORD_REQUESTED = 'registration/RESET_PASSWORD_REQUESTED';
export const RESET_PASSWORD_APPROVED = 'registration/RESET_PASSWORD_APPROVED';
export const RESET_PASSWORD_REJECTED = 'registration/RESET_PASSWORD_REJECTED';
export const SIGN_UP = 'registration/SIGN_UP';
export const SIGN_UP_SUCCESS = 'registration/SIGN_UP_SUCCESS';
export const SIGN_UP_FAILED = 'registration/SIGN_UP_FAILED';
export const SIGN_IN = 'registration/SIGN_IN';
export const SIGN_IN_SUCCESS = 'registration/SIGN_IN_SUCCESS';
export const SIGN_IN_FAILED = 'registration/SIGN_IN_FAIL';
export const RESET_ERROR = 'registration/RESET_ERROR';

const initialState = {
  isSignUpError: false,
  isSignInError: false,
  isResetPassError: false
};

export const registration = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN_SUCCESS:
      return state;
    case SIGN_UP_FAILED:
      return Object.assign({}, state, {isSignUpError: true});
    case SIGN_IN_FAILED:
      return Object.assign({}, state, {isSignInError: true});
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
    types: SIGN_UP,
    payload: {
      request: {
        method: 'POST',
        url: '/auth/signup',
        data: userData
      }
    }
  };
}
