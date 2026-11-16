import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Features',
  description: 'Explore the features of Telephotos. Discover free Telegram-powered storage, beautiful gallery layouts, channel albums, and transparent privacy.',
  openGraph: {
    images: [{ url: '/api/og?title=Features', width: 1200, height: 630, alt: 'Features' }],
    title: 'Features',
    description: 'Explore the features of Telephotos. Discover free Telegram-powered storage, beautiful gallery layouts, channel albums, and transparent privacy.',
    url: 'https://telephotos.app/features',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Features',
    images: ['/api/og?title=Features'],
  },
  alternates: {
    canonical: 'https://telephotos.app/features',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
