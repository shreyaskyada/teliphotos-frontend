import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Telephotos – Personal Photo Gallery for Telegram",
  description: "Telephotos is a personal photo gallery for Telegram. Upload, browse, and organize your photos in beautiful galleries — all backed by your own Telegram channel.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scrollbar-thin">
      <body
        className={`font-sans antialiased bg-background`}
      >
        {children}
      </body>
    </html>
  );
}
