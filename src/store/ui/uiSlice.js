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
        state.isActualizar = false;
    },
    onCloseModal: (state)=> {
        state.isModalOpen = false;
        state.isActualizar = false;
    },
    onModalActualizar: (state)=> {
        state.isModalOpen = true;
        state.isActualizar = true;
    },
  },
})

// Action creators are generated for each case reducer function
export const { onOpenModal, onCloseModal, onModalActualizar } = uiSlice.actions;