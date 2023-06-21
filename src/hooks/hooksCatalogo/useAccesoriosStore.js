import { useDispatch, useSelector } from "react-redux"; 
import radioApi from "../../api/radioApi";
import { onAddNewEvent, onSetActiveEvent, onUpdateEvent, onDeleteEvent, onLoadEvent } from "../../store/catalogo/accesoriosSlice";

export const useAccesoriosStore= () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector( state => state.accesorios );
  const { user } = useSelector( state => state.auth );

  const setActiveEvent = ( zonasEvent ) => {

    dispatch( onSetActiveEvent(zonasEvent ));
  }
  const startSavingEvent =async(zonasEvent)=>{
    //TODO: Update event
    if(zonasEvent.idaccesorios){
      //Actualizando
        const {data}= await  radioApi.put(`/accesorios/${zonasEvent.idaccesorios}`,zonasEvent);
        dispatch(onUpdateEvent({...zonasEvent, user}));
        window.location.reload(true);
    }else{
      //creando
      const {data}= await radioApi.post('/accesorios', zonasEvent);
      dispatch(onAddNewEvent({...zonasEvent, idaccesorios:data.idaccesorios, user}));
      window.location.reload(true);
    }
  }
   const deleteEvent=async(zonasEvent, state)=>{
    const {data} = await  radioApi.delete(`/accesorios/${zonasEvent}`);
  dispatch(onUpdateEvent(zonasEvent,user));
  window.location.reload(true);
    }
    const startLoadingEvents= async ()=>{
      try {
        const { data } = await radioApi.get('/accesorios')
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