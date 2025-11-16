import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export type CounterState = {
  value: number;
};

export const initialState: CounterState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value++;
    },
    decrement: (state) => {
      state.value--;
    },
    add: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
  selectors: {
    get: (state) => state.value,
  },
});

export const { get } = counterSlice.selectors;
export const { increment, decrement, add } = counterSlice.actions;

export default counterSlice.reducer;
