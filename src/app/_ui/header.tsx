import Image from 'next/image';

export default function Header() {
  return (
    <header className='flex w-full items-center bg-customGray'>
      <div className='ml-4'>
        <Image
          src='/logo.png'
          alt='Logo'
          width={200}
          height={60}
          className='object-contain'
        />
        <div className='bg-red-500 text-white p-4 text-lg font-bold'>
          Tailwind Test
        </div>
      </div>
    </header>
  );
}
