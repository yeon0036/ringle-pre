"use client";

import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { XMarkIcon } from "@heroicons/react/24/solid";
import React from "react";
import Input from "@/app/components/Input";
import Button from "@/app/components/Button";
import useClickOutside from "@/hooks/useClickOutside";
import { addEvent } from "@/store/eventSlice";

interface AddEventsModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate?: Date | null;
  onClickOutside?: () => void;
}

function toDateTimeLocal(date: Date) {
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function AddEventsModal({
  isOpen,
  onClose,
  selectedDate,
  onClickOutside,
}: AddEventsModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  useClickOutside(modalRef, onClickOutside ?? onClose);

  useEffect(() => {
    if (selectedDate) {
      const initStart = toDateTimeLocal(selectedDate);
      const initEnd = toDateTimeLocal(
        new Date(selectedDate.getTime() + 60 * 60 * 1000)
      ); // +1시간
      setStart(initStart);
      setEnd(initEnd);
    }
  }, [selectedDate]);

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !start || !end) return;

    dispatch(
      addEvent({
        id: crypto.randomUUID(),
        title,
        description,
        start,
        end,
      })
    );

    setTitle("");
    setDescription("");
    setStart("");
    setEnd("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      className="absolute top-50 left-4 z-50 w-[400px] rounded-lg border border-gray-200 bg-white p-6 shadow-lg"
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">일정 추가하기</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>
      <form className="flex flex-col gap-4" onSubmit={handleAddEvent}>
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
        <Button
          type="submit"
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
        >
          일정 등록하기
        </Button>
      </form>
    </div>
  );
}

export default AddEventsModal;
