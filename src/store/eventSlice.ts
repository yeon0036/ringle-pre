import { createSlice, PayloadAction } from '@reduxjs/toolkit'

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
  name: 'events',
  initialState,
  reducers: {
    addEvent: (state, action: PayloadAction<EventType>) => {
      state.events.push(action.payload);
    },
    removeEvent: (state, action: PayloadAction<string>) => {
      state.events = state.events.filter(event => event.id !== action.payload);
    },
  }
});

export const { addEvent, removeEvent } = eventsSlice.actions;
export default eventsSlice.reducer;
