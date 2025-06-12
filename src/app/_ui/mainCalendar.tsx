'use client';

import {useState, useEffect} from 'react';
import Calendar from './Calendar';
import DayController from './DayController';

const getWeekDates = (baseDate: Date) => {
  const startOfWeek = new Date(baseDate);
  startOfWeek.setDate(baseDate.getDate() - baseDate.getDay());
  startOfWeek.setHours(0, 0, 0, 0);
  return Array.from({length: 7}).map((_, i) => {
    const d = new Date(startOfWeek);
    d.setDate(startOfWeek.getDate() + i);
    return d;
  });
};

export default function MainCalendar({className}: {className?: string}) {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [weekDates, setWeekDates] = useState<Date[]>(() =>
    getWeekDates(new Date()),
  );

  useEffect(() => {
    console.log(currentDate); //에러 방지용
  }, [currentDate]);

  return (
    <div className={` ${className ?? ''}`}>
      <DayController
        onWeekChange={(week, current) => {
          setWeekDates(week);
          setCurrentDate(current);
        }}
      />
      <Calendar weekDates={weekDates} />
    </div>
  );
}
