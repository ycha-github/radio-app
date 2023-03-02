import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
  name: 'ui',
  initialState:{
      isModalOpen: false,
      isActualizar: false,
      isVer: false,
  },
  reducers: {
    onOpenModal: (state)=> {
        state.isModalOpen = true;
    },
    onCloseModal: (state)=> {
        state.isModalOpen = false;
        state.isVer = false;
    },
    onGuardar: (state)=> {
        state.isActualizar = false;
    },
    onActualizar: (state)=> {
        state.isActualizar = true;
    },
    onVer: (state)=> {
        state.isVer = true;
    }
  },
})

// Action creators are generated for each case reducer function
export const { onOpenModal, onCloseModal, onGuardar, onActualizar, onVer } = uiSlice.actions;