import { XMarkIcon } from "@heroicons/react/24/solid";
import Input from "@/app/components/Input";
import Button from "@/app/components/Button";

interface AddEventsModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate?: Date | null;
}

function AddEventsModal({ isOpen, onClose, selectedDate }: AddEventsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute top-50 left-4 z-50 bg-white p-6 rounded-lg shadow-lg w-[400px] border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">일정 추가하기</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <XMarkIcon className="h-6 w-6" />
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
