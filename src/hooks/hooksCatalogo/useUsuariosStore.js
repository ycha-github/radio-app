import { useDispatch, useSelector } from "react-redux";
import radioApi from "../../api/radioApi";
import { onAddNewEvent, onSetActiveEvent,onUpdateEvent, onDeleteEvent,onLoadEvent } from "../../store/catalogo/usuariosSlice";
import { useState } from "react";

export const useUsuariosStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector( state => state.usuarios );
  const { user } = useSelector( state => state.auth );

  const setActiveEvent = ( zonasEvent ) => {

    dispatch( onSetActiveEvent(zonasEvent ));
  }
let idimagenIne ;
let idimagenCuip;

  const subirImagen = async(zonasEvent)=>{
    const {data}= await  radioApi.post(`/documentos/ine`,zonasEvent);
    console.log(data);
    idimagenIne=data.iddocumentos;
  }
  const subirImagen2 = async(zonasEvent)=>{
    const {data}= await  radioApi.post(`/documentos/cuip`, zonasEvent);
     console.log(data);
    idimagenCuip=data.iddocumentos;
  }
  const promesa= new Promise((resolve,reject)=>{
    setTimeout(()=>{
      resolve();
    },3500)
  });
  console.log(idimagenCuip)
  console.log(idimagenIne)
 
  const startSavingEvent =async (zonasEvent)=>{
    //TODO: Update event
    if(zonasEvent.idusuarios){
      //Actualizando
        const {data}=await promesa.then(()=>{ return radioApi.put(`/usuarios/${zonasEvent.idusuarios}`,{...zonasEvent, fk_documento_ine: idimagenIne, fk_documento_cuip:idimagenCuip})});
        dispatch(onUpdateEvent({...zonasEvent, user}));
        window.location.reload(true);
    }else{
      //creando
      const {data}=await promesa.then(()=>{ return radioApi.post('/usuarios', {...zonasEvent, fk_documento_ine: idimagenIne, fk_documento_cuip:idimagenCuip})});
      dispatch(onAddNewEvent({...zonasEvent, idusuarios:data.idusuarios, user}));
      window.location.reload(true);
    }
}

   const deleteEvent=async(zonasEvent, state)=>{
    const {data}= await  radioApi.delete(`/usuarios/${zonasEvent}`);
    dispatch(onUpdateEvent({zonasEvent,user}));
    window.location.reload(true);
    }
   
    const startLoadingEvents= async ()=>{
      try {
        const {data} = await radioApi.get('/usuarios')
        dispatch(onLoadEvent(data))
        // console.log('asdasd',{data});
      } catch (error) {
        console.log('Error cargando Eventos');
        console.log(error);
      }
    }
  return {
    // Propiedades
    activeEvent,
    events,
    user,
    hasEventSelected: !!activeEvent,
    // Metodos
    deleteEvent,
    setActiveEvent,
    startSavingEvent,
    startLoadingEvents,
    subirImagen,
    subirImagen2,
  }
}