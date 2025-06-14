import { PlusIcon } from "@heroicons/react/24/solid";

function AddEventsButton({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`${className} flex w-fit items-center justify-between gap-4 rounded-md border border-gray-800 bg-white p-2 font-semibold shadow-sm transition-colors transition-shadow hover:bg-[#c2e7ff] hover:shadow-xl md:rounded-xl md:p-4`}
    >
      <span className="text-xs md:text-lg">일정 추가하기</span>
      <PlusIcon className="h-3 w-3 md:h-5 md:w-5" />
    </button>
  );
}

export default AddEventsButton;
