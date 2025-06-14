import { configureStore } from "@reduxjs/toolkit";
import calendarReducer from "./calendarSlice";
import eventReducer from "./eventSlice";

export const Store = configureStore({
  reducer: {
    calendar: calendarReducer,
    events: eventReducer,
  },
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
