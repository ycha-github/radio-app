import { Routes, Route } from 'react-router-dom';
import { FormHojaServicio } from '../components/formUtilidades/FormHojaServicio';
import { RadioLayout } from '../layout/RadioLayout';
import { Accesorios, Asignaciones, ConfigReportes, Corporaciones, HojaServicios, Marcas, PasswordUpdate,  Puestos, Radios, RecursoCompras, Roles, Servicios, Users, UsuariosRadios, Vehiculos, ZonasRegiones } from '../views';
import { FormAsignaciones } from '../components/formUtilidades/FormAsignaciones';
import { CrearPdf } from '../views/utilidades/CrearPdf';
import { PDFViewer } from '@react-pdf/renderer';
import { useAsignacionesStore } from '../../hooks/hooksUtilidades/useAsignacionesStore';
import { useState } from 'react';
import { useAuthStore } from '../../hooks';

export const RadioPage = () => {

  const { activeEvent } = useAsignacionesStore();
  const {user}= useAuthStore();
//  const [valor,setValor]= useState(JSON.parse(localStorage.getItem('datos')))
//  localStorage.setItem("datos", JSON.stringify(activeEvent));
//const dat = JSON.parse(localStorage.getItem('datos'))
//console.log(valor);
  return (
    
    <RadioLayout>

      <Routes>

          <Route path="users" element={user.rol=== 1?  <Users />:<Asignaciones /> } />
          <Route path="roles" element={user.rol=== 1?  <Roles />:<Asignaciones /> } />
          
          
          {/* <Route path="visitas" element={ <RegistroVisitas /> } /> */}

          <Route path="accesorios" element={ <Accesorios/> } />
          <Route path="corporaciones" element={ <Corporaciones/> }/>
          <Route path="marcas" element={ <Marcas/> }/>
          <Route path="puestos" element={ <Puestos /> }/>
          <Route path="radios" element={ <Radios /> }/>
          <Route path="recursos" element={ <RecursoCompras /> }/>
          <Route path="servicios" element={ <Servicios /> }/>
          <Route path="usuarios-radios" element={ <UsuariosRadios /> }/>
          <Route path="vehiculos" element={ <Vehiculos /> }/>
          <Route path="zonas-regiones" element={ <ZonasRegiones /> }/>

          <Route path="/" element={ <Asignaciones /> }/>
          <Route path="asignaciones" element={ <FormAsignaciones/> }/>
          <Route path="hoja-servicio" element={ <HojaServicios /> }/>
          <Route path="mostrar-pdf" element={<CrearPdf datos= {activeEvent}/> }/>
          {/* <Route path="hoja-serviciof" element={ <FormHojaServicio /> }/> */}
          <Route path="config-reportes" element={user.rol=== 1? <ConfigReportes />:<Asignaciones /> }/>

          <Route path="pass-update" element={ <PasswordUpdate /> }/>

     </Routes>

    </RadioLayout>
  )
}