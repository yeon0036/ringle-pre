'use client';

import {useState} from 'react';
import {ChevronRightIcon, ChevronLeftIcon} from '@heroicons/react/24/solid';

const getMonthDates = (year: number, month: number): Date[][] => {
  const firstDayOfMonth = new Date(year, month, 1); // MM/01
  const startDayOfWeek = firstDayOfMonth.getDay(); // 01의 요일 반환
  //const daysInMonth = new Date(year, month + 1, 0).getDate(); //  MM의 마지막 날

  const startDate = new Date(year, month, 1 - startDayOfWeek);
  const calendar: Date[][] = [];

  for (let week = 0; week < 6; week++) {
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

export default function SideCalendar({className}: {className?: string}) {
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
    <div className={`${className ?? ''}`}>
      <div>
        <button
          onClick={() => handleMonthChange(-1)}
          className='cursor-pointer'
        >
          <ChevronLeftIcon />
        </button>
        <span>
          {currentYear}.{currentMonth + 1}
        </span>
        <button onClick={() => handleMonthChange(1)} className='cursor-pointer'>
          <ChevronRightIcon />
        </button>
        <table>
          <thead>
            <tr>
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
                  return (
                    <td
                      key={dateIndex}
                      className={`p-2 ${isToday ? 'bg-blue-100' : 'bg-white'}`}
                    >
                      <button className='cursor-pointer'>
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
    </div>
  );
}
