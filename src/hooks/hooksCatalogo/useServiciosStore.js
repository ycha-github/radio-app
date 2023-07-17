import { useDispatch, useSelector } from "react-redux";
import radioApi from "../../api/radioApi";
import { onAddNewEvent, onSetActiveEvent, onUpdateEvent, onLoadEvent } from "../../store/catalogo/serviciosSlice";

export const useServiciosStore= () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector( state => state.servicios );
  const { user } = useSelector( state => state.auth );

  const setActiveEvent = ( zonasEvent ) => {
    dispatch( onSetActiveEvent(zonasEvent ));
  }
  const startSavingEvent =async(zonasEvent)=>{
    //TODO: Update event
    if(zonasEvent.idservicios){
      //Actualizando
        const {data}= await  radioApi.put(`/servicios/${zonasEvent.idservicios}`,zonasEvent);
        dispatch(onUpdateEvent({...zonasEvent, user}));
        window.location.reload(true);
    }else{
      //creando
      const {data}= await radioApi.post('/servicios', zonasEvent);
      dispatch(onAddNewEvent({...zonasEvent, idservicios:data.idservicios, user}));
      window.location.reload(true);
    }
  }

   const deleteEvent=async(zonasEvent, state)=>{
    console.log(zonasEvent.idservicios);
    const {data} = await  radioApi.delete(`/servicios/${zonasEvent}`);
  dispatch(onUpdateEvent(zonasEvent,user));
  window.location.reload(true);
    }

    const startLoadingEvents= async ()=>{
      try {
        const { data } = await radioApi.get('/servicios')
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
    user,
    hasEventSelected: !!activeEvent,
    // Metodos
    deleteEvent,
    setActiveEvent,
    startSavingEvent,
    startLoadingEvents,
  }
}