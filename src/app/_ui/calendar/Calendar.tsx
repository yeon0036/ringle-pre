import {format} from 'date-fns';

function Calendar({
  weekDates,
  onClick,
}: {
  weekDates: Date[];
  onClick: (date: Date) => void;
}) {
  const hours = Array.from({ length: 24 }, (_, i) => i); // 숫자 배열로 변경

  return (
    <div className="flex w-full flex-1 bg-white rounded-xl">
      <div className="w-16 flex flex-col">
        <div className="h-24" />
        {hours.map((hour) => (
          <div key={hour} className="h-20 text-xs px-2 py-1 text-gray-500">
            {`${hour.toString().padStart(2, '0')}:00`}
          </div>
        ))}
      </div>
      <div className="flex-1">
        <div className="grid grid-cols-7 h-16 mb-10">
          {weekDates.map((d) => (
            <div key={d.toISOString()} className="text-center py-2">
              <h1 className="text-md">{format(d, 'EEE')}</h1>
              <br />
              <h1 className="text-4xl font-base">{format(d, 'd')}</h1>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7">
          {hours.flatMap((hour) =>
            weekDates.map((date) => {
              const datetime = new Date(date);
              datetime.setHours(hour, 0, 0, 0);

              return (
                <button
                  key={`${date.toISOString()}-${hour}`}
                  onClick={() => onClick(datetime)}
                  className="h-20 border-l border-t border-gray-200 hover:bg-blue-50 transition"
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default Calendar;
