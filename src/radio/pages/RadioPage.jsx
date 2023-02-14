import { Routes, Route } from 'react-router-dom';
import { RadioLayout } from '../layout/RadioLayout';
import { Accesorios, Asignaciones, ConfigReportes, Corporaciones, Estatus,  HojaServicios, Marcas, PasswordUpdate,  Puestos, Radios, RecursoCompras, Roles, Servicios, Tipos, Users, UsuariosRadios, Vehiculos, ZonasRegiones } from '../views';

export const RadioPage = () => {
  return (
    <RadioLayout>

      <Routes>

          <Route path="users" element={ <Users /> } />
          <Route path="roles" element={ <Roles /> } />
          
          
          {/* <Route path="visitas" element={ <RegistroVisitas /> } /> */}

          <Route path="accesorios" element={ <Accesorios/> } />
          <Route path="corporaciones" element={ <Corporaciones/> }/>
          <Route path="marcas" element={ <Marcas/> }/>
          <Route path="puestos" element={ <Puestos /> }/>
          <Route path="radios" element={ <Radios /> }/>
          <Route path="recursos" element={ <RecursoCompras /> }/>
          <Route path="servicios" element={ <Servicios /> }/>
          <Route path="estatus" element={ <Estatus /> }/>
          <Route path="tipos" element={ <Tipos /> }/>
          <Route path="usuarios-radios" element={ <UsuariosRadios /> }/>
          <Route path="vehiculos" element={ <Vehiculos /> }/>
          <Route path="zonas-regiones" element={ <ZonasRegiones /> }/>

          <Route path="/" element={ <Asignaciones /> }/>
          <Route path="hoja-servicio" element={ <HojaServicios /> }/>
          <Route path="config-reportes" element={ <ConfigReportes /> }/>

          <Route path="pass-update" element={ <PasswordUpdate /> }/>

     </Routes>

    </RadioLayout>
  )
}