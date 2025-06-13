import { configureStore } from '@reduxjs/toolkit';
import calendarReducer from './calendarSlice';

export const Store = configureStore({
  reducer: {
    calendar: calendarReducer,
  },
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
