"use client";

import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/solid";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import {
  setSelectedDate,
  previousMonth,
  nextMonth,
} from "@/store/calendarSlice";

function getMonthDates(year: number, month: number): Date[][] {
  const firstDayOfMonth = new Date(year, month, 1);
  const startDayOfWeek = firstDayOfMonth.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const totalDays = startDayOfWeek + daysInMonth;
  const totalWeeks = Math.ceil(totalDays / 7);

  const startDate = new Date(year, month, 1 - startDayOfWeek);
  const calendar: Date[][] = [];

  for (let week = 0; week < totalWeeks; week++) {
    const weekRow: Date[] = [];
    for (let day = 0; day < 7; day++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + week * 7 + day);
      weekRow.push(date);
    }
    calendar.push(weekRow);
  }

  return calendar;
}

export default function SideCalendar({
  className,
  selectedDate,
  onDateChange,
}: {
  className?: string;
  selectedDate?: Date;
  onDateChange?: (date: Date) => void;
}) {
  const dispatch = useDispatch();
  const { year, month } = useSelector((state: RootState) => state.calendar);

  const today = new Date();

  const monthDates = getMonthDates(year, month);

  const handlePrevMonth = () => dispatch(previousMonth());
  const handleNextMonth = () => dispatch(nextMonth());
  const handleDateClick = (date: Date) => {
    dispatch(setSelectedDate(date.toISOString()));
    if (onDateChange) onDateChange(date);
  };

  return (
    <section className={`${className ?? ""}`}>
      <div className="h-auto rounded-xl bg-white p-2">
        <div className="mb-4 flex items-center justify-between">
          <button onClick={handlePrevMonth} className="cursor-pointer">
            <ChevronLeftIcon className="h-4 w-4" />
          </button>
          <span>
            {year}.{month + 1}
          </span>
          <button onClick={handleNextMonth} className="cursor-pointer">
            <ChevronRightIcon className="h-4 w-4" />
          </button>
        </div>
        <table>
          <thead>
            <tr className="text-sm">
              {["sun", "mon", "Tue", "Wed", "Thr", "Fri", "Sat"].map((day) => (
                <th key={day}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {monthDates.map((week, weekIndex) => (
              <tr key={weekIndex}>
                {week.map((date, dateIndex) => {
                  const isToday =
                    date.getDate() === today.getDate() &&
                    date.getMonth() === today.getMonth() &&
                    date.getFullYear() === today.getFullYear();

                  const isCurrentMonth = date.getMonth() === month;

                  const isSelectedDate =
                    selectedDate &&
                    selectedDate.getDate() === date.getDate() &&
                    selectedDate.getMonth() === date.getMonth() &&
                    selectedDate.getFullYear() === date.getFullYear();

                  const cellStyle = isToday
                    ? "bg-blue-600 text-white font-semibold rounded-full"
                    : isSelectedDate
                      ? "bg-blue-200 font-semibold rounded-full"
                      : "";

                  return (
                    <td
                      key={dateIndex}
                      className={`p-1 text-center ${cellStyle} ${
                        !isCurrentMonth ? "text-gray-400" : ""
                      }`}
                    >
                      <button
                        onClick={() => handleDateClick(date)}
                        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full hover:bg-blue-200"
                      >
                        {date.getDate()}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
