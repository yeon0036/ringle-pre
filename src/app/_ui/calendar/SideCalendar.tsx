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
            <ChevronLeftIcon className="h-4 w-4" />
          </button>
          <span>
            {year}.{month + 1}
          </span>
          <button onClick={handleNextMonth} className="cursor-pointer">
            <ChevronRightIcon className="h-4 w-4" />
          </button>
        </div>

        {/* 달력 */}
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

                  const isSelected =
                    selectedDate.getDate() === date.getDate() &&
                    selectedDate.getMonth() === date.getMonth() &&
                    selectedDate.getFullYear() === date.getFullYear();

                  const isCurrentMonth = date.getMonth() === month;

                  const cellStyle = isToday
                    ? "bg-blue-600 text-white font-semibold rounded-full"
                    : isSelected
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
                        className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-blue-200"
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
