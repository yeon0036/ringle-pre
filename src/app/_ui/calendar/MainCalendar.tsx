'use client';

import { useSelector } from 'react-redux';
import { RootState,  } from '@/store';
import Calendar from './Calendar';
import DayController from './DayController';
import AddEventsModal from '../events/addEventModal';
import { useState } from 'react';


function getWeekDates(baseDate: Date): Date[] {
  const startOfWeek = new Date(baseDate);
  startOfWeek.setDate(baseDate.getDate() - baseDate.getDay());
  startOfWeek.setHours(0, 0, 0, 0);
  return Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(startOfWeek);
    d.setDate(startOfWeek.getDate() + i);
    return d;
  });
}

export default function MainCalendar({ className }: { className?: string }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleTimeClick = (date: Date) => {
    setSelectedDate(date);
    setModalOpen(true);
  };

  const selectedDateString = useSelector((state: RootState) => state.calendar.selectedDate);
  const selectedDateRedux = selectedDateString ? new Date(selectedDateString) : new Date();
  const weekDates = getWeekDates(selectedDateRedux);
const events = useSelector((state: RootState) => state.events.events);

  return (
    <section className={`h-screen ${className ?? ''}`}>
      <DayController />
      <div className='flex-1 overflow-y-auto'>
        <Calendar
          weekDates={weekDates}
          onClick={handleTimeClick}
          events={events}
        />
      </div>
      <AddEventsModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        selectedDate={selectedDate}
      />
    </section>
  );
}
