'use client';

import { subWeeks, addWeeks, format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/solid';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { setSelectedDate } from '@/store/calendarSlice';

export default function DayController() {
  const dispatch = useDispatch();
  const selectedDateString = useSelector((state: RootState) => state.calendar.selectedDate);
  const selectedDate = selectedDateString ? new Date(selectedDateString) : new Date();

  const handleWeekChange = (date: Date) => {
    dispatch(setSelectedDate(date.toISOString()));
  };

  const monthLabel = format(selectedDate, 'yyyy년 M월', { locale: ko });

  return (
    <div className='flex justify-center gap-[200px] items-center items-start bg-white rounded-xl p-4 mb-3'>
      <button
        onClick={() => handleWeekChange(subWeeks(selectedDate, 1))}
        className='flex items-center text-gray-700 cursor-pointer'
      >
        <ChevronLeftIcon className='w-6 h-6' />
      </button>
      <button
        onClick={() => handleWeekChange(new Date())}
        className='text-xl font-base text-gray-800'
      >
        {monthLabel}
      </button>
      <button
        onClick={() => handleWeekChange(addWeeks(selectedDate, 1))}
        className='flex items-center text-gray-700 cursor-pointer'
      >
        <ChevronRightIcon className='w-6 h-6' />
      </button>
    </div>
  );
}
