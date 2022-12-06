import { createSlice } from '@reduxjs/toolkit';

export const rolSlice = createSlice({
  name: 'rol',
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
        if (event.idrol === payload.idrol){
          return payload;
        }
        return event;
      });
    },
 
   onDeleteEvent:(state,{payload})=>{
     console.log(payload.idrol)
    state.events= state.events.map(event=>{
      if (event.idrol === payload.idrol){
        return payload;
      }
      return event;
    });
    
   },
    onLoadEvent:(state,{payload=[]})=>{
      state.isLoadingEvents= false;
      // state.events =  payload;
      payload.forEach(event=>{
        const exists = state.events.some(dbEvent=> dbEvent.idrol === event.idrol);
        if( !exists){
          state.events.push(event)
        }

      })

    }
  }
});
// Action creators are generated for each case reducer function
export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent,onLoadEvent } = rolSlice.actions;