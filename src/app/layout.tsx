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
    default: "Telephotos | Unlimited Free Telegram Photo Gallery",
    template: "%s | Telephotos",
  },
  description: "Transform your Telegram account into an unlimited, secure, and beautiful personal cloud photo gallery. Upload, organize, and view uncompressed memories for free without server fees.",
  keywords: ["telegram photo gallery", "unlimited cloud storage", "free photo storage", "telegram cloud", "photo backup", "secure photo sharing", "alternative to google photos", "alternative to icloud photos"],
  authors: [{ name: "Telephotos Team" }],
  creator: "Telephotos",
  publisher: "Telephotos",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://telephotos.app/",
    title: "Telephotos | Unlimited Free Telegram Photo Gallery",
    description: "Transform your Telegram account into an unlimited, secure, and beautiful personal cloud photo gallery. Upload, organize, and view uncompressed memories for free without server fees.",
    siteName: "Telephotos",
    images: [{
      url: "/logo.png",
      width: 800,
      height: 800,
      alt: "Telephotos Logo"
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Telephotos | Unlimited Free Telegram Photo Gallery",
    description: "Turn your Telegram account into an infinite photo gallery. Secure, uncompressed, and totally free.",
    images: ["/logo.png"],
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
        {/* Monetag site verification */}
        <meta name="monetag" content="b30691f35e0ec18eb5ccf9a31b83fabb" />
        {/* Monetag ad script */}
        <script src="https://quge5.com/88/tag.min.js" data-zone="216083" async data-cfasync="false" />
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
