import { useDispatch, useSelector } from "react-redux"; 
import radioApi from "../../api/radioApi";
import { onAddNewEvent, onSetActiveEvent, onUpdateEvent, onDeleteEvent, onLoadEvent, onFiltrar } from "../../store/utilidades/asignacionesSlice";

export const useAsignacionesStore= () => {
  const dispatch = useDispatch();
  const { events, activeEvent, accesoriosFiltrado } = useSelector( state => state.asignaciones );
  const { user } = useSelector( state => state.auth );

  const setActiveEvent = ( zonasEvent ) => {

    dispatch( onSetActiveEvent(zonasEvent ));
  }
  const startSavingEvent =async(zonasEvent)=>{
    //TODO: Update event
    if(zonasEvent.idasignacion){
      //Actualizando
        const {data}= await  radioApi.put(`/asig_usuarios/${zonasEvent.idasignacion}`,zonasEvent);
        dispatch(onUpdateEvent({...zonasEvent, user}));
    }else{
      //creando
      const {data}= await radioApi.post('/asig_usuarios', zonasEvent);
      dispatch(onAddNewEvent({...zonasEvent, idasignacion:data.idasignacion, user}));
      window.location.reload(true);
    }
  }
   const deleteEvent=async(zonasEvent, state)=>{
    console.log(zonasEvent);
    const {data} = await  radioApi.delete(`/asig_usuarios/${zonasEvent}`);
  dispatch(onUpdateEvent(zonasEvent,user));
  window.location.reload(true);
    }

    const cambiarSue = async (zonasEvent, state)=>{
      console.log(zonasEvent);
      const {data} = await  radioApi.put(`/asig_usuarios/ActualizarSue/${zonasEvent}`);
  //dispatch(onUpdateEvent(zonasEvent,user));
    }

    const filtrarAccesorio=async(zonasEvent)=>{
      const {data} = await  radioApi.get(`/accesorios/filtrado/${zonasEvent}`);
      dispatch(onFiltrar(data));
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
    accesoriosFiltrado,
    hasEventSelected: !!activeEvent,
    // Metodos
    deleteEvent,
    setActiveEvent,
    startSavingEvent,
    startLoadingEvents,
    cambiarSue,
    filtrarAccesorio,
  }
}