import { GET_DEV, CLEAR_DEV, DEV_ERROR } from '../actions/types';

const initialState = {
  dev: null,
  devsGames: null,
  loading: true,
  error: {}
};

export default function devsReducer(state = initialState, action: { type: string; payload: any; }) {
  const { type, payload } = action;

  switch (type) {
    case GET_DEV:
      return { ...state, dev: payload.dev, devsGames: payload.devsGames, error: {}, loading: false };
    case CLEAR_DEV:
      return { ...state, dev: null, devsGames: null, error: {}, loading: true };
    case DEV_ERROR:
      return { ...state, dev: null, devsGames: null, error: payload, loading: false };
    default:
      return state;
  }
}
