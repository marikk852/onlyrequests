import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Тест: Подходит ли вам онлайн-работа?",
  description: "Пройдите тест и узнайте, подходит ли вам онлайн-работа",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className="antialiased">{children}</body>
    </html>
  );
}
