import { GET_GAMES, GET_GAME, CLEAR_GAMES, CLEAR_GAME, GAMES_ERROR } from '../actions/types';

const initialState = {
  results: [],
  game: null,
  loading: true,
  error: {}
};

export default function gamesReducer(state = initialState, action: { type: string; payload: any; }) {
  const { type, payload } = action;

  switch (type) {
    case GET_GAMES:
      return { ...state, results: payload.gameResults, error: {}, loading: false };
    case GET_GAME:
      return { ...state, game: payload, error: {}, loading: false };
    case CLEAR_GAMES:
      return { ...state, results: [], error: {}, loading: true };
    case CLEAR_GAME:
      return { ...state, game: null, error: {}, loading: true };
    case GAMES_ERROR:
      return { ...state, results: [], game: null, error: payload, loading: false };
    default:
      return state;
  }
}
