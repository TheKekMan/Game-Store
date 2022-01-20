import uuid from "uuid";
import { SET_ALERT, REMOVE_ALERT } from "./types";
import { Dispatch } from "redux";

export const setAlert =
  (msg: string, alertType: string, timeout = 5000) =>
  (dispatch: Dispatch<any>) => {
    const id = uuid.v4();

    dispatch({
      type: SET_ALERT,
      payload: { msg, alertType, id },
    });

    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
  };
