import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Features',
  description: 'Explore the features of Telephotos. Discover unlimited free storage, secure encryption, beautiful gallery layouts, and zero-knowledge privacy.',
  openGraph: {
    title: 'Features',
    description: 'Explore the features of Telephotos. Discover unlimited free storage, secure encryption, beautiful gallery layouts, and zero-knowledge privacy.',
    url: 'https://telephotos.app/features',
  },
  alternates: {
    canonical: 'https://telephotos.app/features',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
