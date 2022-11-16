import { useDispatch, useSelector } from "react-redux";
import radioApi from "../../api/radioApi";
import { onAddNewEvent, onSetActiveEvent,onUpdateEvent, onDeleteEvent,onLoadEvent } from "../../store/catalogo/estatusSlice";

export const useEstatusStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector( state => state.estatus );
  const { user } = useSelector( state => state.auth );

  const setActiveEvent = ( zonasEvent ) => {

    dispatch( onSetActiveEvent(zonasEvent ));
  }
  const startSavingEvent =async(zonasEvent)=>{
    //TODO: Update event
    if(zonasEvent.id_sue){
      //Actualizando
        const {data}= await  radioApi.put(`/sue/${zonasEvent.id_sue}`,zonasEvent);
        dispatch(onUpdateEvent({...zonasEvent, user}));
    }else{
      //creando
      const {data}= await radioApi.post('/sue', zonasEvent);
      dispatch(onAddNewEvent({...zonasEvent, id_sue:data.id_sue, user}));
      window.location.reload(true);
    }
  }
   const deleteEvent=async(zonasEvent, state)=>{
    const {data}= await  radioApi.delete(`/sue/${zonasEvent.id_sue}`);
    dispatch(onUpdateEvent({zonasEvent,user}));
    //window.location.reload(true);
    }

    const startLoadingEvents= async ()=>{
      try {
        const {data} = await radioApi.get('/sue')
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
  }
}