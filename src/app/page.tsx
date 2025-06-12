import MainCalendar from './_ui/MainCalendar';
import SideCalendar from './_ui/SideCalendar';

export default function Home() {
  return (
    <div className='flex items-top min-h-screen gap-10 my-12 px-12 w-full'>
      <SideCalendar className='shrink-0' />
      <MainCalendar className='flex-1' />
    </div>
  );
}
