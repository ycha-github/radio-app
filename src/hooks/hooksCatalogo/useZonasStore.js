import { useDispatch, useSelector } from "react-redux";
import radioApi from "../../api/radioApi";
import { onAddNewEvent, onSetActiveEvent,onUpdateEvent, onDeleteEvent,onLoadEvent } from "../../store/catalogo/zonasSlice";

export const useZonasStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector( state => state.zonas );
  const { user } = useSelector( state => state.auth );

  const setActiveEvent = ( zonasEvent ) => {

    dispatch( onSetActiveEvent(zonasEvent ));
  }
  const startSavingEvent =async(zonasEvent)=>{
    //TODO: Update event
    if(zonasEvent.idzonasregiones){
      //Actualizando
        const {data}= await  radioApi.put(`/zonasregiones/${zonasEvent.idzonasregiones}`,zonasEvent);
        dispatch(onUpdateEvent({...zonasEvent, user}));
    }else{
      //creando
      const {data}= await radioApi.post('/zonasregiones', zonasEvent);
      dispatch(onAddNewEvent({...zonasEvent, idzonasregiones:data.idzonasregiones, user}));
    }
  }
   const deleteEvent=async(zonasEvent, state)=>{
    const {data}= await  radioApi.put(`/zonasregiones/status/${zonasEvent.idzonasregiones}`,zonasEvent.idzonasregiones);
      dispatch(onDeleteEvent());
    }

    const startLoadingEvents= async ()=>{
      try {
        
        const {data} = await radioApi.get('/zonasregiones')
        dispatch(onLoadEvent(data))
        console.log({data});

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