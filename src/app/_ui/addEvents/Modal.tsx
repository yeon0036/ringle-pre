'use client';

import { XMarkIcon } from "@heroicons/react/24/solid";
import Input from "@/app/components/Input";
import Button from "@/app/components/Button";
import useClickOutside from "@/hooks/useClickOutside";
import { useEffect, useRef, useState } from "react";

interface AddEventsModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate?: Date | null;
  onClickOutside?: () => void;
}

function toDateTimeLocal(date:Date) {
  const pad = (n: number) => n.toString().padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}


function AddEventsModal({ isOpen, onClose, selectedDate, onClickOutside }: AddEventsModalProps) {
  const [datetimeValue, setDatetiemValue] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);
  useClickOutside(modalRef, onClickOutside ?? onClose);

  useEffect(() => {
    if(selectedDate) {
      setDatetiemValue(toDateTimeLocal(selectedDate));
    }
  }, [selectedDate])

  if (!isOpen) return null;

  return (
    <div ref={modalRef} className="absolute top-50 left-4 z-50 bg-white p-6 rounded-lg shadow-lg w-[400px] border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">일정 추가하기</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <XMarkIcon className="h-6 w-6 cursor-pointer" />
        </button>
      </div>
      <form className="flex flex-col gap-4">
        <Input
        label="일정 제목"
          type="text"
          placeholder="일정 제목"
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
         <Input
          label="일정 상세"
          type="text"
          placeholder="일정 상세"
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Input
          label="날짜, 시간"
          type="datetime-local"
          placeholder="날짜, 시간"
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={datetimeValue}
          onChange={(e => setDatetiemValue(e.target.value))}
        />
          <input
            type="hidden"
            name="datetime"
            value={selectedDate ? selectedDate.toISOString() : ''}
          />
        <Button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded">
          일정 등록하기
        </Button>
      </form>
    </div>
  );
}

export default AddEventsModal;
