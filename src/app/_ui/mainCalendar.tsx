function MainCalendar() {
  const hours = Array.from(
    {length: 24},
    (_, i) => `${i.toString().padStart(2, '0')}:00`,
  );
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className='flex bg-white rounded-xl overflow-hidden mx-12'>
      <div className='flex flex-col w-16 text-xs text-black'>
        <div className='h-20'></div>
        {/* time - col */}
        {hours.map((time) => (
          <div key={time} className='h-20 px-1 py-0.5'>
            {time}
          </div>
        ))}
      </div>
      {/* days-row */}
      <div className='flex-1'>
        <div className='grid grid-cols-7 h-20 text-center text-sm font-medium'>
          {days.map((day) => (
            <div key={day} className='py-2'>
              {day}
            </div>
          ))}
        </div>
        {/* empty time block - row */}
        <div className='grid grid-cols-7'>
          {Array.from({length: 24 * 7}).map((_, i) => (
            <div
              key={i}
              className='h-20 border-l border-t hover:bg-gray-100 border-gray-400'
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MainCalendar;
