import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Why MTProto Encryption Matters for Your Photos',
  description: 'For the average consumer, terms like "end-to-end encryption" or "MTProto" sound like complex cybersecurity buzzwords. However, when we talk about archiving deep...',
  openGraph: {
    title: 'Why MTProto Encryption Matters for Your Photos',
    description: 'For the average consumer, terms like "end-to-end encryption" or "MTProto" sound like complex cybersecurity buzzwords. However, when we talk about archiving deep...',
    url: 'https://telephotos.app/blog/why-mtproto-encryption-matters',
    type: 'article',
  },
  alternates: {
    canonical: 'https://telephotos.app/blog/why-mtproto-encryption-matters',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
