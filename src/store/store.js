import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth';
import { serviciosSlice } from './servicios';
import { uiSlice } from './ui/uiSlice';

export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    auth: authSlice.reducer,
    serv: serviciosSlice.reducer,
  },
});