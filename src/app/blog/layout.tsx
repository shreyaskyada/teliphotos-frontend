import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read the latest updates, tips on organizing digital memories, and insights into decentralized cloud storage from the Telephotos team.',
  openGraph: {
    title: 'Blog',
    description: 'Read the latest updates, tips on organizing digital memories, and insights into decentralized cloud storage from the Telephotos team.',
    url: 'https://telephotos.app/blog',
  },
  alternates: {
    canonical: 'https://telephotos.app/blog',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
