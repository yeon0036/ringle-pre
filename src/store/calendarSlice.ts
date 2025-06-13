import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CalendarState {
  year: number;
  month: number;
  selectedDate: string | null;
}

const initialState: CalendarState = {
  year: new Date().getFullYear(),
  month: new Date().getMonth(),
  selectedDate: null,
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setMonth(state, action: PayloadAction<number>) {
      state.month = action.payload;
    },
    nextMonth(state) {
      if (state.month === 11) {
        state.month = 0;
        state.year += 1;
      } else {
        state.month += 1;
      }
    },
    previousMonth(state) {
      if (state.month === 0) {
        state.month = 11;
        state.year -= 1;
      } else {
        state.month -= 1;
      }
    },

    setSelectedDate(state, action: PayloadAction<string | null>) {
      state.selectedDate = action.payload;
    },
  },
});

export const {
  setMonth,
  nextMonth,
  previousMonth,
  setSelectedDate,
} = calendarSlice.actions;
export default calendarSlice.reducer;
