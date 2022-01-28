import axios from "axios";
import { setAlert } from "./alert";
import { GET_USER, SET_USER, USER_ERROR } from "./types";
import setAuthToken from "../utils/setAuthToken";
import { Dispatch } from "redux";

export const getUser = () => async (dispatch: Dispatch<any>) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("http://localhost:3000/gamestore/api/user");
    dispatch({
      type: GET_USER,
      payload: res.data,
    });
  } catch (err) {
    if (err instanceof Error) {
      dispatch({
        type: USER_ERROR,
        payload: { msg: err.message, status: err },
      });
    }
  }
};
