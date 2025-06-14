"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Calendar from "./Calendar";
import DayController from "./DayController";
import AddEventsModal from "../events/addEventModal";
import EditEventsModal from "../events/editEventModal";
import { useState } from "react";
import { EventType } from "@/store/eventSlice";

function getWeekDates(baseDate: Date): Date[] {
  const startOfWeek = new Date(baseDate);
  startOfWeek.setDate(baseDate.getDate() - baseDate.getDay());
  startOfWeek.setHours(0, 0, 0, 0);
  return Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(startOfWeek);
    d.setDate(startOfWeek.getDate() + i);
    return d;
  });
}

export default function MainCalendar({ className }: { className?: string }) {
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [event, setEvent] = useState<EventType>("");

  const handleTimeClick = (date: Date) => {
    setSelectedDate(date);
    setAddModalOpen(true);
  };

  const handleEditEventOpen = (event: EventType) => {
    setEvent(event);
    setEditModalOpen(true);
  };

  const selectedDateString = useSelector(
    (state: RootState) => state.calendar.selectedDate
  );
  const selectedDateRedux = selectedDateString
    ? new Date(selectedDateString)
    : new Date();
  const weekDates = getWeekDates(selectedDateRedux);
  const events = useSelector((state: RootState) => state.events.events);

  return (
    <section className={`h-screen ${className ?? ""}`}>
      <DayController />
      <div className="flex-1 overflow-y-auto">
        <Calendar
          weekDates={weekDates}
          onClick={handleTimeClick}
          onEdit={handleEditEventOpen}
          events={events}
        />
      </div>
      <AddEventsModal
        isOpen={isAddModalOpen}
        onClose={() => setAddModalOpen(false)}
        selectedDate={selectedDate}
      />
      <EditEventsModal
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        selectedDate={selectedDate}
        event={event}
      />
    </section>
  );
}
