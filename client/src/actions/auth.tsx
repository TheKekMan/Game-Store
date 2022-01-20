import axios from "axios";
import { setAlert } from "./alert";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
  CART_CLEAR,
} from "./types";
import setAuthToken from "../utils/setAuthToken";
import { Dispatch } from "redux";

// Load User:
export const loadUser = () => async (dispatch: Dispatch<any>) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get(
      "http://localhost:3000/gamestore/api/auth/auth"
    );
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register User:
export const register =
  (email: String, password: String) => async (dispatch: Dispatch<any>) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ email, password });

    try {
      const res = await axios.post("gamestore/api/auth/register", body, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      dispatch(loadUser());
    } catch (err) {
      if (err instanceof Error) {
        const errors = err.message;
        dispatch(setAlert(errors, "error"));
      }
      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };

// Checkout:
export const checkout =
  (itemsBought: any) => async (dispatch: Dispatch<any>) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ gamesBought: itemsBought });

    try {
      const res = await axios.put("gamestore/api/auth/checkout", body, config);
      dispatch({ type: CART_CLEAR });
      document.querySelector(".cart-container")!.classList.remove("is-open");
      console.log(res);
      dispatch(loadUser());
    } catch (err) {
      console.log(err);
      dispatch({ type: AUTH_ERROR }); // ?
    }
  };

export const getUserDetails = () => async (dispatch: Dispatch<any>) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("gamestore/api/user");
    const useremail = res.data;
    console.log(useremail);
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Login User:
export const login =
  (email: String, password: String) => async (dispatch: Dispatch<any>) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ email, password });

    try {
      const res = await axios.post("gamestore/api/auth/auth", body, config);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      dispatch(loadUser());
    } catch (err) {
      if (err instanceof Error) {
        const errors = err.message;
        dispatch(setAlert(errors, "error"));

        dispatch({
          type: LOGIN_FAIL,
        });
      }
    }
  };

// LOGOUT / CLEAR Profile
export const logout = () => (dispatch: Dispatch) => {
  dispatch({ type: LOGOUT });
};
