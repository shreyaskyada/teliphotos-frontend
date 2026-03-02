import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Understanding Zero-Knowledge Privacy in Cloud Storage',
  description: 'In an era dominated by massive data breaches and algorithmic surveillance, privacy is a luxury. When you upload photos to most cloud galleries, their algorithms...',
  openGraph: {
    title: 'Understanding Zero-Knowledge Privacy in Cloud Storage',
    description: 'In an era dominated by massive data breaches and algorithmic surveillance, privacy is a luxury. When you upload photos to most cloud galleries, their algorithms...',
    url: 'https://telephotos.app/blog/understanding-zero-knowledge-privacy',
    type: 'article',
  },
  alternates: {
    canonical: 'https://telephotos.app/blog/understanding-zero-knowledge-privacy',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
