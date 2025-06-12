import { XMarkIcon } from "@heroicons/react/24/solid";

interface AddEventsModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate?: Date | null;
}

function AddEventsModal({ isOpen, onClose, selectedDate }: AddEventsModalProps) {
  if (!isOpen) return null;

    const defaultDateValue = selectedDate
    ? selectedDate.toISOString().split('T')[0]
    : '';

  return (
    <div className="absolute top-50 left-4 z-50 bg-white p-6 rounded-lg shadow-lg w-[400px] border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">일정 추가하기</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>
      <form className="flex flex-col gap-4">
        <label className="flex flex-col">
          일정 제목
          <input className="border-b" type="text" name="title" required />
        </label>
        <label className="flex flex-col">
          설명
          <input type="text" name="description" />
        </label>
        <label className="flex flex-col">
          날짜
          <input type="date" name="date" required />
        </label>
        <button type="submit" defaultValue={defaultDateValue} className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded">
          일정 등록하기
        </button>
      </form>
    </div>
  );
}

export default AddEventsModal;
