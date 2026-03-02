import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Future of Decentralized Photo Galleries',
  description: 'As our smartphone cameras capture ever larger file sizes, the need for robust photo storage solutions has never been more obvious. For the past decade, consumer...',
  openGraph: {
    title: 'The Future of Decentralized Photo Galleries',
    description: 'As our smartphone cameras capture ever larger file sizes, the need for robust photo storage solutions has never been more obvious. For the past decade, consumer...',
    url: 'https://telephotos.app/blog/the-future-of-decentralized-photo-galleries',
    type: 'article',
  },
  alternates: {
    canonical: 'https://telephotos.app/blog/the-future-of-decentralized-photo-galleries',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
