import { useDispatch, useSelector } from "react-redux"; 
import radioApi from "../../api/radioApi";
import { onAddNewEvent, onSetActiveEvent, onUpdateEvent, onDeleteEvent, onLoadEvent, onFiltrar,onFiltrarBateria, onFiltrarGps, onFiltrarCorporacion} from "../../store/utilidades/armarRadioSlice";
import { onShowError,clearErrorMessage } from "../../store/auth/cambiarSlice";
export const useArmarRadioStore= () => {
  const dispatch = useDispatch();
  const { eventsarmar, activeEventarmar, accesoriosFiltrado,accesoriosFiltradoBateria,accesoriosFiltradoGps,corporacionesFiltrado } = useSelector( state => state.armarradio );
  const { user } = useSelector( state => state.auth );
  const {errorMessage} = useSelector( state => state.cambiar );

  const setActiveEventarmar = ( zonasEvent ) => {

    dispatch( onSetActiveEvent(zonasEvent ));
  }
  const startSavingEventarmar =async(zonasEvent)=>{
    console.log(zonasEvent)
    //TODO: Update event
    if(zonasEvent.idarmar){
      //Actualizando
        const {data}= await  radioApi.put(`/armar_radios/${zonasEvent.idarmar}`,zonasEvent);
        dispatch(onUpdateEvent({...zonasEvent, user}));
        // window.location.reload(true);
    }else{
      //creando
      try{
      const {data}= await radioApi.post('/armar_radios', zonasEvent);
      dispatch(onAddNewEvent({...zonasEvent, idarmar:data.idarmar, user}));
      // window.location.reload(true);
    }
    catch (error) {
      dispatch(onShowError(error.response.data?.message || '---'));
      setTimeout(()=>{
        dispatch(clearErrorMessage());
    },5);
  }
  }
}
   const deleteEventarmar=async(zonasEvent, state)=>{
    // console.log(zonasEvent);
    const {data} = await  radioApi.delete(`/armar_radios/${zonasEvent}`);
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
    const startLoadingEventsarmar= async ()=>{
      try {
        const { data } = await radioApi.get('/armar_radios')
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
    errorMessage,
    activeEventarmar,
    eventsarmar,
    user,
    accesoriosFiltrado,
    accesoriosFiltradoBateria,
    accesoriosFiltradoGps,
    corporacionesFiltrado,
    hasEventSelected: !!activeEventarmar,
    // Metodos
    deleteEventarmar,
    setActiveEventarmar,
    startSavingEventarmar,
    startLoadingEventsarmar,
    startLoadingCorporacion,
    cambiarSue,
    filtrarAccesorio,
    filtrarAccesorioBateria,
    filtrarAccesorioGps,
  }
}