import {
  CART_ADD,
  CART_REMOVE,
  CART_CLEAR,
  CART_ERROR,
  CART_ITEM,
} from '../actions/types';

const initialState = {
  cart: [],
  cartitem: null,
  loading: true,
  error: {},
  length: 0,
};

export default function cartReducer(state = initialState, action: { payload: any; type?: string; len?: number; }): any {
  const { type, payload, len} = action;

  switch (type) {
    case CART_ADD:
      return {
        ...state,
        cart: [...state.cart, payload],
        error: {},
        loading: false,
      };
    case CART_ITEM:
      return {
        ...state,
        length: len,
        error: {},
        loading: false,
      };
    case CART_REMOVE:
      return {
        ...state,
        cart: state.cart.filter((item: any) => item.gkeyid !== action.payload),
        error: {},
        loading: false,
      };
    case CART_CLEAR:
      return { ...state, cart: [], error: {}, loading: false };
    case CART_ERROR:
      return { ...state, cart: [...state.cart], error: payload, loading: false };
    default:
      return state;
  }
}
