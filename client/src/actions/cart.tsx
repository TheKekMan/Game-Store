import { CART_ADD, CART_REMOVE, CART_ERROR, CART_ITEM } from "./types";
import axios from "axios";
import { setAlert } from "./alert";
import { loadUser } from "./auth";
import { Dispatch } from "redux";
import uuid from "uuid";

// Add a game to cart ?
export const addToCart =
  (
    gameid: uuid.V4Options,
    title: string,
    price: number,
    poster: string,
    userid: uuid.V4Options,
    discount: number
  ) =>
  async (dispatch: Dispatch<any>) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const status = false;

    const body = JSON.stringify({ gameid, title, price, poster, userid });
    try {
      const res = await axios.post(
        "http://localhost:3000/gamestore/api/user/addtocart",
        body,
        config
      );
      const gkeyid = res.data.gkey_id;
      const cartItem = {
        gameid,
        title,
        price,
        poster,
        userid,
        status,
        gkeyid,
        discount,
      };
      dispatch({
        type: CART_ADD,
        payload: cartItem,
      });
      dispatch({
        type: CART_ITEM,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: CART_ERROR,
        payload: { msg: err, status: err },
      });
    }
  };

export const getFromCart = (userid: uuid.V4Options) => async (dispatch: Dispatch<any>) => {
  if (userid) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios.defaults.headers.common["userid"] = userid;
    try {
      const res = await axios.get(
        "http://localhost:3000/gamestore/api/user/addtocart",
        config
      );
      if (res.data.items.length !== 0) {
        res.data.items.map((item: any) => {
          dispatch({
            type: CART_ADD,
            payload: item,
          });
        });
      }
    } catch (err) {
      dispatch({
        type: CART_ERROR,
        payload: { msg: err, status: err },
      });
    }
  } else return;
};

// Remove a game from cart ?
export const removeFromCart =
  (gkeyid: uuid.V4Options) => async (dispatch: Dispatch<any>) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ gkeyid });
    try {
      const res = await axios.post(
        "http://localhost:3000/gamestore/api/user/remfromcart",
        body,
        config
      );
      dispatch({
        type: CART_REMOVE,
        payload: gkeyid,
      });
    } catch (err) {
      dispatch({
        type: CART_ERROR,
        payload: { msg: err, status: err },
      });
    }
  };

export const buyFromCart =
  (gkeyid: uuid.V4Options) => async (dispatch: Dispatch<any>) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ gkeyid });
    try {
      const res = await axios.post(
        "http://localhost:3000/gamestore/api/user/buyfromcart",
        body,
        config
      );
      if (res.data.items.length !== 0) {
        dispatch({
          type: CART_REMOVE,
          payload: gkeyid,
        });
        res.data.items.map((item: any) => {
          dispatch({
            type: CART_ADD,
            payload: item,
          });
        });
      }
      dispatch(loadUser());
    } catch (err) {
      if (err instanceof Error) {
        dispatch({
          type: CART_ERROR,
          payload: { msg: err, status: err },
        });
        const errors = err.message;
        dispatch(setAlert(errors, "error"));
      }
    }
  };
