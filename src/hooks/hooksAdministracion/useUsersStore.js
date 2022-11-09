import { useDispatch, useSelector } from "react-redux";
import radioApi from "../../api/radioApi";
import { onAddNewEvent, onSetActiveEvent, onUpdateEvent, onDeleteEvent, onLoadEvent } from "../../store/administracion/userSlice";

export const useUsersStore= () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector( state => state.users );
  const { user } = useSelector( state => state.auth );

  const setActiveEvent = ( zonasEvent ) => {

    dispatch( onSetActiveEvent(zonasEvent ));
  }
  const startSavingEvent =async(zonasEvent)=>{
    //TODO: Update event
    if(zonasEvent.idusers){
      //Actualizando
        const {data}= await  radioApi.put(`/users/${zonasEvent.idusers}`,zonasEvent);
        dispatch(onUpdateEvent({...zonasEvent, user}));
    }else{
      //creando
      const {data}= await radioApi.post('/users', zonasEvent);
      dispatch(onAddNewEvent({...zonasEvent, idusers:data.idusers, user}));
      window.location.reload(true);
    }
  }
   const deleteEvent=async(zonasEvent, state)=>{
    const {data} = await  radioApi.delete(`/users/${zonasEvent.idusers}`);
  dispatch(onUpdateEvent(zonasEvent,user));
  window.location.reload(true);
    }

    const startLoadingEvents= async ()=>{
      try {
        const { data } = await radioApi.get('/users')
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