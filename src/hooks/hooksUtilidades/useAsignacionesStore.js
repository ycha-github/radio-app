import { useDispatch, useSelector } from "react-redux"; 
import radioApi from "../../api/radioApi";
import { onAddNewEvent, onSetActiveEvent, onUpdateEvent, onDeleteEvent, onLoadEvent } from "../../store/utilidades/asignacionesSlice";

export const useAsignacionesStore= () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector( state => state.asignaciones );
  const { user } = useSelector( state => state.auth );

  const setActiveEvent = ( zonasEvent ) => {

    dispatch( onSetActiveEvent(zonasEvent ));
  }
  const startSavingEvent =async(zonasEvent)=>{
    //TODO: Update event
    if(zonasEvent.asignacion_usuario_radiocol){
      //Actualizando
        const {data}= await  radioApi.put(`/asig_usuarios/${zonasEvent.asignacion_usuario_radiocol}`,zonasEvent);
        dispatch(onUpdateEvent({...zonasEvent, user}));
    }else{
      //creando
      const {data}= await radioApi.post('/asig_usuarios', zonasEvent);
      dispatch(onAddNewEvent({...zonasEvent, asignacion_usuario_radiocol:data.asignacion_usuario_radiocol, user}));
      window.location.reload(true);
    }
  }
   const deleteEvent=async(zonasEvent, state)=>{
    console.log(zonasEvent);
    const {data} = await  radioApi.delete(`/asig_usuarios/${zonasEvent}`);
  dispatch(onUpdateEvent(zonasEvent,user));
  window.location.reload(true);
    }

    const startLoadingEvents= async ()=>{
      try {
        const { data } = await radioApi.get('/asig_usuarios')
        dispatch(onLoadEvent(data))
      
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
  }
}