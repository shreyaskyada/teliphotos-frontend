import { AdSenseRenderer } from "@telephotos/components/AdSenseRenderer";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
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
  metadataBase: new URL("https://telephotos.app"),
  title: {
    default: "Telephotos | Free Photo Storage Cloud",
    template: "%s | Telephotos",
  },
  description: "Transform your Telegram account into a free photo storage cloud gallery. Upload, organize, and view uncompressed memories for free without server fees.",
  keywords: [
    "free photo storage cloud",
    "telegram photo gallery",
    "unlimited cloud storage",
    "free photo storage",
    "telegram cloud",
    "photo backup",
    "secure photo sharing",
    "alternative to google photos",
    "alternative to icloud photos",
    "unlimited photo backup",
    "telegram file storage",
    "telegram unlimited cloud",
    "private photo gallery",
    "cloud storage for photos free",
    "free cloud storage",
    "store photos on telegram",
    "best free photo storage",
    "telegram saved messages storage"
  ],
  authors: [{ name: "Telephotos Team" }],
  creator: "Telephotos",
  publisher: "Telephotos",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://telephotos.app/",
    title: "Telephotos | Free Photo Storage Cloud",
    description: "Transform your Telegram account into a free photo storage cloud gallery. Upload, organize, and view uncompressed memories for free without server fees.",
    siteName: "Telephotos",
    images: [{
      url: "/api/og",
      width: 1200,
      height: 630,
      alt: "Telephotos"
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Telephotos | Free Photo Storage Cloud",
    description: "Turn your Telegram account into a free photo storage cloud. Secure, uncompressed, and totally free.",
    images: ["/api/og"],
  },
  verification: {
    google: "0bmvhKB6RPRhoVyR5q6rxrrQvams8IkMP1P5g_CQEgw",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    }
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark scrollbar-thin ${outfit.variable}`}>
      <head>
        {/* Preconnect hints for any remaining external resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      </head>
      <body
        className={`font-sans antialiased bg-background`}
      >
        {children}
        <AdSenseRenderer />
        <Analytics />
      </body>
    </html>
  );
}
