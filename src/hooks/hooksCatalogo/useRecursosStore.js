import { useDispatch, useSelector } from "react-redux";
import radioApi from "../../api/radioApi";
import { onAddNewEvent, onSetActiveEvent,onUpdateEvent, onDeleteEvent,onLoadEvent } from "../../store/catalogo/recursosSlice";

export const useRecursosStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector( state => state.recursos );
  const { user } = useSelector( state => state.auth );

  const setActiveEvent = ( zonasEvent ) => {

    dispatch( onSetActiveEvent(zonasEvent ));
  }
  const startSavingEvent =async(zonasEvent)=>{
    //TODO: Update event
    if(zonasEvent.idrecursoCompras){
      //Actualizando
        const {data}= await  radioApi.put(`/recursoscompras/${zonasEvent.idrecursoCompras}`,zonasEvent);
        dispatch(onUpdateEvent({...zonasEvent, user}));
        window.location.reload(true);
    }else{
      //creando
      const {data}= await radioApi.post('/recursoscompras', zonasEvent);
      dispatch(onAddNewEvent({...zonasEvent, idrecursoCompras:data.idrecursoCompras, user}));
      window.location.reload(true);
    }
  }
   const deleteEvent=async(zonasEvent, state)=>{
    const {data}= await  radioApi.delete(`/recursoscompras/${zonasEvent}`);
    dispatch(onUpdateEvent({zonasEvent,user}));
    window.location.reload(true);
    }

    const startLoadingEvents= async ()=>{
      try {
        const {data} = await radioApi.get('/recursoscompras')
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