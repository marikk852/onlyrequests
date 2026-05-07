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
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  return (
    <html lang="uk">
      <body className="antialiased">
        {pixelId ? (
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        ) : null}
        {children}
      </body>
    </html>
  );
}
