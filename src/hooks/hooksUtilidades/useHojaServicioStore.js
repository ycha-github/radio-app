import { useDispatch, useSelector } from "react-redux"; 
import { useNavigate } from "react-router-dom";
import radioApi from "../../api/radioApi";
import { onAddNewEvent, onSetActiveEvent, onUpdateEvent, onDeleteEvent, onLoadEvent } from "../../store/utilidades/hojaServicioSlice";

export const useHojaServicioStore= () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector( state => state.hojaServicio);
  const { user } = useSelector( state => state.auth );

  const setActiveEvent = ( zonasEvent ) => {

    dispatch( onSetActiveEvent(zonasEvent ));
  }
  const startSavingEvent =async(zonasEvent)=>{
    //TODO: Update event
    if(zonasEvent.idhojaservicios){
      //Actualizando
        const {data}= await  radioApi.put(`/hojasservicios/${zonasEvent.idhojaservicios}`,zonasEvent);
        dispatch(onUpdateEvent({...zonasEvent, user}));
        window.location.reload(true);
    }else{
      //creando
      const {data}= await radioApi.post('/hojasservicios', zonasEvent);
      dispatch(onAddNewEvent({...zonasEvent, idhojaservicios:data.idhojaservicios, user}));
       window.location.reload(true);
      //navigate('../hoja-servicio')
    }
  }
   const deleteEvent=async(zonasEvent, state)=>{
    const {data} = await  radioApi.delete(`/hojasservicios/${zonasEvent}`);
  dispatch(onUpdateEvent(zonasEvent,user));
  window.location.reload(true);
  
    }

    const startLoadingEvents= async ()=>{
      try {
        const { data } = await radioApi.get('/hojasservicios')
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