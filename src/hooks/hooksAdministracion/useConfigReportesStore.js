import { useDispatch, useSelector } from "react-redux";
import radioApi from "../../api/radioApi";
import { onAddNewEvent, onSetActiveEvent,onUpdateEvent, onDeleteEvent,onLoadEvent } from "../../store/administracion/configReportesSlice";

export const useConfigReportesStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector( state => state.configReportes );
  const { user } = useSelector( state => state.auth );

  const setActiveEvent = ( zonasEvent ) => {

    dispatch( onSetActiveEvent(zonasEvent ));
  }

  let idLogoSsypc;
  let idLogoC4;

  const subirImagen = async(zonasEvent)=>{
    const {data}= await  radioApi.post(`/documentos`, zonasEvent);
    console.log(data);
    idLogoC4=data.iddocumentos;
  }
  const subirImagen2 = async(zonasEvent)=>{
    const {data}= await  radioApi.post(`/documentos`, zonasEvent);
    console.log(data);
    idLogoSsypc=data.iddocumentos;
  }
  const promesa= new Promise((resolve,reject)=>{
    setTimeout(()=>{
      resolve();
    },3500)
  });
console.log(idLogoC4)
console.log(idLogoSsypc)
  const startSavingEvent =async(zonasEvent)=>{
    
    //TODO: Update event
    if(zonasEvent.idconfigReportes){
      //Actualizando
        const {data}=await promesa.then(()=>{ return radioApi.put(`/configreportes/${zonasEvent.idconfigReportes}`,{...zonasEvent, fk_logo_c4: idLogoC4, fk_logo_ssypc:idLogoSsypc})});
        dispatch(onUpdateEvent({...zonasEvent, user}));
        window.location.reload(true);
    }else{
      //creando
      const {data}=await promesa.then(()=>{return radioApi.post('/configreportes', {...zonasEvent, fk_logo_c4: idLogoC4, fk_logo_ssypc:idLogoSsypc})});
      dispatch(onAddNewEvent({...zonasEvent, idconfigReportes:data.idconfigReportes, user}));
      window.location.reload(true);
    }
  
}
   const deleteEvent=async(zonasEvent, state)=>{
    const {data}= await  radioApi.delete(`/configreportes/${zonasEvent}`);
    dispatch(onUpdateEvent({zonasEvent,user}));
    window.location.reload(true);
    }

  
    const startLoadingEvents= async ()=>{
      try {
        const {data} = await radioApi.get('/configreportes')
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