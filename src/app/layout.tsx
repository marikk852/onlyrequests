import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Анкета: Чи підходить вам онлайн-робота?",
  description: "Пройдіть анкету та дізнайтеся, чи підходить вам онлайн-робота",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body className="antialiased">{children}</body>
    </html>
  );
}
