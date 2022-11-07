import { createSlice } from '@reduxjs/toolkit';
export const radioSlice = createSlice({
  name: 'radio',
  initialState:{
      rowsa:[],
      activeEvent: null

  },
  reducers: {
    increment: (state,/* action */) => {
      state.counter += 1;
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment } = radioSlice.actions;