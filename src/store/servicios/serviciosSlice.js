import { createSlice } from '@reduxjs/toolkit';

export const serviciosSlice = createSlice({
    name: 'servicios',
    initialState: {
        isActualizar: false,
    },
    reducers: {
        IsUpdate: (state) => {
            state.isActualizar = true;
        },
    }
});


// Action creators are generated for each case reducer function
export const { IsUpdate } = serviciosSlice.actions;