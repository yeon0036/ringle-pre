import { format } from "date-fns";
import { EventType } from "@/store/eventSlice";

interface CalendarProps {
  weekDates: Date[];
  onClick: (date: Date) => void;
  events: EventType[];
  onEdit: (event: EventType) => void;
}

function getTopOffset(date: Date) {
  const minutes = date.getHours() * 60 + date.getMinutes();
  return (minutes / 60) * 80;
}

function getHeightInPx(start: Date, end: Date) {
  const durationMinutes = (end.getTime() - start.getTime()) / (1000 * 60);
  return (durationMinutes / 60) * 80;
}

function isOverlapping(a: EventType, b: EventType) {
  const aStart = new Date(a.start).getTime();
  const aEnd = new Date(a.end).getTime();
  const bStart = new Date(b.start).getTime();
  const bEnd = new Date(b.end).getTime();
  return aStart < bEnd && bStart < aEnd;
}

function groupAndLayout(events: EventType[]) {
  const positioned: {
    event: EventType;
    zIndex: number;
    leftPercent: number;
    widthPercent: number;
  }[] = [];

  const sorted = [...events].sort(
    (a, b) => new Date(b.start).getTime() - new Date(a.start).getTime()
  );

  const used = new Array(sorted.length).fill(false);

  for (let i = 0; i < sorted.length; i++) {
    if (used[i]) continue;

    const group = [sorted[i]];
    used[i] = true;

    for (let j = i + 1; j < sorted.length; j++) {
      if (used[j]) continue;
      if (group.some((g) => isOverlapping(g, sorted[j]))) {
        group.push(sorted[j]);
        used[j] = true;
      }
    }

    group.forEach((ev, idx) => {
      positioned.push({
        event: ev,
        zIndex: group.length - idx,
        leftPercent: (idx / group.length) * 100,
        widthPercent: 100 / group.length,
      });
    });
  }

  return positioned;
}

function Calendar({ weekDates, onClick, events, onEdit }: CalendarProps) {
  const hours = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div className="flex w-full flex-1 rounded-md bg-white md:rounded-xl">
      {/* 왼쪽 시간 라벨 */}
      <div className="flex w-16 flex-col items-end pt-16 pr-2">
        {hours.map((hour) => (
          <div
            key={hour}
            className="flex h-[80px] items-start justify-end text-xs text-gray-500"
          >
            {`${hour.toString().padStart(2, "0")}:00`}
          </div>
        ))}
      </div>

      {/* 우측 캘린더 */}
      <div className="flex-1">
        {/* 요일 헤더 */}
        <div className="mb-4 grid h-16 grid-cols-7">
          {weekDates.map((d) => (
            <div key={d.toISOString()} className="py-2 text-center">
              <h1 className="text-md">{format(d, "EEE")}</h1>
              <h1 className="font-base text-2xl md:text-4xl">
                {format(d, "d")}
              </h1>
            </div>
          ))}
        </div>

        {/* 시간 블록 */}
        <div className="relative grid grid-cols-7">
          {weekDates.map((date) => {
            const dayEvents = events.filter((ev) => {
              const evStart = new Date(ev.start);
              return (
                evStart.getFullYear() === date.getFullYear() &&
                evStart.getMonth() === date.getMonth() &&
                evStart.getDate() === date.getDate()
              );
            });

            return (
              <div
                key={date.toISOString()}
                className="relative h-[1920px] border-l border-gray-200"
              >
                {hours.map((hour) => {
                  const blockStart = new Date(date);
                  blockStart.setHours(hour, 0, 0, 0);
                  return (
                    <div
                      key={hour}
                      className="h-[80px] border-t border-gray-200 hover:bg-blue-100"
                      role="button"
                      tabIndex={0}
                      onClick={() => onClick(blockStart)}
                      onKeyDown={(e) =>
                        (e.key === "Enter" || e.key === " ") &&
                        onClick(blockStart)
                      }
                    />
                  );
                })}

                {/* 이벤트 블록 (분 단위, 겹침 처리 포함) */}
                {groupAndLayout(dayEvents).map(
                  ({ event, zIndex, leftPercent, widthPercent }) => {
                    const top = getTopOffset(new Date(event.start));
                    const height = getHeightInPx(
                      new Date(event.start),
                      new Date(event.end)
                    );

                    return (
                      <button
                        key={event.id}
                        onClick={() => onEdit(event)}
                        className="absolute rounded bg-blue-500 px-1 py-0.5 text-xs text-white shadow-md"
                        style={{
                          top: `${top}px`,
                          height: `${height}px`,
                          left: `${leftPercent}%`,
                          width: `${widthPercent}%`,
                          zIndex,
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "flex-start",
                          alignItems: "flex-start",
                          textAlign: "left",
                          gap: "2px",
                        }}
                      >
                        <div className="flex flex-col gap-2 p-1">
                          <span className="w-full truncate text-[11px] leading-tight font-semibold break-words whitespace-normal">
                            {event.title || "(No title)"}
                          </span>
                          <span className="text-[10px] leading-none">
                            {format(event.start, "HH:mm")}~
                            {format(event.end, "HH:mm")}
                          </span>
                        </div>
                      </button>
                    );
                  }
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Calendar;
