import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How it Works',
  description: 'Find out how Telephotos transforms your private Telegram channels into a fast, infinite, and secure personal photo gallery in three simple steps.',
  openGraph: {
    images: [{ url: '/api/og?title=How%20it%20Works', width: 1200, height: 630, alt: 'How it Works' }],
    title: 'How it Works',
    description: 'Find out how Telephotos transforms your private Telegram channels into a fast, infinite, and secure personal photo gallery in three simple steps.',
    url: 'https://telephotos.app/how-it-works',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How it Works',
    images: ['/api/og?title=How%20it%20Works'],
  },
  alternates: {
    canonical: 'https://telephotos.app/how-it-works',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
