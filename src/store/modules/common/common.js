import { LocalStorage } from '@common/Utils';

export const CHECK_JWT = 'common/CHECK_JWT';

const initialState = {

};

export const common = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
}

export const checkJWT = () => {
  return {
    type: CHECK_JWT,
    payload: {
      request: {
        url: '/auth/checkjwt',
        method: 'GET',
        headers: {
          Authorization: LocalStorage.getItem('token')
        }
      }
    }
  }
}
