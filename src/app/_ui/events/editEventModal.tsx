'use client';

import { XMarkIcon } from "@heroicons/react/24/solid";
import Input from "@/app/components/Input";
import Button from "@/app/components/Button";
import useClickOutside from "@/hooks/useClickOutside";
import { useEffect, useRef, useState } from "react";
import { addEvent } from "@/store/eventSlice";
import { useDispatch } from "react-redux";

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
   const modalRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
 const [title, setTitle] = useState('');
 const [description, setDescription] = useState('')
const [start, setStart] = useState('');
const [end, setEnd] = useState('');

useEffect(() => {
  if(selectedDate) {
    const init = toDateTimeLocal(selectedDate);
    setStart(init);
    const dateCopy = new Date(selectedDate);
    dateCopy.setHours(dateCopy.getHours() + 1);
    setEnd(toDateTimeLocal(dateCopy));
  }
}, [selectedDate]);

  useClickOutside(modalRef, onClickOutside ?? onClose);

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if(!title || !start || !end) return;

    dispatch(
      addEvent({
        id: crypto.randomUUID(),
        title, 
        description,
        start, 
        end,
      })
    )
    setTitle('')
      setDescription('')
      setStart('')
      setEnd('')
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div ref={modalRef} className="absolute top-50 left-4 z-50 bg-white p-6 rounded-lg shadow-lg w-[400px] border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">일정 추가하기</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <XMarkIcon className="h-6 w-6 cursor-pointer" />
        </button>
      </div>
      <form className="flex flex-col gap-4" onSubmit={handleAddEvent}>
        <Input
  label="일정 제목"
  type="text"
  value={title}
  onChange={e => setTitle(e.target.value)}
  required
/>
<Input
  label="일정 상세"
  type="text"
  value={description}
  onChange={e => setDescription(e.target.value)}
/>
<Input
  label="시작"
  type="datetime-local"
  value={start}
  onChange={e => setStart(e.target.value)}
  required
/>
<Input
  label="종료"
  type="datetime-local"
  value={end}
  onChange={e => setEnd(e.target.value)}
  required
/>
        <Button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded">
          일정 등록하기
        </Button>
      </form>
    </div>
  );
}

export default AddEventsModal;
