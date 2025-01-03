import { useDispatch, useSelector } from "react-redux"; 
import { useNavigate } from "react-router-dom";
import radioApi from "../../api/radioApi";
import { onAddNewEvent, onSetActiveEvent, onUpdateEvent, onDeleteEvent, onLoadEvent } from "../../store/utilidades/hojaServicioSlice";
// import { onShowError } from "../../store";
import { onShowError,clearErrorMessage } from "../../store/auth/cambiarSlice";

export const useHojaServicioStore= () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector( state => state.hojaServicio);
  const {errorMessage} = useSelector( state => state.cambiar );
  const { user } = useSelector( state => state.auth );

  const setActiveEvent = ( zonasEvent ) => {

    dispatch( onSetActiveEvent(zonasEvent ));
  }
  const limpiarActiveEvent=()=>{
    dispatch( onSetActiveEvent(""));
  };
//  let folio;
//  let fecha;
//   const consultarUltimoRegistro= async ()=>{
//       const { data } = await radioApi.get('/hojasservicios/ultimo')
      // console.log(data)
      // const nuevaFecha = new Date(data.createdAt);
      // let options = { year: 'numeric' }
      // let year = nuevaFecha.toLocaleString('es-MX', options); 
      // folio=data.folio;
      // fecha=year;
    //console.log(year)
  //}
//console.log(folio)
//console.log(fecha)
let foto1;
  let foto2;

  const subirImagen = async(zonasEvent)=>{
    const {data}= await  radioApi.post(`/documentos/evidencia`, zonasEvent);
    console.log(data);
    foto1=data.iddocumentos;
  }
  const subirImagen2 = async(zonasEvent)=>{
    const {data}= await  radioApi.post(`/documentos/evidencia`, zonasEvent);
    console.log(data);
    foto2=data.iddocumentos;
  }
   const promesa= new Promise((resolve,reject)=>{
     setTimeout(()=>{
       resolve();
     },3500)
   });
// console.log(foto1)
// console.log(foto2)
  const startSavingEvent =async(zonasEvent)=>{
    // promesa.then(()=>{
      console.log(zonasEvent)
    //TODO: Update event

    zonasEvent.fk_foto1 != null? foto1=foto1:foto1=null
    zonasEvent.fk_foto2 != null? foto2=foto2:foto2=null
    if(zonasEvent.idhojaservicios){
      
      //Actualizando
      try{
        const {data}= await promesa.then(()=>{ return radioApi.put(`/hojasservicios/${zonasEvent.idhojaservicios}`,{...zonasEvent, fk_foto1:foto1, fk_foto2:foto2})});
        dispatch(onUpdateEvent({...zonasEvent, user}));
        window.location.reload(true);
      }
      catch (error) {
        dispatch(onShowError(error.response.data?.message || '---'));
        setTimeout(()=>{
          dispatch(clearErrorMessage());
      },5);
      //navigate('../hoja-servicio')
   
    }

    }else{
      //creando
      try{
      const {data}=await promesa.then(()=>{ return radioApi.post('/hojasservicios', {...zonasEvent, fk_foto1:foto1, fk_foto2:foto2}) });
      dispatch(onAddNewEvent({...zonasEvent, idhojaservicios:data.idhojaservicios, user}));
      window.location.reload(true);
      }
      catch (error) {
        dispatch(onShowError(error.response.data?.message || '---'));
        setTimeout(()=>{
          dispatch(clearErrorMessage());
      },5);
      //navigate('../hoja-servicio')
   
    }
  }
  // })
  }
   const deleteEvent=async(zonasEvent, state)=>{
    const {data} = await  radioApi.delete(`/hojasservicios/${zonasEvent}`);
  dispatch(onUpdateEvent(zonasEvent,user));
  window.location.reload(true);
  
    }

    const startLoadingEvents= async ()=>{
      try {
        const { data } = await radioApi.get('/hojasservicios')
        dispatch(onLoadEvent(data))
      
      } catch (error) {
        console.log('Error cargando Eventos');
        console.log(error);
      }
    }
  return {
    // Propiedades
    activeEvent,
    errorMessage,
    events,
    user,
    hasEventSelected: !!activeEvent,
    // Metodos
    //consultarUltimoRegistro,
    limpiarActiveEvent,
    deleteEvent,
    setActiveEvent,
    startSavingEvent,
    startLoadingEvents,
    subirImagen,
    subirImagen2,
  }
}