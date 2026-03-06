import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Understanding Zero-Knowledge Privacy in Cloud Storage',
  description: 'In an era dominated by massive data breaches and algorithmic surveillance, privacy is a luxury. When you upload photos to most cloud galleries, their algorithms...',
  openGraph: {
    images: [{ url: '/api/og?title=Understanding%20Zero-Knowledge%20Privacy%20in%20Cloud%20Storage', width: 1200, height: 630, alt: 'Understanding Zero-Knowledge Privacy in Cloud Storage' }],
    title: 'Understanding Zero-Knowledge Privacy in Cloud Storage',
    description: 'In an era dominated by massive data breaches and algorithmic surveillance, privacy is a luxury. When you upload photos to most cloud galleries, their algorithms...',
    url: 'https://telephotos.app/blog/understanding-zero-knowledge-privacy',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Understanding Zero-Knowledge Privacy in Cloud Storage',
    images: ['/api/og?title=Understanding%20Zero-Knowledge%20Privacy%20in%20Cloud%20Storage'],
  },
  alternates: {
    canonical: 'https://telephotos.app/blog/understanding-zero-knowledge-privacy',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
