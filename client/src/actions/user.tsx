import axios from "axios";
import { GET_USER, SET_USER, USER_ERROR } from "./types";
import setAuthToken from "../utils/setAuthToken";
import { Dispatch } from "redux";

interface userInfo {
  name: string;
  secondName: string;
  avatar: string;
  birthday: string;
}

export const getUser = () => async (dispatch: Dispatch<any>) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_CLIENT_URI}/gamestore/api/user`
    );
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

export const setUser = (newUserInfo: userInfo) => (dispatch: Dispatch<any>) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    // const res = await axios.post("http://localhost:3000/gamestore/api/user");
    dispatch({
      type: SET_USER,
      payload: newUserInfo,
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
