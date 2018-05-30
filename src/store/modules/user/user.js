import { STATUS } from './status';
import { LocalStorage } from '@common/Utils';

export const GET_PERSONAL_INFO = 'user/GET_PERSONAL_INFO';
export const GET_PERSONAL_INFO_SUCCESS = 'user/GET_PERSONAL_INFO_SUCCESS';
export const GET_PERSONAL_INFO_FAIL = 'user/GET_PERSONAL_INFO_FAIL';

const initialState = {
  personalInfo: null,
  status: STATUS.UNLOGGED_IN,
  burses: [],
  products: []
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case GET_PERSONAL_INFO_SUCCESS:
      return Object.assign(
        {},
        state,
        {personalInfo: action.payload.data}
      );
    default:
      return state;
  }
}

export const getPersonalInfo = () => {
  return {
    type: GET_PERSONAL_INFO,
    payload: {
      request: {
        url: '/api/user/getinfo',
        method: 'GET',
        headers: {
          'Authorization': LocalStorage.getItem('token')
        }
      }
    }
  };
}
