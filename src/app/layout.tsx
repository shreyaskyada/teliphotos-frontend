import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
