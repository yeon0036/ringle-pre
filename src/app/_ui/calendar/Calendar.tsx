import { format } from "date-fns";
import { EventType } from "@/store/eventSlice";

interface CalendarProps {
  weekDates: Date[];
  onClick: (date: Date) => void;
  events: EventType[];
  onEdit: (event: EventType) => void;
}

function getHourBlocks(start: Date, end: Date) {
  return Math.max(
    1,
    Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60))
  );
}

function Calendar({ weekDates, onClick, events, onEdit }: CalendarProps) {
  const hours = Array.from({ length: 24 }, (_, i) => i); // 숫자 배열로 변경

  return (
    <div className="flex w-full flex-1 rounded-xl bg-white">
      <div className="flex w-16 flex-col">
        <div className="h-24" />
        {hours.map((hour) => (
          <div key={hour} className="h-20 px-2 py-1 text-xs text-gray-500">
            {`${hour.toString().padStart(2, "0")}:00`}
          </div>
        ))}
      </div>
      <div className="flex-1">
        <div className="mb-10 grid h-16 grid-cols-7">
          {weekDates.map((d) => (
            <div key={d.toISOString()} className="py-2 text-center">
              <h1 className="text-md">{format(d, "EEE")}</h1>
              <br />
              <h1 className="font-base text-4xl">{format(d, "d")}</h1>
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
                return (
                  evStart.getFullYear() === blockStart.getFullYear() &&
                  evStart.getMonth() === blockStart.getMonth() &&
                  evStart.getDate() === blockStart.getDate() &&
                  evStart.getHours() === blockStart.getHours()
                );
              });

              return (
                <div key={`${date.toISOString()}-${hour}`} className="relative">
                  <button
                    onClick={() => onClick(blockStart)}
                    className="h-20 w-full border-t border-l border-gray-200 transition hover:bg-blue-50"
                  />
                  {event && (
                    <button
                      onClick={() => onEdit(event)}
                      className="absolute top-1 right-1 left-1 z-[999] cursor-pointer overflow-hidden rounded bg-blue-200 px-2 py-1 text-xs font-semibold text-blue-900"
                      style={{
                        height: `calc(${getHourBlocks(new Date(event.start), new Date(event.end))} * 100%)`,
                      }}
                    >
                      <div className="flex flex-col items-start">
                        <p>{event.title}</p>
                        <p>{event.description}</p>
                        <p>
                          {" "}
                          {format(event.start, "HH:mm")}~
                          {format(event.end, "HH:mm")}
                        </p>
                      </div>
                    </button>
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
