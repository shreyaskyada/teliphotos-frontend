import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reclaiming Digital Ownership',
  description: 'What does it actually mean to "own" something on the internet? If you buy a physical photo album, it belongs to you. No subscription fee secures its existence. ...',
  openGraph: {
    title: 'Reclaiming Digital Ownership',
    description: 'What does it actually mean to "own" something on the internet? If you buy a physical photo album, it belongs to you. No subscription fee secures its existence. ...',
    url: 'https://telephotos.app/blog/reclaiming-digital-ownership',
    type: 'article',
  },
  alternates: {
    canonical: 'https://telephotos.app/blog/reclaiming-digital-ownership',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
