import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth';
import { uiSlice} from './ui/uiSlice';
import { accesoriosSlice, zonasSlice } from './catalogo';
import { userSlice } from './administracion/userSlice';
//import { accesoriosSlice } from './catalogo/accesoriosSlice';

export const store = configureStore({
  
  reducer: {
    ui: uiSlice.reducer,
    zonas: zonasSlice.reducer,
    accesorios: accesoriosSlice.reducer,
    auth: authSlice.reducer,
    users: userSlice.reducer,
    //serv: serviciosSlice.reducer,
  },
  middleware:(getDefaultMiddleware)=>getDefaultMiddleware({
    serializableCheck: false
  })
});
