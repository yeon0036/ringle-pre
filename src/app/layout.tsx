import "./globals.css";
import Header from "./_ui/Header";
import Provider from "./Provider";

export const metadata = {
  title: "정혜연-Ringle pre-assignment",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <Provider>
          <Header />
          {children}
        </Provider>
      </body>
    </html>
  );
}
