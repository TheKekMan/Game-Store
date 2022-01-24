import { SET_ALERT, REMOVE_ALERT } from "../actions/types";

const initialState: any = [];

export default function alertReducer(
  state: any = initialState,
  action: { type: string; payload: any }
) {
  const { type, payload } = action;
  switch (type) {
    case SET_ALERT:
      return [...state, payload];
    case REMOVE_ALERT:
      return state.filter((alert: any) => alert.id !== payload);
    default:
      return state;
  }
}
