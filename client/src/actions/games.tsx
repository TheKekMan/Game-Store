import {
  GET_GAMES,
  GET_GAME,
  GAMES_ERROR,
  CLEAR_GAME,
  CLEAR_GAMES,
  CLEAR_DEV,
} from "./types";
import axios from "axios";
import { Dispatch } from "redux";
import uuid from "uuid";

// Get games?
export const getGames = (query: any) => async (dispatch: Dispatch<any>) => {
  dispatch({ type: CLEAR_GAMES });
  dispatch({ type: CLEAR_GAME });
  try {
    const res = query
      ? await axios.get(
          `http://localhost:3000/gamestore/api/games/search/${query}`
        )
      : await axios.get(`http://localhost:3000/gamestore/api/games/`);
    dispatch({
      type: GET_GAMES,
      payload: res.data,
    });
  } catch (err) {
    if (err instanceof Error) {
      console.log(err);
      dispatch({
        type: GAMES_ERROR,
        payload: { msg: err.message, status: err },
      });
    }
  }
};

// Get a game by ID?
export const getGameById = (gameId: uuid.V4Options) => async (dispatch: Dispatch<any>) => {
  dispatch({ type: CLEAR_GAME });
  dispatch({ type: CLEAR_DEV });
  try {
    const res = await axios.get(
      `http://localhost:3000/gamestore/api/games/${gameId}`
    );
    dispatch({
      type: GET_GAME,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GAMES_ERROR,
      payload: { msg: "error" },
    });
  }
};

// Get games by tag?
export const getGamesByTag =
  (gameTag: string) => async (dispatch: Dispatch<any>) => {
    dispatch({ type: CLEAR_GAMES });
    dispatch({ type: CLEAR_GAME });
    try {
      const res = await axios.get(
        `http://localhost:3000/gamestore/api/games/tag/${gameTag}`
      );
      dispatch({
        type: GET_GAMES,
        payload: res.data,
      });
    } catch (err) {
      if (err instanceof Error) {
        console.log(err);
        dispatch({
          type: GAMES_ERROR,
          payload: { msg: err.message, status: err },
        });
      }
    }
  };
