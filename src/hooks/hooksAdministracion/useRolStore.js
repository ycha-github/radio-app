import { useDispatch, useSelector } from "react-redux";
import radioApi from "../../api/radioApi";
import { onAddNewEvent, onSetActiveEvent, onUpdateEvent, onDeleteEvent, onLoadEvent } from "../../store/administracion/rolSlice";
 
export const useRolStore= () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector( state => state.rol );
  const { user } = useSelector( state => state.auth );

  const setActiveEvent = ( zonasEvent ) => {

    dispatch( onSetActiveEvent(zonasEvent ));
  }
  const startSavingEvent =async(zonasEvent)=>{
    //TODO: Update event
    if(zonasEvent.idrol){
      //Actualizando
        const {data}= await  radioApi.put(`/roles/${zonasEvent.idrol}`,zonasEvent);
        dispatch(onUpdateEvent({...zonasEvent, user}));
    }else{
      //creando
      const {data}= await radioApi.post('/roles', zonasEvent);
      dispatch(onAddNewEvent({...zonasEvent, idrol:data.idrol, user}));
      window.location.reload(true);
    }
  }
   const deleteEvent=async(zonasEvent, state)=>{
    const {data} = await  radioApi.delete(`/roles/${zonasEvent.idrol}`);
  dispatch(onUpdateEvent(zonasEvent,user));
  window.location.reload(true);
    }

    const startLoadingEvents= async ()=>{
      try {
        const { data } = await radioApi.get('/roles')
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