import { createSlice } from '@reduxjs/toolkit';

//const tempEvent = { 
//      idzonasregiones: 1,
//      nombreZonasRegiones: 'Villahermosa',
//      descripcionZonasRegiones: 'Ciudad',
//      estatus: 2,
//      createdAt:'28-08-22', 
//      updatedAt:'28-09-22',
//    };

export const asignacionesSlice = createSlice({ 
  name: 'asignaciones',
  initialState:{
    isLoadingEvents: true,
    events:
      [
       //tempEvent
      ],
      accesoriosFiltrado:[],
      accesoriosFiltradoBateria:[],
      accesoriosFiltradoGps:[],
      corporacionesFiltrado:[],
      activeEvent: null,
  },
  reducers: {
    onSetActiveEvent: ( state, action) => {

         state.activeEvent = action.payload;
    },
    onAddNewEvent: ( state, { payload }) => {

      state.events.push(payload);
      state.activeEvent = null;
  },
    onUpdateEvent:(state, {payload})=>{
      state.events= state.events.map(event=>{
        if (event.idasignacion === payload.idasignacion){
          console.log(payload.idasignacion);
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
      state.events= state.events.map(event=>{
        if (event.idasignacion === payload.idasignacion){
          return payload;
        }
        return event;
      });

    },
    onLoadEvent:(state,{payload=[]})=>{
      state.isLoadingEvents= false;
      //state.events=  payload;
      payload.forEach(event=>{
        const exists = state.events.some(dbEvent=> dbEvent.idasignacion === event.idasignacion);
        if( !exists){
          state.events.push(event)
        }
      })
    },
    onFiltrar:(state,{payload})=>{
      state.isLoadingEvents= false;
      //state.accesoriosFiltrado=  payload;
      payload.forEach(event=>{
        const exists = state.accesoriosFiltrado.some(dbEvent=> dbEvent.idaccesorios === event.idaccesorios);
        if( !exists){
          state.accesoriosFiltrado.push(event)
        }
      })
    },
    onFiltrarBateria:(state,{payload})=>{
      state.isLoadingEvents= false;
      //state.accesoriosFiltrado=  payload;
      payload.forEach(event=>{
        const exists = state.accesoriosFiltradoBateria.some(dbEvent=> dbEvent.idaccesorios === event.idaccesorios);
        if( !exists){
          state.accesoriosFiltradoBateria.push(event)
        }
      })
    },
    onFiltrarGps:(state,{payload})=>{
      state.isLoadingEvents= false;
      //state.accesoriosFiltrado=  payload;
      payload.forEach(event=>{
        const exists = state.accesoriosFiltradoGps.some(dbEvent=> dbEvent.idaccesorios === event.idaccesorios);
        if( !exists){
          state.accesoriosFiltradoGps.push(event)
        }
      })
    },
    onFiltrarCorporacion:(state,{payload})=>{
      state.isLoadingEvents= false;
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
export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent,onLoadEvent,onFiltrar,onFiltrarBateria,onFiltrarGps, onFiltrarCorporacion } = asignacionesSlice.actions;