import { createSlice } from '@reduxjs/toolkit';

//const tempEvent = { 
//      id_sue: 1,
//      nombreZonasRegiones: 'Villahermosa',
//      descripcionZonasRegiones: 'Ciudad',
//      estatus: 2,
//      createdAt:'28-08-22',
//      updatedAt:'28-09-22',
//    };

export const estatusSlice = createSlice({
  name: 'estatus',
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
        if (event.id_sue === payload.id_sue){
          return payload;
        }
        return event;
      });
    },
    //onDeleteEvent:(state)=>{
    //  state.events= state.events.filter(event=> event.id_sue !== state.activeEvent.id_sue);
    //  state.activeEvent= null;
    //
    //},
    onDeleteEvent:(state)=>{
      state.events= state.events.map(event=>{
        if (event.id_sue === payload.id_sue){
          return payload;
        }
        return event;
      }); 
    },
    onLoadEvent:(state,{payload=[]})=>{
      state.isLoadingEvents= false;
      //state.events=  payload;
      payload.forEach(event=>{
        const exists = state.events.some(dbEvent=> dbEvent.id_sue === event.id_sue);
        if( !exists){
          state.events.push(event)
        }

      })

    }
  }
});
// Action creators are generated for each case reducer function
export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent,onLoadEvent } = estatusSlice.actions;