import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Why MTProto Encryption Matters for Your Photos',
  description: 'For the average consumer, terms like "end-to-end encryption" or "MTProto" sound like complex cybersecurity buzzwords. However, when we talk about archiving deep...',
  openGraph: {
    images: [{ url: '/api/og?title=Why%20MTProto%20Encryption%20Matters%20for%20Your%20Photos', width: 1200, height: 630, alt: 'Why MTProto Encryption Matters for Your Photos' }],
    title: 'Why MTProto Encryption Matters for Your Photos',
    description: 'For the average consumer, terms like "end-to-end encryption" or "MTProto" sound like complex cybersecurity buzzwords. However, when we talk about archiving deep...',
    url: 'https://telephotos.app/blog/why-mtproto-encryption-matters',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why MTProto Encryption Matters for Your Photos',
    images: ['/api/og?title=Why%20MTProto%20Encryption%20Matters%20for%20Your%20Photos'],
  },
  alternates: {
    canonical: 'https://telephotos.app/blog/why-mtproto-encryption-matters',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
