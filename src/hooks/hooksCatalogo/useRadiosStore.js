import { useDispatch, useSelector } from "react-redux";
import radioApi from "../../api/radioApi";
import { onAddNewEvent, onSetActiveEvent,onUpdateEvent, onDeleteEvent,onLoadEvent } from "../../store/catalogo/radiosSlice";

export const useRadiosStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector( state => state.radios );
  const { user } = useSelector( state => state.auth );

  const setActiveEvent = ( zonasEvent ) => {

    dispatch( onSetActiveEvent(zonasEvent ));
  }
  const startSavingEvent1 =async(zonasEvent)=>{
    //TODO: Update event
    if(zonasEvent.idradios){
      //Actualizando
        const {data}= await  radioApi.put(`/radios/${zonasEvent.idradios}`,zonasEvent);
        dispatch(onUpdateEvent({...zonasEvent, user}));
        window.location.reload(true);
    }else{
      //creando
      const {data}= await radioApi.post('/radios', zonasEvent); 
      dispatch(onAddNewEvent({...zonasEvent, idradios:data.idradios, user}));
      window.location.reload(true);
    }
  }
   const deleteEvent=async(zonasEvent, state)=>{
    const {data}= await  radioApi.delete(`/radios/${zonasEvent}`);
    dispatch(onUpdateEvent({zonasEvent,user}));
    window.location.reload(true);
    }

    const startLoadingEvents= async ()=>{
      try {
        const {data} = await radioApi.get('/radios')
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
    startSavingEvent1,
    startLoadingEvents,
  }
}