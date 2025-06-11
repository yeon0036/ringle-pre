import Image from 'next/image';

export default function Header() {
  return (
    <header className='flex w-fullitems-center border-b border-gray-300'>
      <div className='pl-20 py-5'>
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
