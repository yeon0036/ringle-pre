import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface EventType {
  id: string;
  title: string;
  description: string;
  start: string;
  end: string;
}

interface EventsState {
  events: EventType[];
}

const initialState: EventsState = {
  events: [],
};

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    addEvent: (state, action: PayloadAction<EventType>) => {
      state.events.push(action.payload);
    },
    editEvent: (state, action: PayloadAction<EventType>) => {
      const index = state.events.findIndex((ev) => ev.id === action.payload.id);
      if (index !== -1) {
        state.events[index] = action.payload;
      }
    },
    deleteEvent: (state, action: PayloadAction<string>) => {
      state.events = state.events.filter((ev) => ev.id !== action.payload);
    },
  },
});

export const { addEvent, editEvent, deleteEvent } = eventsSlice.actions;
export default eventsSlice.reducer;
