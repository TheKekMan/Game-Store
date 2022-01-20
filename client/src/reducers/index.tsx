import { combineReducers } from 'redux';
import alertReducer from './alert';
import authReducer from './auth';
import cartReducer from './cart';
import devsReducer from './devs';
import gamesReducer from './games';

export const rootReducer = combineReducers({
  // Any reducers we create:
  alert: alertReducer,
  auth: authReducer,
  games: gamesReducer,
  cart: cartReducer,
  devs: devsReducer
});

export type RootState = ReturnType<typeof rootReducer>