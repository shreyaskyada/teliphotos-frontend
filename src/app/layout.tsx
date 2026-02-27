import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import Script from "next/script";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
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
    <html lang="en" className={`dark scrollbar-thin ${outfit.variable}`}>
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1375243567926496"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body
        className={`font-sans antialiased bg-background`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
