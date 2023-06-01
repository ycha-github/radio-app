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
  const startSavingEvent =async(zonasEvent)=>{
    //TODO: Update event
    if(zonasEvent.idconfigReportes){
      //Actualizando
        const {data}= await  radioApi.put(`/configreportes/${zonasEvent.idconfigReportes}`,zonasEvent);
        dispatch(onUpdateEvent({...zonasEvent, user}));
    }else{
      //creando
      const {data}= await radioApi.post('/configreportes', zonasEvent);
      dispatch(onAddNewEvent({...zonasEvent, idconfigReportes:data.idconfigReportes, user}));
      //window.location.reload(true);
    }
  }
   const deleteEvent=async(zonasEvent, state)=>{
    const {data}= await  radioApi.delete(`/configreportes/${zonasEvent}`);
    dispatch(onUpdateEvent({zonasEvent,user}));
    window.location.reload(true);
    }

    const subirImagen = async(zonasEvent)=>{
      console.log(zonasEvent);
      const {data}= await  radioApi.post(`/documentos`, zonasEvent);
    }
    const subirImagen2 = async(zonasEvent)=>{
      console.log(zonasEvent);
      const {data}= await  radioApi.post(`/documentos`, zonasEvent);
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