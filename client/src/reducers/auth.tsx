import axios from "axios";

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  USER_INFO,
  AUTH_ERROR,
  LOGOUT,
  ACCOUNT_DELETED,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
  userInfo: {
    name: "",
    secondName: "",
    avatar:
      "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
    birthday: "01.01.1970",
  },
  userid: null,
  usergames: null,
};

export default function authReducer(
  state = initialState,
  action: { type: string; payload: any }
) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload.user,
        userid: payload.user.userid,
        usergames: payload.user,
      };
    case USER_INFO:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        userInfo: payload.user,
      };
    case REGISTER_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case LOGOUT:
    case ACCOUNT_DELETED:
      localStorage.removeItem("token");
      axios.defaults.headers.common["userid"] = "";
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };

    default:
      return state;
  }
}
