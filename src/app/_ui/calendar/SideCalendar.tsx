'use client';

import {useState} from 'react';
import {ChevronRightIcon, ChevronLeftIcon} from '@heroicons/react/24/solid';

const getMonthDates = (year: number, month: number): Date[][] => {
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
};

export default function SideCalendar({
  className,
  selectedDate,
  onDateChange,
}: {
  className?: string;
  selectedDate?: Date;
  onDateChange?: (date: Date) => void;
}) {
  const [today] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const monthDates = getMonthDates(currentYear, currentMonth);

  const handleMonthChange = (offset: number) => {
    let newMonth = currentMonth + offset;
    let newYear = currentYear;

    if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    } else if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    }

    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  return (
    <section className={`${className ?? ''} `}>
      <div className='bg-white rounded-xl p-2 h-auto'>
        <div className='flex justify-between items-center mb-4'>
          <button
            onClick={() => handleMonthChange(-1)}
            className='cursor-pointer'
          >
            <ChevronLeftIcon className='h-4 w-4' />
          </button>
          <span>
            {currentYear}.{currentMonth + 1}
          </span>
          <button
            onClick={() => handleMonthChange(1)}
            className='cursor-pointer'
          >
            <ChevronRightIcon className='h-4 w-4' />
          </button>
        </div>
        <table>
          <thead>
            <tr className='text-sm'>
              {['sun', 'mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'].map((day) => (
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

                  const isCurrentMonth = date.getMonth() === currentMonth;

                  const isSelectedDate =
                    selectedDate &&
                    selectedDate.getDate() === date.getDate() &&
                    selectedDate.getMonth() === date.getMonth() &&
                    selectedDate.getFullYear() === date.getFullYear();

                  const cellStyle = isToday
                    ? 'bg-blue-600 text-white font-semibold rounded-full'
                    : isSelectedDate
                    ? 'bg-blue-200 font-semibold rounded-full'
                    : '';

                  return (
                    <td
                      key={dateIndex}
                      className={`p-1 text-center ${cellStyle} ${
                        !isCurrentMonth ? 'text-gray-400' : ''
                      }`}
                    >
                      <button
                        onClick={() => onDateChange && onDateChange(date)}
                        className='cursor-pointer w-10 h-10 flex items-center justify-center hover:bg-blue-200 rounded-full'
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
