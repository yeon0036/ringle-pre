import {format} from 'date-fns';

export default function Calendar({weekDates}: {weekDates: Date[]}) {
  const hours = Array.from(
    {length: 24},
    (_, i) => `${i.toString().padStart(2, '0')}:00`,
  );

  return (
    <div className='flex w-full flex-1 bg-white rounded-xl'>
      <div className='w-16 flex flex-col'>
        <div className='h-24' />
        {hours.map((t) => (
          <div key={t} className='h-20 text-xs px-2 py-1 text-gray-500'>
            {t}
          </div>
        ))}
      </div>
      <div className='flex-1'>
        <div className='grid grid-cols-7 h-16 mb-10'>
          {weekDates.map((d) => (
            <div key={d.toISOString()} className='text-center py-2'>
              <span className='text-md'>{format(d, 'EEE')}</span>
              <br />
              <span className='text-4xl font-base'>{format(d, 'd')}</span>
            </div>
          ))}
        </div>
        <div className='grid grid-cols-7'>
          {Array.from({length: 24 * 7}).map((_, i) => (
            <div key={i} className='h-20 border-l border-t border-gray-200' />
          ))}
        </div>
      </div>
    </div>
  );
}
