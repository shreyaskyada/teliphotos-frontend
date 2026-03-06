import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Future of Decentralized Photo Galleries',
  description: 'As our smartphone cameras capture ever larger file sizes, the need for robust photo storage solutions has never been more obvious. For the past decade, consumer...',
  openGraph: {
    images: [{ url: '/api/og?title=The%20Future%20of%20Decentralized%20Photo%20Galleries', width: 1200, height: 630, alt: 'The Future of Decentralized Photo Galleries' }],
    title: 'The Future of Decentralized Photo Galleries',
    description: 'As our smartphone cameras capture ever larger file sizes, the need for robust photo storage solutions has never been more obvious. For the past decade, consumer...',
    url: 'https://telephotos.app/blog/the-future-of-decentralized-photo-galleries',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Future of Decentralized Photo Galleries',
    images: ['/api/og?title=The%20Future%20of%20Decentralized%20Photo%20Galleries'],
  },
  alternates: {
    canonical: 'https://telephotos.app/blog/the-future-of-decentralized-photo-galleries',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
