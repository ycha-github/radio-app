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
import { ConsultaPo } from '../views/utilidades/ConsultaPo';

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

          <Route path="users" element={ user.rol=== 1 ?  <Users /> : <Asignaciones /> } />
          <Route path="roles" element={ user.rol=== 1 ?  <Roles /> : <Asignaciones /> } />
          
          
          {/* <Route path="visitas" element={ <RegistroVisitas /> } /> */}

          <Route path="accesorios" element={ user.rol===4 ? <ConsultaPo /> : <Accesorios/> } />
          <Route path="corporaciones" element={ user.rol===4 ? <ConsultaPo /> : <Corporaciones/> }/>
          <Route path="marcas" element={ user.rol===4 ? <ConsultaPo /> : <Marcas/> }/>
          <Route path="puestos" element={ user.rol===4 ? <ConsultaPo /> : <Puestos /> }/>
          <Route path="radios" element={ user.rol===4 ? <ConsultaPo /> : <Radios /> }/>
          <Route path="recursos" element={ user.rol===4 ? <ConsultaPo /> : <RecursoCompras /> }/>
          <Route path="servicios" element={ user.rol===4 ? <ConsultaPo /> : <Servicios /> }/>
          <Route path="usuarios-radios" element={ user.rol===4 ? <ConsultaPo /> : <UsuariosRadios /> }/>
          <Route path="vehiculos" element={ user.rol===4 ? <ConsultaPo /> : <Vehiculos /> }/>
          <Route path="zonas-regiones" element={ user.rol===4 ? <ConsultaPo /> : <ZonasRegiones /> }/>

          <Route path="/" element={ user.rol===4 ? <ConsultaPo /> : <Asignaciones /> }/>
          <Route path="asignaciones" element={ user.rol===4 ? <ConsultaPo /> : <FormAsignaciones/> }/>
          <Route path="consulta-po" element={ user.rol===4 ? <ConsultaPo /> : < ConsultaPo /> }/>
          <Route path="hoja-servicio" element={ user.rol===4 ? <ConsultaPo /> : <HojaServicios /> }/>
          <Route path="mostrar-pdf" element={ user.rol===4 ? <ConsultaPo /> : <CrearPdf datos= {activeEvent}/> }/>
          {/* <Route path="hoja-serviciof" element={ <FormHojaServicio /> }/> */}
          <Route path="config-reportes" element={user.rol=== 1 ? <ConfigReportes /> : <Asignaciones /> }/>

          <Route path="pass-update" element={ user.rol===4 ? <ConsultaPo /> : <PasswordUpdate /> }/>

     </Routes>

    </RadioLayout>
  )
}