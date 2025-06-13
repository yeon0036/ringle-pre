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

export default function MainCalendar({
  className,
  selectedDate,
  baseDate,
  getTimeClick
}: {
  className?: string;
  selectedDate?: Date;
  baseDate?: Date;
  getTimeClick?: (date: Date) => void;
}) {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [weekDates, setWeekDates] = useState<Date[]>(() =>
    getWeekDates(new Date()),
  );

  useEffect(() => {
    if (selectedDate) {
      setCurrentDate(selectedDate);
      setWeekDates(getWeekDates(selectedDate));
    } else if (baseDate) {
      setCurrentDate(baseDate);
      setWeekDates(getWeekDates(baseDate));
    }
  }, [selectedDate, baseDate]);

  useEffect(() => {
    console.log(currentDate); //에러 방지용
  }, [currentDate]);

  return (
    <section className={` h-screen ${className ?? ''}`}>
      <DayController
        onWeekChange={(week, current) => {
          setWeekDates(week);
          setCurrentDate(current);
        }}
        selectedDate={selectedDate}
      />
      <div className='flex-1 overflow-y-auto'>
         <Calendar
      weekDates={weekDates}
      onClick={(date) => getTimeClick?.(date)}
    />
      </div>
    </section>
  );
}
