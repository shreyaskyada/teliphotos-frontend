import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read the latest updates, tips on organizing digital memories, and insights into decentralized cloud storage from the Telephotos team.',
  openGraph: {
    images: [{ url: '/api/og?title=Blog', width: 1200, height: 630, alt: 'Blog' }],
    title: 'Blog',
    description: 'Read the latest updates, tips on organizing digital memories, and insights into decentralized cloud storage from the Telephotos team.',
    url: 'https://telephotos.app/blog',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog',
    images: ['/api/og?title=Blog'],
  },
  alternates: {
    canonical: 'https://telephotos.app/blog',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
