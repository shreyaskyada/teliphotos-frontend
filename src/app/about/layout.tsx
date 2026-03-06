import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about the mission behind Telephotos and why we built an unlimited, private photo gallery alternative powered by Telegram.',
  openGraph: {
    images: [{ url: '/api/og?title=About%20Us', width: 1200, height: 630, alt: 'About Us' }],
    title: 'About Us',
    description: 'Learn about the mission behind Telephotos and why we built an unlimited, private photo gallery alternative powered by Telegram.',
    url: 'https://telephotos.app/about',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us',
    images: ['/api/og?title=About%20Us'],
  },
  alternates: {
    canonical: 'https://telephotos.app/about',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
