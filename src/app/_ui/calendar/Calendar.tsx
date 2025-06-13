import {format} from 'date-fns';
import {EventType} from '@/store/eventSlice'

interface CalendarProps {
  weekDates: Date[];
  onClick: (date: Date) => void;
  events: EventType[];
}

function getHourBlocks(start: Date, end: Date) {
  return Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60)));
}

function Calendar({
  weekDates,
  onClick,
  events,
}: CalendarProps) {
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
              <h1 className="text-md">{format(d, "EEE")}</h1>
              <br />
              <h1 className="text-4xl font-base">{format(d, "d")}</h1>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7">
          {hours.flatMap((hour) =>
            weekDates.map((date) => {
              const blockStart = new Date(date);
              blockStart.setHours(hour, 0, 0, 0);
              const blockEnd = new Date(blockStart);
              blockEnd.setHours(blockEnd.getHours() + 1);

              const event = events.find((ev) => {
                const evStart = new Date(ev.start);
                return evStart.getFullYear() === blockStart.getFullYear() &&
                  evStart.getMonth() === blockStart.getMonth() &&
                  evStart.getDate() === blockStart.getDate() &&
                  evStart.getHours() === blockStart.getHours();
              });

              return (
                <div key={`${date.toISOString()}-${hour}`} className="relative">
                  <button
                    onClick={() => onClick(blockStart)}
                    className="h-20 border-l border-t border-gray-200 hover:bg-blue-50 transition w-full"
                  />
                  {event && (
                    <div
                      className="absolute top-1 left-1 right-1 z-[999] rounded bg-blue-200 text-blue-900 px-2 py-1 text-xs font-semibold overflow-hidden"
                      style={{
                        height: `calc(${getHourBlocks(new Date(event.start), new Date(event.end))} * 100%)`
                      }}
                    >
                      {event.title}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default Calendar;
