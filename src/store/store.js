import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth';
import { uiSlice} from './ui/uiSlice';
import { zonasSlice } from './catalogo/zonasSlice';

export const store = configureStore({
  
  reducer: {
    ui: uiSlice.reducer,
    zonas: zonasSlice.reducer,
    auth: authSlice.reducer,
    //serv: serviciosSlice.reducer,
  },
  middleware:(getDefaultMiddleware)=>getDefaultMiddleware({
    serializableCheck: false
  })
});
