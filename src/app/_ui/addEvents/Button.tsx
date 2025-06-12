import {PlusIcon} from '@heroicons/react/24/solid';

function AddEventsButton({className, onClick}: {className?: string, onClick?: () => void}) {

  return (
    <button
      onClick={onClick}
      className={`${className} flex justify-between items-center w-fit p-4 border border-gray-800 bg-white rounded-xl font-semibold hover:bg-[#c2e7ff] transition-colors gap-4 shadow-sm hover:shadow-xl transition-shadow`}
    >
      <span>일정 추가하기</span>
      <PlusIcon className='h-5 w-5' />
    </button>
  );
}

export default AddEventsButton;
