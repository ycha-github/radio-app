import { useDispatch, useSelector } from "react-redux"; 
import radioApi from "../../api/radioApi";
import { onAddNewEvent, onSetActiveEvent, onUpdateEvent, onDeleteEvent, onLoadEvent, onFiltrar,onFiltrarBateria, onFiltrarGps, onFiltrarCorporacion} from "../../store/utilidades/asignacionesSlice";

export const useAsignacionesStore= () => {
  const dispatch = useDispatch();
  const { events, activeEvent, accesoriosFiltrado,accesoriosFiltradoBateria,accesoriosFiltradoGps,corporacionesFiltrado } = useSelector( state => state.asignaciones );
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
        window.location.reload(true);
    }else{
      //creando
      const {data}= await radioApi.post('/asig_usuarios', zonasEvent);
      dispatch(onAddNewEvent({...zonasEvent, idasignacion:data.idasignacion, user}));
      window.location.reload(true);
    }
  }
   const deleteEvent=async(zonasEvent, state)=>{
    // console.log(zonasEvent);
    const {data} = await  radioApi.delete(`/asig_usuarios/${zonasEvent}`);
  dispatch(onUpdateEvent(zonasEvent,user));
  window.location.reload(true);
    }

    const cambiarSue = async (zonasEvent, state)=>{
      //console.log(zonasEvent);
      const {data} = await  radioApi.put(`/asig_usuarios/ActualizarSue/${zonasEvent}`);
  //dispatch(onUpdateEvent(zonasEvent,user));
    }

    const filtrarAccesorio=async(zonasEvent)=>{
      try {
        
      const {data} = await  radioApi.get(`/accesorios/filtrado/${zonasEvent}`);
      dispatch(onFiltrar(data));
    } catch (error) {
      console.log('Error cargando cargadores');
      console.log(error);
    }
  }
    const filtrarAccesorioBateria=async(zonasEvent)=>{
      try {
      const {data} = await  radioApi.get(`/accesorios/filtrado/${zonasEvent}`);
      dispatch(onFiltrarBateria(data));
    } catch (error) {
      console.log('Error cargando Baterias');
      console.log(error);
    }
  }
    const filtrarAccesorioGps=async(zonasEvent)=>{
      try {
      const {data} = await  radioApi.get(`/accesorios/filtrado/${zonasEvent}`);
      dispatch(onFiltrarGps(data));
    } catch (error) {
      console.log('Error cargando Gps');
      console.log(error);
    }
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

    const startLoadingCorporacion = async ()=>{
      try {
        const { data } = await radioApi.get('/corporaciones')
        dispatch(onFiltrarCorporacion(data))
        //console.log(data)
       
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
    accesoriosFiltrado,
    accesoriosFiltradoBateria,
    accesoriosFiltradoGps,
    corporacionesFiltrado,
    hasEventSelected: !!activeEvent,
    // Metodos
    deleteEvent,
    setActiveEvent,
    startSavingEvent,
    startLoadingEvents,
    startLoadingCorporacion,
    cambiarSue,
    filtrarAccesorio,
    filtrarAccesorioBateria,
    filtrarAccesorioGps,
  }
}