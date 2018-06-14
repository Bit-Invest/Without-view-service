export const GET_PRODUCTS = 'marketplace/GET_PRODUCTS';
export const GET_PRODUCTS_SUCCESS = 'marketplace/GET_PRODUCTS_SUCCESS';

const initialState = {
  products: []
}

export const marketplace = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload.data
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
