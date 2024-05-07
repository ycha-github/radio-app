import { createSlice } from '@reduxjs/toolkit';

//const tempEvent = { 
//      idzonasregiones: 1,
//      nombreZonasRegiones: 'Villahermosa',
//      descripcionZonasRegiones: 'Ciudad',
//      estatus: 2,
//      createdAt:'28-08-22', 
//      updatedAt:'28-09-22',
//    };

export const armarRadioSlice = createSlice({ 
  name: 'armarradio',
  initialState:{
    isLoadingEventsarmar: true,
    eventsarmar:
      [
       //tempEvent
      ],
      accesoriosFiltrado:[],
      accesoriosFiltradoBateria:[],
      accesoriosFiltradoGps:[],
      corporacionesFiltrado:[],
      activeEventarmar: null,
  },
  reducers: {
    onSetActiveEvent: ( state, action) => {

         state.activeEventarmar = action.payload;
    },
    onAddNewEvent: ( state, { payload }) => {

      state.eventsarmar.push(payload);
      state.activeEventarmar = null;
  },
    onUpdateEvent:(state, {payload})=>{
      state.eventsarmar= state.eventsarmar.map(event=>{
        if (event.idarmar === payload.idarmar){
          console.log(payload.idarmar);
          return payload;
        }
        return event;
      });
    },
    //onDeleteEvent:(state)=>{
    //  state.events= state.events.filter(event=> event.idzonasregiones !== state.activeEvent.idzonasregiones);
    //  state.activeEvent= null;
//
    //},
    onDeleteEvent:(state)=>{
      state.eventsarmar= state.eventsarmar.map(event=>{
        if (event.idarmar === payload.idarmar){
          return payload;
        }
        return event;
      });

    },
    onLoadEvent:(state,{payload=[]})=>{
        //console.log(payload)
      state.isLoadingEventsarmar= false;
      //state.events=  payload;
      payload.forEach(event=>{
        const exists = state.eventsarmar.some(dbEvent=> dbEvent.idarmar === event.idarmar);
        if( !exists){
          state.eventsarmar.push(event)
        }
      })
    },
    onFiltrar:(state,{payload})=>{
      state.isLoadingEventsarmar= false;
      //state.accesoriosFiltrado=  payload;
      payload.forEach(event=>{
        const exists = state.accesoriosFiltrado.some(dbEvent=> dbEvent.idaccesorios === event.idaccesorios);
        if( !exists){
          state.accesoriosFiltrado.push(event)
        }
      })
    },
    onFiltrarBateria:(state,{payload})=>{
      state.isLoadingEventsarmar= false;
      //state.accesoriosFiltrado=  payload;
      payload.forEach(event=>{
        const exists = state.accesoriosFiltradoBateria.some(dbEvent=> dbEvent.idaccesorios === event.idaccesorios);
        if( !exists){
          state.accesoriosFiltradoBateria.push(event)
        }
      })
    },
    onFiltrarGps:(state,{payload})=>{
      state.isLoadingEventsarmar= false;
      //state.accesoriosFiltrado=  payload;
      payload.forEach(event=>{
        const exists = state.accesoriosFiltradoGps.some(dbEvent=> dbEvent.idaccesorios === event.idaccesorios);
        if( !exists){
          state.accesoriosFiltradoGps.push(event)
        }
      })
    },
    onFiltrarCorporacion:(state,{payload})=>{
      state.isLoadingEventsarmar= false;
      //state.accesoriosFiltrado=  payload;
      //console.log(payload)
      payload.forEach(event=>{
        const exists = state.corporacionesFiltrado.some(dbEvent=> dbEvent.idcorporaciones === event.idcorporaciones);
        if( !exists){
          state.corporacionesFiltrado.push(event)
          //console.log(state.corporacionesFiltrado)
        }
      })
    },
  }
});

   
// Action creators are generated for each case reducer function
export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent,onLoadEvent,onFiltrar,onFiltrarBateria,onFiltrarGps, onFiltrarCorporacion } = armarRadioSlice.actions;