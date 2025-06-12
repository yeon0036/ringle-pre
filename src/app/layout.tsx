import './globals.css';
import Header from './_ui/Header';

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang='ko'>
      <head>
        <meta charSet='UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>정혜연-Ringle pre-assignment</title>
      </head>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
