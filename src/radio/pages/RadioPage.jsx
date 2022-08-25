import { Routes, Route } from 'react-router-dom'
import { RadioLayout } from '../layout/RadioLayout';
import { Accesorios, Asignaciones, ConfiguracionReportes, Corporaciones, Estatus, GruposPermisos, HistorialEntradas, HojaServicios, Marcas, PasswordUpdate, Permisos, Puestos, Radios, RecursoCompras, RegistroVisitas, Roles, Servicios, Tipos, Users, UsuariosRadios, Vehiculos, ZonasRegiones } from '../views';


export const RadioPage = () => {
  return (
    <RadioLayout>

      <Routes>

          <Route path="/users" element={ <Users /> } />
          <Route path="/roles" element={ <Roles /> } />
          <Route path="/permisos" element={ <Permisos /> } />
          <Route path="/grupos-permisos" element={ <GruposPermisos /> } />
          <Route path="/visitas" element={ <RegistroVisitas /> } />
          
          <Route path="/accesorios" element={ <Accesorios/> } />
          <Route path="/corporaciones" element={ <Corporaciones/> }/>
          <Route path="/marcas" element={ <Marcas/> }/>
          <Route path="/puestos" element={ <Puestos /> }/>
          <Route path="/radios" element={ <Radios /> }/>
          <Route path="/recursos" element={ <RecursoCompras /> }/>
          <Route path="/servicios" element={ <Servicios /> }/>
          <Route path="/estatus" element={ <Estatus /> }/>
          <Route path="/tipos" element={ <Tipos /> }/>
          <Route path="/usuarios-radios" element={ <UsuariosRadios /> }/>
          <Route path="/vehiculos" element={ <Vehiculos /> }/>
          <Route path="/zonas-regiones" element={ <ZonasRegiones /> }/>

          <Route path="/asignaciones" element={ <Asignaciones /> }/>
          <Route path="/hoja-servicio" element={ <HojaServicios /> }/>
          <Route path="/historial-entradas" element={ <HistorialEntradas /> }/>
          <Route path="/config-reportes" element={ <ConfiguracionReportes /> }/>

          <Route path="/pass-update" element={ <PasswordUpdate /> }/>

     </Routes>

    </RadioLayout>
  )
}
