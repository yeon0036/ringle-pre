"use client";

import { XMarkIcon } from "@heroicons/react/24/solid";
import Input from "@/app/components/Input";
import Button from "@/app/components/Button";
import useClickOutside from "@/hooks/useClickOutside";
import { useEffect, useRef, useState } from "react";
import { editEvent, deleteEvent } from "@/store/eventSlice";
import { useDispatch } from "react-redux";
import { EventType } from "@/store/eventSlice";

interface AddEventsModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate?: Date | null;
  onClickOutside?: () => void;
  event?: EventType;
}

function toDateTimeLocal(date: Date) {
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function EditEventsModal({
  isOpen,
  onClose,
  selectedDate,
  onClickOutside,
  event,
}: AddEventsModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  useEffect(() => {
    if (selectedDate) {
      const init = toDateTimeLocal(selectedDate);
      setStart(init);
      const dateCopy = new Date(selectedDate);
      dateCopy.setHours(dateCopy.getHours() + 1);
      setEnd(toDateTimeLocal(dateCopy));
    }
  }, [selectedDate]);

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setDescription(event.description);
      setStart(event.start);
      setEnd(event.end);
    }
  }, [event]);

  useClickOutside(modalRef, onClickOutside ?? onClose);

  const handleEditEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!event || !title || !start || !end) return;

    dispatch(
      editEvent({
        ...event,
        title,
        description,
        start,
        end,
      })
    );
    onClose();
  };

  const handleDeleteEvent = () => {
    if (!event) return;

    dispatch(deleteEvent(event.id));
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      className="absolute top-50 left-4 z-50 w-[400px] rounded-lg border border-gray-200 bg-white p-6 shadow-lg"
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">일정 수정하기</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <XMarkIcon className="h-6 w-6 cursor-pointer" />
        </button>
      </div>
      <form className="flex flex-col gap-4" onSubmit={handleEditEvent}>
        <Input
          label="일정 제목"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <Input
          label="일정 상세"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Input
          label="시작"
          type="datetime-local"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          required
        />
        <Input
          label="종료"
          type="datetime-local"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          required
        />
        <div className="flex items-center justify-between gap-3">
          <Button
            type="submit"
            className="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
            onClick={() => handleEditEvent}
          >
            수정하기
          </Button>
          <Button
            type="button"
            className="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
            onClick={handleDeleteEvent}
          >
            삭제하기
          </Button>
        </div>
      </form>
    </div>
  );
}

export default EditEventsModal;
