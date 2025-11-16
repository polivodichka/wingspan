import { combineReducers, configureStore } from "@reduxjs/toolkit";

import type { AppState } from "./modules/app";
import appReducer, { appSlice } from "./modules/app";
import counterReducer, { counterSlice } from "./modules/counter";
import { CounterState } from "./modules/counter";

export type ServerState = Readonly<{
  [appSlice.name]: AppState;
  [counterReducer.name]: CounterState;
}>;

export const rootReducer = combineReducers({
  [appSlice.name]: appReducer,
  [counterSlice.name]: counterReducer,
});

export type ApplicationState = ReturnType<typeof rootReducer>;

const store = configureStore({ reducer: rootReducer });
export default store;
