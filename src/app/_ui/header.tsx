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
      </div>
    </header>
  );
}
