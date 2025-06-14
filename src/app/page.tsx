"use client";

import { useState } from "react";
import MainCalendar from "./_ui/calendar/MainCalendar";
import SideCalendar from "./_ui/calendar/SideCalendar";
import AddEventsButton from "./_ui/events/Button";
import AddEventsModal from "./_ui/events/addEventModal";
import EditEventsModal from "./_ui/events/editEventModal";

export default function Home() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleAddEventClick = () => {
    setIsAddModalOpen(true);
  };

  return (
    <div className="items-top my-12 flex min-h-screen w-full gap-4 px-5 md:gap-10 md:px-12">
      <div className="flex flex-col gap-3 md:gap-4">
        <AddEventsButton
          className="flex justify-start"
          onClick={handleAddEventClick}
        />
        <AddEventsModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          selectedDate={selectedDate}
        />
        <EditEventsModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          selectedDate={selectedDate}
        />
        <SideCalendar
          className="shrink-0"
          onDateChange={(date) => setSelectedDate(date)}
        />
      </div>
      <MainCalendar className="flex-1" />
    </div>
  );
}
