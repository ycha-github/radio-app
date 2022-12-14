import { useDispatch, useSelector } from "react-redux";
import radioApi from "../../api/radioApi";
import { onAddNewEvent, onSetActiveEvent,onUpdateEvent, onDeleteEvent,onLoadEvent } from "../../store/catalogo/usuariosSlice";

export const useUsuariosStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector( state => state.usuarios );
  const { user } = useSelector( state => state.auth );

  const setActiveEvent = ( zonasEvent ) => {

    dispatch( onSetActiveEvent(zonasEvent ));
  }
  const startSavingEvent =async(zonasEvent)=>{
    //TODO: Update event
    if(zonasEvent.idusuarios){
      //Actualizando
        const {data}= await  radioApi.put(`/usuarios/${zonasEvent.idusuarios}`,zonasEvent);
        dispatch(onUpdateEvent({...zonasEvent, user}));
    }else{
      //creando
      const {data}= await radioApi.post('/usuarios', zonasEvent);
      dispatch(onAddNewEvent({...zonasEvent, idusuarios:data.idusuarios, user}));
      window.location.reload(true);
    }
  }
   const deleteEvent=async(zonasEvent, state)=>{
    const {data}= await  radioApi.delete(`/usuarios/${zonasEvent.idusuarios}`);
    dispatch(onUpdateEvent({zonasEvent,user}));
    //window.location.reload(true);
    }

    const startLoadingEvents= async ()=>{
      try {
        const {data} = await radioApi.get('/usuarios')
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