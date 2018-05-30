import { STATUS } from './status';

const initialState = {
  personalInfo: {
    name: null,
    surname: null,
    role: null
  },
  status: STATUS.UNLOGGED_IN,
  burses: [],
  products: []
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
}
