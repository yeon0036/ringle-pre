'use client';

import {useState} from 'react';
import MainCalendar from './_ui/MainCalendar';
import SideCalendar from './_ui/SideCalendar';

export default function Home() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  return (
    <div className='flex items-top min-h-screen gap-10 my-12 px-12 w-full'>
      <SideCalendar
        className='shrink-0'
        selectedDate={selectedDate}
        onDateChange={(date) => setSelectedDate(date)}
      />
      <MainCalendar className='flex-1' selectedDate={selectedDate} />
    </div>
  );
}
