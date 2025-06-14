"use client";

import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/solid";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { setSelectedDate } from "@/store/calendarSlice";

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
  onDateChange,
}: {
  className?: string;
  onDateChange?: (date: Date) => void;
}) {
  const dispatch = useDispatch();

  const selectedDateString = useSelector(
    (state: RootState) => state.calendar.selectedDate
  );
  const selectedDate = selectedDateString
    ? new Date(selectedDateString)
    : new Date();

  const today = new Date();
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();
  const monthDates = getMonthDates(year, month);

  const handlePrevMonth = () => {
    const prev = new Date(selectedDate);
    prev.setMonth(prev.getMonth() - 1);
    dispatch(setSelectedDate(prev.toISOString()));
  };

  const handleNextMonth = () => {
    const next = new Date(selectedDate);
    next.setMonth(next.getMonth() + 1);
    dispatch(setSelectedDate(next.toISOString()));
  };

  const handleDateClick = (date: Date) => {
    dispatch(setSelectedDate(date.toISOString()));
    if (onDateChange) onDateChange(date);
  };

  return (
    <section className={className ?? ""}>
      <div className="rounded-xl bg-white p-2">
        {/* 헤더: 월 이동 */}
        <div className="mb-4 flex items-center justify-between">
          <button onClick={handlePrevMonth} className="cursor-pointer">
            <ChevronLeftIcon className="h-2 w-2 md:h-4 md:w-4" />
          </button>
          <span className="md:text-md text-xs">
            {year}.{month + 1}
          </span>
          <button onClick={handleNextMonth} className="cursor-pointer">
            <ChevronRightIcon className="h-2 w-2 md:h-4 md:w-4" />
          </button>
        </div>

        {/* 달력 */}
        <table>
          <thead>
            <tr className="text-xs md:text-sm">
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

                  const isSelected =
                    selectedDate.getDate() === date.getDate() &&
                    selectedDate.getMonth() === date.getMonth() &&
                    selectedDate.getFullYear() === date.getFullYear();

                  const isCurrentMonth = date.getMonth() === month;

                  const cellStyle = isToday
                    ? "bg-blue-500 text-white font-semibold rounded-full"
                    : isSelected
                      ? "bg-blue-200 font-semibold rounded-full"
                      : "";

                  return (
                    <td
                      key={dateIndex}
                      className={`md:text-md p-1 text-center text-xs ${cellStyle} ${
                        !isCurrentMonth ? "text-gray-400" : ""
                      }`}
                    >
                      <button
                        onClick={() => handleDateClick(date)}
                        className="flex h-5 w-5 items-center justify-center rounded-full hover:bg-blue-200 md:h-10 md:w-10"
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
