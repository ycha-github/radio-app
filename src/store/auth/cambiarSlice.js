import { createSlice } from '@reduxjs/toolkit';


export const cambiarSlice = createSlice({
  name: 'cambiar',
  initialState:{
    errorMessage: undefined,
  },
  reducers: {
    onShowError: ( state, { payload } ) => {
      state.errorMessage = payload;
  },
  clearErrorMessage:(state)=>{
    state.errorMessage = undefined;
},
  }
});
// Action creators are generated for each case reducer function
export const { onShowError, clearErrorMessage } = cambiarSlice.actions;