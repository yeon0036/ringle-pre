import {useState} from 'react';
import {subWeeks, addWeeks, format} from 'date-fns';
import {ko} from 'date-fns/locale';
import {ChevronRightIcon, ChevronLeftIcon} from '@heroicons/react/24/solid';

export default function DayController({
  onWeekChange,
}: {
  onWeekChange: (weekDates: Date[], current: Date) => void;
}) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const updateWeek = (date: Date) => {
    const start = date.getDate() - date.getDay();
    const weekDates = Array.from({length: 7}).map((_, i) => {
      const d = new Date(date);
      d.setDate(start + i);
      return d;
    });
    setCurrentDate(date);
    onWeekChange(weekDates, date);
  };

  const monthLabel = format(currentDate, 'yyyy년 M월', {locale: ko});

  return (
    <div className='flex justify-center gap-[200px] items-center items-start bg-white rounded-xl p-4 mb-3'>
      <button
        onClick={() => updateWeek(subWeeks(currentDate, 1))}
        className='flex items-center text-gray-700 cursor-pointer'
      >
        <ChevronLeftIcon className='w-6 h-6' />
      </button>

      <button
        onClick={() => updateWeek(new Date())}
        className='text-xl font-base text-gray-800'
      >
        {monthLabel}
      </button>

      <button
        onClick={() => updateWeek(addWeeks(currentDate, 1))}
        className='flex items-center text-gray-700 cursor-pointer'
      >
        <ChevronRightIcon className='w-6 h-6' />
      </button>
    </div>
  );
}
