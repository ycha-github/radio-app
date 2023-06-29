import { createSlice } from '@reduxjs/toolkit';

//const tempEvent = { 
//      idzonasregiones: 1,
//      nombreZonasRegiones: 'Villahermosa',
//      descripcionZonasRegiones: 'Ciudad',
//      estatus: 2,
//      createdAt:'28-08-22', 
//      updatedAt:'28-09-22',
//    };

export const hojaServicioSlice = createSlice({
  name: 'hojaServicio',
  initialState:{
    isLoadingEvents: true,
    events:
      [
       //tempEvent
      ],
    activeEvent: null
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
        if (event.idhojaservicios === payload.idhojaservicios){
          //console.log(payload.idhojaservicios);
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
        if (event.idhojaservicios === payload.idhojaservicios){
          return payload;
        }
        return event;
      });

    },
    onLoadEvent:(state,{payload=[]})=>{
        //console.log(payload)
      state.isLoadingEvents= false;
      //state.events=  payload;
      payload.forEach(event=>{
        const exists = state.events.some(dbEvent=> dbEvent.idhojaservicios === event.idhojaservicios);
        if( !exists){
          //state.events.push({...event, fecha_entrega:new Date(event.fecha_entrega).toLocaleString()})
          state.events.push(event)
        }
      })
    }
  }
});
// Action creators are generated for each case reducer function
export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent,onLoadEvent } = hojaServicioSlice.actions;