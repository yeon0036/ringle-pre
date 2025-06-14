"use client";

import { subWeeks, addWeeks, format } from "date-fns";
import { ko } from "date-fns/locale";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/solid";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { setSelectedDate } from "@/store/calendarSlice";

export default function DayController() {
  const dispatch = useDispatch();
  const selectedDateString = useSelector(
    (state: RootState) => state.calendar.selectedDate
  );
  const selectedDate = selectedDateString
    ? new Date(selectedDateString)
    : new Date();

  const handleWeekChange = (date: Date) => {
    dispatch(setSelectedDate(date.toISOString()));
  };

  const monthLabel = format(selectedDate, "yyyy년 M월", { locale: ko });

  return (
    <div className="mb-3 flex items-center items-start justify-center gap-[100px] rounded-md bg-white p-2 md:gap-[200px] md:rounded-xl md:p-4">
      <button
        onClick={() => handleWeekChange(subWeeks(selectedDate, 1))}
        className="flex cursor-pointer items-center text-gray-700"
      >
        <ChevronLeftIcon className="h-4 w-4 md:h-6 md:w-6" />
      </button>
      <button
        onClick={() => handleWeekChange(new Date())}
        className="font-base text-md text-gray-800 md:text-xl"
      >
        {monthLabel}
      </button>
      <button
        onClick={() => handleWeekChange(addWeeks(selectedDate, 1))}
        className="flex cursor-pointer items-center text-gray-700"
      >
        <ChevronRightIcon className="h-4 w-4 md:h-6 md:w-6" />
      </button>
    </div>
  );
}
