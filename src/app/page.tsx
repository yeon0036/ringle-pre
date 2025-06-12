'use client';

import {useState} from 'react';
import MainCalendar from './_ui/calendar/MainCalendar';
import SideCalendar from './_ui/calendar/SideCalendar';
import AddEventsButton from './_ui/addEvents/Button';
import AddEventsModal from './_ui/addEvents/Modal';

export default function Home() {
const [selectedDate, setSelectedDate] = useState<Date | null>(null);
const [isModalOpen, setIsModalOpen] = useState(false);

const handleAddEventClick = () => {
  setIsModalOpen(true);
};

const handleTimeModalClick = (date: Date) => {
  setSelectedDate(date);
  setIsModalOpen(true);
};

  return (
    <div className='flex items-top min-h-screen gap-10 my-12 px-12 w-full'>
      <div className='flex flex-col gap-4'>
        <AddEventsButton
          className='flex justify-start'
          onClick={handleAddEventClick}
        />
        <AddEventsModal
          isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  selectedDate={selectedDate}
        />
        <SideCalendar
          className='shrink-0'
          selectedDate={selectedDate ?? undefined}
          onDateChange={(date) => setSelectedDate(date)}
        />
      </div>
      <MainCalendar className='flex-1' selectedDate={selectedDate ?? undefined} getTimeClick={handleTimeModalClick}/>
    </div>
  );
}
