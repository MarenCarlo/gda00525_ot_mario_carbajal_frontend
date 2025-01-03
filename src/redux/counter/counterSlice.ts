import { createSlice } from '@reduxjs/toolkit'

type CounterState = {
  totalCount: number;
};

const initialState: CounterState = {
  totalCount: 0,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState: initialState,
  reducers: {
    increment: (state) => {
      state.totalCount += 1;
    },
    decrement: (state) => {
      state.totalCount -= 1;
    }
  }
})

export const { increment, decrement } = counterSlice.actions
export default counterSlice.reducer