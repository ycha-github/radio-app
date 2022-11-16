import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth';
import { uiSlice} from './ui/uiSlice';
import { accesoriosSlice, corporacionesSlice, estatusSlice, marcasSlice, puestosSlice, RadiosSlice, recursosSlice, tiposSlice, usuariosSlice, vehiculosSlice, zonasSlice } from './catalogo';
import { userSlice } from './administracion/userSlice';

//import { accesoriosSlice } from './catalogo/accesoriosSlice';

export const store = configureStore({
  
  reducer: {
    ui: uiSlice.reducer,
    zonas: zonasSlice.reducer,
    accesorios: accesoriosSlice.reducer,
    corporaciones: corporacionesSlice.reducer,
    marcas: marcasSlice.reducer,
    puestos: puestosSlice.reducer,
    radios: RadiosSlice.reducer,
    recursos: recursosSlice.reducer,
    estatus: estatusSlice.reducer,
    tipos: tiposSlice.reducer,
    usuarios: usuariosSlice.reducer,
    vehiculos: vehiculosSlice.reducer,
    auth: authSlice.reducer,
    users: userSlice.reducer,
    //serv: serviciosSlice.reducer,
  },
  middleware:(getDefaultMiddleware)=>getDefaultMiddleware({
    serializableCheck: false
  })
});
