import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
  name: 'ui',
  initialState:{
      isModalOpen: false,
      isActualizar: false,
  },
  reducers: {
    onOpenModal: (state)=> {
        state.isModalOpen = true;
    },
    onCloseModal: (state)=> {
        state.isModalOpen = false;
    },
    onClickActualizar: (state)=> {
        state.isActualizar = true;
    },
  },
})

// Action creators are generated for each case reducer function
export const { onOpenModal, onCloseModal, onClickActualizar } = uiSlice.actions;