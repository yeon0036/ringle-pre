import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ko'>
      <body>
        <div className='bg-primary text-white p-4'>Tailwind 작동 확인</div>
        {children}
      </body>
    </html>
  );
}
