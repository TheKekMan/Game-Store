import axios from "axios";
import { GET_DEV, DEV_ERROR } from "./types";
import setAuthToken from "../utils/setAuthToken";
import { Dispatch } from "redux";
import uuid from "uuid";

export const getDev = (devId: uuid.V4Options) => async (dispatch: Dispatch<any>) => {
    try {
        const res = await axios.get(`http://localhost:3000/gamestore/api/devs/${devId}`);
        dispatch({
            type: GET_DEV,
            payload: res.data,
        });
    } catch (err) {
        if (err instanceof Error) {
            dispatch({
                type: DEV_ERROR,
                payload: { msg: err.message, status: err },
            });
        }
    }
};