import { useDispatch, useSelector } from "react-redux";
import radioApi from "../../api/radioApi";
import { onAddNewEvent, onSetActiveEvent,onUpdateEvent, onDeleteEvent,onLoadEvent } from "../../store/catalogo/puestosSlice";

export const usePuestosStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector( state => state.puestos );
  const { user } = useSelector( state => state.auth ); 

  const setActiveEvent = ( zonasEvent ) => {

    dispatch( onSetActiveEvent(zonasEvent ));
  }
  const startSavingEvent =async(zonasEvent)=>{
    //TODO: Update event
    if(zonasEvent.idpuesto){
      //Actualizando
        const {data}= await  radioApi.put(`/puestos/${zonasEvent.idpuesto}`,zonasEvent);
        dispatch(onUpdateEvent({...zonasEvent, user}));
        window.location.reload(true);
    }else{
      //creando
      const {data}= await radioApi.post('/puestos', zonasEvent);
      dispatch(onAddNewEvent({...zonasEvent, idpuesto:data.idpuesto, user}));
      window.location.reload(true);
    }
  }
   const deleteEvent=async(zonasEvent, state)=>{
    const {data}= await  radioApi.delete(`/puestos/${zonasEvent}`);
    dispatch(onUpdateEvent({zonasEvent,user}));
    window.location.reload(true);
    }

    const startLoadingEvents= async ()=>{
      try {
        const {data} = await radioApi.get('/puestos')
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
    user,
    hasEventSelected: !!activeEvent,
    // Metodos
    deleteEvent,
    setActiveEvent,
    startSavingEvent,
    startLoadingEvents,
  }
}