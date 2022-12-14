import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth';
import { uiSlice} from './ui/uiSlice';
import { accesoriosSlice, corporacionesSlice, estatusSlice, marcasSlice, puestosSlice, RadiosSlice, recursosSlice, serviciosSlice, tiposSlice, usuariosSlice, vehiculosSlice, zonasSlice } from './catalogo';
import { rolSlice, userSlice } from './administracion';
import { cambiarSlice } from './auth/cambiarSlice';

//import { accesoriosSlice } from './catalogo/accesoriosSlice';

export const store = configureStore({
  
  reducer: {
    ui: uiSlice.reducer,
    auth: authSlice.reducer,
    users: userSlice.reducer,
    rol: rolSlice.reducer,
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
    zonas: zonasSlice.reducer,
    servicios: serviciosSlice.reducer,
    cambiar: cambiarSlice.reducer,
  },
  middleware:(getDefaultMiddleware)=>getDefaultMiddleware({
    serializableCheck: false
  })
});
