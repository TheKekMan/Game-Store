import { GET_USER, SET_USER, USER_ERROR } from "../actions/types";

const initialState = {
  user: {
    name: "",
    secondName: "",
    avatar:
      "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
    birthday: "01.01.1970",
  },
  loading: true,
  error: {},
};

export default function userReducer(
  state = initialState,
  action: { type: string; payload: any }
) {
  const { type, payload } = action;

  switch (type) {
    case GET_USER:
      return {
        ...state,
        user: payload.user,
        error: {},
        loading: false,
      };
    case SET_USER:
      return { ...state, user: payload, error: {}, loading: false };
    case USER_ERROR:
      return { ...state, error: payload, loading: false };
    default:
      return state;
  }
}
